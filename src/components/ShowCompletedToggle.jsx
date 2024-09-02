import React from 'react';

const ShowCompletedToggle = ({ showFinished, onToggle }) => {
  return (
    <div className="flex justify-end mb-5">
      <label htmlFor="showFinished" className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          id="showFinished"
          checked={showFinished}
          onChange={onToggle}
          className="hidden"
        />
        <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${showFinished ? 'bg-slate-600' : 'bg-slate-300'}`}>
          <div className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${showFinished ? 'translate-x-4' : ''}`}></div>
        </div>
        <span className={`ml-3 font-medium ${showFinished ? 'text-slate-800' : 'text-slate-700'}`}>Show Completed</span>
      </label>
    </div>
  );
};

export default ShowCompletedToggle;
