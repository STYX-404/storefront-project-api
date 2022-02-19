import app from './src/app';
import { checkingEnvVariables } from './config/checking-env-variables';

const start = async () => {
  checkingEnvVariables();

  app.listen(3000, () => console.log('Listening on port 3000!'));
};

start();
