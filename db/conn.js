const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.log("Error connecting to the database:", err);
    });