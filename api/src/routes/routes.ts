import express, { NextFunction, Request, Response } from 'express';
import middleWare from '../controllers/controllers';

export const router = express.Router();



// GET REQUESTS
// router.get('/say-something', (req, res) => {
//         res.send('did the json send?');
//         middleWare.saySomething;
//     });

router.get('/test', (req: Request, res: Response) => {
    res.send('Hello World!')
});

router.get('/get-users', (req: Request, res: Response) => {
    res.send('Hello World!')
});

router.get('/transactions', (req: Request, res: Response) => {
    res.send('Hello World!')
});

router.get('/balances', (req: Request, res: Response) => {
    res.send('Hello World!')
});

router.get('/user', (req: Request, res: Response) => {
    res.send('Hello World!')
});

router.get('/club-balance', (req: Request, res: Response) => {
    res.send('Hello World!')
});


// POST REQUESTS
router.post('/add-user', (req: Request, res: Response) => {
    res.send('Hello World!')
});

router.post('/transaction', (req: Request, res: Response) => {
    res.send('Hello World!');
});

router.post('/login', (req: Request, res: Response) => {
    res.send('Hello World!');
});

export default router;