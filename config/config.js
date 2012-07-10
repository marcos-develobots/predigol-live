/**
 *  Load dependencies
 */

const application_root = __dirname
    , express   = require('express')
    , mongoose  = require('mongoose')
    , path  = require('path');

/**
 *  Exports
 */

module.exports = function(app){

  //  Setup DB Connection
  var dblink = process.env.MONGOHQ_URL || 'mongodb://localhost/predigol';
  const db  = mongoose.createConnection(dblink);


  app.configure(function () {
    this
      .use(express.logger('\033[90m:method\033[0m \033[36m:url\033[0m \033[90m:response-time ms\033[0m'))
      .use(express.cookieParser())
      .use(express.bodyParser())
      .use(express.errorHandler({dumpException: true, showStack: true}))
      .use(express.session({ secret: 'JJ-O[(A8AHGe|3}/.q5T,qMVo)92-(0q2,]j*=(}w|dFXlT,E+O_b&UZqnuv;2E&'}))
      .use(express.static(path.join(application_root, "../public")));
  });

  app.configure("production", function () {
    this
      .use(express.logger('\033[90m:method\033[0m \033[36m:url\033[0m \033[90m:response-time ms\033[0m'))
      .use(express.bodyParser())
      .use(express.errorHandler())
  });

  app.configure(function () {
    app.set('db', {
      'main'            : db,
      'match'           : db.model('MatchModel')
    });
    app.set('version', '1.0');
  });

  return app;
};
