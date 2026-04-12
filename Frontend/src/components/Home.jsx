import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
      title: "Easy Task Management",
      desc: "Create, edit, and delete todos with just a few clicks.",
    },
    {
      icon: <LockOutlinedIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
      title: "Secure & Private",
      desc: "Your data is protected with JWT authentication.",
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 40, color: "#9C27B0" }} />,
      title: "Fully Responsive",
      desc: "Works perfectly on mobile, tablet, and desktop.",
    },
   
  ];

  return (
    <Box>
    
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, md: 6 },
          py: 2,
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
           TodoApp
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/login")}
            size={isMobile ? "small" : "medium"}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register")}
            size={isMobile ? "small" : "medium"}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 8, md: 14 },
          px: { xs: 2, md: 6 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant={isMobile ? "h3" : "h2"}
            fontWeight="bold"
            mb={3}
          >
            Organize Your Life with TodoApp
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            mb={5}
            sx={{ opacity: 0.9 }}
          >
            Simple, fast, and secure todo management. Stay productive every day!
          </Typography>
          <Box
            display="flex"
            gap={2}
            justifyContent="center"
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                backgroundColor: "white",
                color: "#764ba2",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              Get Started Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                borderColor: "white",
                color: "white",
                px: 4,
                py: 1.5,
                "&:hover": { borderColor: "#f0f0f0", backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 6 }, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            mb={6}
            color="text.primary"
          >
            Why Choose TodoApp?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    height: "100%",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                  }}
                >
                  <Box mb={2}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          py: { xs: 6, md: 10 },
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" mb={4} sx={{ opacity: 0.9 }}>
          Join thousands of users managing their tasks efficiently!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/register")}
          sx={{
            backgroundColor: "white",
            color: "#764ba2",
            fontWeight: "bold",
            px: 5,
            py: 1.5,
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          Create Free Account
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#1a1a2e",
          color: "white",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © 2026 TodoApp — Built with ❤️ using FastAPI + React
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;