# listen-to-postgresql
Listen to PostgreSQL notifications and print them to standard output

## Usage

Download dependencies with:

```
npm install
```

Start with:

```
node server.js channel_name
```

or

```
node server.js channel_name postgres:///egull
```

The first parameter is the name of the channel to connect to (required).
The second parameter is the connection string to the database (optional).

For more details, including the description of the output format, see the
documentation at the start of [server.js][./server.js].

## Example

In a terminal window, start the server from current folder:

```
$ node server.js chat
```

The server prints its status (on standard error):

```
Connected to: postgres:///egull
Listening to: chat
```

In another terminal window, run the `psql` client and publish a message:

```
$ psql -d egull
egull=# NOTIFY chat, 'hello';
NOTIFY
```

The server prints the message received:

```
[chat]
hello
[/chat]
```

You can stop the server by sending it a `SIGINT` signal using Ctr+C.
