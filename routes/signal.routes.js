import express from 'express';
import { getSignal, storeSignal } from '../controller/signal.controller.js';


const signalRouter = express.Router();



signalRouter.get('/',storeSignal);
signalRouter.get('/getSignals',getSignal);


export default signalRouter;