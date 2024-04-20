import express from "express"

import {createOrder, getAllOrders, getOrder, deleteOrder, updateOrder} from '../controllers/authController'

const router = express.Router();

router
    .route('/')
    .get(getAllOrders)
    .post(createOrder)

router
    .route('/:id')
    .get(getOrder)
    .delete(deleteOrder)
    .patch(updateOrder)

export default router;