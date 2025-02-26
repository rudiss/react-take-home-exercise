import React, { useMemo, useCallback } from "react";
import type { FilterStatus } from "../FilterButtons/FilterButtons";
import FilterButtons from "../FilterButtons/FilterButtons";
import TaskList from "../TaskList/Takslist";
import TaskInput from "../TaskInput/TaskInput";
import { useTasks } from "../../hooks/useTasks";

const TaskManager: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = React.useState<FilterStatus>("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  const handleFocusInput = useCallback(() => {
    const input = document.querySelector<HTMLInputElement>('input[placeholder="Add a new task hit enter to save..."]');
    if (input) input.focus();
  }, []);

  return (
    <div className="px-4 py-6 relative">
      <h2 className="text-2xl font-semibold text-[var(--black)] mb-2">Today</h2>
      <p className="text-[var(--grey-alt)] mb-4">
        {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
      <TaskInput onAddTask={addTask} />
      <button
        className="bg-[var(--green)] w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg absolute bottom-[-122px] right-8 text-[var(--black)]"
        onClick={() => {
          const input = document.querySelector<HTMLInputElement>(
            'input[placeholder="Add a new task hit enter to save..."]'
          );

          if (input) {
            if (input.value.trim()) {
              addTask(input.value.trim());
              input.value = '';
            } else {
              input.focus();
            }
          }
        }}
      >
        <div className="translate-y-[-2px]">
          +
        </div>
      </button>
    </div>
  );
};

export default TaskManager;