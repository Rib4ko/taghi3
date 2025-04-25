

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const priceFiltered = filtered.filter((product) => {
      const productPrice = product.price;
      return (
        (minPrice === '' || productPrice >= parseFloat(minPrice)) &&
        (maxPrice === '' || productPrice <= parseFloat(maxPrice))
      );
    });

    const categoryFiltered = categoryFilter
      ? priceFiltered.filter(
          (product) => product.category && product.category._id === categoryFilter
        )
      : priceFiltered;

    setFilteredProducts(categoryFiltered);
  }, [products, searchTerm, minPrice, maxPrice, selectedCategory]);

  const handleReset = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setCategoryFilter('');
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-center sm:text-left">Our Products</h1>
      <div className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-full shadow-md focus:outline-none focus:border-blue-500 sm:text-sm"
             value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex mt-4 space-x-4'>
          <input
            type="number"
            placeholder="Min Price"
            className="w-full p-2 border rounded-md mr-2 sm:text-sm"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="w-full p-2 border rounded-md sm:text-sm"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="mb-4 mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
            </label>
            <select
              className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 sm:text-sm mb-4"
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {loading ? (
          <Loading />
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 sm:p-6">
              <Link to={`/product/${product._id}`} className="block">
                <div className="mb-4 sm:mb-6">
                  <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-lg" />
                </div>
                <h2 className="font-bold text-xl text-gray-800 sm:text-2xl">{product.title}</h2>
                <p className="text-gray-600 mt-2 line-clamp-3 sm:mt-3">{product.description}</p>
                <p className="font-bold text-blue-600 mt-2 sm:mt-3">Price: {product.price}€</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;