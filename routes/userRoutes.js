import express from "express"

import {registerUser,deleteUser,updateUser,getAllUsers, loginUser} from '../controllers/userController.js';

const router = express.Router();

router
    .route('/login')
    .post(loginUser)

router
    .route('/signup')
    .post(registerUser)

router
    .route('/')
    .get(getAllUsers)
router
    .route('/:id')
    .delete(deleteUser)
    .patch(updateUser)

export default router;