// import express from "express";
// import { config } from "dotenv";
// import morgan from "morgan";
// import appRouter from "./routes/index.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// config();
// const app = express();

// //debug
// app.use((req, res, next) => {
//   console.log("Received headers:", req.headers);
//   next();
// });

// //middlewares
// app.use(cors({ origin: "*", credentials: true }));
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser(process.env.COOKIE_SECRET));
// //remove it in production
// app.use(morgan("dev"));
// app.use("/api/v1", appRouter);
// export default app;
// //# sourceMappingURL=app.js.map

import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

config();
const app = express();

// Set CORS headers manually for all responses
app.use((req, res, next) => {
  // Set CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://niellm-frontend.onrender.com"
  ); // Adjust as necessary
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Allow preflight requests for all routes
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

// Debug: Log received headers
app.use((req, res, next) => {
  console.log("Received headers:", req.headers);
  next();
});

// Middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove morgan in production
app.use(morgan("dev"));

// Router
app.use("/api/v1", appRouter);

export default app;
