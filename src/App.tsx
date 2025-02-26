import React from "react";
import TaskManager from "./components/TaskManeger/TaskManager";

const App: React.FC = () => {
  return (
    <div className="bg-[var(--white)] min-h-screen">
      <div className="flex items-center justify-between p-4 bg-[var(--black)] text-[var(--white)]">
        <h1 className="text-xl font-bold">Todo List</h1>
      </div>
      <div className="max-w-2xl mx-auto">
        <TaskManager />
      </div>
    </div>
  );
};



export default React.memo(App);
