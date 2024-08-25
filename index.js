import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dicomRoutes from './routes/dicomRoutes.js';

const app = express();
const PORT = 3000; // Hardcoded for running locally

app.use('/dicom', dicomRoutes);

// Get the equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
