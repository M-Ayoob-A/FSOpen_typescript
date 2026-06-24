import { Box, Typography } from "@mui/material";
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Entry, Diagnosis } from "../../types";
import { assertNever } from "../utils";

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


const HealthCheckEntryDetails = ({ e, diagnoses }: { e: HealthCheckEntry, diagnoses: Diagnosis[] }) => {
  let healthRating = '❤️❤️❤️❤️';

  if (e.healthCheckRating === 1) {
    healthRating = '❤️❤️❤️🩶';
  } else if (e.healthCheckRating === 2) {
    healthRating = '❤️❤️🩶🩶';
  } else if (e.healthCheckRating === 3) {
    healthRating = '❤️🩶🩶🩶';
  }
  return <Box sx={{ outline: '2px solid black', fontFamily: 'Roboto' }}>
    <Typography>
      {e.date} &nbsp;
      <MedicalServicesIcon fontSize="inherit" />
    </Typography>
    <Typography sx={{ fontStyle: 'italic' }} >{e.description}</Typography>
    <Typography>Health Rating: {healthRating}</Typography>
    <Typography>Diagnosis by {e.specialist}</Typography>
    {
      e.diagnosisCodes &&
      <div>
        <span style={{ fontWeight: 'bold' }}>Diagnoses:</span>
        <ul>
          <Typography>
            {e.diagnosisCodes.map(d => {
              const fullDiagnosis = diagnoses.find(dObject => dObject.code === d);
              return <li key={d} >{d} {fullDiagnosis ? fullDiagnosis.name : "Description unavailable"}</li>;
            })}
          </Typography>
        </ul>
      </div>
    }
  </Box>;
};

const HospitalEntryDetails = ({ e, diagnoses }: { e: HospitalEntry, diagnoses: Diagnosis[] }) => {
  return <Box sx={{ outline: '2px solid black', fontFamily: 'Roboto' }}>
    <Box>
      <Typography>
        {e.date} &nbsp;
        <LocalHospitalIcon fontSize="inherit" /> &nbsp;
      </Typography>
      {
        e.discharge &&
        <>
          <Typography>
            Discharge Date: {e.discharge.date} (Criteria: {e.discharge.criteria})
          </Typography>
        </>
      }
    </Box>
    <Typography sx={{ fontStyle: 'italic' }} >{e.description}</Typography>
    {
      e.diagnosisCodes &&
      <div>
        <span style={{ fontWeight: 'bold' }}>Diagnoses:</span>
        <ul>
          <Typography>
            {e.diagnosisCodes.map(d => {
              const fullDiagnosis = diagnoses.find(dObject => dObject.code === d);
              return <li key={d} >{d} {fullDiagnosis ? fullDiagnosis.name : "Description unavailable"}</li>;
            })}
          </Typography>
        </ul>
      </div>
    }
  </Box>;
};

const OccupationalHealthEntryDetails = ({ e, diagnoses }: { e: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => {
  return <Box sx={{ outline: '2px solid black', fontFamily: 'Roboto' }}>
    <Box>
      <Typography>
        {e.date} &nbsp; <WorkIcon fontSize="inherit" />
      </Typography>      
      <div>
        <span style={{ fontWeight: 'bold' }} >{e.employerName}</span> 
        {e.sickLeave && <> - Sick Leave: {e.sickLeave.startDate} to {e.sickLeave.endDate}</>}
      </div>
    </Box>
    <Typography sx={{ fontStyle: 'italic' }} >{e.description}</Typography>
    {
      e.diagnosisCodes &&
      <div>
        <span style={{ fontWeight: 'bold' }}>Diagnoses:</span>
        <ul>
          <Typography>
            {e.diagnosisCodes.map(d => {
              const fullDiagnosis = diagnoses.find(dObject => dObject.code === d);
              return <li key={d} >{d} {fullDiagnosis ? fullDiagnosis.name : "Description unavailable"}</li>;
            })}
          </Typography>
        </ul>
      </div>
    }
  </Box>;
};


const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails e={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <HospitalEntryDetails e={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthEntryDetails e={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
