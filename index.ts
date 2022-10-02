import express, { Express, NextFunction, Request, Response } from "express";
import proprietarioRouter from "./routes/proprietario.route";
import animalRouter from "./routes/animal.route";
import servicoRouter from "./routes/servico.route";
import petBlogRouter from "./routes/petBlog.route";
import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// winston
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "store-api.log" }),
  ],
  format: combine(label({ label: "store-api" }), timestamp(), myFormat),
});

// routes
app.use("/proprietario", proprietarioRouter);
app.use("/animal", animalRouter);
app.use("/servico", servicoRouter);
app.use("/post", petBlogRouter);

// log do erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message) {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
  } else {
    logger.error(`${req.method} ${req.baseUrl} - ${err}`);
    res.status(400).send({ error: err });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
