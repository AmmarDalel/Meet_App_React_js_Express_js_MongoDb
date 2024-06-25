import { Router } from 'express';
import { UserController } from '../Controller/UserContoller';

const router = Router();

router.get('/user', UserController.getAll);
router.get('/user/:id', UserController.getById);
router.post('/user/create', UserController.create);
router.post('user/update/:id', UserController.update);
router.get('/userdelete/:id', UserController.delete);


export default router;
