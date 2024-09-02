import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";

const AddTodoButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 bg-slate-600 text-white p-5 rounded-full shadow-lg hover:bg-slate-800 transform transition-transform duration-300 hover:scale-110"
    >
      <AiOutlinePlus size={24} />
    </button>
  );
};

export default AddTodoButton;
