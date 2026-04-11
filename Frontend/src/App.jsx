import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import Home from "./components/Home";
import About from "./components/About"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/todos"
          element={token ? <TodoList setToken={setToken} /> : <Navigate to="/login" />}
        />

        <Route path="/about" element= {<About />}>
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;