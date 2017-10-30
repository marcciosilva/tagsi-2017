/**
 * Created by marccio on 10/9/17.
 */
const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const dataUrl = "mongodb://localhost:27017/tagsi";

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

// Add headers for CORS.
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://ec59f4c5.ngrok.io');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

/**
 * Doesn't receive params, and returns an array of objects were each object has two properties: 'line' (number)
 * and 'destination' (string).
 */
app.get('/getLines', function (req, res) {
    try {
        console.log('Query is: ' + JSON.stringify(req.query));
        mongoClient.connect(dataUrl, function (err, db) {
            if (err) {
                res.send({msg: 'An error occurred when accessing the DB.'});
                return;
            }
            // Get only line and destination, and sort by line and destination in ascending order.
            db.collection('lineasParadas').aggregate([{
                "$group": {
                    "_id": {
                        "line": "$line",
                        "destination": "$destination"
                    }
                }
            }, {"$sort": {"_id.line": 1, "_id.destination": 1}}]).toArray(function (err, result) {
                console.log('Data loaded successfully');
                db.close();
                if (err) {
                    res.send({msg: 'An unexpected error occurred.'});
                    return;
                }
                var lines = [];
                result.forEach(function (individualResult) {
                    lines.push({line: individualResult['_id'].line, destination: individualResult['_id'].destination});
                });
                if (lines.length > 0) res.send(lines);
                else res.send({msg: 'No lines were found.'});
                console.log('err is ' + err);
                console.log(lines);
            });
        });
    } catch (err) {
        res.send({msg: 'An unexpected error occurred.'});
    }
});

/**
 * Receives 'line' (number) and 'destination' (string) and returns array of objects with 'lat' and 'lng' properties
 * (or an error object which only contains a 'msg' property explaning the error).
 */
app.get('/getLine', function (req, res) {
    try {
        console.log('Query is: ' + JSON.stringify(req.query));
        var line = req.query.line;
        var destination = req.query.destination;
        mongoClient.connect(dataUrl, function (err, db) {
            if (err) {
                res.send({msg: 'An error occurred when accessing the DB.'});
                return;
            }
            // Only return lat and lng.
            db.collection('lineasParadas').find({
                line: line,
                destination: destination
            }, {lat: 1, lng: 1, _id: 0})
                .toArray(function (err, result) {
                    console.log('Data loaded successfully');
                    db.close();
                    if (err) {
                        res.send({msg: 'An unexpected error occurred.'});
                        return;
                    }
                    if (result.length > 0) res.send(result);
                    else res.send({msg: 'No lines were found.'});
                    console.log(result);
                });
        });
    } catch (err) {
        res.send({msg: 'An unexpected error occurred.'});
    }
});