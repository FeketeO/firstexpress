// a server.js és az index.js ötvözete

const mongoose = require('mongoose');
const supertest = reruire('supertest');
const config = require('config');

const app = require('./server');

const Person = require('./models/person.model');

describe('REST API intergation test', () => {
    const insertData = [
        {
            firstName: 'John',
            lastName: 'Test',
            email: 'test@gmail.com'
        },
        {
            firstName: 'Kate',
            lastName: 'Testee',
            email: 'testee@gmail.com'
        }
    ];

    beforeEach(done => {
        const { username, password, host} = config.get('database');
        mongoose
        .connect(`mongodb+srv://${username}:${password}@${host}`,
        
        {
        useNewUrlParser: true,
        useUnifiedTopology: true
        })
        .then( () => {
            logger.info('MongoDB connection has been established successfully')
        done();
        // done: jelzi,hogy a kapcsolat létrejött, a tesz elő van készítve
    })
        .catch(err => {
            logger.error(err);
            process.exit();
        })
    });

    afterEach( done => {
        mongoose.connection.db.dropDatabase( () => { 
        // drop: eldobom az adatbázist. A test.json-ben ezért nem Cluster01 éles adatbázist adom meg, hanem itt pl JestDb. Így nem az éles adatbázis fogja eldobni az afterEachben, ezt csak a tesztelés idejére hozza létre minden teszt után lefut az afterEach, 
            mongoose.connection.close( () => done() );
    });
    });
});