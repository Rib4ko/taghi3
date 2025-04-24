import { getOrderById } from '../../../backend/src/controllers/orderController';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const order = await getOrderById({ params: { id } }, res);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
     const orderData = res.locals.order;
    res.status(200).json(orderData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}