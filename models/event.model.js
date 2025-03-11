const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database/app.db");

// Get all events
function getAllEvents(callback) {
    db.all("SELECT id, name, description, date, date(date) as formatted_date, location, max_attendees FROM event",
        function (err, results) { callback(results); });
}

// Get an event by ID
function getEventById(id, callback) {
    db.get("SELECT id, name, description, date, date(date) as formatted_date, location, max_attendees FROM event WHERE id=?",
        [id],
        function (err, result) { callback(result); });
}

// Add a new event
function addEvent(event, callback) {
    db.run("INSERT INTO event (name, description, date, location, max_attendees) VALUES (?, ?, julianday(?), ?, ?)",
        [event.name, event.description, event.date, event.location, event.max_attendees],
        function (err) { callback(); });
}

// Update an existing event
function updateEvent(event, id, callback) {
    db.run("UPDATE event SET name=?, description=?, date=julianday(?), location=?, max_attendees=? WHERE id=?",
        [event.name, event.description, event.date, event.location, event.max_attendees, id],
        function (err) { callback(); });
}

// Delete an event by ID
function deleteEvent(id, callback) {
    db.run("DELETE FROM event WHERE id=?",
        [id],
        function (err) { callback(); });
}

module.exports = { getAllEvents, getEventById, addEvent, updateEvent, deleteEvent };