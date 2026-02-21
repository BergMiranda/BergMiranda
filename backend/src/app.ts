import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

export const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api/v1', router);
