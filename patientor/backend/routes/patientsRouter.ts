import express, { type NextFunction, type Response, type Request } from 'express';
import patientService from '../services/patientService.ts';
import { type PatientFE, type Patient, newPatientSchema, type NewPatient, 
  type EntryWithoutId, type Entry, NewEntrySchemaFull } from '../types.ts';
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

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchemaFull.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleWare = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    console.log(error.issues);
    res.status(400).send({ error: error.issues[0]?.message });
  } else {
    console.log(error);
    next(error);
  }
};

const router = express.Router();

router.get('/', (_req, res: Response<PatientFE[]>) => {
  const data = patientService.getPatients();
  res.send(data);
});

router.get('/:id', (req: Request, res: Response<Patient>) => {
  const data = patientService.getOnePatient(z.string().parse(req.params.id));
  res.send(data);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const newPatient = patientService.addPatient(req.body);
  res.send(newPatient);
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry>) => {
  const newEntry = patientService.addEntry(req.body, z.string().parse(req.params.id));
  res.send(newEntry);
});

router.use(errorMiddleWare);

export default router;