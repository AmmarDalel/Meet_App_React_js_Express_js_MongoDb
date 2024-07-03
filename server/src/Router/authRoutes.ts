import { Router } from 'express';
import {authenticate}  from '../Controller/AuthController';

const router = Router();

router.use(authenticate)
router.post('/authenticate', authenticate);

export default router;