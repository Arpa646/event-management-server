import cors from "cors";
import express, { Application, Request, Response } from "express";

import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/route/intex";
import notFound from "./app/middleware/notFound";

const app: Application = express();

// Parsers
app.use(express.json());


app.use(cors({
  credentials: true,
  origin: [
    "http://localhost:5173",
    "http://localhost:3000", 
    "https://eclectic-bonbon-8c07e2.netlify.app"
  ]
}));




// Application routes
app.use("/api", router);



// app.get("/", getAController);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
