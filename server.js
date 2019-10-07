const express = require('express');
const AccountsRouter = require('./accounts/AccountsRouter');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send('<h1>DB Helper with knex</h1>')
})

module.exports = server;