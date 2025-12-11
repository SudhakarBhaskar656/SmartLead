require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

const connectDB = require("./config/dbConnect");
const leadRoutes = require("./routes/leadRoutes");
const { syncVerifiedLeads } = require("./controller/leadController");

const app = express();
app.use(express.json());
app.use(cors());

// DB connect
connectDB();

// Routes
app.use("/api", leadRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Cron job every 5 minutes
cron.schedule("*/5 * * * *", () => {
  console.log("Running 5 min CRON job...");
  syncVerifiedLeads();
});

app.listen(process.env.PORT, () =>
  console.log(`Backend running on port ${process.env.PORT}`)
);
