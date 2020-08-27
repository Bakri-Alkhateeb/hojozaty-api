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


router.post('/', (req, res, next) => {

    tableName = req.body.tableName;
    id = req.body.Id;
    userId = req.body.userId;
    columnName = "";
    availablePlaces = 0;

    if (tableName == 'hotels') {
        columnName = 'available_rooms'
    } else {
        columnName = 'available_tables'
    }
    sqlQuery = `SELECT ${columnName} FROM ${tableName} where id = ${id}`;

    try {
        con.query(sqlQuery, function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {

                if (rows[0][`${columnName}`] > 0) {

                    availablePlaces = rows[0][`${columnName}`] - 1;

                    sqlQuery2 = `UPDATE ${tableName} SET ${columnName} = ${availablePlaces} where id = ${id}`;

                    try {
                        con.query(sqlQuery2, function (err, rows, fields) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.status(201).json({
                                    availablePlaces: availablePlaces
                                });
                            }
                        });
                    } catch{
                        console.log('Error in reservations.js');
                    }

                } else {
                    res.sendStatus(202);
                }
            }
        });
    } catch{
        console.log('Error in reservations.js');
    }
});

module.exports = router;