import { prisma } from '../config/prisma';

export const adjustStockForWorkOrder = async (workOrderId: string) => {
  const items = await prisma.workOrderItem.findMany({ where: { workOrderId, isPart: true, partId: { not: null } } });
  for (const item of items) {
    await prisma.inventoryPart.update({ where: { id: item.partId! }, data: { stockQty: { decrement: item.quantity } } });
  }
};

export const getReorderAlerts = async () => {
  const parts = await prisma.inventoryPart.findMany();
  return parts.filter(p => p.stockQty <= p.reorderLevel);
};
