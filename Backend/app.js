const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require("./src/modules/auth/auth.routes");
const errorHandler = require("./src/core/middleware/error.middleware");
const userRouter = require("./src/modules/user/user.routes");


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());


app.get("/", (req, res) => {
  console.log("API is running");
  res.status(200).json({ success: true, message: "API is running" }); 
})



app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRouter)



app.use(errorHandler)





module.exports = app;