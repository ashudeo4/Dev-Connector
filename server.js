const express = require("express");
const request = require("request");
const app = express();
const path = require("path");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
connectDB();
app.use(morgan("combined"));
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

//serve static assests in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
