export const TAG_REGEX = /^[0-9a-zA-Z]{8}$/; // 8 alphanumerical characters

// this is an incomplete list of DICOM tags, as the full list was quite extensive
// this is just for demonstrative purposes
export const DICOM_TAGS = {
  "00100010": {
    "vr": "PN",
    "name": "patientsName"
  },
  "00100020": {
    "vr": "LO",
    "name": "patientId"
  },
  "00100030": {
    "vr": "DA",
    "name": "patientsBirthDate"
  },
  "00100040": {
    "vr": "CS",
    "name": "patientsSex"
  },
  "00081030": {
    "vr": "LO",
    "name": "studyDescription"
  },
  "00181030": {
    "vr": "LO",
    "name": "protocolName"
  },
  "00080050": {
    "vr": "SH",
    "name": "accessionNumber"
  },
  "00200010": {
    "vr": "SH",
    "name": "studyId"
  },
  "00080020": {
    "vr": "DA",
    "name": "studyDate"
  },
  "00080030": {
    "vr": "TM",
    "name": "studyTime"
  },
  "0008103E": {
    "vr": "LO",
    "name": "seriesDescription"
  },
  "00200011": {
    "vr": "IS",
    "name": "seriesNumber"
  },
  "00080060": {
    "vr": "CS",
    "name": "modality"
  },
  "00180015": {
    "vr": "CS",
    "name": "bodyPart"
  },
  "00080021": {
    "vr": "DA",
    "name": "seriesDate"
  },
  "00080031": {
    "vr": "TM",
    "name": "seriesTime"
  },
  "00200013": {
    "vr": "IS",
    "name": "instanceNumber"
  },
  "00200012": {
    "vr": "IS",
    "name": "acquisitionNumber"
  },
  "00080022": {
    "vr": "DA",
    "name": "acquisitionDate"
  },
  "00080032": {
    "vr": "TM",
    "name": "acquisitionTime"
  },
  "00080023": {
    "vr": "DA",
    "name": "contentDate"
  },
  "00080033": {
    "vr": "TM",
    "name": "contentTime"
  },
  "00280010": {
    "vr": "US",
    "name": "rows",
    "isDicomUint": true
  },
  "00280011": {
    "vr": "US",
    "name": "columns",
    "isDicomUint": true
  },
  "00280004": {
    "vr": "CS",
    "name": "photometricInterpretation"
  },
  "00080008": {
    "vr": "CS",
    "name": "imageType"
  },
  "00280100": {
    "vr": "US",
    "name": "bitsAllocated",
    "isDicomUint": true
  },
  "00280101": {
    "vr": "US",
    "name": "bitsStored",
    "isDicomUint": true
  },
  "00280102": {
    "vr": "US",
    "name": "highBit",
    "isDicomUint": true
  },
  "00280103": {
    "vr": "US",
    "name": "pixelRepresentation",
    "isDicomUint": true
  },
  "00281053": {
    "vr": "DS",
    "name": "rescaleSlope"
  },
  "00281052": {
    "vr": "DS",
    "name": "rescaleIntercept"
  },
  "00200032": {
    "vr": "DS",
    "name": "imagePositionPatient"
  },
  "00200037": {
    "vr": "DS",
    "name": "imageOrientationPatient"
  },
  "00280030": {
    "vr": "DS",
    "name": "pixelSpacing"
  },
  "00280002": {
    "vr": "US",
    "name": "samplesPerPixel",
    "isDicomUint": true
  },
  "00080070": {
    "vr": "LO",
    "name": "manufacturer"
  },
  "00081090": {
    "vr": "LO",
    "name": "model"
  },
  "00081010": {
    "vr": "SH",
    "name": "stationName"
  },
  "00020016": {
    "vr": "AE",
    "name": "aeTitle"
  },
  "00080080": {
    "vr": "LO",
    "name": "institutionName"
  },
  "00181020": {
    "vr": "LO",
    "name": "softwareVersion"
  },
  "00020013": {
    "vr": "SH",
    "name": "implementationVersionName"
  },
  "0020000D": {
    "vr": "UI",
    "name": "studyInstanceUid"
  },
  "0020000E": {
    "vr": "UI",
    "name": "seriesInstanceUid"
  },
  "00080018": {
    "vr": "UI",
    "name": "sopInstanceUid"
  },
  "00080016": {
    "vr": "UI",
    "name": "sopClassUid"
  },
  "00020010": {
    "vr": "UI",
    "name": "transferSyntaxUid"
  },
  "00200052": {
    "vr": "UI",
    "name": "frameOfReferenceUid"
  }
};
