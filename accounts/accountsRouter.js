const express = require('express');
const knex = require('knex');

// database access using knex
const db = require('../data/dbConfig');

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

// GET accounts by ID
router.get('/:id', (req, res) => {
    db('accounts')
    .where('id', '=', req.params.id)
    .first()
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: 'The id of the account does NOT exist'
        })
    })
})

// POST accounts
router.post('/', (req, res) => {
    const accountData = req.body;
    if(!req.body){
        res.status(404).json({
            message: 'Could NOT add account to the database'
        })
    } else {
        db('accounts')
        .insert(accountData)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(err => {
            console.log(err.response)
            res.status(500).json({
                errorMessage: 'account ID does not exist'
            })
        })
    }
})

// UPDATE accounts
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if(!id || !changes){
        res.status(404).json({
            error: 'Please provide an name and budget'
        })
    } else {
        db('accounts')
        .where({ id: id })
        .update(changes)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            console.log(err.response)
            res.status(500).json({
                errorMessage: 'Error can NOT update account'
            })
        })
    }
})

// DELETE accounts
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('accounts')
    .where({ id: id })
    .del()
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: 'Error deleting account'
        })
    })
})

module.exports = router;