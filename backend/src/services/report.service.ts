import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import { prisma } from '../config/prisma';

export const buildInvoicePdfBuffer = async (invoiceId: string): Promise<Buffer> => {
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId }, include: { workOrder: true, payments: true } });
  if (!invoice) throw new Error('Invoice not found');
  const doc = new PDFDocument();
  const chunks: Buffer[] = [];
  doc.on('data', c => chunks.push(c));
  doc.text(`Invoice ${invoice.number}`);
  doc.text(`Work order: ${invoice.workOrderId}`);
  doc.text(`Total: $${invoice.total}`);
  doc.end();
  return await new Promise(resolve => doc.on('end', () => resolve(Buffer.concat(chunks))));
};

export const buildFinancialExcelBuffer = async (): Promise<Buffer> => {
  const wb = new ExcelJS.Workbook();
  const sheet = wb.addWorksheet('Financials');
  sheet.columns = [
    { header: 'Invoice', key: 'number', width: 20 },
    { header: 'Total', key: 'total', width: 12 },
    { header: 'Issued At', key: 'issuedAt', width: 25 }
  ];
  const invoices = await prisma.invoice.findMany();
  invoices.forEach(i => sheet.addRow({ number: i.number, total: i.total, issuedAt: i.issuedAt.toISOString() }));
  return Buffer.from(await wb.xlsx.writeBuffer());
};
