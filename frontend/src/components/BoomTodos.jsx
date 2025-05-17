import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { X } from "lucide-react";

const BoomTodos = ({ todo, status, id, set }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/${id}`);
        setFormData({
          title: res.data.title,
          description: res.data.description,
        });
      } catch (error) {
        console.log("Error fetching todo", error.message);
      }
    };

    if (id && todo === "UPDATE") {
      fetchData();
    }
  }, [id, todo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (todo === "CREATE") {
        if (!formData.title || !formData.description) {
          return console.log("all fileds are important filled them to proceed");
        }
        const res = await axiosInstance.post("/new", formData);
        status(false);
        set((prev) => [...prev, { ...res.data }]);
      } else {
        if (!formData.title && !formData.description) {
          return console.log("at least one field is required");
        }
        const res = await axiosInstance.put(`/${id}`, formData);
        status({ isOpen: false });
        set((prev) => prev.map((item) => (item._id == id ? res.data : item)));
      }
      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log("submission error", error.message);
    }
  };

  return (
    <div className="min-w-1/2 p-4 absolute bg-gray-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md z-100">
      <h1 className="text-center shadow-lg rounded-2xl font-medium px-2 py-1 mt-4 bg-gray-300">
        {todo} TODO
      </h1>
      <button
        className="absolute top-0 right-0 px-4 py-2"
        onClick={() => status(false)}
      >
        <X size={18} />
      </button>
      <div className="mt-4">
        <form onSubmit={submitHandler}>
          <ul className="flex flex-col gap-2">
            <li className="flex flex-col gap-1">
              <label htmlFor="title" className="tracking-wider font-serif">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter your Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="border rounded-md placeholder:text-xs placeholder:font-mono p-2 text-sm"
              />
            </li>
            <li className="flex flex-col gap-1">
              <label
                htmlFor="description"
                className="tracking-wider font-serif"
              >
                Description
              </label>
              <textarea
                name="description"
                placeholder="Add some description over here."
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="border rounded-md placeholder:text-xs placeholder:font-mono text-sm p-2"
              />
            </li>
          </ul>
          <button
            type="submit"
            className="w-full bg-amber-200 rounded-md mx-auto mt-4 text-sm py-1 font-semibold"
          >
            {todo}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoomTodos;
