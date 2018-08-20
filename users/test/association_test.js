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
    });

    it('saves a full realation tree', (done) => {
        User.findOne({name: 'Joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments', 
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                // console.log(user.blogPosts[0].comments[0]);
                assert(user.name === 'Joe')
                assert(user.blogPosts[0].title === 'Title')
                assert(user.blogPosts[0].comments[0].content === 'comment content')
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            })
    })
});