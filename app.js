'use strict';

/*  *************** serveur Web *********************   */

var express = require('express');
var exp = express();
exp.use(express.static(__dirname + '/www'));
exp.get('/', function (req, res){
    console.log('Reponse a un client');
    res.sendFile(__dirname + '/www/textchat.html');
});

exp.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Erreur serveur express');
});

/*  *************** serveur WebSocket express *********************   */
// 
var expressWs = require('express-ws')(exp);

// Connexion des clients à la WebSocket /echo et evenements associés 
exp.ws('/echo', function (ws, req) {

    console.log('Connection WebSocket %s sur le port %s',
        req.connection.remoteAddress, req.connection.remotePort);

    ws.on('message', function (message) {
        console.log('De %s %s, message :%s', req.connection.remoteAddress,
            req.connection.remotePort, message);
        ws.send(message);
    });

    ws.on('close', function (reasonCode, description) {
        console.log('Deconnexion WebSocket %s sur le port %s',
            req.connection.remoteAddress, req.connection.remotePort);
    });

}); 

/*  ****** Serveur web et WebSocket en ecoute sur le port 80  ********   */
//  
var portServ = 80;
exp.listen(portServ, function () {
    console.log('Serveur en ecoute');
}); 

/*  ***************** Connexion au serveur WebSocket ********************   */ 
// 
function ConnexionAuServeurWebsocket() { 
    ws = new WebSocket('ws://' + ipServeur + '/echo'); 
 
    ws.onclose = function (evt) { 
        window.alert('WebSocket close'); 
    }; 
 
    ws.onopen = function () { 
        console.log('WebSocket open'); 
    }; 
 
    ws.onmessage = function (evt) { 
        document.getElementById('messageRecu').value = evt.data; 
    }; 
} 
 
function ControleIHM(){ 
    document.getElementById('Envoyer').onclick = BPEnvoyer; 
} 
 
function BPEnvoyer(){ 
    ws.send(document.getElementById('messageEnvoi').value); 
} 

console.log('TP CIEL');