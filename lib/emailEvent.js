const events = require('events');
const {execute} = require('./send');

const EmailEvent = new events.EventEmitter();



EmailEvent.on('accountCreated',(account)=>{
    setImmediate(()=>{
        execute(account).catch(console.error);
    })
})


module.exports={
    EmailEvent
}