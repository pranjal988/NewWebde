const mangoose = require('mongoose');
// const bcrypt = require('bcrypt');

const salesSchema = new mangoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },


})


const Sales = mangoose.model('SALES', salesSchema);

module.exports = Sales