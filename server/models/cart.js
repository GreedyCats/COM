var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    packageList: [{
        packageID:{
            type:Schema.Types.ObjectId,
            ref:'Package'
        },
        count: {
            type: Number,
            default: 1
        }
    }]
});

var cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;
