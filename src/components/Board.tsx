import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import useTaskStore from "../store/taskStore";
import { TaskStatus } from "../types/types";
import Column from "./Column";
import { Grid, Stack } from "@mui/material";

function Board() {
const tasks = useTaskStore((state) => state.tasks);
const moveTask = useTaskStore((state) => state.moveTask);

const groupedTasks = {
  "todo": tasks.filter((task) => task.status === "todo"),
  "in-progress": tasks.filter((task) => task.status === "in-progress"),
  "done": tasks.filter((task) => task.status === "done"),
}

const handleDragEnd = (result: DropResult) => {
  const { destination, source, draggableId } = result;

  if (!destination) return;
  if (destination.droppableId === source.droppableId) return;

  moveTask(draggableId, destination.droppableId as TaskStatus);
}

  return (
    <Stack sx={{ padding: "16px", backgroundColor: "#f0f0f0" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container >
          <Column status="todo" tasks={groupedTasks["todo"]}/>
          <Column status="in-progress" tasks={groupedTasks["in-progress"]}/>
          <Column status="done" tasks={groupedTasks["done"]}/>
        </Grid>
      </DragDropContext>
    </Stack>
  )
}

export default Board;