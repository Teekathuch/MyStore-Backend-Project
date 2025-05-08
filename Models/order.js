const mongoose = require('mongoose')

OrderSchema = mongoose.Schema({
    product : {
        type : mongoose.Schema.ObjectId,
        ref:'Product',
        required : true,
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref:'User',
        required : true,
    },
    amount : {
        type : Number,
        min : 1,
        required: true,
    },
    createAt :{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('Order', OrderSchema)