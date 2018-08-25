// Todo: Create Artist Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    yearsActive: {
        type: Number
    },
    image: {
        type: String
    },
    genre: {
        type: String
    },
    website: {
        type: String
    },
    netWorth: {
        type: Number
    },
    labelName: {
        type: String
    },
    retired: {
        type: Boolean
    },
    Albums: [{
        type: Schema.Types.ObjectId,
        ref: 'album'
    }]

})

ArtistSchema.pre('remove', function(next){
    const Album = mongoose.model('album')
    Album.remove({ _id: { $in: this.Albums }})
        .then(() => next())
})

const Artist  = mongoose.model('artist', ArtistSchema);
module.exports = Artist;