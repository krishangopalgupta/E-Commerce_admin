const app = require('./index');
const dotenv = require('dotenv');
const { connectDB } = require("./config/db");


dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, async()=> {
    await connectDB();
    console.log(`server is running at ${PORT}`);
})