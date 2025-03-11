// Import models
const eventModel = require('./models/event.model');
const rsvpModel = require('./models/rsvp.model');

// Initialize express
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Initialize mustache
const mustacheExpress = require("mustache-express");
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// ************************* EVENTS ****************************
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

// ************************* RSVPS ****************************
// Get all RSVP for a single event
app.get('/event/rsvps/:event_id', function (req, res) {
    function renderPage(rsvpsArray) {
        res.render('rsvps', { rsvps: rsvpsArray, event_id: req.params.event_id});
    }
    rsvpModel.getRSVPsByEvent(req.params.event_id, renderPage);
})

// Add RSVP for a single event
app.get('/rsvps/add', function(req, res) {
    function returnHome() {res.redirect('/event/rsvps/' + req.query.event_id);}
    rsvpModel.addRSVP(req.query, returnHome);
})

app.get(/^(.+)$/, function(req,res) {
    res.sendFile(__dirname + req.params[0]);
});

// App startup
async function startup() {
    app.listen(8081, function () {
        console.log("App listening on port 8081...");
    });
}
startup();