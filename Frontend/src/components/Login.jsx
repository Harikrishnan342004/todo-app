import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await API.post(
        "/auth/login",
        new URLSearchParams({
          username: formData.email,
          password: formData.password,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      // Save token and username
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", formData.email);

      setToken(response.data.access_token);
      navigate("/todos");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Icon */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Box
            sx={{
              backgroundColor: "#667eea",
              borderRadius: "50%",
              p: 1.5,
              display: "flex",
            }}
          >
            <LockOutlinedIcon sx={{ color: "white", fontSize: 30 }} />
          </Box>
        </Box>

        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
          Welcome Back!
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          mb={3}
        >
          Login to manage your todos
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography textAlign="center" color="text.secondary">
          Don't have an account?{" "}
          <Typography
            component="span"
            color="primary"
            fontWeight="bold"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </Typography>
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mt={1}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
