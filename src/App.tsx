import { CssBaseline, Stack } from "@mui/material"
import Board from "./components/Board"


function App() {
  return (
    <Stack minHeight="100vh" minWidth="100vw" sx={{
      justifyContent: "center",
      alignItems: "center",
    }}>
      <CssBaseline/>
      <Board></Board>
    </Stack>
  )
}

export default App
