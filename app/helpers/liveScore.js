var phantom = require('phantom');

var app, db, pusher, helper = {};
module.exports = function (_app) {
  app = _app;
  return helper;
};

helper.get = function(aMatches, aCountry, aCallback) {
  if (aCountry)
    aCountry = aCountry.replace(" ", "").trim().toLowerCase();
  else
    aCountry = "";
  phantom.create(function(ph) {
    return ph.createPage(function(page) {
      return page.open("http://www.livescore.com/soccer/" + aCountry, function(status) {
        if (status == "success") {
          page.injectJs('jquery.min.js');
        }
        return evaluate(page,(function(aMatches) {
          var results = [];

          $.each(aMatches, function(aIndex, aMatch) {
            var matches = $('table[width|="468"] tr:contains("' + aMatch.team_home + '"):contains("' + aMatch.team_away + '")');

            if (matches.length == 0 || $(matches[0]).text().indexOf(aMatch.team_home) > $(matches[0]).text().indexOf(aMatch.team_away))
              return;

            var scores = $(matches[0]).children("td").get(2);
            scores = $(scores).text().split(" - ");

            if (scores.length != 2)
              return;

            results.push({"team_home" : aMatch.team_home, "team_away" : aMatch.team_away, "score_home" : scores[0], "score_away" : scores[1]});
          });

          return results;
        }), function(result) {
          console.log(result);
          aCallback(result);
          return ph.exit();
        }, aMatches);
      });
    });
  });
};

/*
 * This function wraps WebPage.evaluate, and offers the possibility to pass
 * parameters into the webpage function. The PhantomJS issue is here:
 *
 *   http://code.google.com/p/phantomjs/issues/detail?id=132
 *
 * This is from comment #43.
 */
function evaluate(page, func, callback) {
  var args = [].slice.call(arguments, 3);
  var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
  return page.evaluate(fn, callback);
}