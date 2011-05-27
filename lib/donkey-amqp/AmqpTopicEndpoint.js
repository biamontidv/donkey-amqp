var util = require(process.binding('natives').util ? 'util' : 'sys');
var Endpoint = require('donkey/lib/node-donkey/components/Endpoint');
var AmqpProducer = require('./AmqpProducer');
var AmqpConsumer = require('./AmqpConsumer');


var AmqpTopicEndpoint = module.exports = function AmqpTopicEndpoint(options){
    Endpoint.call(this,options);
    this.binding = options.path;
    var self = this;
    self.producer = self.createProducer();
    self.consumer = self.createConsumer();
    

    

};
util.inherits(AmqpTopicEndpoint, Endpoint);

AmqpTopicEndpoint.prototype.createProducer = function(callback){
    return new AmqpProducer({'endpoint':this,'connection':this.connection});
};
AmqpTopicEndpoint.prototype.createConsumer = function(){
    return new AmqpConsumer({'endpoint':this,'connection':this.connection});
};

AmqpTopicEndpoint.prototype.initialise = function(){};