/**
 * Load dependencies
 */

const mongoose = require('mongoose');

require('express-mongoose');

/**
 * Exports
 */

module.exports = function() {

  //  Load models
  mongoose.model('MatchModel', require('../app/models/match'));
};
