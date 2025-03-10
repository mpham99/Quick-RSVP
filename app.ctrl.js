// Import models
const eventModel = require('./model/event.model');
const rsvpModel = require('./model/rsvp.model');

// Initialize express
const express = require("express");
const app = express();
app.use(express.json());

// App startup
async function startup() {
    app.listen(8081, function () {
        console.log("App listening on port 3000...");
    });
}

startup();