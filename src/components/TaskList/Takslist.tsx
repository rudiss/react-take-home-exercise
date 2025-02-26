import React from "react";
import TaskItem, { type Task } from "../TaskItem/TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = React.memo(({ tasks, onToggle, onDelete }) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
});

TaskList.displayName = "TaskList";
export default TaskList;