const User = require('../src/user');
const assert = require('assert');

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        joe.remove()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        // Remove bunch of records
        User.remove({ name: 'Joe' })
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findAndRemove', (done) => {
        User.findOneAndRemove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
        
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove({_id: joe._id})
            .then(() => User.find({name: 'Joe'}))
            .then((user) => {
                // console.log(user);
                assert(user.length === 0);
                done();
            });
    });
})