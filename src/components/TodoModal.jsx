import React, { useRef, useEffect } from 'react';

const TodoModal = ({ isOpen, todo, onChange, onSave, onClose, onKeyPress, disabled }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-1/3">
          <h2 className="text-xl font-bold mb-4">{todo.id ? "Edit Todo" : "Add a Todo"}</h2>
          <input
            type="text"
            value={todo.text}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="Enter task..."
            className="w-full rounded-lg shadow-sm px-4 py-2 border border-slate-300 focus:outline-none focus:ring focus:ring-slate-200 mb-4"
            ref={inputRef}
          />
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="mr-3 bg-slate-300 text-slate-700 px-4 py-2 rounded-lg shadow hover:bg-slate-400"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={disabled}
              className="bg-slate-600 text-white px-4 py-2 rounded-lg shadow hover:bg-slate-800 disabled:bg-slate-400"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TodoModal;
