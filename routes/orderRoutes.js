import express from "express"

import {tryOrder,createOrder, getAllOrders, getOrders, deleteOrder, updateOrder} from '../controllers/orderController.js'

const router = express.Router();

router
    .route('/')
    .post(tryOrder)

router
    .route('/create')
    .post(createOrder)

router
    .route('/:id')
    .get(getOrders)
    .delete(deleteOrder)
    .patch(updateOrder)

export default router;