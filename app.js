import express from "express";
import dotenv from "dotenv";
import productRouter from './routes/productRoutes.js'
import errorHandler from "./controllers/errorController.js";
import cors from 'cors';

dotenv.config({ path: '.env' })
const app = express();

app.use(cors({ origin: '*' }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));  


app.use('/api/v1/products', productRouter)

app.use(errorHandler);

export default app;