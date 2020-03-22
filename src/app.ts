import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import apiRouter from './routers/api.router';

const app = express();

dotenv.config();
const { env } = process;

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);

mongoose.connect(
  `mongodb+srv://${env.MONGO_ATLAS_USER}:${env.MONGO_ATLAS_PASSWORD}@${env.MONGO_ATLAS_URL}/${env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => {
    console.log('Connected to database');
    app.listen(env.PORT, () => console.log(`Server listening on port ${env.PORT}`));
  })
  .catch((err) => {
    console.error('Error connecting to database');
    console.error(err);
  });
