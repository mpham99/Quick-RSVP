const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    secrets: {
        cookie: process.env.COOKIE_SECRET,
    }
}