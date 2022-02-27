const mongoose = require('mongoose');
const Recipe = require('../models/recipes.model');

require('dotenv').config()

const urlDB = process.env.MONGO_DB_URL
console.log(urlDB);

const recipes = [
    {
        title: 'Muffins de avena y chocolate',
        type: 'dessert',
        category: 'american',
        ingredients: ['cacao', 'harina de avena', 'azúcar de coco', 'levadura', 'huevo', 'leche', 'nueces', 'aceite'],
        description:'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum',
        img:'https://a.storyblok.com/f/120479/305ae468ee/muffins-de-chocolate-1.jpg'
    },
    {
        title: 'Risotto',
        type: 'lunch',
        category: 'italian',
        ingredients: ['arroz', 'setas', 'vino', 'cebolla', 'esparrago', 'queso', 'trufa', 'caldo'],
        description:'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum',
        img:'https://www.palancares.com/wp-content/uploads/2020/09/RISOTTO-DE-SETAS.jpg'
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