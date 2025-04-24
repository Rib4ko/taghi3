import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const generatePurchaseOrderPDF = (order) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text('Purchase Order', 10, 20);

  // Order Details
  doc.setFontSize(12);
  doc.text(`Order ID: ${order.id}`, 10, 40);
  doc.text(`Date: ${order.date}`, 10, 50);
  doc.text(`Customer Name: ${order.customerName}`, 10, 60);

  // Product Table
  const productData = order.products.map((product, index) => [
    product,
    order.quantities[index],
  ]);
  doc.autoTable({
    headStyles: { fillColor: [41, 128, 185] },
    head: [['Product Name', 'Quantity']],
    body: productData,
    startY: 70,
  });

  // Total
  doc.text(`Total: ${order.total}`, 10, doc.autoTable.previous.finalY + 10);

  // Save the PDF
  doc.save(`order-${order.id}.pdf`);
};

export default generatePurchaseOrderPDF;