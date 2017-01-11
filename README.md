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
