import { Router } from 'express';
import { ConversationController } from '../Controller/ConversationController';

const router = Router();

router.get('/Conversation', ConversationController.getAll);
router.get('/Conversation/:id', ConversationController.getById);
router.post('/Conversation/create', ConversationController.create);
router.get('/Conversation/delete/:id', ConversationController.delete);

export default router;
