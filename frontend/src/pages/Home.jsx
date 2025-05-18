import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import {
  Circle,
  CircleCheck,
  PencilRuler,
  Pin,
  Plus,
  Trash2,
} from "lucide-react";
import BoomTodos from "../components/BoomTodos";

const Home = () => {
  const [todos, setTodos] = useState();
  const [pinned, setPinned] = useState([]);
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

  const handlePinned = (e, id) => {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const time = currentDate.toTimeString().split(" ")[0];

    const formattedString = `${year}-${month}-${date}T${time}`;
    const todoObject = { id, timestamp: formattedString };

    const stored = localStorage.getItem("TodoItems");
    let parsed = [];

    if (stored) {
      parsed = JSON.parse(stored) || [];
    }

    if (e.target.checked) {
      const updated = [...parsed, todoObject];
      localStorage.setItem("TodoItems", JSON.stringify(updated));
      setPinned((prev) => [...prev, id]);
    } else {
      const updated = parsed.filter((item) => item.id !== id);
      localStorage.setItem("TodoItems", JSON.stringify(updated));
      setPinned((prev) => prev.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    const localStorageTodo = () => {
      const stored = localStorage.getItem("TodoItems");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const pinnedIds = parsed.map((item) => item.id);
          setPinned(pinnedIds);
        } catch (e) {
          console.error("Failed to load pinned:", e);
        }
      }
    };

    localStorageTodo();
  }, []);

  return (
    <div className=" flex items-center">
      <div className="max-w-6xl mx-auto  bg-blue-100 px-10 py-4 rounded-lg min-h-[calc(100vh-10vh)]">
        <h1 className="text-2xl font-bold text-blue-300 text-center">TODOS</h1>
        <div className="flex justify-end">
          <button
            onClick={() => setCreateTodo(!createTodo)}
            className="px-3 py-1 rounded-md my-3 bg-blue-300 font-semibold justify-end shadow-md"
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
        <div className="mt-4 flex gap-4 flex-col">
          <div className="space-y-2">
            <h2 className="font-semibold bg-amber-100 p-2 rounded-md shadow-md">
              Pinned Tasks
            </h2>
            {todos
              ?.filter((todo) => pinned.includes(todo._id))
              .map((todo) => (
                <div
                  key={todo._id}
                  className="flex items-start gap-4 bg-blue-200 shadow-md p-3 rounded-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={pinned.includes(todo._id)}
                      className="rounded-full"
                      onChange={(e) => {
                        let id = todo._id;
                        handlePinned(e, id);
                      }}
                    />
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
          <hr />
          {todos
            ?.filter((todo) => !pinned.includes(todo._id))
            .map((todo) => (
              <div
                key={todo._id}
                className="flex items-start gap-4 bg-gray-200 shadow-md p-3 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="pt-1">
                  <input
                    type="checkbox"
                    className="rounded-full"
                    onChange={(e) => {
                      let id = todo._id;
                      handlePinned(e, id);
                    }}
                  />
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
