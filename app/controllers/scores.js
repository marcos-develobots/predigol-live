var app, db, controller = {};
module.exports = function (_app) {
  app = _app;
  db  = app.set('db');
  liveScore = require("../helpers/liveScore")(app);
  return controller
};

controller.getForMatches = function(req, res, next) {
  return liveScore.get(req.body.matches, req.body.country,function(aResult) {
    return res.json({"result" : aResult});
  });
};
