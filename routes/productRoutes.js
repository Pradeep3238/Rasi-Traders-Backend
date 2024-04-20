import express from "express"

import { getAllProducts,getProduct, addProduct, deleteProduct, updateProduct } from "../controllers/productController.js";
const router = express.Router();



router
    .route('/')
    .get(getAllProducts)
    .post(addProduct)

router
    .route('/:id')
    .get(getProduct)
    .delete(deleteProduct)
    .patch(updateProduct)

export default router;