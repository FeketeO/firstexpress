// http kérések lekezelésére

const createError = require('http-errors');
const logger = require('../../config/logger');
const postService = require('./post.service');

exports.create = (req, res, next) => {
    const {title, body, author} = req.body;
    if (!title || !body || !author) {
        return next(new createError.BadRequest('No title, body or author!'));

    }

    const postData = { 
        title, 
        body, 
        author
    };

    return postService.create(postdata)
     .then( createdPost =>{
         res.status(201);
         res.json(createdPost)
        
        })
     .catch(err => next(new createError.BadRequest(err.message)) );

    //  igazi életben NEM err.message-t küldök, mert a mongosse error válaszából lehet következtetni az adatbázis verziójára, pl, biztonsági szempontból nem jó. Itt most jó lesz, de igazából csináljunk neki egy error-r

};

exports.findOne = (req, res, next) => {
    return postService.findOne(req.params.id)
    .then(post => {
        if (!post) {
            return next(new createError.BadRequest('Post is not found!'));
        }

        res.json();
    })
    .catch( err => {
        return next(new createError.InternalServerError(err.message));
    })
};

