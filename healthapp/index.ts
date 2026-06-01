import express from 'express';
import bmiTools from './bmiCalculator.ts';
import exerciseTools from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!");
});


app.get('/bmi', (req, res) => {  
  if (!req.query.height || !req.query.weight) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const { height, weight } = req.query;

  try {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const hw = bmiTools.argsParser([String(height), String(weight)]);
    const bmi = bmiTools.calculateBmi(hw.height, hw.weight);
    res.json({ weight: hw.weight, height: hw.height, bmi });
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    const exercise_vals = exerciseTools.parseArgs(daily_exercises, target);
    const exercise_res = exerciseTools.calculateExercises(exercise_vals.slice(0, -1), exercise_vals.slice(-1)[0]);
    res.json(exercise_res);
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});