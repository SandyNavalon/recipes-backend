const router = require ('express').Router()

const {postNewUser, loginUser, getAllUsers, logoutUser} = require('../controllers/user.controller')

router.post('/register', postNewUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)
router.get('/logout', logoutUser )


module.exports= router;