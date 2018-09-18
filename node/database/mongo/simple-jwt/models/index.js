const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = mongoose.createConnection(DB_URL);
