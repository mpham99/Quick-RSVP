# Quick-RSVP

Hey there! This is my **Quick-RSVP** project - a simple but effective event management and RSVP system I built using Node.js, Express, and SQLite. I wanted to create something lightweight that could handle events and track who's coming without all the complexity of bigger platforms.

## 🚀 What It Does

- **Event Management**: I can create, edit, and delete events with all the basics - name, description, date, location, and how many people can attend
- **RSVP System**: Guests can easily RSVP with their name, email, and how many people they're bringing
- **Real-time Updates**: The search works instantly as you type, so finding events is super quick
- **Responsive Design**: I used Bootstrap 5 so it looks good on phones, tablets, and desktops
- **SQLite Database**: Everything stores in a simple file - no need for a separate database server

## 🛠️ What I Built It With

- **Backend**: Node.js + Express.js for the server
- **Database**: SQLite3 for storing all the data
- **Template Engine**: Mustache.js for dynamic pages
- **Frontend**: HTML, CSS, JavaScript, and Bootstrap 5 for the UI
- **HTTP Client**: Axios for making requests

## 📋 What You Need

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## 🚀 How to Get It Running

1. **Get the code**
   ```bash
   git clone <repository-url>
   cd Quick-RSVP
   ```

2. **Install the packages**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   cd database
   node initdb.js
   cd ..
   ```

4. **Start it up**
   ```bash
   node app.ctrl.js
   ```

5. **Open your browser**
   Go to `http://localhost:8081`

## 🗄️ How the Data is Organized

### Events Table
- `id` - Unique identifier (auto-generated)
- `name` - What the event is called
- `description` - Details about the event
- `date` - When it happens (stored as Julian day number)
- `location` - Where it's happening
- `max_attendees` - How many people can come

### RSVPs Table
- `id` - Unique identifier (auto-generated)
- `event_id` - Links to which event
- `name` - Who's coming
- `email` - Their contact info
- `attendees` - How many people they're bringing

## 📁 How I Organized the Code

```
Quick-RSVP/
├── app.ctrl.js          # Main server file - handles all the routes
├── database/
│   ├── app.db          # The actual database file
│   └── initdb.js       # Script to set up the database with sample data
├── models/
│   ├── event.model.js  # Handles all event data operations
│   └── rsvp.model.js   # Handles all RSVP data operations
├── public/              # Static files (CSS, JS, images)
│   ├── event_script.js # JavaScript for event management
│   ├── rsvp_script.js  # JavaScript for RSVP management
│   └── icon.svg        # App icon
├── views/               # HTML templates using Mustache
│   ├── events.mustache # Page that shows all events
│   ├── rsvps.mustache  # Page that shows RSVPs for an event
│   ├── header.mustache # Top part of every page
│   ├── footer.mustache # Bottom part of every page
│   └── modals/         # Pop-up forms for adding/editing
└── package.json         # Lists all the packages I'm using
```

## 🔧 What You Can Do With It

### Events
- `GET /` - See all events
- `GET /event/add` - Create a new event
- `GET /event/update/:id` - Change an existing event
- `GET /event/delete/:id` - Remove an event

### RSVPs
- `GET /event/rsvps/:event_id` - See who's coming to a specific event
- `GET /rsvps/add` - Add someone's RSVP
- `GET /rsvps/delete/:id` - Remove an RSVP

## 🎯 How to Use It

1. **Creating Events**: Just click "Add Event" and fill in the details
2. **Managing Events**: Use the edit and delete buttons to change things up
3. **RSVP Management**: Click "RSVP" on any event to see who's coming and manage the list
4. **Search**: Type in the search bar to quickly find specific events

## 🚀 Where You Can Run It

I designed this to be super easy to get running:

1. **Local Development**: Just run `node app.ctrl.js` and you're good to go
2. **Production**: You can put this on any Node.js hosting service
3. **Database**: The SQLite file goes wherever you put the app - no separate database needed

## 🤝 Want to Help Out?

I'd love contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - check out the [LICENSE](LICENSE) file for the details.

## 🐛 Things I Know Need Work

- I'm using GET requests for everything (including deleting stuff) - not ideal but it works for now
- Date handling uses Julian day numbers because SQLite works better with them
- No user accounts or login system yet

## 🔮 What I Want to Add Next

- [x] User accounts and login system
- [x] Proper REST API (POST/PUT/DELETE instead of just GET)
- [ ] Email notifications when people RSVP
- [ ] Event categories and tags
- [ ] Calendar view to see all events
- [ ] Export RSVP lists to CSV/Excel
- [ ] Maybe a mobile app companion

## 📞 Need Help?

If you run into issues or have questions, just open an issue on the GitHub repository and I'll help you out!

---

**Quick-RSVP** - My take on making event management simple and efficient! 🎉
