import express, { type NextFunction, type Response, type Request } from 'express';
import patientService from '../services/patientService.ts';
import { type PatientFE, type Patient, newPatientSchema, type NewPatient } from '../types.ts';
import { z } from 'zod';
//import parsePatient from '../services/utils.ts';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleWare = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const router = express.Router();

router.get('/', (_req, res: Response<PatientFE[]>) => {
  const data = patientService.getPatients();
  res.send(data);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  //const checkedPatient = newPatientSchema.parse(req.body);
  const newPatient = patientService.addPatient(req.body);
  res.send(newPatient);
});

router.use(errorMiddleWare);

export default router;