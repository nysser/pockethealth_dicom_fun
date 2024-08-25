import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractDicomHeaders, convertDicomToPngAndSave } from '../helpers/dicomHelpers.js';

// Get the equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// save a DICOM file to the uploads directory
export const uploadDicomFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
};

// get DICOM headers for file by tags
// tags should be a query param of a list of strings in the format ggggeeee
// if a tag is not found in the DICOM file, it will be undefined in the response
export const getDicomHeader = (req, res) => {
  const { fileName } = req.params;
  const tags = req.query.tags ? req.query.tags.split(',') : [];
  if (tags.length === 0) {
    return res.status(400).json({ error: 'No tags provided' });
  }

  const filePath = 'uploads/' + fileName;
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `File ${fileName} does not exist` });
  }

  const result = extractDicomHeaders(filePath, tags);
  if (result.error) {
    return res.status(result.statusCode).json({ error: result.error });
  }

  res.json({ headerValue: result.data });
};

// get DICOM png for file
export const getDicomPng = async (req, res) => {
  const { fileName } = req.params;
  const dicomFilePath = path.join(__dirname, '../uploads', fileName);
  const outputPngPath = path.join(__dirname, '../uploads', `${fileName}.png`);

  if (!fs.existsSync(dicomFilePath)) {
    return res.status(404).json({ error: `File ${fileName} does not exist` });
  }

  try {
    await convertDicomToPngAndSave(dicomFilePath, outputPngPath);

    // Construct URL to access the PNG file
    const pngUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}.png`;
    res.json({ url: pngUrl });
  } catch (error) {
    const { statusCode, error: errorMessage } = error;
    res.status(statusCode).json({ error: errorMessage });
  }
};
