import express from 'express';
import userRoutes from './routes/user.route.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use('/', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});