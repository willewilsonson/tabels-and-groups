const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const postsRoute = require('./routes/posts');;

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/posts', postsRoute);


mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true },
    () => console.log(`connected to DB!`));




app.listen(PORT);