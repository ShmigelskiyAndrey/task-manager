import { useState } from "react";
import { Task } from "../types/types";

interface TaskFormProps {
  open: boolean,
  onClose: () => void,
  onSubmit: (task: Omit<Task, "id"> | Task) => void,
  initialData?: Task,
}

const TaskForm = ({ open, onClose, onSubmit, initialData }:TaskFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "todo");
  

  return (

  );
};

export default TaskForm;