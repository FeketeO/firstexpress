const express = require('express');
const controller = require('./post.controller');
// a controller használja a post service-t, ami használja a modelt

const router = express.Router();

router.post('/', (req, res, next) => {
    return controller.create(req, rs, next);
});

module.exports = router;
