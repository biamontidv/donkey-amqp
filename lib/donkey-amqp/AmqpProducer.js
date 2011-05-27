var util = require(process.binding('natives').util ? 'util' : 'sys');
var Producer = require('donkey/lib/node-donkey/components/Producer');

var AmqpProducer = module.exports = function AmqpProducer(options){
    Producer.call(this,options);
    var self = this;
    this.connection.on('ready',function(){
        self.amqpExchange = self.connection.exchange(self.endpoint.path,{'type':'fanout'});
        console.log('New AMQP exchange created');
        console.log('['+self.constructor.name+'-'+self.endpoint.uri+'] emitting ready for first time');
        self.emit('ready');        
    });
};
util.inherits(AmqpProducer, Producer);

AmqpProducer.prototype.process = function(exchange){
    this.amqpExchange.publish('',exchange.getIn(),{'contentType':'text/plain'});    
};