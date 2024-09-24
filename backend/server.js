const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const indexRoutes = require("./routes/indexRoutes");
const { handleSyntaxError } = require("./utils/errorHandler");

dotenv.config();
connectDB();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(handleSyntaxError);
app.use("/api/v1/", indexRoutes);

app.route("*").all((req, res) => {
  res.status(400).send("Invalid route!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
