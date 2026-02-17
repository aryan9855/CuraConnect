const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const healthProgramRoutes = require("./routes/HealthProgram");
const contactRoutes = require("./routes/Contact");

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

// ✅ CORS (Temporary: allow all origins for deployment)
app.use(
  cors({
    origin: true, // allow all origins (we'll restrict later)
    credentials: true,
  })
);

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
app.use("/api/v1/reach", contactRoutes);

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
  console.log(`✅ Server running on port ${PORT}`);
});
