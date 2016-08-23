/*begin clock */

var dataHora,xHora,xdia,dia,xMinuto,xSegundo,mes,ano,txtsaudacao;

dataHora=new Date();
xHora=dataHora.getHours();
dataHora = new Date();
xDia = dataHora.getDay();
dsem = new Array(7);

dsem[0] = "Domingo";
dsem[1] = "Segunda-feira";
dsem[2] = "Terça-feira";
dsem[3] = "Quarta-feira";
dsem[4] = "Quinta-feira";
dsem[5] = "Sexta-feira";
dsem[6] = "Sábado";

if (dia < 10) {
    dia = "0" + dia
}

dia = dataHora.getDate();
mes = dataHora.getMonth();
dmes = new Array(12);

dmes[0] = "Janeiro";
dmes[1] = "Fevereiro";
dmes[2] = "Março";
dmes[3] = "Abril";
dmes[4] = "Maio";
dmes[5] = "Junho";
dmes[6] = "Julho";
dmes[7] = "Agosto";
dmes[8] = "Setembro";
dmes[9] = "Outubro";
dmes[10] = "Novembro";
dmes[11] = "Dezembro";

ano = dataHora.getFullYear();