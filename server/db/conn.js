const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to MongoDB Database");
  })
  .catch((err) => {
    console.log(err);
  });
