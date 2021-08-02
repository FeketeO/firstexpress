// a server.js és az index.js ötvözete
const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const Person = require('./models/person.model');
const { response } = require('express');

describe('REST API integration tests', () => {
    const insertData = [
        {
            firstName: 'John',
            lastName: 'Test',
            email: 'john@test.com'
        },
        {
            firstName: 'Kate',
            lastName: 'Test',
            email: 'kate@test.com'
        }
    ];

    beforeEach(done => {
        const { username, password, host } = config.get('database');
        mongoose
            .connect(`mongodb+srv://${username}:${password}@${host}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                // logger.info('MongoDB connection has been established successfully')
                done();
                // done: jelzi,hogy a kapcsolat létrejött, a tesz elő van készítve
            })
            .catch(err => {
                logger.error(err);
                process.exit();
            });
    });

    afterEach(done => {
        mongoose.connection.db.dropDatabase(() => {
            // drop: eldobom az adatbázist. A test.json-ben ezért nem Cluster01 éles adatbázist adom meg, hanem itt pl JestDb. Így nem az éles adatbázis fogja eldobni az afterEachben, ezt csak a tesztelés idejére hozza létre minden teszt után lefut az afterEach, 
            mongoose.connection.close(() => done())
        });
    });

    // tesztfüggvénnyel csináljuk a tényleges tesztelést, melyben előbb létrehozzuk az usereket majd lekérjük őket
    
    test('GET /person', () => {
        return Person.insertMany(insertData)
            .then(() => supertest(app).get('/person').expect(200))
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(insertData.length);

                response.body.forEach((person, index) => {
                    expect(person.firstName).toBe(insertData[index].firstName);
                    expect(person.lastName).toBe(insertData[index].lastName);
                    expect(person.email).toBe(insertData[index].email);
                });
            });

    });
});