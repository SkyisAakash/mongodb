const assert = require('assert');
const User = require('../src/user');
describe('Reading user out of database', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
        .then(() => done());
    })
    it('Finds all the users with name joe', (done) => {
        User.find({ name: 'Joe' })
            .then((users) => {
                // console.log(users);
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('Finds a user with a perticular id', (done)=> {
        User.findOne({ _id: joe._id })
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            });
    });
});