require('dotenv').config();
const cors = require('cors');

const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use('/api/users', require('./users/users'));
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server starts at ${port} port`);
})
