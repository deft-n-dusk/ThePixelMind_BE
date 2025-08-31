require('dotenv').config();
const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://the-pixel-mind-fe.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/authRouter");
const authCheckRouter = require("./routes/authCheckRouter");
const cartRouter = require("./routes/cartRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");

app.use("/", authRouter);
app.use("/", authCheckRouter);
app.use("/", cartRouter);
app.use("/", categoryRouter);
app.use("/", productRouter);

const PORT = process.env.PORT || 2713;

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
