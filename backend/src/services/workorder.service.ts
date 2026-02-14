import { prisma } from '../config/prisma';
import { adjustStockForWorkOrder } from './inventory.service';
import { generateEstimate } from './financial.service';
import { sendEmail, sendSms } from './notification.service';

export const sendEstimateForApproval = async (workOrderId: string) => {
  const estimate = await generateEstimate(workOrderId);
  const wo = await prisma.workOrder.update({ where: { id: workOrderId }, data: { status: 'ESTIMATE_SENT' }, include: { client: true } });
  if (wo.client.email) await sendEmail(wo.client.email, 'Estimate ready', `Estimate total: ${estimate.total}`);
  await sendSms(wo.client.phone, `Estimate ready for work order ${wo.id}. Total: ${estimate.total}`);
  return estimate;
};

export const approveEstimate = async (workOrderId: string, signatureData?: string) => {
  const estimate = await prisma.estimate.update({
    where: { workOrderId },
    data: { approved: true, approvedAt: new Date(), signatureData }
  });
  await prisma.workOrder.update({ where: { id: workOrderId }, data: { status: 'APPROVED', approvedAt: new Date() } });
  return estimate;
};

export const startWork = async (workOrderId: string) => prisma.workOrder.update({ where: { id: workOrderId }, data: { status: 'IN_PROGRESS' } });

export const completeWork = async (workOrderId: string) => {
  await adjustStockForWorkOrder(workOrderId);
  return prisma.workOrder.update({ where: { id: workOrderId }, data: { status: 'COMPLETED', closedAt: new Date() } });
};
