const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const usersRoutes = require("./routes/users");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const connect = async()=>{
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw(error);
  }
}
mongoose.connection.on('disconnected', () => {
  console.log("mongoDb disconnected");
});
mongoose.connection.on('connected', () => {
  console.log("mongoDb connected");
});


//middleware
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/rooms',roomsRoute);
app.use('/api/users',usersRoutes);

// app.get('/',(req,res)=>{
//     res.send("welcome");
// });

app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.Message || "Something went wrong!";
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  });
});

app.listen(PORT,()=>{
    connect();
    console.log(`server is live on ${PORT}`);
})