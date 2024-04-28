import express from "express"

import {registerUser,deleteUser,updateUser,getAllUsers, loginUser} from '../controllers/userController.js';

const router = express.Router();

router
    .route('/')
    .get(getAllUsers)
router
    .route('/login')
    .post(loginUser)

router
    .route('/signup')
    .post(registerUser)

router
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

export default router;