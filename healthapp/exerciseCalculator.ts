interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const numVert = (hrs: string): number => {
  const numver = Number(hrs);
  if (!isNaN(numver) && numver >= 0 && numver <= 24) return numver;
  else throw new Error("Invalid value entered in list of daily hours");
};

const parseArgv = (args: string[]): number[] => {
  if (args.length < 4) throw new Error("Input must be of form: npm run calculateExercise [target_hours] [daily hours ...]");
  return args.slice(2).map((n) => numVert(n));
};

const checkValidNum = (x: number): boolean => !isNaN(x) && x >= 0 && x <= 24;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseArgs = (exercises: any, target: any): number[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (checkValidNum(Number(target)) && Array.isArray(exercises) && exercises.reduce((final, n) => final && checkValidNum(Number(n)), true)) {
    return exercises.map(n => Number(n)).concat(Number(target));
  } else throw new Error;
};

const calculateExercises = (hours: number[], targetHours: number): Result => {

  const result = {
    periodLength: 0,
    trainingDays: 0,
    success: true,
    rating: 0,
    ratingDescription: "",
    target: targetHours,
    average: 0
  };

  result.periodLength = hours.length;
  result.trainingDays = hours.filter(v => v !== 0).length;
  result.average = hours.reduce((sum, cur) => sum + cur, 0) / hours.length;
  result.success = result.average >= targetHours;
  result.rating = hours.reduce((acc, cur) => {
    const addval = cur >= targetHours ? 1 : 0;
    return acc + addval;
  }, 0) * 3 / result.periodLength;
  if (result.rating < 1) {
    result.ratingDescription = "Needs work";
  } else if (result.rating < 2) {
    result.ratingDescription = "You can do better!";
  } else {
    result.ratingDescription = "Nice work";
  }

  return result;
};

try {
  if (process.argv[1] === import.meta.filename) {
    const hrs = parseArgv(process.argv.slice(2));
    console.log(calculateExercises(hrs.slice(1), hrs[0]));
  }
  
  
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

export default { parseArgs, calculateExercises };