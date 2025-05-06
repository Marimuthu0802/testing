require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routers/user.router");
const mongo = require("./src/config/config");

const app = express();

mongo();

//dfvdfvdf

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ✅ Allow Multiple Frontend Origins 
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());


app.use("/", userRouter);

// ✅ Use the port from .env, default to 7000 if not set
const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`server is running on port no: ${port}`);
});
