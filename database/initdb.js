var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("app.db");

db.serialize(function () {
    // Drop existing tables if they exist
    db.run("DROP TABLE IF EXISTS event");
    db.run("DROP TABLE IF EXISTS rsvp");
    db.run("DROP TABLE IF EXISTS users");

    // Create event table
    db.run(`CREATE TABLE event (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       description TEXT,
       date REAL NOT NULL,  -- Stored as Julian day number
       location TEXT NOT NULL,
       max_attendees INTEGER NOT NULL
    )`);

    // Create rsvp table
    db.run(`CREATE TABLE rsvp (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      attendees INTEGER NOT NULL,
      FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
    )`);

    // Create users table
    db.run(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )`);

    // Function to insert an event with Julian date conversion in SQL
    function insertEvent(name, description, dateStr, location, max_attendees) {
        db.run(
            `INSERT INTO event (name, description, date, location, max_attendees) 
             VALUES (?, ?, julianday(?), ?, ?)`,
            [name, description, dateStr, location, max_attendees]
        );
    }

    // Insert dummy data into event table
    insertEvent("Blah Blah 2025", "Event for Blah Blah.", "2025-06-15", "Scotiabank Arena", 300);
    insertEvent("NCT127 Concert", "North America leg of the South Korean famous boyband.", "2025-06-15", "Bell Centre", 18000);
    insertEvent("Candle Making Workshop", "A hands-on workshop for candle making.", "2025-06-15", "Happy Hippy Cafe", 50);
    insertEvent("uOttawa Hackathon", "A weekend hackathon focused on building applications.", "2025-06-15", "uOttawa", 200);
    insertEvent("Bluefest 2025", "A music festival featuring live performances from local and worldwide artists.", "2025-06-15", "LeBreton Flat Parks", 20000);

    // Insert dummy data into rsvp table
    db.run("INSERT INTO rsvp (event_id, name, email, attendees) VALUES (?, ?, ?, ?)", [1, "Alice Johnson", "alice@example.com", 2]);
    db.run("INSERT INTO rsvp (event_id, name, email, attendees) VALUES (?, ?, ?, ?)", [1, "John Doe", "john@example.com", 1]);
    db.run("INSERT INTO rsvp (event_id, name, email, attendees) VALUES (?, ?, ?, ?)", [2, "Charlie Angels", "charlie@example.com", 3]);
    db.run("INSERT INTO rsvp (event_id, name, email, attendees) VALUES (?, ?, ?, ?)", [3, "Diane Warren", "diane@example.com", 5]);
    db.run("INSERT INTO rsvp (event_id, name, email, attendees) VALUES (?, ?, ?, ?)", [4, "Calvin Klein", "calin@example.com", 2]);

    console.log("Database initialized successfully with Julian day numbers.");
});

db.close();