const User = require('../src/user');
const assert = require('assert');

describe('Updating records', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({name: 'Joe', postCount: 0});
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

    it('can update a model class', (done) => {
        assertName(
        User.update({ name: 'Joe' }, {name: 'Alex'}),
        done
        );
    });

    it('can update one record using model class', (done) => {
        assertName(
            User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
            done
        );
    });

    it('can find a record using record id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
            done
        );
    });

    it('can increment postcount by 1', (done) => {
        User.update({name:'Joe'}, {$inc: {postCount: 10}})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.postCount === 10);
                done();
            });
    });

});

