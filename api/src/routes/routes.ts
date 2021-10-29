import express, { NextFunction, Request, Response } from 'express';
import middleWare from '../controllers/controllers';

export const router = express.Router();
router.get('/say-something', (req, res) => {
        res.send('did the json send?');
        middleWare.saySomething;
    });
router.get('/test', (req, res) => {
    res.send('Hello World!')
});

export default router;