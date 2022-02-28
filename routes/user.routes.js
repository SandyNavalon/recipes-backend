const router = require ('express').Router()

const {postNewUser, loginUser, getAllUsers} = require('../controllers/user.controller')

router.post('/register', postNewUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)


module.exports= router;