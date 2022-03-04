const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const passport = require('passport');
require('./authentication/index.strategy');


const {connectDb} = require('./utils/db/db');
const DB_URL =  process.env.MONGO_DB_URL;

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(
    session(
        {
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 10 * 24 * 60 * 60 * 1000,
            },
            store: MongoStore.create({ mongoUrl: DB_URL })
    })
);

app.use(passport.initialize());
app.use(passport.session());

const RecipesRoutes = require('./routes/recipes.routes');
const UserRouter = require('./routes/user.routes');

connectDb();

//transform data posted to json - limit 5MB
app.use(express.json ({
    limit:'5mb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '5mb'
}));


app.use('/recipes', RecipesRoutes);
app.use('/user', UserRouter);

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
