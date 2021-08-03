const post = require('../../models/post.model');
const Person = require('../../models/person.model')

exports.create = postData => {
    const post = new Post(postdata);
    return post.save()
        .then( () => Person.findById(postData.author) )
        .then( author => {
            author.post.push(post._id);
            return author.save
        })
        .then( () => post );
};

exports.findOne = id => Post.findById(id).populate('author');

