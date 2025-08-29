require('dotenv').config();
const express = require("express");
const app = express();
const dbConnect = require("./config/database")

const PORT = process.env.PORT || 2707;

dbConnect()
.then(() => {
    console.log("Database Connection established");
    app.listen(PORT, () => {
        console.log(`Server is successfully listening on port ${PORT}`);
    });
})
.catch((err) => {
    console.log("Database cannot be connected", err);
})