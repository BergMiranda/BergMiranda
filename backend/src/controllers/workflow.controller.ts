import { Request, Response } from 'express';
import { ok } from '../utils/http';
import { approveEstimate, completeWork, sendEstimateForApproval, startWork } from '../services/workorder.service';
import { generateInvoice } from '../services/financial.service';

export const sendEstimate = async (req: Request, res: Response) => ok(res, await sendEstimateForApproval(req.params.id));
export const approve = async (req: Request, res: Response) => ok(res, await approveEstimate(req.params.id, req.body.signatureData));
export const begin = async (req: Request, res: Response) => ok(res, await startWork(req.params.id));
export const finish = async (req: Request, res: Response) => ok(res, await completeWork(req.params.id));
export const invoice = async (req: Request, res: Response) => ok(res, await generateInvoice(req.params.id));
