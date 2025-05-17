import express from "express";
import cors from "cors";

import todosRoute from "./routes/todo.route.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);


//routes
app.use("/api/todos", todosRoute)

export default app;
