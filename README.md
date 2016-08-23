# Hidropoio - Horta Hidropônica Inteligente e Sustentável

![hidropoino]()

**Visão geral**
Imagine um sistema hidropônico sustentável e inteligente, que não necessitará da interversão humana em algumas atividades. O projeto proposto aborda agentes inteligentes, sensores e atuadores, entre outras tecnologias e técnicas, onde realizarão o controle de todas as variáveis do sistema, necessárias para a produção de alguns tipos de hortaliças e frutas em domicilio, tudo isso visando qualidade na alimentação, economia de água, sustentabilidade e baixo custo.

Hidropoino é um protótipo experimental para explorar como é fácil de misturar [Arduino] (https://www.arduino.cc/), [Socket.io] (http://socket.io/) eo [Web HTML5 Speech API] (https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html) (Speech & Síntese) para fazer exatamente isso.

**Como funciona**
Há 3 partes principais:

1. Aplicação Aurdino: * Escrito em C++ para a saída dos dados dos sensores *
2. roteiro Socket.io: * Lê e transmite os dados do sensor como JSON *
3. roteiro HTML5: * Lê os dados excutes reconhecimento de fala e síntese de fala usando o [HTML5 Web Speech API] (https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html) *

## Requisitos de hardware

* LM35 Temp Sensor
* Soil higrômetro Detecção de Umidade
* Sensor de luz
* Arduino Mega

## Requisitos de Software / dependências

* [Node] (https://nodejs.org/en/) use a versão 0.10.46
* [NPM] (https://www.npmjs.com/) 
* [SerialPort] (https://www.npmjs.com/package/serialport-js)
* [Socket.io] (http://socket.io/)
* [Express] (https://expressjs.com/)
* [Crypto] (https://www.npmjs.com/package/crypto-js)
* [Nodemon] (https://www.npmjs.com/package/nodemon)
* [neDB] (https://www.npmjs.com/package/nedb)

## Instalação e Uso

** Diragram Fitzing: **
![hidropoino Fritzing]()

**Passo a passo:**

1. Fork do repo
2. NPM de instalação para instalar as dependências do nó
3. Conecte-se George como acima (você pode também trabalhar fora de fiação através da leitura do code-arduino.ino)
4. Faça upload do code-arduino.ino para o Arduino Uno usando o Arduino IDE
5. app.js nó Executar e visita https: // localhost: 8000 para interagir com Hidropoino

## License
MIT

## Créditos
