const mongoose = require('mongoose');
const Recipe = require('../models/recipes.model');

require('dotenv').config()

const urlDB = process.env.MONGO_DB_URL
console.log(urlDB);

const recipes = [
    {
        title: 'Muffins de avena y chocolate',

    }
];

mongoose
    .connect(urlDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allRecipes = await Recipe.find();
        if(allRecipes.length) {
            await Recipe.collection.drop();
            console.info('Deleted database')
        }
    })
    .catch((err) => console.error(`Error deleting data: ${err}`))
    .then(async () => {
        await Recipe.insertMany(recipes);
        console.info('Created database')
    })
    .catch((err) => console.error (`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());