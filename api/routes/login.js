const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
const KEY = `${process.env.KEY}`;
const mysql = require('mysql')

const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database: `${process.env.DB_NAME}`,
    password: `${process.env.DB_PASS}`,
})

router.post('/', (req, res, next) => {

    password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    username = req.body.username;

    const sqlQuery = `SELECT * FROM users WHERE username = '${username}' and password = '${password}';`;

    con.query(sqlQuery, function (err, row) {

        var userId, userUsername;

        try {
            if (row.length > 0) {
                var payload = {
                    username: req.body.username,
                }
                row.forEach((intRow) => {
                    userId = intRow.id;
                    userUsername = intRow.username;
                });

                var token = jwt.sign(payload, KEY, { algorithm: 'HS256' });
                console.log("Logged In");

                res.status(201).json({
                    token: token,
                    id: userId,
                    username: userUsername,
                    password: req.body.password
                })
            } else {
                console.error("Failure in login.js");
                console.log(err);
                res.sendStatus(202);
            }
        } catch{
            console.log('Error in login.js');
        }
    });

});

module.exports = router;