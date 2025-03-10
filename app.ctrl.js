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

// App startup
async function startup() {
    app.listen(8081, function () {
        console.log("App listening on port 8081...");
    });
}
startup();