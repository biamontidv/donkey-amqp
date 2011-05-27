var util = require(process.binding('natives').util ? 'util' : 'sys');
var Consumer = require('donkey/lib/node-donkey/components/Consumer');
var Exchange = require('donkey/lib/node-donkey/Exchange');

var AmqpConsumer = module.exports = function AmqpConsumer(options){
    Consumer.call(this,options);
    var self = this;
    this.connection.on('ready',function(){
        var queue = self.connection.queue(Math.random().toString());
        queue.bind(self.endpoint.producer.amqpExchange.name,'#');
        queue.subscribe(handlemsg);
        console.log('['+self.constructor.name+'-'+self.endpoint.uri+'] emitting ready for first time');
        self.emit('ready');        
    });
    
    
    var handlemsg = function(message){
        var ex = new Exchange();
        ex.setIn(message.data.toString('utf8'));
        self.emit('exchangeOut',ex);
    };
    
    
};
util.inherits(AmqpConsumer, Consumer);
