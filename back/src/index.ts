import express from 'express';
import cors from "cors";
import analyticsRouter from './router/analyticsRouter';

const app = express();
const port: number = 3000;

app.use(cors({ // somente esses hosts pode fazer request 
  origin: 'http://localhost:5173'
}))

app.use('/api', analyticsRouter);

app.listen(port, () => {
  console.log(`server rodando em http://localhost:${port}`);
});