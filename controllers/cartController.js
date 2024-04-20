import mongoose from "mongoose";
import ShoppingCart from "../models/CartModel.js";
import AppError from "../utils/appError.js";;

export const updateCart = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.params.id

    const incomingItems = data.items.map((item) => ({
      product: new mongoose.Types.ObjectId(item.itemId),
      quantity: item.quantity,
    }));

    let shoppingCart = await ShoppingCart.findOne({ user: userId }).populate({
      path: "items.product",
      model:'Product'
    });;

    if (shoppingCart) {
      shoppingCart.items = shoppingCart.items.filter((existingItem) => {
        const incomingItem = incomingItems.find((item) =>
          item.product.equals(existingItem.product)
        );

        return incomingItem !== undefined;
      });

      incomingItems.forEach((newItem) => {

        const existingItemIndex = shoppingCart.items.findIndex((item) =>
          item.product.equals(newItem.product)
        );

        if (existingItemIndex !== -1) {
          // Update existing item quantity
          shoppingCart.items[existingItemIndex].quantity = newItem.quantity;
        } else {
          // Add new item to cart
          shoppingCart.items.push(newItem);
        }
      });
      await shoppingCart.save();

    } else {
      shoppingCart = await ShoppingCart.create({
        user: userId,
        items: incomingItems,
      });
    }

    // Send the response
    res.status(200).json({
      message: "Shopping cart updated successfully",
      cart: shoppingCart,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError("Error updating the cart", 500));
  }
};

export const getCartItems = async(req,res,next) =>{
console.log(req.params)
    try{
        const id = new mongoose.Types.ObjectId(req.params.id)
        const cart = await ShoppingCart.findOne({user:id});
        if(!cart){
           await ShoppingCart.create({
            user: userId,
            items: [],
          });
        }

        res.status(200).json({
            message:"Successfully got the cart items",
            cart
        })

    }catch(err){
        console.error(err);
        return next(new AppError("Error fetching the cart", 400));
    }
}