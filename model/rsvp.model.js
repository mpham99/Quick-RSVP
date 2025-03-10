var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("app.db");

// Get all RSVPs
function getAllRSVPs(callback) {
    db.all("SELECT id, event_id, name, email, attendees FROM rsvp",
        function (err, results) { callback(results); });
}

// Get all RSVPs for a specific event
function getRSVPsByEvent(event_id, callback) {
    db.all("SELECT id, event_id, name, email, attendees FROM rsvp WHERE event_id=?",
        [event_id],
        function (err, results) { callback(results); });
}

// Get a single RSVP by ID
function getRSVPById(id, callback) {
    db.get("SELECT id, event_id, name, email, attendees FROM rsvp WHERE id=?",
        [id],
        function (err, result) { callback(result); });
}

// Add a new RSVP
function addRSVP(rsvp, callback) {
    db.run("INSERT INTO rsvp (event_id, name, email, attendees) VALUES (?, ?, ?, ?)",
        [rsvp.event_id, rsvp.name, rsvp.email, rsvp.attendees],
        function (err) { callback(); });
}

// Update an RSVP
function updateRSVP(rsvp, id, callback) {
    db.run("UPDATE rsvp SET event_id=?, name=?, email=?, attendees=? WHERE id=?",
        [rsvp.event_id, rsvp.name, rsvp.email, rsvp.attendees, id],
        function (err) { callback(); });
}

// Delete an RSVP by ID
function deleteRSVP(id, callback) {
    db.run("DELETE FROM rsvp WHERE id=?",
        [id],
        function (err) { callback(); });
}

module.exports = { getAllRSVPs, getRSVPsByEvent, getRSVPById, addRSVP, updateRSVP, deleteRSVP };