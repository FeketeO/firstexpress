const express = require("express")
// const data = require('./data');
// const Person = require('../../models/person.model');
const createError = require('http-errors');
// const logger = require('../../config/logger')

const personService = require('./person.service')
// const controller = express.Router();




    //CREATE
    
    exports.create = (req, res, next) => {
        const {first_name, last_name, email} = req.body;
        if ( !first_name || !last_name || !email) {
            return next (
                new createError.BadRequest("Missing properties!")
            );
        }

        const newPerson = {
           firstName: first_name,
           lastName: last_name,
           email: email 
        };

        return personService.create(newPerson)
            .then( createdPerson => {
                res.status(201);
                res.json(createdPerson);
            })
            .catch(err => 
                next( new createError.InternalServerError(err.message)))
            };
    

    // GET ALL

    exports.findAll = (req, res, next) => {
        return personService.findAll()
        .then(people => {
            res.json(people)
        });
    };

    // GET ONE

    exports.findOne = (req, res, next) => {
        return personService.findOne(req.params.id)
        .then( person => {
            if (!person) {
                return next(new createError.NotFound("Person is not found"))
            }
            return person
        });
    };

// update

exports.update = (req, res, next) => {
    const id = req.params.id;
    const  {first_name, last_name, email} = req.body;
        if (!first_name || last_name || email) {
            return next(
                new createError.BadRequest("Missing properties!")
            );
        }
        const update = {
            firstName = first_name,
            lastName = last_name,
            email = email
        };

        return personService.update(req.params.id, update)
        .then(person => {
            res.json(person);
        })
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        });

};

// delete one person
exports. delete = (req, res, next) => {
    return personService.delete(req.params.id)
        .then( () => res.json({}) )
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        } );
    };
    
