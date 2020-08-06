import { Router } from 'express';
import MessageController from '../controllers/broker.controllers';

const router = Router();

router.post('/produce', MessageController.createMessage);
router.patch('/:message_id', MessageController.updateProcessedMessage);
router.get('/consume', MessageController.getMessage);
router.delete('/:message_id', MessageController.deleteMessage);

export default router;
