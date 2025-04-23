/**
 * Represents a product.
 */
export interface Product {
  /**
   * The unique identifier of the product.
   */
  id: string;
  /**
   * The name of the product.
   */
  name: string;
  /**
   * The description of the product.
   */
  description: string;
  /**
   * The reference of the product.
   */
  reference: string;
  /**
   * The brand of the product.
   */
  brand: string;
  /**
   * The price of the product.
   */
  price: number;
  /**
   * The image URL of the product.
   */
  imageUrl: string;
  /**
   * The category of the product.
   */
  category: string;
}

/**
 * Asynchronously retrieves a list of products.
 * @returns A promise that resolves to an array of Product objects.
 */
export async function getProducts(): Promise<Product[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      id: '1',
      name: 'Engine Oil',
      description: 'High-quality engine oil for optimal performance.',
      reference: 'EO123',
      brand: 'BrandX',
      price: 45.00,
      imageUrl: '/images/engine-oil.jpg',
      category: 'Oils'
    },
    {
      id: '2',
      name: 'Oil Filter',
      description: 'Premium oil filter for maximum engine protection.',
      reference: 'OF456',
      brand: 'BrandY',
      price: 12.50,
      imageUrl: '/images/oil-filter.jpg',
      category: 'Filters'
    }
  ];
}

/**
 * Asynchronously retrieves a product by its ID.
 *
 * @param id The unique identifier of the product to retrieve.
 * @returns A promise that resolves to a Product object, or null if not found.
 */
export async function getProductById(id: string): Promise<Product | null> {
  // TODO: Implement this by calling an API.
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  return product || null;
}
