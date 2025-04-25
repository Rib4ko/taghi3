export const createProduct = async (productData) => {
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    if (productData.image) {
        formData.append('image', productData.image);
    }

    const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        throw new Error('Failed to create product');
    }
    return await response.json();
};

export const updateProduct = async (id, productData) => {
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    if (productData.image) {
        formData.append('image', productData.image);
    }

    const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: formData,
    });
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    return await response.json();
};