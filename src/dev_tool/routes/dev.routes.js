import { Router } from 'express';
import DevController from '../controller/dev.controllers';

const router = Router();

router.get('/messages', DevController.getAllMessages);
router.get('/messages/status', DevController.getMessagesByStatus);
router.get('/messages/count', DevController.getCountOfMessages);

export default router;