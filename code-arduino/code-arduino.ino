/**
   Software: Hidropoino
   Date: 10/08/2016
   Version: 0.0.1
   by Developer: RodriguesFAS <http://rodriguesfas.com.br> & <franciscosouzaacer@gmail.com>
*/

#include <DHT.h>
#include <DMPH.h>
#include <virtuabotixRTC.h>

#define CLOCK_PIN 6
#define DATE_PIN  7
#define RST_PIN   8
virtuabotixRTC myRTC(CLOCK_PIN, DATE_PIN, RST_PIN);

#define DHT11_PIN 2 // pin digital
#define DHT11TYPE DHT11
DHT dht11(DHT11_PIN, DHT11TYPE); //módulo temperatura e úmidade.

#define LM35_PIN 0
#define HIGROMETRO_PIN 5
#define LDR_PIN 1

DMPH motor(5, 4, 3);

void setup() {
  Serial.begin(9600);

  pinMode(LDR_PIN, INPUT);
  pinMode(HIGROMETRO_PIN, INPUT);
  pinMode(LM35_PIN, INPUT);

  // Informacoes iniciais de data e hora
  // Apos setar as informacoes, comente a linha abaixo
  // (segundos, minutos, hora, dia da semana, dia do mes, mes, ano)
  myRTC.setDS1302Time(00, 43, 13, 1, 14, 8, 2016);

  dht11.begin();
}

void loop() {
  actionDHT11();
  actionLM35();
  actionLDR();
  actionHIGROMETRO();
  actionMotor();
}

void actionDHT11() {
  // Wait a few seconds between measurements.
  delay(2000);
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float humidade = dht11.readHumidity();
  // Read temperature as Celsius (the default)
  float tempcelsius = dht11.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float tempfahrenheit = dht11.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidade) || isnan(tempcelsius) || isnan(tempfahrenheit)) {
    
    // form a JSON-formatted string:
    String err = "1";
    String jsonString = "{\"errlm35\":\"";
    jsonString += err;
    jsonString += "\"}";

    // print it:
    Serial.println(jsonString);
  }

  // Compute heat index in Fahrenheit (the default)
  float hif = dht11.computeHeatIndex(tempfahrenheit, humidade);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht11.computeHeatIndex(tempcelsius, humidade, false);

  String jsonString = "{\"humidity\":\"";
  jsonString += humidade;
  jsonString += "\",\"tempcelsius\":\"";
  jsonString += tempcelsius;
  jsonString += "\",\"tempfahrenheit\":\"";
  jsonString += tempfahrenheit;
  jsonString += "\",\"heatindexhic\":\"";
  jsonString += hic;
  jsonString += "\",\"heatindexhif\":\"";
  jsonString += hif;
  jsonString += "\"}";

  Serial.println(jsonString);
}

void actionLM35() {
  // Variaveis que armazenam a temperatura em Celsius e Fahrenheit
  int tempc = 0, tempf = 0;
  int samples[8]; // Array para precisão na medição

  // Variáveis que guardam a temperatura máxima e mínima
  int maxtemp = -100, mintemp = 100;
  int i;

  for (i = 0; i <= 7; i++) { // Loop que faz a leitura da temperatura 8 vezes
    samples[i] = ( 5.0 * analogRead(LM35_PIN) * 100.0) / 1024.0;
    //A cada leitura, incrementa o valor da variavel tempc
    tempc = tempc + samples[i];
  }

  // Divide a variavel tempc por 8, para obter precisão na medição
  tempc = tempc / 8.0;
  //Converte a temperatura em Fahrenheit e armazena na variável tempf
  tempf = (tempc * 9) / 5 + 32;

  //Armazena a temperatura máxima na variável maxtemp
  if (tempc > maxtemp) {
    maxtemp = tempc;
  }
  //Armazena a temperatura máxima na vari[avel mintemp
  if (tempc < mintemp) {
    mintemp = tempc;
  }

  String jsonString = "{\"tempaguac\":\"";
  jsonString += tempc;
  jsonString += "\",\"tempaguaf\":\"";
  jsonString += tempf;
  jsonString += "\",\"tempaguacmax\":\"";
  jsonString += maxtemp;
  jsonString += "\",\"tempaguacmin\":\"";
  jsonString += mintemp;
  jsonString += "\"}";

  Serial.println(jsonString);

  tempc = 0;
}

void actionMotor() {
  motor.move(70);
}

void actionTime() {
  // Le as informacoes do CI
  myRTC.updateTime();

  // Imprime as informacoes no serial monitor
  Serial.print("Data : ");
  // Chama a rotina que imprime o dia da semana
  imprime_dia_da_semana(myRTC.dayofweek);
  Serial.print(", ");
  Serial.print(myRTC.dayofmonth);
  Serial.print("/");
  Serial.print(myRTC.month);
  Serial.print("/");
  Serial.print(myRTC.year);
  Serial.print("  ");
  Serial.print("Hora : ");

  // Adiciona um 0 caso o valor da hora seja <10
  if (myRTC.hours < 10) {
    Serial.print("0");
  }
  Serial.print(myRTC.hours);
  Serial.print(":");

  // Adiciona um 0 caso o valor dos minutos seja <10
  if (myRTC.minutes < 10) {
    Serial.print("0");
  }
  Serial.print(myRTC.minutes);
  Serial.print(":");
  // Adiciona um 0 caso o valor dos segundos seja <10
  if (myRTC.seconds < 10) {
    Serial.print("0");
  }
  Serial.println(myRTC.seconds);
}

void imprime_dia_da_semana(int dia) {
  switch (dia) {
    case 1:
      Serial.print("Domingo");
      break;
    case 2:
      Serial.print("Segunda");
      break;
    case 3:
      Serial.print("Terca");
      break;
    case 4:
      Serial.print("Quarta");
      break;
    case 5:
      Serial.print("Quinta");
      break;
    case 6:
      Serial.print("Sexta");
      break;
    case 7:
      Serial.print("Sabado");
      break;
  }
}

void actionLDR(){
  int ldrvalue = map(analogRead(LDR_PIN), 956, 1020, 0, 100);

	String jsonString = "{\"ldr\":\"";
  	jsonString += ldrvalue;
  	jsonString += "\"}";

 	 Serial.println(jsonString);
}

void actionHIGROMETRO(){
  int higrometrovalue = map(analogRead(HIGROMETRO_PIN), 475, 1022, 0, 100);
  
  String jsonString = "{\"higrometro\":\"";
    jsonString += higrometrovalue;
    jsonString += "\"}";

   Serial.println(jsonString);
}






