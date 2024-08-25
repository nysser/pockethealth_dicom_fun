import fs from 'fs';
import { PNG } from 'pngjs';
import dicomParser from 'dicom-parser';
import path from 'path';
import { DICOM_TAGS, TAG_REGEX } from './constants.js';


function loadFileAsUint8Array(filePath) {
    try {
      const buffer = fs.readFileSync(filePath);
      // Convert the Buffer to a Uint8Array for dicomParser
      return new Uint8Array(buffer);
    } catch (err) {
      console.error('Error reading file:', err);
    }
}

export function extractDicomHeaders(filePath, tags) {
  try {
    const uint8Array = loadFileAsUint8Array(filePath);
    const dicomDataSet = dicomParser.parseDicom(uint8Array);

    const headerValue = {};

    for (const tag of tags) {
      if (!TAG_REGEX.test(tag)) {
        return { error: `Invalid DICOM tag ${tag} format`, statusCode: 400 };
      }

      const dicomTag = DICOM_TAGS[tag.toUpperCase()];
      if (!dicomTag) {
        return { error: `DICOM tag ${tag} is not supported`, statusCode: 400 };
      }

      const xTagLowerCase = `x${tag.toLowerCase()}`;
      const element = dicomDataSet.elements[xTagLowerCase];
      if (element !== undefined) {
        if (dicomTag.isDicomUint) {
          if (element.length === 2) {
            headerValue[dicomTag.name] = dicomDataSet.uint16(xTagLowerCase);
          } else if (element.length === 4) {
            headerValue[dicomTag.name] = dicomDataSet.uint32(xTagLowerCase);
          }
        } else {
          headerValue[dicomTag.name] = dicomDataSet.string(xTagLowerCase);
        }
      }
    }

    if (Object.keys(headerValue).length === 0) {
      return { error: `None of the tags in ${tags} exist in file ${filePath}`, statusCode: 404 };
    }

    return { data: headerValue, statusCode: 200 };

  } catch (err) {
    return { error: 'Error parsing DICOM file', statusCode: 500 };
  }
}

export function convertDicomToPngAndSave(filePath, outputPngPath) {
  return new Promise((resolve, reject) => {
    try {
      const uint8Array = loadFileAsUint8Array(filePath);
      const dicomDataSet = dicomParser.parseDicom(uint8Array);


      // Not going to lie, a lot of the following code is from online resources
      // I didn't know much about extracting the pixel data from DICOM files
      // or how to convert it to PNG, so I had to look up a lot of this

      // Get the pixel data element (tag 7FE00010)
      const pixelDataElement = dicomDataSet.elements.x7fe00010;
      if (!pixelDataElement) {
        return reject({ error: 'Pixel data not found in DICOM file.', statusCode: 404 });
      }

      // Extract the pixel data
      const pixelData = new Uint16Array(dicomDataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length / 2);

      // Get image dimensions and properties
      const rows = dicomDataSet.uint16('x00280010');
      const columns = dicomDataSet.uint16('x00280011');
      const samplesPerPixel = dicomDataSet.uint16('x00280002');
      const photometricInterpretation = dicomDataSet.string('x00280004');
      const bitsAllocated = dicomDataSet.uint16('x00280100');

      // Read Window Center and Width
      let windowCenter = dicomDataSet.floatString('x00281050');
      let windowWidth = dicomDataSet.floatString('x00281051');

      if (!windowCenter || !windowWidth) {
        windowCenter = 128; // Fallback to default if not found
        windowWidth = 256;
      }

      const png = new PNG({ width: columns, height: rows });

      // Function to calculate grayscale value from pixel value
      const calculateGrayscale = (pixelValue) => {
        const minValue = windowCenter - 0.5 - (windowWidth - 1) / 2;
        const maxValue = windowCenter - 0.5 + (windowWidth - 1) / 2;

        if (pixelValue <= minValue) {
          return 0;
        } else if (pixelValue > maxValue) {
          return 255;
        } else {
          return Math.round(((pixelValue - minValue) / (windowWidth - 1)) * 255);
        }
      };

      // Handle grayscale and RGB data separately
      if (photometricInterpretation === 'RGB' && samplesPerPixel === 3) {
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < columns; x++) {
            const pixelIndex = (y * columns + x) * 3;
            const pngIndex = (y * columns + x) << 2;

            if (bitsAllocated === 16) {
              png.data[pngIndex] = pixelData[pixelIndex] >> 8;
              png.data[pngIndex + 1] = pixelData[pixelIndex + 1] >> 8;
              png.data[pngIndex + 2] = pixelData[pixelIndex + 2] >> 8;
            } else {
              png.data[pngIndex] = pixelData[pixelIndex];
              png.data[pngIndex + 1] = pixelData[pixelIndex + 1];
              png.data[pngIndex + 2] = pixelData[pixelIndex + 2];
            }

            png.data[pngIndex + 3] = 255; // Alpha (fully opaque)
          }
        }
      } else if (photometricInterpretation === 'MONOCHROME2' && samplesPerPixel === 1) {
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < columns; x++) {
            const pixelIndex = y * columns + x;
            const pngIndex = (y * columns + x) << 2;
            const pixelValue = pixelData[pixelIndex];

            const grayscaleValue = calculateGrayscale(pixelValue);
            png.data[pngIndex] = grayscaleValue;
            png.data[pngIndex + 1] = grayscaleValue;
            png.data[pngIndex + 2] = grayscaleValue;
            png.data[pngIndex + 3] = 255; // Alpha (fully opaque)
          }
        }
      } else {
        return reject({ error: 'Unsupported Photometric Interpretation', statusCode: 400 });
      }

      const writeStream = fs.createWriteStream(outputPngPath);
      png.pack().pipe(writeStream).on('finish', () => resolve(outputPngPath)).on('error', (err) => reject({ error: 'Error saving PNG file', statusCode: 500 }));

    } catch (err) {
      return reject({ error: 'Error converting DICOM to PNG', statusCode: 500 });
    }
  });
}
