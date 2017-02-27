# listen-to-postgresql
Listen to PostgreSQL notifications and print them to standard output

## Usage

Download dependencies with:

```
npm install
```

Start with:

```
node server.js channel_name postgres:///database_name
```

The first parameter is the name of the channel to connect to.
The second parameter is the connection string to the database.
Both parameters are required.

For more details, including the description of the output format, see the
documentation at the start of [server.js][./server.js].

## Example

After having created a database, e.g. 'chatdb':

```
$ createdb chatdb
```

Start the server from current folder:

```
$ node server.js chat postgres:///chatdb
```

The server prints its status (on standard error):

```
Connected to: postgres:///chatdb
Listening to: chat
```

In another terminal window, run the `psql` client and publish a message:

```
$ psql -d chatdb
egull=# NOTIFY chat, 'hello';
NOTIFY
```

The server prints the message received:

```
[chat]
hello
[/chat]
```

You can stop the server by sending it a `SIGINT` signal using Ctr+C,
quit the `psql` client with `\q`, and drop the example database with:

```
$ dropdb chatdb
```

## License

Copyright 2017 eGull SAS  
Licensed under the [Apache License, Version 2.0]
(http://www.apache.org/licenses/LICENSE-2.0)
