import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, type Patient } from "../../types";

import { Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import WorkIcon from '@mui/icons-material/Work';
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
  },
});

const SinglePatientPage = () => {

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  
  const { id } = useParams();

  useEffect(() => {
    patientService.getOne(id)
                  .then(retPatient => setPatient(retPatient));
  }, [id]);

  useEffect(() => {
    diagnosisService.getAll()
                  .then(retDiagnoses => setDiagnoses(retDiagnoses));
  }, []);


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

      {
        showNewEntryForm 
          ? <NewEntryForm toggle={() => setShowNewEntryForm(!showNewEntryForm)} patient={patient} setPatient={setPatient} diagnoses={diagnoses} />
          : <Button onClick={() => setShowNewEntryForm(!showNewEntryForm)}>Add New Entry</Button>
      }
    </ThemeProvider>
  </>);
};

export default SinglePatientPage;
