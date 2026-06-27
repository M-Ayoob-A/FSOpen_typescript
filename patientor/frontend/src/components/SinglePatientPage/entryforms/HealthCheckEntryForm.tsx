import { Box, Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, DraftEntry, HealthCheckRating } from "../../../types";
import { Theme, useTheme } from '@mui/material/styles';


const HealthCheckEntryForm = ({ submit, diagnoses } : { submit: (event: DraftEntry) => Promise<void>, diagnoses: Diagnosis[] }) => {

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheck, setHealthCheck] = useState<HealthCheckRating>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const onSubmit = (event : SyntheticEvent) => {
    event.preventDefault();

    const newEntryDetails: DraftEntry = {
      healthCheckRating: healthCheck,
      description: description,
      date: date,
      specialist: specialist,
      type: "HealthCheck",
      diagnosisCodes: diagnosisCodes
    };

    submit(newEntryDetails).then(() => {
      setDate('');
      setDescription('');
      setSpecialist('');
      setDiagnosisCodes([]);
      setHealthCheck(0);
    });
  };

  const turnToHealthCheck = (n: string) : HealthCheckRating => {
    switch (n) {
      case "0":
        return 0;
      case "1":
        return 1;
      case "2":
        return 2;
      case "3":
        return 3;
      default:
        return 0;
    }
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
        id="Date" 
        type="date"
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
        id="Specialist"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        value={healthCheck}
        select
        label="Health Check Rating (0-3)"
        id="HCheck"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setHealthCheck(turnToHealthCheck(target.value))}
      >
        <MenuItem key={0} value={"0"}>0 - Healthy</MenuItem>
        <MenuItem key={1} value={"1"}>1 - Low Risk</MenuItem>
        <MenuItem key={2} value={"2"}>2 - High Risk</MenuItem>
        <MenuItem key={3} value={"3"}>3 - Critical Risk</MenuItem>
      </TextField>

      <FormControl variant="outlined" sx={{ width: 'stretch', margin: '10px auto' }} >
        <InputLabel id="diagnosisCodes" >Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosisCodes"
          multiple
          id="DiagCodes"
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

      <Box sx={{ display: 'flex' }} >
        <Button type="submit" variant="contained" sx={{ margin: '5px auto', width: '150px' }} >Add</Button>
      </Box>
    </form>
    
  </>);
};

export default HealthCheckEntryForm;

/**<TextField 
        value={diagnosisCodes}
        label="Diagnosis Codes (comma-separated)"
        sx={{ width: 'stretch', margin: '10px auto' }}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      /> */