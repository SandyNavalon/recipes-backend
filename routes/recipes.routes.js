const router = require ('express').Router();
<<<<<<< HEAD
const { upload, uploadToCloudinary } = require('../middlewares/file.middleware');

const {getAllRecipes, getRecipe, postRecipe, deleteRecipe, patchRecipe} = require('../controllers/recipes.controller')
=======
const {upload , uploadToCloudinary} = require ('../middleware/file.middleware');

>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b

const {getAllRecipes, getRecipe, postRecipe, deleteRecipe, patchRecipe} = require('../controllers/recipes.controller')

<<<<<<< HEAD
router.post('/create',[upload.single('img'), uploadToCloudinary], postRecipe)

=======


router.post('/create',[upload.single('img'), uploadToCloudinary],  postRecipe)
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b
router.get('/', getAllRecipes)
router.get('/:id', getRecipe)
router.delete('/:id', deleteRecipe)
//el patch busca y modifica
router.patch('/:id', patchRecipe)

router.delete('/:id', deleteRecipe)

router.patch('/:id', patchRecipe)

module.exports= router;