const schema = require('mongoose').Schema;
const mongoose = require('mongoose')
const EventSchema = new schema({
    "messageId":{type:String},
    "url":{type:String},
    "info":{type:Object}
})


const EventModel = mongoose.model('Events',EventSchema)


module.exports={
    EventModel
}