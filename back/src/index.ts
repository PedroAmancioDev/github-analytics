import express from 'express';
import analyticsRouter from './router/analyticsRouter';

const app = express();
const port: number = 3000;

app.use('/api', analyticsRouter);

app.listen(port, () => {
  console.log(`server rodando em http://localhost:${port}`);
});