const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AllRoutes=require("./routes/all-routes");


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(AllRoutes);


mongoose.connect(
    "mongodb+srv://mongoDB:mongoDB@cluster0.gvjc6nn.mongodb.net/bank?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("Bank server connected at port 4000...");
    });
  })
  .catch((e) => {
    console.log(e);
  });
