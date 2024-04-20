import mongoose from "mongoose";

const shoppingCartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

shoppingCartSchema.pre(`findOne`, async function(next) {
  console.log('midleware exec')
  try {
     this.populate({
      path: "items.product",
      model:'Product'
    });
    next();
  } catch (error) {
    next(error);
  }
});

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

export default ShoppingCart;
