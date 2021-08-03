const post = require('../../models/post.model');

exports.create = postData => {
    const post = new Post(postdata);
    return post.save();
}