require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const uri = process.env.MONGODB_ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userRouter = require('./routes/users.js');
const exerciseRouter = require('./routes/exercises.js');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

const path = require('path');

app.use(express.static('mern-exercise-tracker/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})