const express = require("express")
const data = require('./data')

const controller = express.Router();

controller.get('/', (req, res) => {
    res.json(data)
});
// a fő url itt a / person

// get only one person
controller.get('/:id', (req, res) => {
    const person = data.find(person => person.id === Number(req.params.id))
    res.json(person)
});




// create a new person

controller.post('/', (req, res) => {
    const newPerson = req.body;
    newPerson.id = data[data.length -1].id + 1;
    data.push(newPerson);

    res.status(201);
    res.json(newPerson)
});

// update
controller.put('/:id', (req, res) => {
    const id = req.params.id;
    const index = data.findIndex(person => person.id === Number(id))
    // azért kell betenni number konstruktorba, mert a mongo stringként tárolja az IDkat
    const { first_name, last_name, email} = req.body
    // másik lehetőség: first_name = req.body.firstName, stb. Ehelyett dekonstruálással
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
controller.delete('/:id', (req, res) => {
    const index = data.findIndex(person => person.id === Number(req.params.id))
    data.splice(index, 1);
    res.json({})
});
module.exports = controller;
