# MAKE: George (the talking plant)

![MAKE George the talking plant](http://make.analogfolk.com/wp-content/uploads/2015/02/george-825x310.jpg)

**Overview**  
Imagine if you could talk to your house plants and they would tell you if they needed water, how hot it was and even look at you as you walk past...  

George is an experimental prototype to explore how easy it is to mix [Arduino](https://www.arduino.cc/), [Socket.io](http://socket.io/) and the [HTML5 Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html) (Speech & Synthesis) to do just that.

An article about George can be found on the [AnalogFolk MAKE website](http://make.analogfolk.com/george-the-talking-plant/). This repo contains the code and steps to set up your very own George.

**How it works**  
There are 3 main parts to George:

1. Aurdino application: *Written in C++ to output the data from the sensors*
2. Socket.io script: *Reads and broadcasts the sensor data as JSON*
3. HTML5 script: *Reads the data excutes speech recognition and speech synthesis using the [HTML5 Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html)*

## Hardware requirements

A George MAKE kit can be [purchased from ETSY](http://anfo.lk/buygeorge).

Alternatively you can source your own hardware from the list below (*but we can't guarantee the code will work with parts you source yourself*):

* LM35 Temp Sensor
* Soil Hygrometer Humidity Detection
* PIR Motion Sensor
* MAX7219 8x8 LED Dot Matrix Display
* Light Sensor
* Arduino Uno

## Software requirements/dependencies

* Node
* Serialport
* Socket.io
* Express
* Crypto

## Installation & Usage

**Wiring diragram:**  
Wire up the hardware components as follows:
![Wiring diagram](wiring/George_bb.jpg?raw=true)

**Step by step:**  

1. Fork the repo
2. NPM install to install node dependencies
3. Wire up George as above (you can also work out wiring by reading the sensor_read.ino)
4. Upload the sensor_read.ino to the Arduino Uno using the Arduino IDE
5. Run node index.js and visit http://localhost:8000 to interact with George

## Contributing

1. Folking fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

A [MAKE](http://make.analogfolk.com) project hacked together by Mate Marschalko ([@MateMarschalko](https://twitter.com/MateMarschalko)) at [AnalogFolk](http://analogfolk.com) ([@analogfolk](https://twitter.com/analogfolk)).


//===============================================================================================================================================================================================================

# Marca: George (a planta de falar)

! [FAÇA George planta falando] (http://make.analogfolk.com/wp-content/uploads/2015/02/george-825x310.jpg)

**Visão geral**
Imagine se você pudesse conversar com suas plantas da casa e eles lhe dizer se eles precisavam de água, como era quente e até mesmo olhar para você como você anda passado ...

George é um protótipo experimental para explorar como é fácil de misturar [Arduino] (https://www.arduino.cc/), [Socket.io] (http://socket.io/) eo [Web HTML5 Speech API] (https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html) (Speech & Síntese) para fazer exatamente isso.

Um artigo sobre George pode ser encontrado no [site Fazer AnalogFolk] a (http://make.analogfolk.com/george-the-talking-plant/). Este repositório contém o código e as etapas para configurar o seu próprio George.

**Como funciona**
Há 3 partes principais de George:

1. Aplicação Aurdino: * Escrito em C ++ para a saída dos dados dos sensores *
2. roteiro Socket.io: * Lê e transmite os dados do sensor como JSON *
3. roteiro HTML5: * Lê os dados excutes reconhecimento de fala e síntese de fala usando o [HTML5 Web Speech API] (https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html) *

## Requisitos de hardware

Um kit FAZER George pode ser [comprado de ETSY] (http://anfo.lk/buygeorge).

Alternativamente, você pode adquirir o seu próprio hardware na lista abaixo (* mas nós não podemos garantir o código irá trabalhar com peças que você fonte yourself *):

* LM35 Temp Sensor
* Soil higrômetro Detecção de Umidade
* PIR Motion Sensor
* MAX7219 8x8 LED Dot Matrix Exibição
* Sensor de luz
* Arduino Uno

## Requisitos de Software / dependências

* Node
* Porta serial
* Socket.io
* Expresso
* Crypto

## Instalação e Uso

** Diragram Fiação: **
Fio até os componentes de hardware da seguinte forma:
! [Esquema de ligações] (fiação / George_bb.jpg? Cru = true)

**Passo a passo:**

1. Fork do repo
2. NPM de instalação para instalar as dependências do nó
3. Conecte-se George como acima (você pode também trabalhar fora de fiação através da leitura do sensor_read.ino)
4. Faça upload do sensor_read.ino para o Arduino Uno usando o Arduino IDE
5. index.js nó Executar e visita http: // localhost: 8000 para interagir com George

## Contribuindo

1. Folking garfo-lo!
2. Crie o seu ramo de funcionalidade: `git checkout -b meu-novo-feature`
3. Comprometa suas alterações: `git commit -am 'Adicionar alguns feature'`
4. Empurre para o ramo: `git push origin meu-new-feature`
5. Envie uma solicitação de recebimento: D

## Créditos

A (http://make.analogfolk.com) projeto [fazer] cortei juntos por Companheiro Marschalko ([MateMarschalko] (https://twitter.com/MateMarschalko)) em [AnalogFolk] (http://analogfolk.com ) ([analogfolk] (https://twitter.com/analogfolk)).