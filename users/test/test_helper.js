const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//before is executed only one time before test
before((done) => {
    mongoose.connect('mongodb://localhost/users_test');

    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('warning', error);
        });
});


    beforeEach((done) => {
        const { users, comments, blogposts } = mongoose.connection.collections;
        users.drop(() => {
            comments.drop(() => {
                blogposts.drop(() => {
                    done();
                });
            });
        });
    });