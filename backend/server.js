import { assertAuthEnv, env } from './src/config/env.js';
import connectDB from './src/config/db.js';
import app from './src/app.js';

assertAuthEnv();
connectDB();

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
