import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, TaskStatus } from "../types/types";

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (updated: Task) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task],
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
      updateTask: (updated) => set((state) => ({
        tasks: state.tasks.map((task) => task.id === updated.id ? updated : task ),
      })),
      moveTask: (id, newStatus) => set((state) => ({
        tasks: state.tasks.map((task) => task.id === id ? {...task, status: newStatus} : task),
      })),
    }), {
      name: "task-storage",
    }
  )
);

export default useTaskStore;