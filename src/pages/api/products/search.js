import { searchProducts } from '../../../../backend/src/controllers/productController';

export default async function handler(req, res) {
  const { q } = req.query;
  try {
    const products = await searchProducts(req, res);
    const productData = res.locals.product;
    res.status(200).json(productData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}