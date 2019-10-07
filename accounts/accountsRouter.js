const express = require('express');
const knex = require('knex');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: 'There was an error getting budgets'
        })
    })
})

module.exports = router;