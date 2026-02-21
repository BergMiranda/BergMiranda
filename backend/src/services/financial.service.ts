import { prisma } from '../config/prisma';

const TAX_RATE = 0.08;

export const computeTotals = (itemTotal: number, laborHours: number, laborRate: number) => {
  const labor = laborHours * laborRate;
  const subtotal = Number((itemTotal + labor).toFixed(2));
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  return { subtotal, tax, total };
};

export const calculateWorkOrderTotals = async (workOrderId: string) => {
  const wo = await prisma.workOrder.findUnique({ where: { id: workOrderId }, include: { items: true } });
  if (!wo) throw new Error('Work order not found');
  const itemTotal = wo.items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);
  return computeTotals(itemTotal, wo.laborHours, wo.laborRate);
};

export const generateEstimate = async (workOrderId: string) => {
  const totals = await calculateWorkOrderTotals(workOrderId);
  return prisma.estimate.upsert({ where: { workOrderId }, create: { workOrderId, ...totals }, update: totals });
};

export const generateInvoice = async (workOrderId: string) => {
  const totals = await calculateWorkOrderTotals(workOrderId);
  return prisma.invoice.create({ data: { workOrderId, number: `INV-${Date.now()}`, ...totals } });
};
