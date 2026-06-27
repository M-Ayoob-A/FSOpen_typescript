import { z } from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});

export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
}

export type PatientFE = Omit<Patient, "ssn">;
export type Gender = typeof Gender[keyof typeof Gender];

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

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

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

///////////////////// OCCUPATIONAL HEALTHCARE /////////////////////
interface SickLeaveType {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeaveType;
}

///////////////////// HOSPITAL /////////////////////
interface DischargeType {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: DischargeType;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

const BaseEntrySchema = z.object({
  //id: z.string(),
  description: z.string().trim().min(1, { error: "Please submit a valid description" }),
  date: z.iso.date("Please enter a valid date for the entry"),
  specialist: z.string().trim().min(1, { error: "Please enter a valid specialist name" }),
  diagnosisCodes: z.array(z.string()).optional()
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ], { error: "Please enter a valid health check rating" }),
  type: z.literal("HealthCheck")
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  discharge: z.object({
    date: z.iso.date("Please enter a valid discharge date"),
    criteria: z.string().trim().min(1, { error: "Please specify discharge criteria" })
  }),
  type: z.literal("Hospital")
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  sickLeave: z.object({
    startDate: z.iso.date("Please enter a valid start date for the sick leave"),
    endDate: z.iso.date("Please enter a valid end date for the sick leave")
  }).optional(),
  employerName: z.string().trim().min(1, { error: "Please specify the employer name" }),
  type: z.literal("OccupationalHealthcare")
});

export const NewEntrySchemaFull = z.discriminatedUnion("type", [
  HealthCheckEntrySchema, HospitalEntrySchema, OccupationalHealthcareEntrySchema
]);