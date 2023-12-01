const mangoose = require('mongoose');
// const bcrypt = require('bcrypt');

const managerSchema = new mangoose.Schema({
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


const Manager = mangoose.model('MANAGER', managerSchema);

module.exports = Manager