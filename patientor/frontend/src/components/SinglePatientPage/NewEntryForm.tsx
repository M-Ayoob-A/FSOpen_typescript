import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { DraftHCEntry } from "../../types";
//import NumberField from "./NumberField";

const NewEntryForm =  ({ toggle, onAdd, err } : { toggle: () => void, onAdd: (newEntryDetails: DraftHCEntry) => void, err: string }) => {

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheck, setHealthCheck] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const onSubmit = (event : SyntheticEvent) => {
    event.preventDefault();
    onAdd({
      type: "HealthCheck",
      healthCheckRating: healthCheck,
      description: description,
      date: date,
      specialist: specialist
    });
  };
  
  return (<Box sx={{ border: '2px dashed black', padding: '17px 17px 17px 17px' }}>
    <Typography variant="h6">New HealthCheck Entry</Typography>
    { err && <Alert severity="error">Invalid Input: {err}</Alert> }
    <form onSubmit={onSubmit}>
      <TextField 
        value={date}
        label="Date"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField 
        value={description}
        label="Description"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField 
        value={specialist}
        label="Specialist"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField 
        value={healthCheck}
        label="Health Check Rating (0-3)"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setHealthCheck(target.value)}
      />
      
      <TextField 
        value={diagnosisCodes}
        label="Diagnosis Codes (comma-separated)"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      />

      <Box sx={{ display: 'flex', flexDirection: 'row' }} >
        <Button type="submit" variant="contained" >ADD</Button>
        <Button onClick={toggle}>CANCEL</Button>
      </Box>
    </form>
    
  </Box>);
};

export default NewEntryForm;

/**
 * base ui number field
 * <NumberField 
        label="Health Check Rating (0-3)"
        min={0} 
        max={4}
        value={healthCheck}
        onValueChange={(value) => setHealthCheck(value ? value : 0)}
      />
 */