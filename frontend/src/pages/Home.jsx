import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { PencilRuler, Pin, Plus, Trash2 } from "lucide-react";
import BoomTodos from "../components/BoomTodos";

const Home = () => {
  const [todos, setTodos] = useState();
  const [createTodo, setCreateTodo] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    isOpen: false,
    todoId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get("/").then((res) => {
          setTodos(res.data);
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/${id}`);
      setTodos((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("error in deleting todo", error.message);
    }
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto bg-blue-100 px-10 py-4 rounded-lg">
        <h1 className="text-2xl font-bold text-blue-300 text-center">TODOS</h1>
        <div className="flex justify-end">
          <button
            onClick={() => setCreateTodo(!createTodo)}
            className="px-3 py-1 rounded-md my-3 bg-blue-300 font-semibold justify-end"
          >
            <Plus size={18} />
          </button>
          {createTodo ? (
            <BoomTodos todo="CREATE" status={setCreateTodo} set={setTodos} />
          ) : (
            ""
          )}
          {updateTodo.isOpen ? (
            <BoomTodos
              todo="UPDATE"
              status={setUpdateTodo}
              id={updateTodo.todoId}
              set={setTodos}
            />
          ) : (
            ""
          )}
        </div>
        <hr />
        <div className="mt-4">
          {todos?.map((todo) => (
            <div
              key={todo._id}
              className="flex items-start gap-4 bg-blue-200 shadow-md p-3 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="text-emerald-600 pt-1">
                <Pin />
              </div>

              <div className="flex-1">
                <h1 className="text-lg font-semibold text-gray-800">
                  {todo?.title}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {todo?.description}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() =>
                    setUpdateTodo({
                      isOpen: true,
                      todoId: todo._id,
                    })
                  }
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  title="Edit"
                >
                  <PencilRuler className="text-blue-600" size={18} />
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  title="Delete"
                >
                  <Trash2 className="text-red-500" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
