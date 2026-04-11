import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Checkbox,
  Alert,
  CircularProgress,
  Divider,
  Chip,
  LinearProgress,
  Avatar,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function TodoList({ setToken }) {

  const username = localStorage.getItem("username");


  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  // ─── Stats ───────────────────────────────────────
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  // ─── Fetch Todos ─────────────────────────────────
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await API.get("/todos/");
      setTodos(res.data);
    } catch (err) {
      setError("Failed to fetch todos!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ─── Create ──────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post("/todos/", newTodo);
      setNewTodo({ title: "", description: "", completed: false });
      fetchTodos();
    } catch (err) {
      setError("Failed to create todo!");
    }
  };

  // ─── Delete ──────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      setError("Failed to delete todo!");
    }
  };

  // ─── Edit ────────────────────────────────────────
  const handleEditStart = (todo) => {
    setEditId(todo.id);
    setEditData({ title: todo.title, description: todo.description });
  };

  const handleEditSave = async (id) => {
    try {
      await API.put(`/todos/${id}`, editData);
      setEditId(null);
      fetchTodos();
    } catch (err) {
      setError("Failed to update todo!");
    }
  };

  // ─── Toggle ──────────────────────────────────────
  const handleToggle = async (todo) => {
    try {
      await API.put(`/todos/${todo.id}`, { completed: !todo.completed });
      fetchTodos();
    } catch (err) {
      setError("Failed to update todo!");
    }
  };

  // ─── Logout ──────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      <Box maxWidth="750px" mx="auto">

        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                backgroundColor: "white",
                width: 48,
                height: 48,
              }}
            >
              <TaskAltIcon sx={{ color: "#764ba2", fontSize: 28 }} />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold" color="white">
                My Todos
                 Hello, {username?.split("@")[0] || "User"} 👋
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                Stay organized, stay productive!
              </Typography>
            </Box>
          </Box>
          <Tooltip title="Logout">
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "#ff5252",
                  color: "#ff5252",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Logout
            </Button>
          </Tooltip>
        </Box>

        {/* Stats Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 4,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography color="white" fontWeight="bold">
              Progress
            </Typography>
            <Box display="flex" gap={1}>
              <Chip
                label={`${completedCount} Done`}
                size="small"
                sx={{ backgroundColor: "#4CAF50", color: "white" }}
              />
              <Chip
                label={`${totalCount - completedCount} Left`}
                size="small"
                sx={{ backgroundColor: "rgba(255,255,255,0.3)", color: "white" }}
              />
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "rgba(255,255,255,0.3)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4CAF50",
                borderRadius: 5,
              },
            }}
          />
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.8)"
            mt={1}
            textAlign="right"
          >
            {Math.round(progress)}% Complete
          </Typography>
        </Paper>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2, borderRadius: 3 }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {/* Add Todo Form */}
        <Paper
          elevation={3}
          sx={{ p: 3, mb: 3, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2} color="text.primary">
            ✨ Add New Todo
          </Typography>
          <Box component="form" onSubmit={handleCreate}>
            <TextField
              fullWidth
              label="What needs to be done?"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              required
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
            <TextField
              fullWidth
              label="Add a description (optional)"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: "bold",
              }}
            >
              Add Todo
            </Button>
          </Box>
        </Paper>

        {/* Todo List */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <Typography color="white" fontWeight="bold" variant="h6">
              📋 My Tasks ({totalCount})
            </Typography>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress sx={{ color: "#764ba2" }} />
            </Box>
          ) : todos.length === 0 ? (
            <Box textAlign="center" py={6}>
              <TaskAltIcon sx={{ fontSize: 60, color: "#ddd", mb: 2 }} />
              <Typography color="text.secondary" variant="h6">
                No todos yet!
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Add your first task above ☝️
              </Typography>
            </Box>
          ) : (
            todos.map((todo, index) => (
              <Box key={todo.id}>
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                  py={2}
                  sx={{
                    backgroundColor: todo.completed
                      ? "rgba(76, 175, 80, 0.05)"
                      : "white",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: todo.completed
                        ? "rgba(76, 175, 80, 0.1)"
                        : "rgba(102, 126, 234, 0.05)",
                    },
                  }}
                >
                  {/* Checkbox */}
                  <Tooltip title={todo.completed ? "Mark incomplete" : "Mark complete"}>
                    <IconButton onClick={() => handleToggle(todo)} sx={{ mr: 1 }}>
                      {todo.completed ? (
                        <CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 28 }} />
                      ) : (
                        <RadioButtonUncheckedIcon
                          sx={{ color: "#bbb", fontSize: 28 }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>

                  {/* Content */}
                  {editId === todo.id ? (
                    <Box flex={1} mr={1}>
                      <TextField
                        fullWidth
                        size="small"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        sx={{ mb: 1 }}
                        InputProps={{ sx: { borderRadius: 2 } }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                        InputProps={{ sx: { borderRadius: 2 } }}
                      />
                    </Box>
                  ) : (
                    <Box flex={1}>
                      <Typography
                        fontWeight="bold"
                        sx={{
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                          color: todo.completed
                            ? "text.secondary"
                            : "text.primary",
                          fontSize: { xs: 14, md: 16 },
                        }}
                      >
                        {todo.title}
                      </Typography>
                      {todo.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: 12, md: 14 } }}
                        >
                          {todo.description}
                        </Typography>
                      )}
                      {todo.completed && (
                        <Chip
                          label="Completed"
                          size="small"
                          sx={{
                            mt: 0.5,
                            backgroundColor: "#e8f5e9",
                            color: "#4CAF50",
                            fontSize: 11,
                          }}
                        />
                      )}
                    </Box>
                  )}

                  {/* Action Buttons */}
                  {editId === todo.id ? (
                    <Box display="flex">
                      <Tooltip title="Save">
                        <IconButton
                          onClick={() => handleEditSave(todo.id)}
                          sx={{ color: "#4CAF50" }}
                        >
                          <SaveIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          onClick={() => setEditId(null)}
                          sx={{ color: "#ff5252" }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ) : (
                    <Box display="flex">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handleEditStart(todo)}
                          sx={{ color: "#667eea" }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDelete(todo.id)}
                          sx={{ color: "#ff5252" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Box>
                {index < todos.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default TodoList;