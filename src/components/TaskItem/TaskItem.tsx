import React, { useCallback } from "react";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  date?: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task, onToggle, onDelete }) => {
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [onToggle, task.id]);

  return (
    <div className="flex items-center justify-between border-b border-[var(--border-gray)] py-3">
      <div className="flex items-center space-x-3">
        <button
          data-testid={`toggle-button-${task.id}`}
          aria-label={`Toggle task ${task.title}`}
          onClick={handleToggle}
          className={`w-5 h-5 rounded-full border-2 ${task.completed
            ? "bg-[var(--green)] border-[var(--green)]"
            : "border-[var(--secondary)]"
            }`}
        />
        <span className={`${task.completed ? "line-through text-[var(--grey-alt)]" : "text-[var(--black)]"}`}>
          {task.title}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <small className="text-[var(--grey-alt)]">{task.date}</small>
        <DeleteDialog onConfirm={() => onDelete(task.id)} />
      </div>
    </div>
  );
});

TaskItem.displayName = "TaskItem";
export default TaskItem;