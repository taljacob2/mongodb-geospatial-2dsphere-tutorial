const mongoose = require('mongoose');


const connectAsync = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB is connected to DB ${process.env.DB_DATABASE}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};


module.exports = connectAsync
