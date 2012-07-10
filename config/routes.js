module.exports = function(app) {

  // Controllers
//  var test         = require('../app/controllers/test')(app);
  var scores        = require('../app/controllers/scores')(app);

  // Public endpoints
  app.post('/scores/get', scores.getForMatches);
};
