const mongoose = require("mongoose");

mongoose.set('strictQuery', true);



// DB_URI="mongodb+srv://abhay:abhay@cluster0.z5rutco.mongodb.net/?retryWrites=true&w=majority"


const connectDatabase = () => {
    // mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }).then((data) => {
    //     console.log(`Mongodb connected with server: ${data.connection.host}`);
    // })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce", { useNewUrlParser: true }, (err) => {
        if (err) {
            console.log("Mongodb is not connected");
        }

        else {
            console.log("Mongodb is connected");
        }
    })
}
// DB_URI="mongodb+srv://ecommerce:<abhay@1997>@cluster0.z5rutco.mongodb.net/test"

module.exports = connectDatabase;


// DB_URI="mongodb+srv://abhay:abhay@cluster0.z5rutco.mongodb.net/test?retryWrites=true&w=majority"