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
    sqlQuery = 'SELECT * FROM cafes ORDER BY id ASC';

    try {
        con.query(sqlQuery, function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                var cafesNames = [];
                var cafesImages = [];
                var cafesIds = [];
                var cafesDescriptions = [];
                var cafesRates = [];
                var cafesLocations = [];
                var cafesTables = [];

                if (rows.length > 0) {

                    rows.forEach((row) => {
                        cafesNames.push(row.name);
                        cafesImages.push(row.image);
                        cafesIds.push(row.id);
                        cafesDescriptions.push(row.description)
                        cafesRates.push(row.rate)
                        cafesLocations.push(row.location)
                        cafesTables.push(row.available_tables)
                    });

                    res.status(201).json(    {
                        count: rows.length,
                        cafesNames: cafesNames,
                        cafesImages: cafesImages,
                        cafesIds: cafesIds,
                        cafesDescriptions: cafesDescriptions,
                        cafesRates: cafesRates,
                        cafesLocations: cafesLocations,
                        cafesTables: cafesTables,
                    }   )

                } else {
                    console.error("Failure in cafes.js");
                    console.log(err);
                    res.sendStatus(202);
                }
            }
        });
    } catch{
        console.log('Error in cafes.js');
    }
});

module.exports = router;