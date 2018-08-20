const User = require('../src/user')
const assert = require('assert')
const mongoose = require('mongoose')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogpost')

describe('Associations', () => {
    let joe, blogPost, comment;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'Title', content: 'blogpost content'});
        comment = new Comment({content: 'comment content'})
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;
        // console.log(blogPost);
        // joe.save();
        // blogPost.save();
        // comment.save();

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('saves a relation betweena  user and a blogpost', (done) => {
        User.findOne({name: 'Joe'})
            .populate('blogPosts')
            .then((user) => {
                // console.log(user);
                assert(user.blogPosts[0].title === 'Title')
                done();
            })
    })
});