require('dotenv').config();
const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Updated CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://the-pixel-mind-fe.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,   
  credentials: true         // allow cookies
}));

const PORT = process.env.PORT || 2713;

app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/authRouter");
app.use("/", authRouter);

const authCheckRouter = require("./routes/authCheckRouter");
app.use("/", authCheckRouter);

const cartRouter = require("./routes/cartRouter");
app.use("/", cartRouter);

const categoryRouter = require("./routes/categoryRouter");
app.use("/", categoryRouter);

const productRouter = require("./routes/productRouter");
app.use("/", productRouter);

dbConnect()
.then(() => {
    console.log("Database Connection established");
    app.listen(PORT, () => {
        console.log(`Server is successfully listening on port ${PORT}`);
    });
})
.catch((err) => {
    console.log("Database cannot be connected", err);
});
