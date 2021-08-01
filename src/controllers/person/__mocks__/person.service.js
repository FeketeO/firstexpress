const personService = jest.mock('./person.service.js');

let mockData;

personService.findOne = jest.fn( id => Promise.resolve(
    mockData.find( person => person.id === id)
));

module.exports = personService;