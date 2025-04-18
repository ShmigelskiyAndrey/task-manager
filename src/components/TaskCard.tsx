import { Draggable } from "@hello-pangea/dnd";
import useTaskStore from "../store/taskStore";
import { Task } from "../types/types";
import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface TaskCardProps {
  task: Task,
  index: number,
}


function TaskCard({ task, index }: TaskCardProps) {
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        >
          <Stack>
            <CardContent>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </CardContent>
            <IconButton>
              <EditIcon></EditIcon>
            </IconButton>
            <IconButton onClick={() => {deleteTask(task.id)}}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </Stack>
        </Card>
      )}
    </Draggable>
  )
}

export default TaskCard;