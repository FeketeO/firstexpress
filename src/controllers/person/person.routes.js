const express = require('express');
const controller = require('./person.controller');

const router = express.Router();

//create
router.post('/', (req, res, next) => {
    return controller.create(req, res, next);
});

//READ 
// FIND ALL
router.get('/', (req, res, next) => {
    return controller.findAll(req, res, next);
});

// FIND ONE
router.get('/:id', (req, res, next) => {
    return controller.findAll(req, res, next);
});

// UPDATE
router.put('/:id', (req, res, next) => {
    return controller.update(req, res, next);
});

//DELETE
router.delete('/:id', (req, res, next) => {
    return controller.delete(req, res, next);
});

module.exports = router;