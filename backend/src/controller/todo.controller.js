import Todo from "../models/todo.model.js";

export const allTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();

    if (allTodos.length <= 0) {
      return res.status(400).json({ message: "no todos found" });
    }

    return res.status(200).json(allTodos);
  } catch (error) {
    console.log("server error", error.message);
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    const newTodo = await Todo.create({ title, description });

    res.status(201).json(newTodo);
  } catch (error) {
    console.log("server error", error.message);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;

    if (!title && !description) {
      return res.status(400).json({ message: "Atleast one filed is required" });
    }

    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );

    return res.status(200).json(updateTodo);
  } catch (error) {
    console.log("server error", error.message);
  }
};

export const deleteTodo = async (req, res) => {
  const id = req.params.id;

  await Todo.findByIdAndDelete(id);

  res.status(200).json({ message: "todo deleted" });
  try {
  } catch (error) {
    console.log("server error", error.message);
  }
};

export const singleTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.log("server error", error.message);
  }
};
