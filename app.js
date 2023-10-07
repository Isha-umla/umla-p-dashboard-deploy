const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.use(
  "/umla/partnerDashboard",
  express.static(path.join(__dirname, "partner-dashboard", "dist"))
);

// Catch-all route for the SPA
app.get("/umla/partnerDashboard/*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "partner-dashboard", "dist", "index.html")
  )
);

const port = 3100;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
