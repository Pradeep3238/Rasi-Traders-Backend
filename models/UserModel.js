import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    unique:true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
    default:null
  },
  address: {
    street: String,
    city: String,
    zip: String,
  },
  cart: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    default: []
  },
  orders: {
    type:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      }],
    default:[]
  }

});

const User = mongoose.model("User", userSchema);

export default User;
