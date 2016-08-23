
// Inclui Bibliotecas
var fs = require("fs"),
express = require("express"),
path = require("path"),
app = express(),
https = require("https"),
io = require("socket.io"),
serialport = require("serialport"),
SerialPort = serialport.SerialPort;

// SSH chaves
var key = fs.readFileSync("public/ssh/key.pem"),
cert = fs.readFileSync("public/ssh/cert.pem")
https_options = {
	key: key,
	cert: cert
};

// Configuração do servidor.
var	PORT = 8000,
HOST = 'localhost',
USB  = '/dev/ttyACM0';

// Inicia HTTPS servidor com socket.io
server = https.createServer(https_options, app).listen(PORT, HOST);
io = io.listen(server);
console.log("Conexão estabelecida com Arduino!");
console.log('HTTPS servidor online em: https://%s:%s', HOST, PORT + " ou Crl+C Stop!");

// Open USB  port
var myPort = new SerialPort(USB, { 
	// look for return and newline at the end of each data packet
	parser: serialport.parsers.readline("\r\n")
});

var connected = false,
user = 0;

// Define route folder for static requests
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/view'));

// Respond to web GET requests with page:
app.get('/', function (request, response) {
	response.sendfile('view/login.html');
});

app.get('/logout', function (request, response) {
	response.sendfile('view/login.html');
});

app.post('/home', function (request, response) {
	response.sendfile('view/home.html');
});

app.get('/home', function (request, response) {
	response.sendfile('view/home.html');
});

app.get('/sobre', function (request, response) {
	response.sendfile('view/sobre.html');
});

app.get('/manual', function (request, response) {
	response.sendfile('view/manual.html');
});

app.get('/diario', function (request, response) {
	response.sendfile('view/diario.html');
});

// Listen for new socket.io connections when browser connected
io.sockets.on('connection', function (socket) {

	if (!connected) {
		// clear out any old data from the serial bufffer:
		myPort.flush(function(){});
		// send a byte to the serial port to ask for data:
		myPort.write('c');
		user++;
		console.log(user+' usuário conectado!');
		connected = true;
	}

	// Handle client disconnect:
	socket.on('disconnect', function () {
		myPort.write('x');
		console.log(user+' usuário desconectado!');
		connected = false;
		user--;
	});

	//
	// Listen for new serial data
	myPort.on('data', function (data) {
		// Convert the string received into a JSON object:
		var serialData = tryParseJSON(data);
		// send a serial event to the web client with the data:
		socket.emit('serialEvent', serialData);
	});
});

function tryParseJSON (jsonString){
	try {
		var o = JSON.parse(jsonString);
		if (o && typeof o === "object" && o !== null) {
			return o;
		}
	}
	catch (e) { }
	return false;
};

/**
 * ==============================================================
 * neBD
 */
var nedb = require("nedb");
var db = new nedb({filename: 'hidropoino.db', autoload: true});

var user = {
	name: "Admin",
	email: "admin@hidropoino.com.br",
	pass: "21072012"
};

//insert
db.insert(user, function(err){
	if(err) return console.log(err);
	console.log("Novo usuário adcionado!");
});

//find user
db.find({name: 'Admin'}, function(err, user){
	if(err) return console.log(err);
	console.log(user);
});

//find email
db.find({email: 'admin@hidropoino.com.br'}, function(err, user){
	if(err) return console.log(err);
	console.log(user);
})

//find pass
db.find({pass: 21072012}, function(err, user){
	if(err) return console.log(err);
	console.log(user);
});


