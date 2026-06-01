interface HeightWeight {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) {
    throw new Error("Please enter a valid height");
  }

  const result = weight / (height**2 * 0.0001);

  if (result < 16) {
    return "Underweight (Severe thinness)";
  } else if (result < 17) {
    return "Underweight (Moderate thinness)";
  } else if (result < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (result < 25) {
    return "Normal range";
  } else if (result < 30) {
    return "Overweight (Pre-obese)";
  } else if (result < 35) {
    return "Obese (Class I)";
  } else if (result < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

const argsParser = (args: string[]): HeightWeight => {
  if (args.length !== 2) throw new Error("Input must be of format: npm run calculateBmi [height] [weight]");
  
  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1])) && Number(args[0]) > 0 && Number(args[1]) > 0) {
    return { height: Number(args[0]), weight: Number(args[1]) };
  } else {
    throw new Error("Invalid height or weight");
  }
};

try {
  const { height, weight } = argsParser(process.argv.slice(2));
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
};

export default { argsParser, calculateBmi };