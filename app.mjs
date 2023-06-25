import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import client from './src/infra/database/mongodb.mjs';
import inventory from './src/inventory.mjs';
import login from './src/login.mjs';
import oauth2 from './src/oauth2.mjs';
import { engine } from 'express-handlebars';
import formatDate from 'express-handlebars';
import stripTags from 'express-handlebars';
import truncate from 'express-handlebars';
import editIcon from 'express-handlebars';
import select from 'express-handlebars';
import morgan from 'morgan';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import passport from 'passport';
import session from 'express-session';
import passportSetup from './src/config/passport.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import swaggerFile from './src/doc/swagger-output.json' assert { type: "json" };
import envs from './src/config/envs.mjs';

const app = express();

passportSetup(passport);

app.use(session({
  secret: envs.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize({}));
app.use(passport.session({}));

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  },
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', '.hbs');
app.set('views', './src/views');

(async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
})();

app.use(oauth2);
app.use(login);
app.use(inventory);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.port || 3000);
console.log(`Web Server is listening at port ${process.env.port || 3000}`);
