import { sendMsg, getMessages } from "../Controller/MessageController";
import { Router } from 'express';

const router = Router();

// Définir les routes POST pour les fonctions sendMsg et getMessages
router.post('/SendMessage', sendMsg);
router.post('/GetMessage', getMessages);

export default router;
