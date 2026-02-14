import { Request, Response } from 'express';
import { buildFinancialExcelBuffer, buildInvoicePdfBuffer } from '../services/report.service';

export const invoicePdf = async (req: Request, res: Response) => {
  const buff = await buildInvoicePdfBuffer(req.params.id);
  res.setHeader('Content-Type', 'application/pdf');
  res.send(buff);
};

export const financialExcel = async (_: Request, res: Response) => {
  const buff = await buildFinancialExcelBuffer();
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buff);
};
