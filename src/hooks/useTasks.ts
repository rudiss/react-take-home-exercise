import { useCallback, useEffect, useState } from "react";
import type { Task } from "../components/TaskItem/TaskItem";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getTimestamp = useCallback((): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  }, []);

  const addTask = useCallback((title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      date: getTimestamp(),
    };
    setTasks((prev) => [...prev, newTask]);
  }, [getTimestamp]);

  const toggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return { tasks, addTask, toggleTask, deleteTask };
};