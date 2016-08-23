var https = require("https");
var fs = require("fs");

var options = {
  key: fs.readFileSync("public/ssh/key.pem"),
  cert: fs.readFileSync("public/ssh/cert.pem")
};

var a = https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("Hidropoino test sucess!\n");
}).listen(8000);

console.log("Servidor on-line em: https://localhost:8000 ou Ctrl+C para Desconected Servidor.");