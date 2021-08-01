const { mockRequest, mockResponse} = require('jest-mock-req-res');
// mockRequest, mockResponse --> http kéréseket szimulálnak

const createError = require('http-errors');

const personController = require('./person.controller');
const personService = require('./person.service');

jest.mock('./person.service');
// innen tudja a jest, hogy ne az igazi person.service-t használja, hanem amock mappában lévőt

describe('person controller', () => {
    const mockData = [{
        "id": 1,
        "first_name": "Fiorenze",
        "last_name": "Dyneley",
        "email": "fdyneley0@narod.ru"
    }, {
        "id": 2,
        "first_name": "Owen",
        "last_name": "Jirka",
        "email": "ojirka1@squidoo.com"
    }, {
        "id": 3,
        "first_name": "Terra",
        "last_name": "Hurdman",
        "email": "thurdman2@reverbnation.com"
    }, {
        "id": 4,
        "first_name": "Thomasin",
        "last_name": "de Keep",
        "email": "tdekeep3@fc2.com"
    }, {
        "id": 5,
        "first_name": "Lawrence",
        "last_name": "Tearle",
        "email": "ltearle4@infoseek.co.jp"
    }];

    let response;
    const nextFunction = jest.fn();
    // teszteljük, hogy a next függvény meghívásra kerül-e

    // egy olyan függvény, mely minden teszt előtt lefut, pl beállítja a változókat:
    beforeEach( () => {
        personService.__setMockData(mockData);
        response = mockResponse();
        // mockResponse - egy mockolható response, nem igazi http válasz

    });

    test("find one with valid ID", () => {
        const PERSON_ID = 1;
        const request = mockRequest({
            params: {
                id: PERSON_ID
            }
        });

        return personController.findOne(request, response, nextFunction)
            .then( () => {
                expect(personService.findOne).toBeCalledWith(PERSON_ID);
                expect(response.json).toBeCalledWith(
                    mockData.find( person => person.id === PERSON_ID)
                )
            });
    })
})

// itt most két dolgot néztünk:
// ha a controllernek meghívják a findOne metódusát, akkor meghívásra kerül-e a service findOne metódusa az adott ID-vel,
// és hogy HA igen, akkor a response json a megfelelő adatot kapja-e meg
