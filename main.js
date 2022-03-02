const express = require('express');
const dotenv = require('dotenv');

const {connectDb} = require('./utils/db/db');

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const userRouter = require('./routes/user.routes');
const RecipesRoutes = require('./routes/recipes.routes')
const passport = require('passport');


require('./authentication/passport'); // Requerimos nuestro archivo de configuración

connectDb();

// Añadimos el nuevo middleware al servidor
app.use(passport.initialize())


//transform data posted to json - limit 5MB
app.use(express.json ({
    limit:'5mb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '5mb'
}));

app.use('/recipes', RecipesRoutes)
app.use('/user', userRouter);

//control route 404
app.use('*', (req, res, next) => {
    const error = new Error()
    error.message = 'Route not found'
    error.status = 404
    return next(error)
});

//control error
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message)
});

app.disable('x-powered-by');

app.listen(PORT, () => {
    console.log('Server is running at localhost: ' + PORT);
});
