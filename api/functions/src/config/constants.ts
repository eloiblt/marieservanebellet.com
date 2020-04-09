import * as functions from 'firebase-functions';

let corsFront = '';
if (process.env.FUNCTIONS_EMULATOR) {
  corsFront = 'http://localhost:4200';
} else {
  corsFront = functions.config().env.corsFront;
}

export default corsFront;
export const dataBaseUrl = functions.config().env.db;

export const corsOptions = {
  origin: corsFront,
  optionsSuccessStatus: 200
};