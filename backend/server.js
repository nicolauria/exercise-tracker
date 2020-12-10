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

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})