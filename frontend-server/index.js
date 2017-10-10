/**
 * Created by marccio on 10/9/17.
 */
const express = require('express')
const app = express()
var data;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getLines', function (req, res) {
    // Doesn't receive params, and returns an array of objects were each object has two properties: 'line' (number) and
    // 'destination' (string).
    console.log('Query is: ' + req.query); // Get params.
    try {
        var lines = [];
        // TODO improve performance.
        var currentLine;
        var currentDestination;
        data.forEach(function (dataPoint) {
            if (dataPoint.line !== currentLine && dataPoint.destination !== currentDestination) {
                lines.push({line: dataPoint.line, destination: dataPoint.destination});
                currentLine = dataPoint.line;
                currentDestination = dataPoint.destination;
            }
        });
        console.log(lines);
        if (lines.length > 0) res.send(lines);
        else res.send({msg: 'No lines were found.'});
    } catch (err) {
        res.send({msg: 'An unexpected error occurred.'});
    }
});

app.get('/getLine', function (req, res) {
    // Receives 'line' (number) and 'destination' (string) and returns array of objects with 'lat' and 'lng' properties
    // (or an error object which only contains a 'msg' property explaning the error).
    console.log('Query is: ' + req.query); // Get params.
    try {
        var line = req.query.line;
        var destination = req.query.destination;
        // TODO handle error cases.
        var stops = [];
        var foundLine = false;
        data.forEach(function (dataPoint) {
            // TODO improve performance by breaking from this loop if data is ordered and already went past desired line.
            if (dataPoint.line === line && dataPoint.destination === destination) {
                foundLine = true;
                stops.push({lat: dataPoint.lat, lng: dataPoint.lng}); // TODO cambiar cuando los datos esten bien
            }
        });
        if (foundLine) res.send(stops);
        else res.send({msg: 'The requested line could not be found.'});
    } catch (err) {
        res.send({msg: 'An unexpected error occurred.'});
    }
    // res.send();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
    console.log('Loading dummy data...');
    try {
        // TODO get object from backend.
        data = require("./assets/data.json");
        console.log('Data loaded successfully');
    } catch (err) {
        console.log('Something went wrong while loading the data...');
    }
})