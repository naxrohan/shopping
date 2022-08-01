const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv =  require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const slideRoute = require("./routes/slide");
const path = require("path");


dotenv.config();

mongoose.connect(
    process.env.MONGO_CONNECT_STR
)
.then(() => console.log("db connected.."))
.catch((err) => {
    console.log(err)
    console.log("Failed db connect..!!")
});

/* enable CORS */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, User-Agent");
    // res.header("Access-Control-Allow-Methods: GET, POST");
    // res.header("Access-Control-Allow-Headers: X-Custom-Header");
    next();
});


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/slides", slideRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// child folder static
app.use(express.static(path.join(__dirname, "/ecomsite_client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/ecomsite_client/build', 'index.html'));
});


app.listen(process.env.PORT || 5000, () => {
    console.log("backend server..runnning")
});