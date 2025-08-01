import express from 'express';
import userRoutes from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use('/', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});