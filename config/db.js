const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery',true);
        const con = await mongoose.connect(process.env.MONGO_URI)
        
        console.log(`Mongodb connected : ${con.connection.host}`);        
    } catch (err) {
        console.log(err);
    }

}

module.exports = connectDB