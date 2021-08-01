controller.get('/', async (req, res) => {
    const people = await Person.find();
        logger.debug(`Get all people, returning ${people.length} items.`);
        res.json(people);
    });


// get only one person : itt kell az ID. 
// controller.get('/:id', (req, res, next) => {
//     const person = data.find(person => person.id === Number(req.params.id))
//     if (!person) {
//         return next(
//             new createError.NotFound("Person is not found")
//         )
//     }
//     res.json(person)
// });

// A mongosse-nak van egy speckó methodja : findByID

controller.get('/:id', async (req, res, next) => {
    const person = await Person.findById(req.params.id);
    if (!person) {
        return next(new createError.NotFound("Person is not found"));
    }
    res.json(person)
    
    });

    //CREATE
    // const newPerson = req.body; --> mongoose Person-jét használom ezentúl alant
    controller.post('/', (req, res, next) => {
     const {first_name, last_name, email} = req.body;
     if ( !first_name || !last_name || email) {
         return next (
             new createError.BadRequest("Missing properties!")
         )
     }
     const newPerson = new Person({
        firstName: first_name,
        lastName: last_name,
        email: email 
     });

    newPerson.save()
    .then( data => {
         res.status(201);
         res.json(data);
    });
});

    
    // newPerson.id = data[data.length -1].id + 1; --> no SQL-tól kap mongoose óta egy ID-t, így ez nem kell
    // data.push(newPerson); --> így a push sem kell
// a save() method végzi el a módosítások mentését az adatbázisba:
// res.status(201);
//     res.json(newPerson)
//     függvényen belülre kerül, ezt küldöm vissza a böngésző számára a mentés után
    

// update
controller.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    // // const index = data.findIndex(person => person.id === Number(id)) kivehejtük mongoose miatt
    // azért kell betenni number konstruktorba, mert a mongo stringként tárolja az IDkat
    const { first_name, last_name, email} = req.body
    // másik lehetőség: first_name = req.body.firstName, stb. Ehelyett dekonstruálással
    if (!first_name || !last_name || !email) {
        return next(
            new createError.BadRequest("Missing properties!")
        )
           }

           const update = {
            firstName: first_name,
            lastName: last_name,
            email: email 
           }
 let person = {};
           try{
               person = await Person.findByIdAndUpdate(id, update, 
                {new: true,
                useFindAndModify: false});
           }
           catch(err) {
            return next(
                new createError.BadRequest(err)
            )
           }
           return res.json(person);
        //    new: true: ha eddig nem létezett, akkor most létrehozza
    
});

// delete one person
controller.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const person = await Person.findByIdAndDelete(id);
    }
    catch(err) {
        new createError.NotFound("Person is not found")
    }

    res.json({})
});