// Import models
const eventModel = require('./models/event.model');
const rsvpModel = require('./models/rsvp.model');
const userModel = require('./models/user.model');
const config = require('./infra/config');

// Initialize express
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Sessions
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
app.use(session({
    store: new SQLiteStore({ db: "sessions.db", dir: __dirname + "/database" }),
    secret: config.secrets.cookie,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// Expose currentUser to templates
app.use(function (req, res, next) {
    res.locals.currentUser = req.session && req.session.user ? req.session.user : null;
    next();
});

// Auth guard
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Initialize mustache
const mustacheExpress = require("mustache-express");
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// ************************* AUTH ****************************
app.get('/register', function (req, res) {
    res.render('register', { });
});

app.post('/register', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    if (!name || !email || !password) {
        return res.status(400).render('register', { error: 'All fields are required', name: name, email: email });
    }
    userModel.createUser({ name: name, email: email, password: password }, function (err, user) {
        if (err) {
            var msg = 'Failed to register';
            if (err && err.message && err.message.indexOf('UNIQUE') !== -1) {
                msg = 'Email already registered';
            }
            return res.status(400).render('register', { error: msg, name: name, email: email });
        }
        req.session.user = user;
        res.redirect('/');
    });
});

app.get('/login', function (req, res) {
    res.render('login', { });
});

app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) {
        return res.status(400).render('login', { error: 'Email and password are required', email: email });
    }
    userModel.verifyUser(email, password, function (err, user) {
        if (err) {
            return res.status(500).render('login', { error: 'Server error', email: email });
        }
        if (!user) {
            return res.status(401).render('login', { error: 'Invalid credentials', email: email });
        }
        req.session.user = user;
        res.redirect('/');
    });
});

app.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
});

// ************************* EVENTS ****************************
// Default action
app.get('/', isAuthenticated, function(req,res) {
    function renderPage(eventArray) {
        res.render('events', { events: eventArray});
    }
    eventModel.getAllEvents(renderPage);
});

// Delete single event
app.get('/event/delete/:id', isAuthenticated, function(req,res) {
    function returnHome() {res.redirect('/');}
    eventModel.deleteEvent(req.params.id, returnHome);
});

// Create new event
app.get('/event/add', isAuthenticated, function (req, res){
    function returnHome() {res.redirect('/');}
    eventModel.addEvent(req.query, returnHome);
});

// Update single event
app.get('/event/update/:id', isAuthenticated, function (req, res){
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
app.get('/rsvps/add', isAuthenticated, function(req, res) {
    function returnHome() {res.redirect('/event/rsvps/' + req.query.event_id);}
    rsvpModel.addRSVP(req.query, returnHome);
})

// Delete RSVP for a single event
app.get('/rsvps/delete/:id', isAuthenticated, function(req, res) {
    function returnHome() {res.redirect('/event/rsvps/' + req.query.eventId);}
    rsvpModel.deleteRSVP(req.params.id, returnHome)
})

app.get(/^(.*)$/, function(req,res) {
    res.sendFile(__dirname + req.params[0]);
});

// App startup
async function startup() {
    app.listen(8081, function () {
        console.log("App listening on port 8081...");
    });
}
startup();