const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const {connectDb} = require('./utils/db/db');
const DB_URL = process.env.MONGO_DB_URL;

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

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

//transform data posted to json
app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

//usamos session. Configuramos sesion.
//Es la cookie de sesion que se quedara activa el tiempo que le digamos
//esta cookie la hemos obtenido del id en el serializer en index.strategy.js
app.use(
    session({
        secret:  process.env.SESSION_SECRET,
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

connectDb();

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
