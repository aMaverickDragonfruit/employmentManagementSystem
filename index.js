import express from 'express';
import connectDB from './config/index.js';
import cors from 'cors';
import errorHandlerMiddleware from './middlewares/errorHandler.js';
import userRouter from './routers/users.js';
import authRouter from './routers/auth.js';
import profileRouter from './routers/profiles.js';
import registrationRouter from './routers/registration.js';
import mailRouter from './routers/mailer.js';

const app = express();
const port = 3000;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/registrations', registrationRouter);
app.use('/api', mailRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
