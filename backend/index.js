require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongo = require('./database/connectMongo');

const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(cors());
app.use(express.json());
// Connect to MongoDB
connectMongo.connect()

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to G-Scores!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
