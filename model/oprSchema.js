const mangoose = require('mongoose');
// const bcrypt = require('bcrypt');

const oprSchema = new mangoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    para: {
        type: String,

    },



})


const Opr = mangoose.model('OPR', oprSchema);

module.exports = Opr