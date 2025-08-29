const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

function getEnv(name, fallback) {
	return process.env[name] && process.env[name].trim() !== '' ? process.env[name] : fallback;
}

const devFallbackSecret = crypto.createHash('sha256').update('quick-rsvp-dev-secret').digest('hex');

module.exports = {
	secrets: {
		cookie: getEnv('COOKIE_SECRET', devFallbackSecret)
	}
};