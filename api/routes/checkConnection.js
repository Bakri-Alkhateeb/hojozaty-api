const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database: `${process.env.DB_NAME}`,
    password: `${process.env.DB_PASS}`,
})

try {
    router.get('/', (req, res, next) => {
        res.sendStatus(201);
    });
} catch{
    console.log('Error');
}

module.exports = router;