import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ShowCompletedToggle from './components/ShowCompletedToggle';
import TodoList from './components/TodoList';
import TodoModal from './components/TodoModal';
import AddTodoButton from './components/AddTodoButton';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [completedTaskId, setCompletedTaskId] = useState(null);

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
    if (completedTaskId) {
      const timeoutId = setTimeout(() => {
        setCompletedTaskId(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [completedTaskId]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
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
      const date = new Date().toLocaleString();
      if (editTodoId) {
        const updatedTodos = todos.map(item =>
          item.id === editTodoId ? { ...item, todo, dateUpdated: date } : item
        );
        setTodos(updatedTodos);
        setEditTodoId(null);
      } else {
        setTodos([...todos, { id: uuidv4(), todo, dateCreated: date, dateCompleted: null, isCompleted: false }]);
      }
      setTodo("");
      setIsModalOpen(false);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(item => item.id === id);
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    newTodos[index].dateCompleted = newTodos[index].isCompleted ? new Date().toLocaleString() : null;
    setTodos(newTodos);

    if (newTodos[index].isCompleted) {
      setCompletedTaskId(id);
    }
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
        <ShowCompletedToggle showFinished={showFinished} onToggle={toggleFinished} />
        <TodoList
          todos={todos}
          showFinished={showFinished}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCheckboxClick={handleCheckbox}
          completedTaskId={completedTaskId}
        />
      </div>
      <AddTodoButton onClick={openModal} />
      <TodoModal
        isOpen={isModalOpen}
        todo={{ text: todo, id: editTodoId }}
        onChange={handleChange}
        onSave={handleSave}
        onClose={closeModal}
        onKeyPress={handleKeyPress}
        disabled={todo.length <= 3}
      />
    </>
  );
};

export default App;
