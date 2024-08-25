import express from 'express';
import multer from '../middlewares/multerConfig.js';
import { uploadDicomFile, getDicomHeader, getDicomPng } from '../controllers/dicomController.js';

const router = express.Router();

// DICOM Upload Endpoint - saves the file locally to the uploads directory
router.post('/upload', multer.single('dicomFile'), uploadDicomFile);

// Get DICOM header by file name and tags
// (The requirements made it seem like its just taking one tag as a query param,
// but I figured it would be more useful to allow multiple tags)
router.get('/header/:fileName', getDicomHeader);

// Get DICOM png by file name
router.get('/png/:fileName', getDicomPng);

export default router;
