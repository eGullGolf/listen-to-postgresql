/*
  Listen to PosgreSQL notifications and print messages to standard output

  Usage:
    node server.js channelName [pgConnectionString]

  Parameters:
    ($0 - node executable path)
    ($1 - script path)
    $2 - required, string, the name of the LISTEN/NOTIFY channel
    $3 - required, string, the connection string to connect to the
         PostgreSQL database, e.g. 'postgres:///database_name' to
         connect to the 'database_name' database on the local host

  Output:
    Prints messages received from the given channel in following format:

      [channel_name]
      ...
      [/channel_name]

    where [channel_name] and [/channel_name] display the name of the channel,
    and enclose the payload of the message received.

  License:
    Copyright 2017 eGull SAS

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

const USAGE = "Usage: node server.js channelName pgConnectionString";

function main() {
  var
    channelName = process.argv[2],
    pgConnectionString = process.argv[3];

  if (
    typeof channelName !== "string"
    || typeof pgConnectionString !== "string"
  ) {
    console.error( USAGE );
    process.exitCode = 1;
    return;
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
