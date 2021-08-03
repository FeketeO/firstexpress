const express = require('express');
const controller = require('./post.controller');
// a controller használja a post service-t, ami használja a modelt

const router = express.Router();

//FIND
router.get('/post', (req, res, next) => {
    return controller.findOne(req, res, next);
});

//CREATE
router.post('/', (req, res, next) => {
    return controller.create(req, res, next);
});

module.exports = router;
