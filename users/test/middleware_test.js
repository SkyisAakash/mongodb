const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');

describe('Middleware', () => {
    let joe, blogPost;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'blogpost title', content: 'blogpost content'})
        // comment = new Comment({content: 'comment content'})
        joe.blogPosts.push(blogPost);
        // blogPost.comments.push(comment);
        // comment.user = joe;

        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
        });

        it('users clean up dangling blogposts upon deletion', (done)=> {
            joe.remove()
                .then(() => BlogPost.count())
                .then((count) => {
                    assert(count === 0)
                    done();
                })
        
    })
})