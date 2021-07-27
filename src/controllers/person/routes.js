const express = require("express")
const data = require('./data')
const createError = require('http-errors');

const controller = express.Router();

controller.get('/', (req, res) => {
    res.json(data)
});
// a fő url itt a / person

// get only one person
controller.get('/:id', (req, res, next) => {
    const person = data.find(person => person.id === Number(req.params.id))
    if (!person) {
        return next(
            new createError.NotFound("Person is not found")
        )
    }
    res.json(person)
});

// create a new person

controller.post('/', (req, res, next) => {
    const {first_name, last_name, email} = req.body
    if (!first_name || !last_name || !email) {
 return next(
     new createError.BadRequest("Missing properties!")
 )
    }
    const newPerson = req.body;
    newPerson.id = data[data.length -1].id + 1;
    data.push(newPerson);

    res.status(201);
    res.json(newPerson)
});

// update
controller.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const index = data.findIndex(person => person.id === Number(id))
    // azért kell betenni number konstruktorba, mert a mongo stringként tárolja az IDkat
    const { first_name, last_name, email} = req.body
    // másik lehetőség: first_name = req.body.firstName, stb. Ehelyett dekonstruálással
    if (!first_name || !last_name || !email) {
        return next(
            new createError.BadRequest("Missing properties!")
        )
           }
    data[index] = {
        id,
        first_name,
        last_name,
        email
    }

    res.status(200);
    res.json(data[index]);
});

// delete one person
controller.delete('/:id', (req, res, next) => {
    const index = data.findIndex(person => person.id === Number(req.params.id))
    data.splice(index, 1);

    if (index === -1) {
        return next(
            new createError.NotFound("Person is not found")
        )
    }

    res.json({})
});
module.exports = controller;
