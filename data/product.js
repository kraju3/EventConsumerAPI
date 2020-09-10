const schema = require('mongoose').Schema;
const mongoose = require('mongoose')
const ProductSchema = new schema({
    "messageId":{type:Number},
    "name":{type:String},
    "info":{type:Object}
})


const ProductModel = mongoose.model('Products',ProductSchema)


module.exports={
    ProductModel
}