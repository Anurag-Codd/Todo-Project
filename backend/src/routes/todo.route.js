import express from "express";
import {
  allTodos,
  createTodo,
  deleteTodo,
  singleTodo,
  updateTodo,
} from "../controller/todo.controller.js";

const route = express.Router();

route.get("/", allTodos);
route.get("/:id", singleTodo);
route.post("/new", createTodo);
route.put("/:id", updateTodo);
route.delete("/:id", deleteTodo);

export default route;
