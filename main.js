const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
<<<<<<< HEAD
const session = require('express-session');
const MongoStore = require('connect-mongo');

const passport = require('passport');
require('./authentication/index.strategy');


const {connectDb} = require('./utils/db/db');
const DB_URL =  process.env.MONGO_DB_URL;
=======
const cors = require('cors');

const {connectDb} = require('./utils/db/db');
const DB_URL = process.env.MONGO_DB_URL;
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

<<<<<<< HEAD
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}))

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
=======


const userRouter = require('./routes/user.routes');
const RecipesRoutes = require('./routes/recipes.routes')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { ServerApiVersion } = require('mongoose/node_modules/mongodb');


require('./authentication/index.strategy'); // Requerimos nuestro archivo de configuración

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

//usamos session. Configuramos sesion.
//Es la cookie de sesion que se quedara activa el tiempo que le digamos
//esta cookie la hemos obtenido del id en el serializer en index.strategy.js
app.use(
    session({
        secret:  process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24*60*60*1000,
        },

        store: MongoStore.create({ mongoUrl: DB_URL })
    })
)

// Ainicializamos passport
app.use(passport.initialize())
//para que passport trabaje con sesiones
app.use(passport.session())
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b

connectDb();




//transform data posted to json - limit 5MB
app.use(express.json ({
    limit:'5mb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '5mb'
}));


<<<<<<< HEAD
app.use('/recipes', RecipesRoutes);
app.use('/user', UserRouter);
=======

app.use('/recipes', RecipesRoutes)
app.use('/user', userRouter);
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b

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
