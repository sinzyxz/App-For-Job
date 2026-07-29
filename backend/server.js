require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));



app.get("/", (req, res) => {
    res.send("Document Management API");
});
const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
const documentRoutes = require("./routes/document.routes");
app.use("/api/documents", documentRoutes);
const fileRoutes = require("./routes/file.routes");
app.use("/api/files", fileRoutes);
const workflowRoutes = require("./routes/workflow.routes");
app.use("/api/workflow", workflowRoutes);
const dashboardRoutes = require("./routes/dashboard.routes");
app.use("/api/dashboard", dashboardRoutes);
const notificationRoutes = require("./routes/notification.routes");
app.use("/api/notifications", notificationRoutes);
const auditRoutes = require("./routes/audit.routes");
app.use("/api/audit", auditRoutes);
const roleRoutes = require("./routes/role.routes");
app.use("/api/roles", roleRoutes);

async function connectDB() {
    try {
        const conn = await db.getConnection();

        console.log("✅ Database Connected");

        conn.release();

    } catch (err) {

        console.log(err);

    }
}

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running : ${PORT}`);
});