const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('requires a username', () => {
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        // user.validate((validationResult)=> {

        // });
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required.')
    });

    it('requries a username longer than 2 characters', () => {
        const user = new User({name: 'A'});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters')
    });

    it('disallows invalid record from being saved', (done) => {
        const user = new User({name:'A'});
        user.save()
            .catch((validationResult) => {
                const {message} = validationResult.errors.name;
                assert(message === 'Name must be longer than 2 characters')
                done();
            })
    })
});