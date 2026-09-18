import express from 'express';
import db, { connectDatabase } from './config/database.js';
import apiRouter from './routes.js';
const app = express();
const port = Number(process.env.PORT ?? 8000);
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', database: db.readyState === 1 ? 'connected' : 'disconnected' });
});
app.use('/api', apiRouter);
await connectDatabase();
app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
});
