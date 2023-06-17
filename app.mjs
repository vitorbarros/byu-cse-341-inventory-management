import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import client from './src/infra/database/mongodb.mjs';
import routes from './src/routes.mjs';

import swaggerFile from './src/doc/swagger-output.json' assert { type: "json" };

const app = express();

app.use(express.json());

(async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
})();

app.use(routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.port || 3000);
console.log(`Web Server is listening at port ${process.env.port || 3000}`);
