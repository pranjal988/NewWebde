const mangoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mangoose.Schema({
    paragraph: {
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
    image: {
        type: String,
        required: true
    },


})

// hashing password
// userSchema.pre('save', async function(next) {
//     console.log('hiiiiii')
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 12);
//         // this.password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// })

const User = mangoose.model('COURSES', userSchema);

module.exports = User