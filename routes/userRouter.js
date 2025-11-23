import express from 'express';

import { saveUser ,getAllUsers ,userLogin } from '../controllers/userController.js'; // userController eke functions tika import karanawa   

const userRouter = express.Router();

userRouter.post('/saveuser', saveUser);
userRouter.get('/getusers', getAllUsers);
userRouter.post('/login', userLogin);

export default userRouter;
