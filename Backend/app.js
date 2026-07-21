const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require("./src/modules/auth/auth.routes");
const errorHandler = require("./src/core/middleware/error.middleware");
const userRouter = require("./src/modules/user/user.routes");

const fitnessRoutes = require("../Backend/src/modules/fitness/fitness.routes");
const shoppingRouter = require("../Backend/src/modules/shopping/shopping.routes");
const travelRouter = require("../Backend/src/modules/travel/travel.routes");
const studyRouter = require("../Backend/src/modules/study/study.routes");
const networkingRouter = require("../Backend/src/modules/networking/networking.routes");




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
app.use("/api/v1/fitness", fitnessRoutes);
app.use("/api/v1/shopping", shoppingRouter);
app.use("/api/v1/travel", travelRouter);
app.use("/api/v1/study", studyRouter);
app.use("/api/v1/networking", networkingRouter);



app.use(errorHandler)


module.exports = app;