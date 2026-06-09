import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRouter.ts';
import patientsRouter from './routes/patientsRouter.ts';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  //res.json("pong");
  res.send("pong");
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);


app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});