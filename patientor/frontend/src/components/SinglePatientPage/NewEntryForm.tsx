import { Alert, Box, Button, InputLabel, Typography, MenuItem, Select, FormControl } from "@mui/material";
import { useState } from "react";
import { Patient, DraftEntry, Diagnosis } from "../../types";
import { isAxiosError } from "axios";
import patientService from "../../services/patients";
import HealthCheckEntryForm from "./entryforms/HealthCheckEntryForm";
import HospitalEntryForm from "./entryforms/HospitalEntryForm";
import OccupationalHealthcareForm from "./entryforms/OccupationalHealthcareForm";


const NewEntryForm =  ({ toggle, patient, setPatient, diagnoses } : { toggle: () => void, patient: Patient, setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>, diagnoses: Diagnosis[] }) => {

  const [errorMsg, setErrorMsg] = useState('');
  const [entryType, setEntryType] = useState('HealthCheck');

  const notify = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg('');
    }, 4000);
  };

  const onSubmit = async (newEntryDetails: DraftEntry) => {
    try {
      const newEntry = await patientService.addEntry(patient.id, newEntryDetails);
      if (patient) setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
    } catch (e: unknown) {
      if (isAxiosError(e) && typeof e.response?.data.error === "string") {
        notify(e.response?.data.error);
        //else notify(e.message);
      }
      else if (e instanceof Error) notify(e.message);

      throw new Error;
    }
  };

  const renderEntryForm = () => {
    switch (entryType) {
      case "HealthCheck":
        return <HealthCheckEntryForm submit={onSubmit} diagnoses={diagnoses} /> ;
      case "Hospital":
        return <HospitalEntryForm submit={onSubmit} diagnoses={diagnoses}/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareForm submit={onSubmit} diagnoses={diagnoses}/>;
    }
  };
  
  return (<Box sx={{ border: '2px dashed black', padding: '17px 17px 17px 17px', marginBottom: '20vh' }}>
    <Typography variant="h6">New Entry</Typography>
    { errorMsg && <Alert severity="error">Invalid Input: {errorMsg}</Alert> }
    <FormControl variant="outlined" sx={{ width: 'stretch', margin: '10px auto' }} >
      <InputLabel id="typeSelect">Entry Type</InputLabel>
      <Select
        labelId="typeSelect"
        value={entryType}
        onChange={({ target }) => setEntryType(target.value)}
        sx={{ width: 'stretch', margin: '10px auto' }}
      >
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
      </Select>
    </FormControl>
    {renderEntryForm()}
    <Box sx={{ display: 'flex' }} >
      <Button variant="contained" color="error" sx={{ margin: '5px auto', width: '150px' }} onClick={toggle} >Cancel</Button>
    </Box>
  </Box>);
};

export default NewEntryForm;
