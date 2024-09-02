import React from 'react';
import TodoCard from './TodoCard';

const TodoList = ({ todos, showFinished, onEdit, onDelete, onCheckboxClick, completedTaskId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {todos.length === 0 && (
        <div className="text-center text-slate-700">No Todos to display</div>
      )}
      {todos.map(item => (
        (showFinished || !item.isCompleted) ? (
          <TodoCard
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onCheckboxClick={onCheckboxClick}
          />
        ) : (
          completedTaskId === item.id && (
            <div key={item.id} className="p-6 rounded-lg shadow-md bg-green-50 border-l-4 border-green-500">
              <div className="text-slate-600 font-bold text-center">Task Completed</div>
            </div>
          )
        )
      ))}
    </div>
  );
};

export default TodoList;
