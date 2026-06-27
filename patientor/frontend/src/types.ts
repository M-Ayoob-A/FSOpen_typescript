export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

//////////////////////////// ENTRY TYPES ////////////////////////////////////


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}


///////////////////// HEALTH CHECK /////////////////////
const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

///////////////////// OCCUPATIONAL HEALTHCARE /////////////////////
interface SickLeaveType {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeaveType;
}

///////////////////// HOSPITAL /////////////////////
interface DischargeType {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: DischargeType;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////// ENTRY TYPES FOR FORMS - NO ID, ALL FIELDS ARE STRINGS /////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Should look to change this into simpler defs - just using the union of the actual types, rather than
// having a draft entries. The only change would be that healthcheckrating should be configured with the
// form, i.e. it should have the healthcheck type   
/*export type DraftHCEntry = Omit<HealthCheckEntry, "id">;

export type DraftHospEntry = Omit<HospitalEntry, "id">;
export type DraftOccupHCEntry = Omit<OccupationalHealthcareEntry, "id">;

export type DraftEntry =
  | DraftHCEntry
  | DraftHospEntry
  | DraftOccupHCEntry;
*/
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type DraftEntry = UnionOmit<Entry, 'id'>;

//////////////////////////// PATIENT DEF //////////////////////////

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;