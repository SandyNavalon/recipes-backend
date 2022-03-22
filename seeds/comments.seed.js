const mongoose = require('mongoose');
const Comment = require('../models/comments.model');

require('dotenv').config()

const urlDB = process.env.MONGO_DB_URL
console.log(urlDB);

const comments = [
    {
        content : 'Los muffins estan buenisimos, animate a probarlos',
        recipeId : '62390a7714a3b51c8b11bb3c',
        userId : '62390a6d6791064b60741148'
    }
];

mongoose
    .connect(urlDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allComments = await Comment.find();
        if(allComments.length) {
            await Comment.collection.drop();
            console.info('Deleted database')
        }
    })
    .catch((err) => console.error(`Error deleting data: ${err}`))
    .then(async () => {
        await Comment.insertMany(comments);
        console.info('Created database')
    })
    .catch((err) => console.error (`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());
