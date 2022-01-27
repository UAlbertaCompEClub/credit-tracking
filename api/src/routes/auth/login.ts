import express, { NextFunction, Request, Response } from 'express';

require('dotenv').config({ path: './src/auth/secret-key.env' });


const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
});


export default router;