import axios from "axios";
import { Patient, PatientFormValues, Entry, DraftHCEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (id: string | undefined) => {
  if (!id) throw new Error;
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (id: string, object: DraftHCEntry) => {
  
  const dataToSend = {
    ...object, 
    healthCheckRating: Number(object.healthCheckRating),
    diagnosisCodes: object.diagnosisCodes?.replace(/\s/g, '').split(','),
    type: "HealthCheck"
  };
  
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    dataToSend
  );

  return data;
};

export default {
  getAll, create, getOne, addEntry
};

