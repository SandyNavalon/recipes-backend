const mongoose = require ('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const urlDB = process.env.MONGO_DB_URL;
console.log(urlDB);

const connectDb = async () => {
    try{
<<<<<<< HEAD
        const db = await mongoose.connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true });
        const {name, host} = db.connection;

        console.log(`Connected to DB: ${name} at host ${host}`);
=======
        const db = await mongoose.connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true } );
        const {name, port, host} = db.connection;

        console.log(name);
        console.log(`Connected to DB: ${name} at host ${host}: ${port}`);
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b

    } catch(error) {
        console.log('Error connecting to DB', error)
    }
};

module.exports = {
    urlDB,
    connectDb
}