import { useEffect, useState } from "react";
import { Task, TaskStatus } from "../types/types";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import useTaskStore from "../store/taskStore";
import { v4 as uuidv4 } from "uuid";

interface TaskFormProps {
  open: boolean,
  onClose: () => void,
  initialData?: Task,
}

const TaskForm = ({ open, onClose, initialData }:TaskFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "todo");

  const updateTask = useTaskStore((state) => state.updateTask);
  const addTask = useTaskStore((state) => state.addTask);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setStatus(initialData.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    const taskData: Task = {
      id: initialData?.id || uuidv4(),
      title,
      description,
      status,
    };

    if (initialData) {
      updateTask(taskData)
    } else {
      addTask(taskData)
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit task" : "Create task"}</DialogTitle>
      <DialogContent>
        <Box component="form">
          <TextField
            label="Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <MenuItem value="todo">To do</MenuItem>
            <MenuItem value="in-progress">In progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={() => handleSubmit()}>{initialData ? "Update task" : "Add task"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;