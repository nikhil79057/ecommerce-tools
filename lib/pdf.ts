import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoicePDF = async (
  invoiceData: {
    invoiceNumber: string;
    date: Date;
    dueDate: Date;
    customerName: string;
    customerEmail: string;
    items: Array<{
      description: string;
      quantity: number;
      price: number;
      total: number;
    }>;
    subtotal: number;
    tax: number;
    total: number;
  }
): Promise<string> => {
  const doc = new PDFDocument();
  const fileName = `invoice-${invoiceData.invoiceNumber}.pdf`;
  const filePath = path.join(process.cwd(), 'public', 'invoices', fileName);

  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  doc.pipe(fs.createWriteStream(filePath));

  // Header
  doc.fontSize(20).text('INVOICE', 50, 50);
  doc.fontSize(10).text('SaaS Tools Platform', 50, 70);
  
  // Invoice details
  doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 400, 50);
  doc.text(`Date: ${invoiceData.date.toLocaleDateString()}`, 400, 65);
  doc.text(`Due Date: ${invoiceData.dueDate.toLocaleDateString()}`, 400, 80);

  // Customer details
  doc.fontSize(12).text('Bill To:', 50, 120);
  doc.fontSize(10).text(invoiceData.customerName, 50, 140);
  doc.text(invoiceData.customerEmail, 50, 155);

  // Items table
  let yPos = 200;
  doc.fontSize(12).text('Description', 50, yPos);
  doc.text('Qty', 300, yPos);
  doc.text('Price', 350, yPos);
  doc.text('Total', 450, yPos);
  
  yPos += 20;
  doc.moveTo(50, yPos).lineTo(500, yPos).stroke();
  yPos += 10;

  invoiceData.items.forEach((item) => {
    doc.fontSize(10);
    doc.text(item.description, 50, yPos);
    doc.text(item.quantity.toString(), 300, yPos);
    doc.text(`₹${item.price.toFixed(2)}`, 350, yPos);
    doc.text(`₹${item.total.toFixed(2)}`, 450, yPos);
    yPos += 20;
  });

  // Totals
  yPos += 20;
  doc.moveTo(300, yPos).lineTo(500, yPos).stroke();
  yPos += 10;
  
  doc.text(`Subtotal: ₹${invoiceData.subtotal.toFixed(2)}`, 350, yPos);
  yPos += 15;
  doc.text(`Tax: ₹${invoiceData.tax.toFixed(2)}`, 350, yPos);
  yPos += 15;
  doc.fontSize(12).text(`Total: ₹${invoiceData.total.toFixed(2)}`, 350, yPos);

  // Footer
  doc.fontSize(8).text('Thank you for your business!', 50, 700);

  doc.end();

  return fileName;
};