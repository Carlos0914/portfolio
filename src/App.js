import Header from "./components/Header";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const theme = createTheme({
  colors: {
    header: "black",
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/projects" element={<></>} />
          <Route path="/experience" element={<></>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
