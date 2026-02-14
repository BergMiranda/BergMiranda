import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { fail, ok } from '../utils/http';

const modelMap: Record<string, any> = {
  clients: prisma.client,
  vehicles: prisma.vehicle,
  employees: prisma.employee,
  inventory: prisma.inventoryPart,
  workOrders: prisma.workOrder,
  schedule: prisma.scheduleSlot,
  invoices: prisma.invoice,
  payments: prisma.payment
};

const getModel = (resource: string) => modelMap[resource];

export const list = async (req: Request, res: Response) => {
  const model = getModel(req.params.resource);
  if (!model) return fail(res, 'Resource not found', 404);
  return ok(res, await model.findMany());
};

export const getOne = async (req: Request, res: Response) => {
  const model = getModel(req.params.resource);
  if (!model) return fail(res, 'Resource not found', 404);
  return ok(res, await model.findUnique({ where: { id: req.params.id } }));
};

export const createOne = async (req: Request, res: Response) => {
  const model = getModel(req.params.resource);
  if (!model) return fail(res, 'Resource not found', 404);
  return ok(res, await model.create({ data: req.body }), 201);
};

export const updateOne = async (req: Request, res: Response) => {
  const model = getModel(req.params.resource);
  if (!model) return fail(res, 'Resource not found', 404);
  return ok(res, await model.update({ where: { id: req.params.id }, data: req.body }));
};

export const removeOne = async (req: Request, res: Response) => {
  const model = getModel(req.params.resource);
  if (!model) return fail(res, 'Resource not found', 404);
  await model.delete({ where: { id: req.params.id } });
  return ok(res, { deleted: true });
};
