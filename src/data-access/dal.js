const mongoose = require('mongoose');


const connectAsync = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info(`MongoDB is connected to DB ${process.env.DB_DATABASE}`);
    } catch (err) {
        logger.error(err.message);
        process.exit(1);
    }
};


module.exports = connectAsync
