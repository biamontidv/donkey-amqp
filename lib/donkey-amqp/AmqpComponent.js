var util = require(process.binding('natives').util ? 'util' : 'sys');
var Component = require('donkey/lib/node-donkey/components/Component');
var AmqpTopicEndpoint = require('./AmqpTopicEndpoint');
var AmqpQueueEndpoint = require('./AmqpQueueEndpoint');
var amqp = require('amqp');

var AmqpComponent = module.exports = function AmqpComponent(options){
    Component.call(this,options);
};

util.inherits(AmqpComponent,Component);

AmqpComponent.prototype.createEndpoint = function(options){
    console.log('creating amqp endpoint');
    var endp = null;
    var connection = amqp.createConnection({'host': '127.0.0.1', 'port': 5672});
    // select the right enpoint, expecting something like:
    // path: [topic:|queue:]destinationName
    var cpath = options.path.split(':');
    console.log(cpath);
    if('queue' === cpath[0]) {
        console.log('queue');
        endp = new AmqpQueueEndpoint({'uri':options.uri,'path':cpath.pop(),'param':options.param,'connection':connection});
    } else {
        console.log('topic or empty');
        endp = new AmqpTopicEndpoint({'uri':options.uri,'path':cpath.pop(),'param':options.param,'connection':connection});
    }        
    return endp;
};

