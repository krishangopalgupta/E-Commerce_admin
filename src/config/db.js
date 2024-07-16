const mongoose = require("mongoose");

const mongoDbURI =
  "mongodb+srv://krishnagopalgupta94:9ENX2Pf3ixarqYlf@cluster0.fty3mvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDbURI);
        console.log('database connected successfully');
    } catch (error) {
        console.error(error, 'database connection failed');
        process.exit(1);
    }


//   return mongoose.connect(mongoDbURI, () =>
//     console.log("database connected successfully")
//   );
};

module.exports = { connectDB };
