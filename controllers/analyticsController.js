import Order from '../models/OrderModel.js';
import User from '../models/UserModel.js';
import Feedback from '../models/FeedbackModel.js';
import Product from '../models/ProductModel.js';


export const ordersCount= async (req, res, next) => {
  try {
    const count = await Order.countDocuments();
    res.status(200).json({
      status: 'success',
      count,
    });
  } catch (error) {
    next(error);
  }
};

// Get total number of users
export const customersCount = async (req, res, next) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({
      status: 'success',
      count,
    });
  } catch (error) {
    next(error);
  }
};

// Get total number of feedback entries
export const feedbacksCount =  async (req, res, next) => {
  try {
    const count = await Feedback.countDocuments();
    res.status(200).json({
      status: 'success',
      count,
    });
  } catch (error) {
    next(error);
  }
};

export const productsCount =  async (req, res, next) => {
    try {
      const count = await Product.countDocuments();
      res.status(200).json({
        status: 'success',
        count,
      });
    } catch (error) {
      next(error);
    }
  };
  
  

export const ordersPerDay= async (req, res, next) => {
    try {
      const ordersPerDay = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
  
      res.status(200).json({
        status: 'success',
        ordersPerDay
      });
    } catch (error) {
      next(error);
    }
  };