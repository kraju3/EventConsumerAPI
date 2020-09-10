const amqp = require('amqplib/callback_api');
const CONN_URL = process.env.CONN_URL.toString();
const {EmailEvent} = require('../emailEvent');
const {ProductEvent} = require('../productEvent')

const pid = process.pid;


function work(msg, cb) {
    console.log("Got msg ", msg.content.toString());
    cb(true);
  }
  
function closeOnErr(err) {
    if (!err) return false;
    console.error(`[AMQP] error ${pid}`, err);
    amqpConn.close();
    return true;
  }

function processMsg(msg) {
    work(msg, function(ok) {
    try {
        if (ok)
        ch.ack(msg);
        else
        ch.reject(msg, true);
    } catch (e) {
        closeOnErr(e);
    }

})

}


module.exports={
    EmailEvent,
    consumeFromQ:async(queueName)=>{
       
        amqp.connect(CONN_URL, function (err, conn) {
        if(err) throw err;
        conn.createChannel(function (err_, channel) {
            if(err_) throw err_

            var exchange = 'webappExchange';

            channel.assertExchange(exchange, 'fanout', {
              durable: true
            });
        
        
            console.log(` [*] pid: ${pid} Waiting for messages in %s. To exit press CTRL+C`, queueName);
            channel.bindQueue(queueName, exchange, '');
    
            channel.consume(queueName, function(msg) {
            if(msg.content) {
                console.log(`[x] pid: ${pid} %s`, msg.content.toString());
                EmailEvent.emit('accountCreated',JSON.parse(msg.content.toString()))
                }
                
            }, {
            noAck: true
            });
        
            

        
        })});
    },
    consumeProductFromQueue:async(queueName)=>{
        amqp.connect(CONN_URL, function (err, conn) {
            if(err) throw err;
            conn.createChannel(function (err_, channel) {
                if(err_) throw err_
    
                var exchange = 'productExchange';
    
                channel.assertExchange(exchange, 'fanout', {
                  durable: true
                });
            
            
                console.log(` [*] pid: ${pid} Waiting for messages in %s. To exit press CTRL+C`, queueName);
                channel.bindQueue(queueName, exchange, '');
        
                channel.consume(queueName, function(msg) {
                if(msg.content) {
                    console.log(`[x] pid: ${pid} %s`, msg.content.toString());
                    ProductEvent.emit('productCreated',JSON.parse(msg.content.toString()))
                    }
                
                }, {
                noAck: true
                });

                
                
    
            
            })});
    }
}