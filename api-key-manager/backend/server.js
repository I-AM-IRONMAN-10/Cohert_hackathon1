const express = require("express");
const path = require("path");
const app = express();

const routes = require("../routes/main");

app.use(express.json());
// Use absolute path so the server works regardless of which directory it's started from
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});