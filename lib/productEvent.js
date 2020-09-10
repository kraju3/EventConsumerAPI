const events = require('events');

const {executeProduct} = require('./send')

const ProductEvent = new events.EventEmitter();



ProductEvent.on('productCreated',(product)=>{
    setImmediate(()=>{
        executeProduct(product).catch(console.error);
    })
})


module.exports={
    ProductEvent
}