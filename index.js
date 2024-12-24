import express, { urlencoded } from "express";
import dotenv from "dotenv";
import path from "path";
import flash from "connect-flash";
import session from "express-session";

import { ConnectToMongoDB } from "./config/mongoConnection.js";

dotenv.config();
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware to set flash messages
app.use((req, res, next) => {
  res.locals.message = req.session.message || null; // Get message from session (if using sessions)
  res.locals.messageType = req.session.messageType || "info"; // Default to 'info'
  req.session.message = null; // Clear after use
  req.session.messageType = null;
  next();
});

// connecting to MongoDB
ConnectToMongoDB(process.env.MONGO_CON_STRING);

app.use(urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// configuring Routes
import userRoutes from "./routes/userRoutes.js";
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
