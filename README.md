# Hidropoio - Horta Hidropônica Inteligente e Sustentável

![hidropoino]()

**Visão geral**
Imagine se você pudesse conversar com suas plantas da casa e eles lhe dizer se eles precisavam de água, como era quente e até mesmo olhar para você como você anda passado ...

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

* Node
* NPM
* SerialPort
* Socket.io
* Express.io
* Crypto
* Nodemon
* neDB

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
