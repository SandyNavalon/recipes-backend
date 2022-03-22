//Cargando el módulo mongoose
const mongoose = require('mongoose');
//Definiendo el schema y creamos su ibjeto correspondiente
const commentSchema = new mongoose.Schema(
    {
        content: {type: String},
        recipeId: {type: mongoose.Types.ObjectId, ref:'recipes'},
        userId: {type: mongoose.Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;
