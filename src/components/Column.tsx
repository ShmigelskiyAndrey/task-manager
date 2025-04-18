import { Task, TaskStatus } from "../types/types";
import { Box, Stack, Typography } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

interface ColumnProps {
  tasks: Task[],
  status: TaskStatus,
}

function Column({ tasks, status }: ColumnProps) {
  return (
    <Stack>
      <Typography  variant="h6" textTransform="capitalize">
        {status}
      </Typography>
      <Droppable droppableId={status}>
        {(provided) => (
          <Box ref={provided.innerRef}
          {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Stack>
  )
}

export default Column;