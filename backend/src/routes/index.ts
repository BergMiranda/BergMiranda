import { Router } from 'express';
import { loginHandler } from '../controllers/auth.controller';
import { begin, finish, invoice, sendEstimate, approve } from '../controllers/workflow.controller';
import { createOne, getOne, list, removeOne, updateOne } from '../controllers/crud.controller';
import { authorize, requireAuth } from '../middleware/auth';
import { financialExcel, invoicePdf } from '../controllers/report.controller';

const router = Router();

router.post('/auth/login', loginHandler);
router.use(requireAuth);

router.post('/work-orders/:id/send-estimate', authorize('ADMIN', 'MANAGER'), sendEstimate);
router.post('/work-orders/:id/approve', authorize('ADMIN', 'MANAGER'), approve);
router.post('/work-orders/:id/start', authorize('ADMIN', 'MANAGER', 'MECHANIC'), begin);
router.post('/work-orders/:id/complete', authorize('ADMIN', 'MANAGER', 'MECHANIC'), finish);
router.post('/work-orders/:id/invoice', authorize('ADMIN', 'MANAGER'), invoice);
router.get('/reports/invoices/:id/pdf', authorize('ADMIN', 'MANAGER'), invoicePdf);
router.get('/reports/financials.xlsx', authorize('ADMIN', 'MANAGER'), financialExcel);

router.get('/:resource', list);
router.get('/:resource/:id', getOne);
router.post('/:resource', authorize('ADMIN', 'MANAGER'), createOne);
router.put('/:resource/:id', authorize('ADMIN', 'MANAGER'), updateOne);
router.delete('/:resource/:id', authorize('ADMIN'), removeOne);

export default router;
