import express, { Application, Request, Response, NextFunction } from "express";
import session from "express-session"
import cors from "cors";
import path from "path";
import logger from "morgan";
import router from "./routes/index";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
dotenv.config();

const MONGO_DB = process.env.MONGO_DB;

if (!MONGO_DB) {
  console.error('Available environment variables:', Object.keys(process.env));
  throw new Error("MONGO_DB environment variable is not defined");
}

mongoose
  .connect(MONGO_DB, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const PORT = 3000;
const app: Application = express();

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.set('trust proxy', 1);
}

app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true, // use secure cookies in production
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// this will eventually serve next.js build files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Admin Router
app.use("/", router);

app.get('/debug-session', (req, res) => {
  res.json({
    session: req.session,
    sessionID: req.sessionID,
    cookies: req.cookies,
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErrObj = {
    log: "Global Error Handler triggered due to unknown middleware issue",
    status: 500,
    msg: "Unknown error has occurred",
  };

  // create new error from template and assign values from middleware errors
  const errObj = Object.assign({}, defaultErrObj, err);
  // log to server
  console.log(errObj.log);
  // log to client
  return res.status(errObj.status).send(errObj.msg);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default app;
