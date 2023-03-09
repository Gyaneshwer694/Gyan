const express = require("express");
const mongoose = require("mongoose");
const route = require("./Routes/route");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb+srv://gyan:dqAbssWEpjKXKezF@cluster01.ltoirgv.mongodb.net/User-db ", {
    useNewUrlParser: true,
  })
  .then(console.log("MongoDb is connected successfully........."))
  .catch((error) => {
    console.log(error);
  });

app.use("/", route);

app.listen(process.env.PORT || 5000, function () {
  console.log("Server is running on port " + (process.env.PORT || 5000));
});
