// var debug = require('debug')('app');
/*
* configure an express app to serve our static resources out of the /public directory
*/
process.title = 'pfcls'

var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname+'/www'));

/*
* bind our application to an http server
*/

var server = require('http').Server(app);

/*
* create our socket.io instance
*/

var io = require('socket.io')(server);

/*
* The game data
*/

var game = {
  team: {
    rouge: {
      SOCK: null,
      SYMBOL: null
    },
    bleu: {
      SOCK: null,
      SYMBOL: null
    }
  }
};

/*
* create the router for the game, this is where our game logic lives
*/

var router = require('socket.io-events')();

router.on('player selects team', function (sock, args, next) {
  /*
  * given the team
  */

  var team = args.pop();

  /*
  * and the team is not a valid team
  */

  if (!(team in game.team)) {

    /*
    * then team does not exist
    */

    return console.log('team' +  team + 'does not exist');

  }

  /*
  * and the player isn't already playing for a team
  */

  if (sock.sock.playing.team) {

    /*
    * then we can't play as both teams
    */

    return console.log('spectator already playing for team' +  sock.sock.playing.team );

  }

  /*
  * and the team is already taken
  */

  if (game.team[team].SOCK) {

    return console.log('spectator already playing on teams');
    /*
    * and the the player is already on the team
    */

    if (game.team[team].SOCK === sock.id) {

      /*
      * then the socket is already playing the game
      */

      return console.log('spectator already playing on team');

    }

    /*
    * then the spectator can't play as team
    */

    return console.log('sorry, seat is already taken');

  }

  /*
  * Then store that spectator as the player for the team
  */

  game.team[team].SOCK = sock.id;

  /*
  * And tell the specator we are playing as the team
  */

  sock.sock.playing.team = team;

  /*
  * And tell the spectators the player is playing as the given team
  */

  io.emit('another player has joined', sock.id, team);


});

router.on('player sets a symbol', function (sock, args, next) {

  var team = args.pop(),
    symbol = args.pop();

  game.team[team].SYMBOL = symbol;

  /*
  * And tell the spectators the player has choosen a symbol
  */

  io.emit('another player has choosen', team, symbol);


});

router.on('game restarted', function () {
  /*
  *  Erase symbols from previous game
  */

  for (var prop in game.team) {
    if (!game.team.hasOwnProperty(prop)) continue;

    game.team[prop].SYMBOL = null;
  }

  io.emit('clear symbols');
});

/*
* attach the events router to the game
*/

io.use(router);

/*
* whenever we get a connection we will let everyone know one joined the room
*/

io.on('connection', function (sock) {
  sock.playing = { team: null };

  /*
  * whenever we disconnect we will let everyone know this spectator left
  */

  sock.on('disconnect', function () {

    /*
    * and we are playing on a team
    */
    if (sock.playing.team) {

      /*
      * then clear the player from the team
      */

      game.team[sock.playing.team].SOCK = null;
      game.team[sock.playing.team].SYMBOL = null;

      /*
      * and tell the other players no one is playing on that team
      */

      sock.broadcast.emit('no one is playing for team', sock.playing.team);

      /*
      * and clear the flag that tells the player is playing the team
      */

      sock.playing.team = null;

    }

  });

  /*
  * let the sock who they are
  */

  sock.emit('you are', sock.id);

});

/*
* have the server listen on the app's configured port
*/

server.listen(app.get('port'));
