const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users_test');

mongoose.connection
    .once('open', () => console.log('Good to go!'))
    .on('error', (error) => {
        console.warn('warning', error);
    });

    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
            //Ready for next test!
            done();
        });
    });