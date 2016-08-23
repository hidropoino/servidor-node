// http://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html

function APP(){};

var app = new APP();
var segundo = segundos = 1000;
var minuto = minutos = 60 * segundos;

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

mistura = {
	returnDate: function(){
		return mistura.interpretDate( localStorage["ultimaMistura"] );
	},
	interpretDate: function(pubdate){
		pubdate = new Date(pubdate);

		var currentdate = new Date(),
		thedate = new String(),
		weekdays = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"],

		currentyear = currentdate.getFullYear(),
		currentmonth = currentdate.getMonth() + 1,
		currentday = currentdate.getDate(),
		currentweekday = weekdays[ currentdate.getDay() - 1 ],
		
		pubyear = pubdate.getFullYear(),
		pubmonth = pubdate.getMonth() + 1,
		pubday = pubdate.getDate(),
		pubweekday = weekdays[ pubdate.getDay() - 1 ];

		if(currentyear == pubyear) {// ano
			if(currentmonth == pubmonth) {// mês
				if((currentday - pubday) < 7) {// semana
					if(currentday == pubday) {// dia
						thedate = "hoje";
					} else if (currentday > pubday){// dias atrás
						if((currentday - pubday) == 1) {
							thedate = "ontem";
						} else if((currentday - pubday) > 1) {// mais de um dia atrás, esta semana
							thedate = "útimo " + pubweekday;
						}
					}
				} else if ((currentday - pubday) >= 7){// semanas atrás
					var weeks = parseInt( (currentday - pubday) / 7 );
					thedate = weeks > 1 ? weeks + " semanas atrás" : "last week";
				}
			} else if (currentmonth > pubmonth){// meses antes
				var months = currentmonth - pubmonth;
				thedate = months > 1 ? months + " meses antes" : "last month";
			}
		} else if (currentyear > pubyear) {// amnos atrás
			var years = currentyear - pubyear;
			thedate = years > 1 ? years + " anos atrás" : "last year";
		}
		return thedate;
	}
}

plant = {
	queixa: {
		quente: [
		"É muito quente aqui!",
		"Eu não posso ficar nesta temperatura!",
		"Minhas folhas estão queimando!",
		"Alguém pode desligar o quecedor por favor?"
		],
		frio: [
		"Está muito frio aqui.",
		"É muito frio aqui",
		"Está congelando!",
		"Eu não posso ficar nesta temperatura!,",
		"Alguém pode me aquecer por favor?"
		],
		escuro: [
		"É muito escuro aqui",
		"Você pode me colocar mais perto da janela?",
		"Eu não posso fotossíntese. Eu preciso de luz",
		"É realmente escuro aqui",
		"Por que é tão escuro?"
		],
		seco: [
		"Meu solo está muito seco.",
		"Poderia, por favor me molhar?",
		"Eu poderia realmente usar um pouco de água.",
		"Minha agua por favor!",
		"Eu estou realmente com sede."
		]
	},
	agradecimento: {
		agua: [
		"Obrigado por me dar água! Eu tava muito seco",
		"Eu estava com muita sede. Obrigado por me dar água!",
		"Oh, isso é muito bom. Obrigado por me dar água! Minhas folhas serão muito mais verde amanhã!",
		"Obrigado por me dar água! Eu realmente gostei disso! Meu solo estava muito seco.",
		"Obrigado, muito obrigado por me dar água! Isso é muito bom!"
		]
	},
	cumprimento: [
	"Oi! Como está sendo o seu dia?"
	],
	answer: {
		measurement: [
		"Tenho 26 centímetros de altura."
		],
		idade: [
		"Estou quase 6 meses de idade.",
		"Estou quase metade de um ano de idade."
		],
		agua: [
		"Eu foi regada ",
		"Você me rega "
		],
		odio: [
		"Eu te odeio mais ",
		"Eu também te odeio "
		],
		normal: [
		"É do ",
		"A temperatura é "
		],
		quente: [
		"Eu acho que é muito quente aqui. A temperatura é ",
		"é quente aqui, eu acho. A temperatura é "
		],
		frio: [
		"Eu acho que é muito frio aqui. A temperatura é ",
		"Está frio aqui, eu acho. A temperatura é "
		],
		bom: [
		"Eu me sinto bem agora.",
		"Estou feliz agora."
		],
		pergunta: [
		"Obrigado por perguntar. ",
		"Obrigado pela pergunta. "
		],
		especie: [
		"Eu não sei. Eu sou apenas uma planta da casa muito simples.",
		"Eu não tenho informação exata sobre isso. Eu sou apenas uma planta da casa simples."
		],
		machucar: [
		"Você realmente fazer isso?",
		"Por favor, não me machuque.",
		"Eu não quero ser cortado."
		],
		contente: [
		"Fico feliz em ouvir isso !!",
		"Feliz de ouvir isso!"
		]
	}
}

app = {
	plantData: {},
	speech: new SpeechSynthesisUtterance(),
	voices: window.speechSynthesis.getVoices(),
	listen: new SpeechRecognition(),
	recentlySpoken: false,
	justSpoken: false,
	rcenteMistura: false,
	moisture: 999,
	previousQuestion: "",

	temp_min: 18,
	temp_max: 26,
	light_min: 30,
	moist_min: 66,
	
	speak: function(message, interrupt){

		if( (!app.recentlySpoken && !app.rcenteMistura && !app.justSpoken) || (!app.rcenteMistura && !app.justSpoken && interrupt)){
			app.recentlySpoken = true;
			app.speech.text = message;
			app.setVoice();
			speechSynthesis.speak(app.speech);
			console.log(message);
		}

		if(interrupt){
			app.rcenteMistura = true;
			clearTimeout(app.tempoMistura);
			app.tempoMistura = setTimeout(function(){
				app.rcenteMistura = false;
			}, 10 * segundos);
		}

	},

	answer: function(message){
		clearTimeout(app.justSpokenTimer);
		app.justSpokenTimer = setTimeout(function(){
			app.justSpoken = false;
		}, 5 * segundos);

		if(!app.justSpoken) {
			app.justSpoken = true;
			app.speech.text = message;
			app.setVoice();
			speechSynthesis.speak(app.speech);
			console.log(message);
		}

	},

	setVoice: function(){
		app.voices = window.speechSynthesis.getVoices();
		app.speech.voice = app.voices.filter(
			function(voice) {
			return voice.name == 'Google Brasil Português Female'; // Google UK English Male // Google Brazilian Portuguese Female
		})[0]; 
	},
	
	rdm: function(range){
		return parseInt(Math.random() * range);
	},

	interpret: function(result){
		var text = "",
		confidence = 0,
		selected = -1;

		for(var i=0; i<result.results.length; i++){
			//if(result.results[i].isFinal){
				if(result.results[i][0].confidence > confidence && result.results[i][0].confidence > 0.70) selected = i;
			//}
		}

		if(selected > -1) {

			text = result.results[selected][0].transcript;

			if(text != app.previousQuestion){

				app.previousQuestion = text;

				var temp = "normal";
				if(app.plantData.temperature < app.temp_min) {
					temp = "frio";
				} else if (app.plantData.temperature > app.temp_max) {
					temp = "quente";
				}

				var moist = "normal";
				if(app.plantData.moisture < app.moist_min) {
					moist = "baixa";
				}

				var light = "normal";
				if(app.plantData.light < app.light_min) {
					light = "baixa";
				}

				var feeling = "";
				if(temp  != "normal") feeling += (plant.answer[temp][app.rdm(2)] + " " + app.plantData.temperature + " gráus");
				if(moist != "normal") feeling += (feeling != "" ? " e " : "") + (plant.queixa.seco[app.rdm(5)] + " ");
				if(light != "normal") feeling += (feeling != "" ? " e " : "") + (plant.queixa.escuro[app.rdm(5)] + " ");
				if(feeling == "") feeling += plant.answer.bom[app.rdm(2)];

				// Feel
				if(app.matchWords(
					["feliz", "triste", "você sente", "como você está"],
					text
					)){
					app.answer(
						plant.answer.pergunta[app.rdm(2)] + feeling
						);
			}
				// Temperature
				if(app.matchWords(
					["temperatura", "quente", "frio", "caloroso"],
					text
					)){
					app.answer(
						plant.answer[temp][app.rdm(2)] + " " +
						app.plantData.temperature +
						" degrees"
						);
			}
				// Height
				if(app.matchWords(
					["Alto", "alto", "tamanho"],
					text
					)){
					app.answer(
						plant.answer.measurement[app.rdm(2)]
						);
			}
			if(app.matchWords(
				["velho", "idade"],
				text
				)){
				app.answer(
					plant.answer.idade[app.rdm(2)]
					);
		}
				// odio
				if(app.matchWords(
					["odio", "antipatia"],
					text
					)){
					app.answer(
						plant.answer.odio[app.rdm(2)]
						);
			}
				// mistura
				if(app.matchWords(
					["agua", "mistura", "com sede", "beber", "umidade", "névoa", "solo"],
					text
					)){
					app.answer(
						(moist == "normal" ? plant.answer.bom[app.rdm(2)] : plant.queixa.seco[app.rdm(5)]) + " " +
						plant.answer.agua[app.rdm(2)] + " " +
						mistura.returnDate()
						);
			}
				// especie
				if(app.matchWords(
					["especie", "tipo", "origem"],
					text
					)){
					app.answer(
						plant.answer.especie[app.rdm(2)]
						);
			}

				// 
				// machucar
				if(app.matchWords(
					["tesolura", "faca", "aparar", "cortar"],
					text
					)){
					app.answer(
						plant.answer.machucar[app.rdm(2)]
						);
			}
				// responder
				if(app.matchWords(
					["bom", "bem"],
					text
					)){
					app.answer(
						plant.answer.contente[app.rdm(2)]
						);
			}
		}
	}
},
matchWords: function(words, text){
	var match = false;
	for(var i = 0; i < words.length; i++){
		if(text.indexOf(words[i]) > 0) match = true;
	}
	return match;
}

};

function init(){
	// Abre uma conexão serial com o servidor:
	var socket = io.connect('https://localhost:8000');

	// Ouve novas mensagens em socket.io tomada de serialEvent socket
	socket.on('serialEvent', function (data) {
		console.log(data);

		//Pakage sensor DMT11
		$("#humidity").text(data.humidity);
		$("#tempcelsius").text(data.tempcelsius);
		$("#tempfahrenheit").text(data.tempfahrenheit);
		$("#heatindexhic").text(data.heatindexhic);
		$("#heatindexhif").text(data.heatindexhif);

		//Pakage sensor LM35 + LDR
		$("#tempaguac").text(data.tempaguac);
		$("#tempaguaf").text(data.tempaguaf);
		$("#tempaguacmax").text(data.tempaguacmax);
		$("#tempaguacmin").text(data.tempaguacmin);
		$("#errlm35").text(data.errlm35);
		$("#luminosity").text(data.ldr);
		$("#higrometro").text(data.higrometro);

		app.plantData = data;

		if(app.moisture == 999) app.moisture = parseInt(app.plantData.moisture);

		// Handle SPEAK
		if(app.moisture + 10 < data.moisture) {
			// I'm being mistura
			app.moisture = parseInt(data.moisture);
			app.speak(plant.agradecimento.agua[app.rdm(5)] + " A última vez em que fui regada, foi " + mistura.returnDate(), true);
			localStorage.setItem("ultimaMistura", new Date());
		}

		if(data.moisture >= app.moist_min && data.tempcelsius <= app.temp_max && data.tempcelsius >= app.temp_min && data.light >= app.light_min ){
				// Estou feliz com tudo.
				app.speak(plant.cumprimento[app.rdm(10)], false);
			} else {
				if(data.moisture < app.moist_min) {// estou com sede
					app.speak(plant.queixa.seco[app.rdm(5)], false);
				}
				if(data.tempcelsius < app.temp_min) {// estou com muito frio
					app.speak(plant.queixa.frio[app.rdm(5)] + " a temperatura é de " + data.tempcelsius + " gráus.", false);
				}
				if(data.tempcelsius > app.temp_max) {// estou muito quente
					app.speak(plant.queixa.quente[app.rdm(5)] + " a temperatura é de " + data.tempcelsius + " gráus.", false);
				}
				if(data.light < app.light_min) {// está escuro 
					app.speak(plant.queixa.escuro[app.rdm(5)], false);
				}
			}

		});

	// Handle LISTEN
	app.listen.continuous = true;
	app.listen.interimResults = true;
	app.listen.lang = 'pt-BR';
	app.listen.start();
	app.listen.onresult = app.interpret;
	
	app.listen.onend = function(){
		//app.speak("Reiniciando o sistema, aguarde!");
		//console.log("Hidropoino reiniciando..");
		//app.listen.start();
	}

	// Amostragem de umidade para a determinação última ves que foi regada
	app.moistureTimer = setInterval(function(){
		app.moisture = parseInt(app.plantData.moisture);
	}, 30 * segundos);

	// Permite que planta fale a cada 5 minutos
	app.spokenTimer = setInterval(function(){
		app.recentlySpoken = false;
	}, 60 * segundos);

}

// Start app
window.onload = init;
