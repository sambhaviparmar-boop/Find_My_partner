const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require("./src/modules/auth/auth.routes");
const errorHandler = require("./src/core/middleware/error.middleware");
const userRouter = require("./src/modules/user/user.routes");
const groupRouter = require("./src/modules/group/group.routes");
const joinRequestRouter = require("./src/modules/joinrequest/joinrequest.routes");
const profileRouter = require("./src/modules/profile/profile.routes");
const skillRouter = require("./src/modules/skills/skills.routes");
const PassportRouter = require("./src/modules/builderPassport/builderPassport.routes");
const matchingRouter = require("./src/modules/matching/matching.routes");
const teamRouter = require("./src/modules/team/team.routes");
const workspaceRouter = require("./src/modules/workspace/workspace.routes");
const connectionRouter = require("./src/modules/connection/connection.routes");
const messageRouter = require("./src/modules/message/message.routes");
const notificationRouter = require("./src/modules/notification/notification.routes");
const realiabilityRouter = require("./src/modules/reliability/realiability.routes");
const searchRouter = require("./src/modules/search/search.routes");
const aiRouter = require("./src/modules/aiModule/ai.routes");
const reviewRouter = require("./src/modules/review/review.routes");
const reportRouter = require("./src/modules/report/report.routes");
const blockRouter = require("./src/modules/block/block.routes");
const adminRouter = require("./src/modules/admin/admin.routes");
const chatRouter = require("./src/modules/chat/chat.routes");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./src/core/config/swagger");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());



app.get("/", (req, res) => {
  return res.status(200).json({ success: true, message: "API is running" });
});
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/joinrequest", joinRequestRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/builderPassport", PassportRouter);
app.use("/api/v1/matching", matchingRouter);
app.use("/api/v1/team", teamRouter);
app.use("/api/v1/workspace", workspaceRouter);
app.use("/api/v1/connection", connectionRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/realiability", realiabilityRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/block", blockRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/chat", chatRouter);

app.use(errorHandler);
module.exports = app;
