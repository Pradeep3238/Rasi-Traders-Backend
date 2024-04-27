import express from "express"

import {tryOrder,createOrder, getOrders, cancelOrder} from '../controllers/orderController.js'

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

router
    .route('/cancel/:id')
    .post(cancelOrder)

export default router;