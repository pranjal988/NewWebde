const mangoose = require('mongoose');
// const bcrypt = require('bcrypt');

const greviewSchema = new mangoose.Schema({
    paragraph: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    star: {
        type: Number,
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

const Greview = mangoose.model('GREVIEWS', greviewSchema);

module.exports = Greview