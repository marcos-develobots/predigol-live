
const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongooseTypes = require("mongoose-types");

mongooseTypes.loadTypes(mongoose);


var MatchModel = module.exports = new Schema({
  team_home      : { type: String, required: true },
  team_away       : { type: String, required: true },
  score_home          : { type: String, required: true },
  score_away          : { type: String, required: true },
  status          : { type: String, required: true },
  date_created   : { type: Date, default: Date.now },
  date_updated   : { type: Date }
});