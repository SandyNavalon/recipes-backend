const mongoose = require ('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const urlDB = process.env.MONGO_DB_URL;
console.log(urlDB);



const connectDb = async () => {
    try{
        const db = await mongoose.connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true } );
        const {name, host} = db.connection;

        console.log(name);
        console.log(`Connected to DB: ${name} at host ${host}`);

    } catch(error) {
        console.log('Error connecting to DB')
    }
};

module.exports = {
    connectDb
}