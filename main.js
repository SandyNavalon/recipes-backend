const express = require('express');
const dotenv = require('dotenv');

const {connectDb} = require('./utils/db/db');
const cors = require('cors')

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const RecipesRoutes = require('./routes/recipes.routes')
const UserRoutes = require('./routes/user.routes')

connectDb();

//parametros de configuración 
//esto son lentejas. 
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'Content-Type');
    next();
})

//esto del cors es una movida para evitar fallos pero tampoco sabemos mu bien lo que es
app.use(cors({
    origin: ['http://localhost:4000', 'http://localhost:4200'],
    credentials: true,
}));


//transform data posted to json - limit 5MB
app.use(express.json ({
    limit:'5mb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '5mb'
}));

app.use('/recipes', RecipesRoutes)
app.use('/user', UserRoutes)

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
