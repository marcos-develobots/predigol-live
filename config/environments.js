var Pusher = require('pusher')

module.exports = function(app){

  var port = process.env.PORT || 4000
    , push;

  app.configure('local', function (){

    // Setup pusher

    push = new Pusher({
        appId  : '23309'
      , appKey : '132b00cf6a2d1819d599'
      , secret : 'ee55803406c5a1e1f049'
    })

    this
      .set('host', 'localhost')
      .set('port', port)
      .set('ENV','local')
  });

  app.configure('production', function (){

    // Setup pusher

    push = new Pusher({
        appId  : '22981'
      , appKey : '5302964dca8fadf6bbe0'
      , secret : 'eddb1f82a15d29b201c6'
    });

    this
      .set('host', 'node-blog-example.herokuapp.com')
      .set('port', port)
      .set('ENV','production')
  });

  // Set pusher
  app
    //.set('pusher', { 'test_channel': push.channel('test_channel') })
    .set('pusher', push)
    .set('pusher_key', push.options.appKey)

  return app

}
