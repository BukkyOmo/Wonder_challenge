import { Router } from 'express';
import MessageController from '../controllers/broker.controllers';

const router = Router();

router.post('/', MessageController.createMessage);
router.patch('/:message_id', MessageController.updateMessage);
router.get('/', MessageController.getMessage);
router.delete('/:message_id', MessageController.deleteMessage);

export default router;
