import React from 'react';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { RiCheckboxCircleLine } from "react-icons/ri";

const TodoCard = ({ item, onEdit, onDelete, onCheckboxClick }) => {
  return (
    <div className={`todo-card p-6 rounded-lg shadow-md transition-all hover:shadow-xl transform hover:scale-105 ${item.isCompleted ? 'bg-slate-100' : 'bg-white'} border-l-4 border-slate-500`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={() => onCheckboxClick(item.id)}
            className={`text-2xl mr-3 transform scale-125 ${item.isCompleted ? 'text-green-500' : 'text-slate-300 hover:text-green-500'}`}
          >
            <RiCheckboxCircleLine />
          </button>
          <span className={item.isCompleted ? "line-through text-slate-400" : "text-lg font-medium text-slate-900"}>{item.todo}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item.id)}
            className="bg-slate-500 text-white p-2 rounded-full shadow hover:bg-slate-700 hover:scale-110 transform transition-all"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-700 hover:scale-110 transform transition-all"
          >
            <AiFillDelete />
          </button>
        </div>
      </div>
      <div className="text-sm text-slate-500">
        <div>Created: {item.dateCreated}</div>
        {item.isCompleted && <div>Completed: {item.dateCompleted}</div>}
      </div>
    </div>
  );
};

export default TodoCard;
