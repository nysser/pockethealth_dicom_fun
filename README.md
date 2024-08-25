# 🏥 DICOM to PNG Conversion Service 🚀

Welcome to Nyssa's **DICOM to PNG Conversion Service**! This service allows you to upload DICOM files, extract DICOM header information, and convert DICOM images to PNG format, making them easy to view and share.

## 🎯 Features

- 📤 **Upload DICOM Files**: Upload your DICOM files to the server for processing.
- 📝 **Extract DICOM Header Attributes**: Retrieve specific DICOM header information based on tags.
- 🖼️ **Convert DICOM to PNG**: Convert medical images from DICOM format to PNG format for easy viewing in any browser.

## 🛠️ Getting Started

To run this service, clone the repository and install the necessary dependencies:

```
git clone https://github.com/yourusername/dicom-to-png-service.git
cd dicom-to-png-service
npm install
```

### 🚀 Running the Service
Start the server by running:

```
npm start
```
The server will start on http://localhost:3000.

📚 API Documentation
1. Upload DICOM File

Endpoint: POST /dicom/upload

Description: Upload a DICOM file to the server for processing.

Request:

Body: Form-data with a key dicomFile containing the DICOM file.

Response:

Success: { message: "File uploaded successfully", filename: "uploaded_filename.dcm" }

Error: { error: "No file uploaded" }

Example using curl:
```
curl -F "dicomFile=@/path/to/your/file" http://localhost:3000/dicom/upload
```

2. Get DICOM Header Information

Endpoint: GET /dicom/header/:fileName

Description: Retrieve DICOM header attributes based on specified tags.

Request:

Path Parameter: fileName - Name of the DICOM file uploaded.

Query Parameter: tags - Comma-separated list of DICOM tags (e.g., tags=00100010,0020000D).

Response:

Success: { "headerValue": { "patientsName": "John^Doe", ... } }

Error: { error: "No tags provided" }, { error: "Invalid DICOM tag format" }

Example using curl:

```
curl "http://localhost:3000/dicom/header/yourfile?tags=00100010,0020000D"
```

3. Convert DICOM to PNG and Get Link

Endpoint: GET dicom/png/:fileName

Description: Convert a DICOM file to PNG format and return a URL to access the image.

Request:

Path Parameter: fileName - Name of the DICOM file uploaded.

Response:

Success: { "url": "http://localhost:3000/uploads/yourfile.png" }

Error: { error: "File does not exist" }

Example using curl:
```
curl "http://localhost:3000/dicom/png/yourfilename"
```

Visit the returned URL in your browser to view or download the PNG image! 🌟

### 📂 Project Structure

index.js: Main entry point of the application.

routes/: Contains route definitions for the API endpoints.

controllers/: Houses the logic for handling API requests.

helpers/: Contains helper functions for processing DICOM files.

uploads/: Directory where uploaded files and generated PNGs are stored.
