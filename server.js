const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");

const app = express();
app.use(express.json());

let db;

//// EVENTS CRUD Endpoints
// GET all events
app.get("/api/events", async function (req, res) {
    const data = await db.all("SELECT id, name, description, date, datetime(date) as readable_date, location, max_attendees FROM event");
    res.json(data);
});

// GET a single event by ID
app.get("/api/events/:id", async function (req, res) {
    const data = await db.get("SELECT id, name, description, date, datetime(date) as readable_date, location, max_attendees FROM event WHERE id=?", [req.params.id]);
    res.json(data);
});

// PUT - Update a single event
app.put("/api/events/:id", async function (req, res) {
    const event = req.body;
    await db.run("UPDATE event SET name=?, description=?, date=julianday(?), location=?, max_attendees=? WHERE id=?",
        [event.name, event.description, event.date, event.location, event.max_attendees, req.params.id]);
    res.json({ response: "EVENT UPDATED" });
});

// DELETE - Delete a single event by ID
app.delete("/api/events/:id", async function (req, res) {
    await db.run("DELETE FROM event WHERE id=?", [req.params.id]);
    res.json({ response: "EVENT DELETED" });
});

// POST - Insert a new event
app.post("/api/events", async function (req, res) {
    const event = req.body;
    await db.run("INSERT INTO event (name, description, date, location, max_attendees) VALUES (?, ?, julianday(?), ?, ?)",
        [event.name, event.description, event.date, event.location, event.max_attendees]);
    res.json({ response: "CREATED NEW EVENT" });
});

// App startup
async function startup() {
    db = await sqlite.open({
        filename: "database/app.db",
        driver: sqlite3.Database
    });
    app.listen(3000, function () {
        console.log("App listening on port 3000...");
    });
}

startup();