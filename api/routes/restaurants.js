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


router.get('/', (req, res, next) => {


    sqlQuery = 'SELECT * FROM restaurants ORDER BY id ASC';

    try {
        con.query(sqlQuery, function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                var ress = [];
                var ressImgs = [];
                var ressId = [];
                var ressDescriptions = [];
                var ressRates = [];
                var ressLocations = [];
                var ressTables = [];

                if (rows.length > 0) {

                    rows.forEach((row) => {
                        ress.push(row.name);
                        ressImgs.push(row.image);
                        ressId.push(row.id);
                        ressDescriptions.push(row.description)
                        ressRates.push(row.rate)
                        ressLocations.push(row.location)
                        ressTables.push(row.available_tables)
                    });

                    res.status(201).json({
                        count: rows.length,
                        ressNames: ress,
                        ressImages: ressImgs,
                        ressId: ressId,
                        ressDescriptions: ressDescriptions,
                        ressRates: ressRates,
                        ressLocations: ressLocations,
                        ressTables: ressTables,
                    })

                } else {
                    console.error("Failure in restaurants.js");
                    console.log(err);
                    res.sendStatus(202);
                }
            }
        });
    } catch{
        console.log('Error in restaurants.js');
    }
    
});

module.exports = router;