import express from "express"

import {tryOrder,createOrder, getOrders, cancelOrder, getAllOrders, updateOrder} from '../controllers/orderController.js'

const router = express.Router();

router
    .route('/')
    .post(tryOrder)

router
    .route('/create')
    .post(createOrder)

router
    .route('/all')
    .get(getAllOrders)

router
    .route('/cancel/:id')
    .post(cancelOrder)

router
    .route('/:id')
    .get(getOrders)
    .patch(updateOrder)

export default router;