import { Box, Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Theme, useTheme } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, DraftEntry } from "../../../types";


const HospitalEntryForm = ({ submit, diagnoses } : { submit: (event: DraftEntry) => Promise<void>, diagnoses: Diagnosis[] }) => {

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const onSubmit = (event : SyntheticEvent) => {
    event.preventDefault();

    const newEntryDetails: DraftEntry = {
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCodes,
      type: "Hospital",
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      },
    };

    submit(newEntryDetails).then(() => {
      setDate('');
      setDescription('');
      setSpecialist('');
      setDiagnosisCodes([]);
      setDischargeCriteria('');
      setDischargeDate('');
    });
  };

  // Following three definitions taken from MUI docs: https://mui.com/material-ui/react-select/#multiple-select
    const getStyles = (code: string, theme: Theme) => {
      return {
        fontWeight: diagnosisCodes.includes(code)
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightRegular,
      };
    };
  
    const theme = useTheme();
  
    const MenuProps = {
      slotProps: {
        paper: {
          style: {
            maxHeight: '240px',
          },
        },
      },
    };

  return (<>
    <form onSubmit={onSubmit}>
      <TextField 
        label="Date"
        type="date"
        id="Date"
        value={date}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField 
        value={description}
        label="Description"
        id="Description"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField 
        value={specialist}
        label="Specialist"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      
      <FormControl variant="outlined" sx={{ width: 'stretch', margin: '10px auto' }} >
        <InputLabel id="diagnosisCodes" >Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosisCodes"
          multiple
          label="Diagnosis Codes"
          sx={{ width: 'stretch', margin: '10px auto' }}
          value={diagnosisCodes}
          onChange={({ target: { value } }) => setDiagnosisCodes(typeof value === "string" ? value.split(',') : value)}
          input={<OutlinedInput id="select-multiple-chip" label="Diagnosis Codes" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem
              key={diagnosis.code}
              value={diagnosis.code}
              style={getStyles(diagnosis.code, theme)}
            >
              {`${diagnosis.code} - ${diagnosis.name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField 
        label="Discharge Date"
        type="date"
        value={dischargeDate}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      
      <TextField 
        value={dischargeCriteria}
        label="Discharge Criteria"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
      
      <Box sx={{ display: 'flex' }} >
        <Button type="submit" variant="contained" sx={{ margin: '5px auto', width: '150px' }} >Add</Button>
      </Box>
    </form>
    
  </>);
};

export default HospitalEntryForm;

// , flexDirection: 'row'