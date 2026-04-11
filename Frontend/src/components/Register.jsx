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
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
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
      await API.post("/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed!");
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
              backgroundColor: "#764ba2",
              borderRadius: "50%",
              p: 1.5,
              display: "flex",
            }}
          >
            <PersonAddIcon sx={{ color: "white", fontSize: 30 }} />
          </Box>
        </Box>

        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
          Create Account
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          mb={3}
        >
          Join us and start managing your todos!
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
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
              background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Account"
            )}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography textAlign="center" color="text.secondary">
          Already have an account?{" "}
          <Typography
            component="span"
            color="primary"
            fontWeight="bold"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
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

export default Register;