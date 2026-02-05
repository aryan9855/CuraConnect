const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const healthProgramRoutes = require("./routes/HealthProgram");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// ==============================
// Database Connection
// ==============================
database.connect();

// ==============================
// Middlewares
// ==============================
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,               // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: DO NOT add app.options("*", cors()) ❌
// Modern Express + Node 22 crashes on "*"

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// ==============================
// Cloudinary
// ==============================
cloudinaryConnect();

// ==============================
// Routes
// ==============================
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/healthProgram", healthProgramRoutes);
app.use("/api/v1/payment", paymentRoutes);

// ==============================
// Default Route
// ==============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Your server is up and running 🚀",
  });
});

// ==============================
// Start Server
// ==============================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
