const User = require('../src/user');
const assert = require('assert');

describe('Updating records', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('instance type using set n save', (done) => {
        joe.set('name','Alex');
        assertName(joe.save(), done);
    });

    it('can update a model instance', (done) => {
        assertName(joe.update({name: 'Alex'}), done);
    })

});

