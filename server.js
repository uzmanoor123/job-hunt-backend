const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: "*" }));

app.get('/', (req, res)=>{
    res.send("Backend is running");
});
const authRoutes= require("./routes/authRoutes");
app.use("/", authRoutes);  

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
  
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is running on port  ${port}`);
});
