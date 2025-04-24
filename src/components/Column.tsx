import { Task, TaskStatus } from "../types/types";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { useState } from "react";
import TaskForm from "./TaskForm";
import AddIcon from '@mui/icons-material/Add';

interface ColumnProps {
  tasks: Task[],
  status: TaskStatus,
}

function Column({ tasks, status }: ColumnProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleEdit = (task:Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  return (
    <Stack>
      <Typography  variant="h6" textTransform="capitalize">
        {status}
      </Typography>
      <IconButton onClick={() => handleAdd()}>
        <AddIcon></AddIcon>
      </IconButton>
      <Droppable droppableId={status}>
        {(provided) => (
          <Box ref={provided.innerRef}
          {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onEdit={() => handleEdit(task)}/>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <TaskForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingTask}
      />
    </Stack>
  )
}

export default Column;