const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
// const dotenv = require("dotenv");
const path = require('path')
const cors = require('cors')


//Config

// dotenv.config({ path: "backend/config/config.env" })
if (process.env.NODE_ENV !== "PRODUCTION") {

    // dotenv.config({ path: "backend/config/config.env" })
    require('dotenv').config({ path: "backend/config/config.env" })
}
const errorMiddleware = require("./middleware/error")

const app = express();
// app.use(express.bodyParser({limit: '50mb'}))
// Configure body-parser to handle JSON request bodies with a size limit of 50MB
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: '50mb' }));
app.use(fileUpload());


app.get('/',(req,res)=>{
    res.send('hello world')
})

//Route Imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const category = require("./routes/categoryRoute");
const subcategory = require("./routes/subcategoryRoute")


app.use(
    cors({
      // origin: "*",
      // origin: 'http://localhost:3000',
      origin: [
        
        "http://localhost:3000",
        "http://localhost:8080",
        "https://mern-project-frontend-sigma.vercel.app/"
        
      ],
      methods: "GET,POST,PUT,DELETE,PATCH",
      credentials: true,
    })
  );


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", category);
app.use("/api/v1", subcategory)

// app.use(express.static(path.join(__dirname, "../frontend/build")))

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
// })

//Middleware for Errors
app.use(errorMiddleware)


module.exports = app;
