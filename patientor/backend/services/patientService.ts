import patientsData from '../data/patients.ts';
import type { PatientFE, NewPatient, Patient, Entry, EntryWithoutId } from '../types.ts';
import { v1 as uuid } from 'uuid';

let patients = patientsData;

const getPatients = (): PatientFE[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const getOnePatient = (id: string): Patient => {
  const foundPatient = patients.find(p => p.id === id);
  if (!foundPatient) throw new Error;
  return foundPatient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatientDetails = {
    id: uuid(),
    entries: [],
    ...patient
  };
  patients.push(newPatientDetails);
  return newPatientDetails;
};

const addEntry = (newEntry: EntryWithoutId, patientId: string): Entry => {
  const newEntryDetails = {
    id: uuid(),
    ...newEntry
  };
  patients = patientsData.map(p => {
    return p.id !== patientId ? p : { ...p, entries: p.entries.concat(newEntryDetails) }; 
  });
  return newEntryDetails;
};

export default { getPatients, getOnePatient, addPatient, addEntry };