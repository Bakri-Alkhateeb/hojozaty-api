const express = require('express');
const router = express.Router();
const multer = require('multer');
const mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database: `${process.env.DB_NAME}`,
    password: `${process.env.DB_PASS}`,
})


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './restaurantsImages');
    },
    filename: function (req, file, callback) {
        callback(null, makeid(10) + "-" + file.originalname)
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('resImage'), (req, res, next) => {

    imageName = req.file.path.substring(18);
    console.log(imageName);

    resName = req.body.resName;
    resDescription = req.body.resDescription;
    resLocation = req.body.resLocation;
    resRate = req.body.resRate;
    resTables = req.body.resTables;

    sqlQuery = `insert into restaurants (name, image, description, rate, available_tables, location) VALUES ('${resName}', '${imageName}', '${resDescription}', '${resRate}', '${resTables}', '${resLocation}')`;
    try {
        con.query(sqlQuery, function (err, result) {
            if (err) {
                res.sendStatus(202);
                console.log(req.file.path);
            } else {
                console.log("1 restaurant inserted");
                res.sendStatus(201);
            }
        });
    } catch{
        console.log('Error in resInsert.js');
    }

});


module.exports = router;