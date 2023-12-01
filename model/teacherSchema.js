const mangoose = require('mongoose');
// const bcrypt = require('bcrypt');

const teacherSchema = new mangoose.Schema({
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


const Teacher = mangoose.model('TEACHER', teacherSchema);

module.exports = Teacher