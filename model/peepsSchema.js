const mangoose = require('mongoose');
// const bcrypt = require('bcrypt');

const peepsSchema = new mangoose.Schema({
    name: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    placedImage: {
        type: String,
        required: true
    },


})

const Peeps = mangoose.model('PEEPS', peepsSchema);

module.exports = Peeps