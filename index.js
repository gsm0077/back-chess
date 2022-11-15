const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors())

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB is connected man... ");
});

const nameRouter = require("./routes/name");
const addRouter = require("./routes/addstu");

app.use("/addname", nameRouter);
app.use("/add", addRouter);

app.get("/favicon.ico", (req, res) => {
  res.send("API is running..");
});
