export const createReview = async (reviewData) => {
    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
        throw new Error('Failed to create review');
    }
    return await response.json();
};

export const getReviewsByProductId = async (productId) => {
    const response = await fetch(`/api/reviews/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to get reviews');
    }
    return await response.json();
};