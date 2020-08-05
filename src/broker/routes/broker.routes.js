import { Router } from "express";
import MessageController from '../controllers/broker'

const router = Router();
router.post('/message', MessageController.createMessage);

export default router;
