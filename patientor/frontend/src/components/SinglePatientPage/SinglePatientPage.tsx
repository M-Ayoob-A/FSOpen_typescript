import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, DraftHCEntry, type Patient } from "../../types";

import { Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import WorkIcon from '@mui/icons-material/Work';
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";
import { isAxiosError } from "axios";

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
  },
});

const SinglePatientPage = () => {

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { id } = useParams();

  useEffect(() => {
    patientService.getOne(id)
                  .then(retPatient => setPatient(retPatient));
  }, [id]);

  useEffect(() => {
    diagnosisService.getAll()
                  .then(retDiagnoses => setDiagnoses(retDiagnoses));
  }, []);

  const notify = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg('');
    }, 4000);
  };

  const onAddEntry = async (newEntryDetails: DraftHCEntry) => {
    if (!id) {
      throw new Error;
    }

    try {
      const newEntry = await patientService.addEntry(id, newEntryDetails);
      if (patient) setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        if (typeof e.response?.data.error === "string") notify(e.response?.data.error);
        else notify(e.message);
      }
      else if (e instanceof Error) notify(e.message);
    }
  };

  if (!patient) {
    return <>
      Loading patient data
    </>;
  }

  return (<>
    <ThemeProvider theme={theme} >
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>Gender: {patient.gender}</Typography>
      { patient.dateOfBirth && <Typography>Date of Birth: {patient.dateOfBirth}</Typography> }
      { patient.ssn && <Typography>SSN: {patient.ssn}</Typography> }
      <Typography>Occupation: {patient.occupation}</Typography>

      <Typography variant="h6">entries</Typography>
      {
        patient.entries.map(e => <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />)
      }
      
      <Button onClick={() => setShowNewEntryForm(!showNewEntryForm)}>Create New Entry</Button>
      { showNewEntryForm && <NewEntryForm toggle={() => setShowNewEntryForm(!showNewEntryForm)} onAdd={onAddEntry} err={errorMsg} /> }
    </ThemeProvider>
  </>);
};

export default SinglePatientPage;
