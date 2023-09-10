const mongoose = require("mongoose");

mongoose.set('strictQuery', true);





const connectDatabase = async () => {

    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log("Mongodb is not connected");
        }

        else {
            console.log(`Mongodb is connected with ->-> ${process.env.DB_URI}`);

        }
    })
}


module.exports = connectDatabase;


