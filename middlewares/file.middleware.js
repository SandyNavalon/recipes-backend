const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

const storage = multer.diskStorage({
        filename:(req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
    },
    destination: (req, file, callback) => {
        const directory = path.join(__dirname, '../public/uploads/');
        callback(null, directory);
    },
});

const ACCEPTED_FILE_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg'];


const fileFilter = (req, file, callback) => {

    if(ACCEPTED_FILE_EXTENSIONS.includes(file.mimetype)) {
        // Es un mimetype válido
        // Multer por dentro crea el objeto req.file y nos mete la información
        callback(null, true);

    } else{
        // NO es un mimetype válido -> Rechazamos la subida de archivo
        const error = new Error('Invalid file type');
        error.status = 400;
        callback(error, null);
    }
};

const upload = multer({
    storage,
    fileFilter,
});



const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {

        try{
        console.log('Subiendo a Cloudinary...');

        const filePath = req.file.path;
        const imageFromCloudinary = await cloudinary.uploader.upload(filePath);

        console.log('Imagen subida con éxito', imageFromCloudinary);

        req.recipeImgFromCloudinary = imageFromCloudinary.secure_url;

        // Borramos el archivo local
        await fs.unlinkSync(filePath);

        return next();

        } catch(error){
            return next(error)
        }
    } else {
        return next();
    }
};

module.exports = { upload, uploadToCloudinary };


