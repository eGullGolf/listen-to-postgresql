/*
  Listen to PosgreSQL notifications and print messages to standard output

  Usage:
    node server.js channelName [pgConnectionString]

  Parameters:
    ($0 - node executable path)
    ($1 - script path)
    $2 - required, string, the name of the LISTEN/NOTIFY channel
    $3 - optional, string, the connection string to connect to the
         PostgreSQL database, defaults to 'postgres:///egull' to
         connect to the 'egull' database on the local host

  Output:
    Prints messages received from the given channel in following format:

      [channel_name]
      ...
      [/channel_name]

    where [channel_name] and [/channel_name] display the name of the channel,
    and enclose the payload of the message received.
*/

const DEFAULT_PG_CONNECTION_STRING = 'postgres:///egull';
const USAGE = "Usage: node server.js channelName [pgConnectionString]";

function main() {
  var
    channelName = process.argv[2],
    pgConnectionString = process.argv[3];

  if ( typeof channelName !== "string" ) {
    console.error( USAGE );
    process.exitCode = 1;
    return;
  }
  if ( typeof pgConnectionString !== "string" ) {
    pgConnectionString = DEFAULT_PG_CONNECTION_STRING;
  }

  var pg = require('pg');
  var client = new pg.Client( pgConnectionString );
  client.connect();
  console.error( 'Connected to: ' + pgConnectionString );

  client.on( 'notification', function( message ) {
    console.log( '[' + message.channel + ']' );
    console.log( message.payload );
    console.log( '[/' + message.channel + ']' );
  });
  client.query( 'LISTEN "' + channelName + '"' );
  console.error( 'Listening to: ' + channelName );
}

main();
