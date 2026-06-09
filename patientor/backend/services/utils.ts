import { type NewPatient, Gender } from "../types.ts";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (text: string): text is Gender => {
  return (Object.values(Gender) as string[]).includes(text);
};

const parseStringField = (field: unknown): string => {
  if (!isString(field)) {
    throw new Error("Field is missing or has incorrect format");
  }

  return field;
};

const parseGender = (inp: unknown): Gender => {
  if (!isString(inp) || !isGender(inp)) {
    throw new Error("Gender has incorrect format");
  }

  return inp;
};

const parsePatient = (input: unknown): NewPatient => {
  if (!input || typeof input !== 'object') {
    throw new Error("Incorrect or missing data");
  }

  if ('name' in input && 'dateOfBirth' in input && 'ssn' in input && 'gender' in input && 'occupation' in input) {
    return {
      name: parseStringField(input.name),
      dateOfBirth: parseStringField(input.dateOfBirth),
      ssn: parseStringField(input.ssn),
      gender: parseGender(input.gender),
      occupation: parseStringField(input.occupation)
    };
  };
  throw new Error;
};

export default parsePatient;