const mangoose = require('mongoose');
// const bcrypt = require('bcrypt');

const batchesSchema = new mangoose.Schema({
    date: {
        type: String,
        required: true
    },
    th: {
        type: String,
        required: true
    },
    mmyy: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    mentorName: {
        type: String,
        required: true
    },

    mentorPosition: {
        type: String,
        required: true
    },
    scholarshippercent: {
        type: String,
        required: true
    },
    scholarshipRupee: {
        type: String,
        required: true
    },
    limitedseats: {
        type: String,
        required: true
    },

})


const Batch = mangoose.model('BATCHES', batchesSchema);

module.exports = Batch