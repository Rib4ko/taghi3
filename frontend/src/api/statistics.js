export const getRevenueByCategory = async () => {
  const response = await fetch('/api/statistics/revenue-by-category');
  if (!response.ok) {
    throw new Error('Failed to get revenue by category');
  }
  return await response.json();
};

export const getTopSellingProducts = async () => {
  const response = await fetch('/api/statistics/top-selling-products');
  if (!response.ok) {
    throw new Error('Failed to get top selling products');
  }
  return await response.json();
};

export const getOrdersByStatus = async () => {
  const response = await fetch('/api/statistics/orders-by-status');
  if (!response.ok) {
    throw new Error('Failed to get orders by status');
  }
  return await response.json();
};

export const getNewUsersPerMonth = async () => {
  const response = await fetch('/api/statistics/new-users-per-month');
  if (!response.ok) {
    throw new Error('Failed to get new users per month');
  }
  return await response.json();
};