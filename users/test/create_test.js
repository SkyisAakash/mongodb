const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('Saves new users', (done) => {
        const joe = new User({ name: 'Joe' });
        assert(joe.isNew);
        joe.save()
            .then(() => {
                //Did it save?
                assert(!joe.isNew);
                done();
            });
    });
});