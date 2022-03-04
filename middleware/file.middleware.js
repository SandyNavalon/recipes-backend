const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dlce3cxgc',
    api_key: '278536362975332',
    api_secret: 'Vcqz8CbYPlYomH-aCWQdzerOCM4',
})

//  hemos instalado multer para poder  npm install --save multer
//que sirve para subir archivos a la web. 


const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        //con esto te hace automatico el nombre del archivo. Date le pone la fecha de subida
        callback(null, `${Date.now()}-${file.originalname}`);
    },
    //a donde van las imagenes que subimos
    destination: (req, file, callback) => {
        //esta carpeta la hemos creado manualmente -->
        const directory = path.join(__dirname, '../public/uploads/');
        callback(null, directory);
    },
});

//aqui definimos los formatos de imagen que admitimos
const ACCEPTED_FILE_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg'];


const fileFilter = (req, file, callback) => {
    /**
     * 1. Si el tipo de archivo no coincide con ninguno de nuestro array de ACCEPTED, sacaremos un error
     */

    if(ACCEPTED_FILE_EXTENSIONS.includes(file.mimetype)) {
        // Si incluye la extension Es un mimetype válido
        // Multer por dentro crea el objeto req.file y nos mete la información
        callback(null, true);
    } else {
        // NO es un mimetype válido -> Rechazamos la subida de archivo
        const error = new Error('Invalid file type');
        error.status = 400; // Bad Request
        callback(error, null);
    }
};

const upload = multer({
    storage,
    fileFilter,
});



///SUBE LA IMAGEN A CLOUDINARY
const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        console.log('Subiendo a Cloudinary...');
    
        const filePath = req.file.path;
        const imageFromCloudinary = await cloudinary.uploader.upload(filePath);

        console.log('Imagen subida con éxito', imageFromCloudinary);

        req.photoFromCloudinary = imageFromCloudinary.secure_url;

        //una vez subido el archivo lo borramos de filepath (public/uploads)
        await fs.unlinkSync(filePath);
        return next();
    } else {
        return next();
    }
};

module.exports = { upload, uploadToCloudinary };
