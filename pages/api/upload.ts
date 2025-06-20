import { createRouter } from 'next-connect';
import multer from 'multer';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { promisify } from 'util';

// Create multer instance
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

// Create a wrapper for multer to work with Next.js
const uploadMiddleware = upload.single('file');

// Extend NextApiRequest to include file property
interface MulterRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

// Create router
const router = createRouter<MulterRequest, NextApiResponse>();

// Custom middleware to handle multer
router.use(async (req: MulterRequest, res: NextApiResponse, next) => {
  await new Promise<void>((resolve, reject) => {
    uploadMiddleware(req as any, res as any, (err: any) => {
      if (err) return reject(err);
      resolve();
    });
  });
  next();
});

// POST handler
router.post((req: MulterRequest, res: NextApiResponse) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.status(200).json({ 
    url: `/uploads/${req.file.filename}`,
    message: 'File uploaded successfully' 
  });
});

// Export the handler with error handling
export default router.handler({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    console.error('Upload error:', err);
    res.status(500).json({ 
      error: `Upload failed: ${err.message}` 
    });
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(405).json({ 
      error: `Method '${req.method}' Not Allowed` 
    });
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};