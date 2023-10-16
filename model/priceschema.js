const mangoose = require('mongoose');
// const bcrypt = require('bcrypt');

const batchesSchema = new mangoose.Schema({
    priceindia: {
        type: String,
        required: true
    },
    priceglobal: {
        type: String,
        required: true
    },


})


const Price = mangoose.model('PRICE', batchesSchema);

module.exports = Price