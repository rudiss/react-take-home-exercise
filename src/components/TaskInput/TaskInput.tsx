import React from "react";

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = React.memo(({ onAddTask }) => {
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      onAddTask(e.currentTarget.value.trim());
      e.currentTarget.value = "";
    }
  }, [onAddTask]);

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Add a new task hit enter to save..."
        aria-label="Add a new task"
        className="w-full bg-[var(--light-grey)] text-[var(--black)] p-3 rounded-md border border-[var(--border-gray)] outline-none"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
});

TaskInput.displayName = "TaskInput";
export default TaskInput;