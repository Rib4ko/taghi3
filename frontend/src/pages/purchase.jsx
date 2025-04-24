jsx
import React, { useState } from 'react';
import generatePurchaseOrderPDF from '../lib/pdf-generator';

const PurchasePage = () => {
  const [message, setMessage] = useState('');

  const handlePurchase = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/orders/1');
      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }
      const order = await response.json();
      generatePurchaseOrderPDF(order);
      setMessage('Purchase Done, PDF generated.');
    } catch (error) {
      console.error('Error during purchase:', error);
      setMessage('Error during purchase.');
    }
  };

  return (
    <div>
      <button onClick={handlePurchase}>Purchase</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PurchasePage;