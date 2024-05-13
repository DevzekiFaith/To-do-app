import { FC, ChangeEvent, useState } from "react";
import { ITodo } from "../Interface";
import CompletionImage from "/taskcom (1).svg";
import ServerImage from "/taskcom (2).svg";

const TodoList: FC = () => {
  // State variables

  const [todos, setTodos] = useState<ITodo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
    return [];
  });

  // DECLARE A STATE TO ADD TO THE TODO-LIST

  const [title, setTitle] = useState<string>("");
  // Add a new todo
  // Set the title to an empty string
  // Add the new todo to the todos array
  // Set the title to an empty string
  // Update the todos array
  // Set the title to an empty string
  // Update the todos array

  const handleAddTodo = () => {
    if (!title) return;
    const newTodo: ITodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTitle("");
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  };

  // Edit a todo's title

  const handleEditTodo = (id: number, newTitle: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  // Delete a todo

  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  // Toggle a todo's completion status

  const handleToggleCompleted = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Handle input change for todo title

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="flex xl:flex-row flex-col items-center justify-center xl:gap-[4rem] ">
      <div className="w-[50%] flex xl:flex-col justify-center items-center mt-[3rem]">
        <img className="w-[50%]" src={CompletionImage} alt="Completion Image" />
        <img className="w-[50%]" src={ServerImage} alt="Completion Image" />
      </div>
      <div className="container px-4 py-8 mx-auto w-[50%]">
        <h1 className="mb-8 text-3xl font-bold">Todo List</h1>
        <form className="flex mb-8" onSubmit={handleAddTodo}>
          <input
            type="text"
            className="flex-1 px-4 py-2 mr-4 border border-gray-300 rounded-lg"
            value={title}
            onChange={handleTitleChange}
            placeholder="Add a new todo..."
            required
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center mb-4">
              <input
                type="checkbox" placeholder="check"
                className="mr-4 text-blue-500 border border-gray-300 rounded form-checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(todo.id)}
              />
              <input
                type="text" placeholder="Type your feelings..."
                className="flex-1 px-4 py-2 mr-4 border border-gray-300 rounded-lg"
                value={todo.title}
                onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                required
              />
              <button
                type="button"
                className="text-red-500 hover:underline"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
