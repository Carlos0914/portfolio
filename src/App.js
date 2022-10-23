import Header from "./components/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Projects from "./pages/Projects";

const theme = createTheme({
  colors: {
    header: "black",
  },
  palette: {
    background: {
      default: '#cccccc'
    }
  }
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<></>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
