// Todo: create Album Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlbumSchema= new Schema({
    title: {
        type: String
    },
    date: {
        type: Date
    },
    copiesSold: {
        type: Number
    },
    numberTracks: {
        type: String
    },
    image: {
        type: String
    },
    revenue: {
        type: Number
    }
})

const Album = mongoose.model('album', AlbumSchema);
module.exports = Album;