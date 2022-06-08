import { config } from 'dotenv';
import populateEnv from 'populate-env';
config();
export let env = {
    DB_NAME: '',
    DB_USER: '',
    DB_PASSWORD: '',
    SESSION_SECRET: '',
    PORT: 8000,
    ORIGIN: 'http://localhost:8100',
};
populateEnv(env, { mode: 'halt' });
