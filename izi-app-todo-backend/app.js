require('dotenv').config();

const cors = require('cors');


const express = require('express');
const app = express();

app.use(cors());

app.use(cors({
  origin: ['https://izi-app-todo.vercel.app', 'http://localhost:3000']
}));

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./models').sequelize;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});