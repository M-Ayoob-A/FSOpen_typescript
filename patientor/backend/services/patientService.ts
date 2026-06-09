import patientsData from '../data/patients.ts';
import type { PatientFE, NewPatient, Patient } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientFE[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatientDetails = {
    id: uuid(),
    ...patient
  };
  patientsData.push(newPatientDetails);
  return newPatientDetails;
};

export default { getPatients, addPatient };