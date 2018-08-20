const assert = require('assert');
const User = require('../src/user');
describe('Reading user out of database', () => {
    let joe, maria, alex, zach;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        alex = new User({name: 'Alex'});
        maria = new User({name: 'Maria'});
        zach = new User({name: 'Zach'});
        Promise.all([alex.save(), maria.save(), joe.save(), zach.save()])
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

    it('can skip and limit result set', (done) => {
        User.find({})
        .sort({ name: 1 })
        .skip(1)
        .limit(2)
            .then((users) => {
                assert(users[0].name === 'Joe')
                assert(users[1].name === 'Maria')
                assert(users.length === 2);
                done();
            })
    });
});