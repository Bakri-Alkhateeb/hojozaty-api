const exphotels = require('express');
const router = exphotels.Router();
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

    sqlQuery = 'SELECT * FROM hotels ORDER BY id ASC';

    try {
        con.query(sqlQuery, function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                var hotelsNames = [];
                var hotelsImages = [];
                var hotelsIds = [];
                var hotelsDescriptions = [];
                var hotelsRates = [];
                var hotelsLocations = [];
                var hotelsTables = [];

                if (rows.length > 0) {

                    rows.forEach((row) => {
                        hotelsNames.push(row.name);
                        hotelsImages.push(row.image);
                        hotelsIds.push(row.id);
                        hotelsDescriptions.push(row.description)
                        hotelsRates.push(row.rate)
                        hotelsLocations.push(row.location)
                        hotelsTables.push(row.available_rooms)
                    });

                    res.status(201).json({
                        count: rows.length,
                        hotelsNames: hotelsNames,
                        hotelsImages: hotelsImages,
                        hotelsIds: hotelsIds,
                        hotelsDescriptions: hotelsDescriptions,
                        hotelsRates: hotelsRates,
                        hotelsLocations: hotelsLocations,
                        hotelsTables: hotelsTables,
                    })

                } else {
                    console.error("Failure in hotels.js");
                    console.log(err);
                    res.sendStatus(202);
                }
            }
        });
    } catch{
        console.log('Error in hotels.js');
    }
});

module.exports = router;