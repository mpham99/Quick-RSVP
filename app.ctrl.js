// Import models
const eventModel = require('./models/event.model');
const rsvpModel = require('./models/rsvp.model');

// Initialize express
const express = require("express");
const app = express();
app.use(express.json());
const path = require('path');
app.use(express.static(__dirname + "/public"));

// Initialize mustache
const mustacheExpress = require("mustache-express");
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// ************************* CONTROLLER ACTIONS ****************************
// Default action
app.get('/', function(req,res) {
    function renderPage(eventArray) {
        res.render('events', { events: eventArray});
    }
    eventModel.getAllEvents(renderPage);
});

// Delete single event
app.get('/event/delete/:id', function(req,res) {
    function returnHome() {res.redirect('/');}
    eventModel.deleteEvent(req.params.id, returnHome);
});

// Create new event
app.get('/event/add', function (req, res){
    function returnHome() {res.redirect('/');}
    eventModel.addEvent(req.query, returnHome);
});

// Update single event
app.get('/event/update/:id', function (req, res){
    function returnHome() {res.redirect('/');}
    eventModel.updateEvent(req.query, req.params.id, returnHome);
})

// App startup
async function startup() {
    app.listen(8081, function () {
        console.log("App listening on port 8081...");
    });
}
startup();