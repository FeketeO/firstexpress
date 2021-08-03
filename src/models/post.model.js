const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const PostSchema = mongoose.Schema({
    title: {
        title: String, 
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    }
},
{
    timeStamps: true
}

);

PostSchema.plugin(idValidator);

module.exports = mongoose.model('Post', PostSchema)