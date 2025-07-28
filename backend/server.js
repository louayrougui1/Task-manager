const express = require("express");
const connectDB = require("./database/db.js");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const errorHandler = require("./middleware/errorMiddleware.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();
app.use("/uploads", express.static("uploads"));
const corsOptions = {
  origin: "http://localhost:5173", //needed for cookies
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(`/${process.env.api}/users`, userRoutes);
app.use(`/${process.env.api}/tasks`, taskRoutes);
app.use(errorHandler);
app.listen(port, () => console.log(`server running on port ${port}`));
