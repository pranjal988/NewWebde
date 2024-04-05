const mangoose = require('mongoose');
// const bcrypt = require('bcrypt');

const courseSchema = new mangoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lessons: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    certificates: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: true
    },

})


const Course = mangoose.model('CTEMPS', courseSchema);

module.exports = Course