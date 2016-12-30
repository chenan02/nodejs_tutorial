var net = require('net');
var chatServer = net.createServer();
var clientList = [];

chatServer.on('connection', function(client) {
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.write("Hi, " + client.name + '\n');
    clientList.push(client);
    notifyOthersConnection(client);

    client.on('data',function(data) {
        broadcast(client, data);
    });

    client.on('end', function() {
        clientList.splice(clientList.indexOf(client), 1);
    })
});

function broadcast(client, message) {
    for(var i = 0; i < clientList.length; ++i) {
        if(client != clientList[i]) {
            clientList[i].write(client.name + ": " + message);
        }
    }
}

function notifyOthersConnection(client) {
    for(var i = 0; i < clientList.length; ++i) {
        if(client != clientList[i]) {
            clientList[i].write(client.name + " has joined the conversation\n");
        }
    }
}

chatServer.listen(9000)