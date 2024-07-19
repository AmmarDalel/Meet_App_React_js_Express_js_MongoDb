import { Router } from 'express';
import { CodeSend}  from '../Controller/AuthController';

const router = Router();

router.use(CodeSend);

router.post('/hello',CodeSend );

export default router;