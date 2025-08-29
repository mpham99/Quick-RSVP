var sqlite3 = require("sqlite3").verbose();
var bcrypt = require("bcryptjs");
var db = new sqlite3.Database("database/app.db");

// Create a new user with hashed password
function createUser(user, callback) {
    var saltRounds = 10;
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) {
            return callback(err);
        }
        db.run(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            [user.name, user.email, hash],
            function (runErr) {
                if (runErr) {
                    return callback(runErr);
                }
                callback(null, { id: this.lastID, name: user.name, email: user.email });
            }
        );
    });
}

// Get user by email
function getUserByEmail(email, callback) {
    db.get(
        "SELECT id, name, email, password_hash, created_at FROM users WHERE email=?",
        [email],
        function (err, row) {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        }
    );
}

// Get user by id
function getUserById(id, callback) {
    db.get(
        "SELECT id, name, email, password_hash, created_at FROM users WHERE id=?",
        [id],
        function (err, row) {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        }
    );
}

// Verify user with email and password
function verifyUser(email, password, callback) {
    getUserByEmail(email, function (err, user) {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(null, null);
        }
        bcrypt.compare(password, user.password_hash, function (cmpErr, isMatch) {
            if (cmpErr) {
                return callback(cmpErr);
            }
            if (!isMatch) {
                return callback(null, null);
            }
            // Do not expose password_hash to callers
            callback(null, { id: user.id, name: user.name, email: user.email });
        });
    });
}

module.exports = { createUser, getUserByEmail, getUserById, verifyUser }; 