const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const mongoose = require('mongoose');
const getRevenueByCategory = async () => {
    const revenueByCategory = await Order.aggregate([
        {
            $unwind: '$products'
        },
        {
            $lookup: {
                from: 'products',
                localField: 'products',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $unwind: '$productDetails'
        },
        {
            $group: {
                _id: '$productDetails.category',
                totalRevenue: { $sum: '$productDetails.price' }
            }
        }, {
            $group: {
                _id: '$category',
                totalRevenue: { $sum: '$price' }
            }
        },
        {
            $project: {
                _id: 0,
                category: '$_id',
                totalRevenue: 1
            }
        }
    ]);
    return revenueByCategory;
};

const getTopSellingProducts = async () => {
    const topSellingProducts = await Order.aggregate([
        {
            $unwind: '$products'
        },
        {
            $lookup: {
                from: 'products',
                localField: 'products',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $unwind: '$productDetails'
        },
        {
            $group: {
                _id: '$productDetails.title',
                totalRevenue: {
                    $sum: '$productDetails.price'
                }
            }
        },
        {
            $sort: { totalRevenue: -1 }
        },
        {
            $limit: 10
        },
        {
            $project: {
                _id: 0,
                title: '$_id',
                totalRevenue: 1,

            }
        }
    ]);
    return topSellingProducts;
};
const getOrdersByStatus = async () => {

    const ordersByStatus = await Order.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                status: '$_id',
                count: 1
            }
        }
    ]);
    return ordersByStatus;
}

const getNewUsersPerMonth = async () => {
  const newUsersPerMonth = await User.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        newUsers: '$count'
      }
    },
    
        
    ]);
    return newUsersPerMonth;
};

module.exports = {
    getRevenueByCategory,
    getTopSellingProducts,
    getOrdersByStatus,
    getNewUsersPerMonth
};