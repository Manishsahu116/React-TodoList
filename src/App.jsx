import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false); // Not checked by default
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const inputRef = useRef(null); // Ref for the input field

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const loadedTodos = JSON.parse(todoString);
      setTodos(loadedTodos);
    }
  }, []);
  
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.removeItem("todos");
    }
  }, [todos]);

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };
  
  const handleEdit = (id) => { 
    const t = todos.find(i => i.id === id); 
    setTodo(t.todo);
    setEditTodoId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleSave = () => {
    if (todo.length > 3) {
      if (editTodoId) {
        const updatedTodos = todos.map(item => 
          item.id === editTodoId ? { ...item, todo } : item
        );
        setTodos(updatedTodos);
        setEditTodoId(null);
      } else {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      }
      setTodo("");
      setIsModalOpen(false);
    }
  };

  const handleChange = (e) => { 
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => { 
    const id = e.target.name;  
    const newTodos = [...todos];
    const index = newTodos.findIndex(item => item.id === id);
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditTodoId(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5">
        <h1 className="font-bold text-center text-3xl mb-5">iTask - Manage Your Todos</h1>

        <div className="flex justify-end mb-5">
          <label htmlFor="showFinished" className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              id="showFinished" 
              checked={showFinished} 
              onChange={toggleFinished} 
              className="hidden"
            />
            <div className="w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out">
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${showFinished ? 'translate-x-4 bg-indigo-600' : ''}`}></div>
            </div>
            <span className="ml-3 text-gray-700 font-medium">Show Completed</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.length === 0 && (
            <div className="text-center text-gray-500">No Todos to display</div>
          )}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className={`todo-card p-6 rounded-lg shadow-md transition-all hover:shadow-xl transform hover:scale-105 ${item.isCompleted ? 'bg-gray-100' : 'bg-white'} border-l-4 border-indigo-500`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <input 
                      name={item.id} 
                      type="checkbox" 
                      checked={item.isCompleted} 
                      onChange={handleCheckbox} 
                      className="mr-3 transform scale-125"
                    />
                    <span className={item.isCompleted ? "line-through text-gray-400" : "text-lg font-medium text-gray-900"}>{item.todo}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(item.id)} 
                      className="bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-700 hover:scale-110 transform transition-all"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-700 hover:scale-110 transform transition-all"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      <button 
        onClick={openModal} 
        className="fixed bottom-5 right-5 bg-indigo-600 text-white p-5 rounded-full shadow-lg hover:bg-indigo-800 transform transition-transform duration-300 hover:scale-110"
      >
        <AiOutlinePlus size={24} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">{editTodoId ? "Edit Todo" : "Add a Todo"}</h2>
            <input 
              type="text" 
              value={todo} 
              onChange={handleChange} 
              onKeyPress={handleKeyPress}
              placeholder="Enter task..." 
              className="w-full rounded-lg shadow-sm px-4 py-2 border border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
              ref={inputRef} 
            />
            <div className="flex justify-end">
              <button 
                onClick={closeModal} 
                className="mr-3 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                disabled={todo.length <= 3} 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-800 disabled:bg-gray-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
