var canvas = document.getElementById('tela');
var c=canvas.getContext('2d');
var t,player,inimigo,qtdInimigos,wPressed,aPressed,sPressed,dPressed,jPressed,fase,tirosInimigos,itens;
var tTiro=false;
var tiroPronto=true;
var tCanhao;
var tMet=false;
var tMetPronto=true;
var guiMetranca;
var guiCanhao;
var fundo1;
var fundo2;
var bgTop1;
var bgTop2;
var bgPos1,bgPos2;
var bgLeft;
var explosao;
var explosao1;
var explosao2;
var explosao3;
var escudo=[];
var escudo2=[];
var explosoes;
var explosoes1;
var explosoes2;
var explosoes3;
var isGameOver=false;
var logo;
var sndLogo;
var loading;
var menu;
var edit;
var btJogar;
var btContinuar;
var btSair;
var music;
var sndTiro=[];
var sndExplode;
var sndExplode2;
var sndExplode3;
var sndExplode4;
var pausado;
var objetos=[];
var estrela=[];
var sol;
var planeta=[];
var nebulosaFundo=[];
var zzz=[];
var nebulosa=[];
var iniMini;
var iniGray;
var itVida;
var itMetranca;
var itCanhao;
var itNvlArma;
var itEscudo;
var itTps;
var iniTiro;
var tiroCan=[];
var plTiro;
var tiroMet;

function load(){
	var loadedResources=0;
	function finalizado(){

		if(++loadedResources>=116){
			abertura1();		
		}
		c.clearRect(0,0,800,600);
		c.strokeStyle="rgb(180,180,180)";
		c.strokeRect(342,580,116,10);
		c.fillStyle="darkred";
		c.fillRect(342,581,loadedResources,8);
	}

	sndLogo=new Audio();
	sndLogo.addEventListener('loadeddata',finalizado);
	music=new Audio();
	music.addEventListener('loadeddata',finalizado);
	sndTiro[1]=new Audio();
	sndTiro[1].addEventListener('loadeddata',finalizado);
	sndTiro[2]=new Audio();
	sndTiro[2].addEventListener('loadeddata',finalizado);
	sndExplode=new Audio();
	sndExplode.addEventListener('loadeddata',finalizado);
	sndExplode2=new Audio();
	sndExplode2.addEventListener('loadeddata',finalizado);
	sndExplode3=new Audio();
	sndExplode3.addEventListener('loadeddata',finalizado);
	sndExplode4=new Audio();
	sndExplode4.addEventListener('loadeddata',finalizado);

	sndLogo.src="snd/logo.ogg";
	music.src="snd/loop (1).ogg";
	music.volume=0.5;
	sndTiro[1].src='snd/tiro (1).ogg';
	sndTiro[2].src='snd/tiro (2).ogg';
	sndExplode.src='snd/explode (1).ogg';
	sndExplode2.src='snd/explode (2).ogg';
	sndExplode3.src='snd/explode (3).ogg';
	sndExplode4.src='snd/explode (4).ogg';

	guiMetranca=new Image();
	guiMetranca.addEventListener('load',finalizado);
	guiCanhao=new Image();
	guiCanhao.addEventListener('load',finalizado);
	fundo1=new Image();
	fundo1.addEventListener('load',finalizado);
	fundo2=new Image();
	fundo2.addEventListener('load',finalizado);
	explosao=new Image();
	explosao.addEventListener('load',finalizado);
	explosao1=new Image();
	explosao1.addEventListener('load',finalizado);
	explosao2=new Image();
	explosao2.addEventListener('load',finalizado);
	explosao3=new Image();
	explosao3.addEventListener('load',finalizado);
	logo=new Image();
	logo.addEventListener('load',finalizado);
	loading=new Image();
	loading.addEventListener('load',finalizado);
	menu=new Image();
	menu.addEventListener('load',finalizado);
	edit=new Object({
		img:[],
		left:200,
		top:250,
		width:400,
		height:60,
		pos:0,
		text:"",
		focado:false
	});
	btJogar=new Object({
		img:[],
		left:300,
		top:350,
		width:200,
		height:40,
		pos:0
	});
	btContinuar=new Object({
		img:[],
		left:300,
		top:350,
		width:200,
		height:40,
		pos:0
	});
	btSair=new Object({
		img:[],
		left:350,
		top:405,
		width:100,
		height:30,
		pos:0
	});
	estrela[0]=new Image();
	estrela[0].addEventListener('load',finalizado);
	estrela[1]=new Image();
	estrela[1].addEventListener('load',finalizado);
	sol=new Image();
	sol.addEventListener('load',finalizado);
	planeta[1]=new Image();
	planeta[1].addEventListener('load',finalizado);
	planeta[2]=new Image();
	planeta[2].addEventListener('load',finalizado);
	planeta[3]=new Image();
	planeta[3].addEventListener('load',finalizado);
	planeta[4]=new Image();
	planeta[4].addEventListener('load',finalizado);
	planeta[5]=new Image();
	planeta[5].addEventListener('load',finalizado);
	planeta[6]=new Image();
	planeta[6].addEventListener('load',finalizado);
	nebulosaFundo[5]=new Image();
	nebulosaFundo[5].addEventListener('load',finalizado);
	nebulosaFundo[6]=new Image();
	nebulosaFundo[6].addEventListener('load',finalizado);
	zzz[1]=new Image();
	zzz[1].addEventListener('load',finalizado);
	zzz[2]=new Image();
	zzz[2].addEventListener('load',finalizado);
	zzz[3]=new Image();
	zzz[3].addEventListener('load',finalizado);
	nebulosa[1]=new Image();
	nebulosa[1].addEventListener('load',finalizado);
	nebulosa[2]=new Image();
	nebulosa[2].addEventListener('load',finalizado);
	nebulosa[3]=new Image();
	nebulosa[3].addEventListener('load',finalizado);
	player=new Object({
		nome:"",
		img:[],
		left:390,
		top:500,
		movendo:false,
		height:100,
		width:64.5,
		velocidade:2.5,
		vidas:3,
		tps:800,
		tiros:[],
		nvlArma:1,
		vivo:true,
		tiroWidth:4,
		tiroHeight:9,
		ae:"",
		municaoMetranca:0,
		tirosMetranca:[],
		tirosMetRaio:2,
		velMet:5.5,
		metDir:'dir',
		municaoCanhao:0,
		tirosCanhao:[],
		escudo:0,
		pos:1,
		pontos:0
	});
	iniMini=new Image();
	iniMini.addEventListener('load',finalizado);
	iniGray=new Image();
	iniGray.addEventListener('load',finalizado);
	itVida=new Image();
	itVida.addEventListener('load',finalizado);
	itMetranca=new Image();
	itMetranca.addEventListener('load',finalizado);
	itCanhao=new Image();
	itCanhao.addEventListener('load',finalizado);
	itNvlArma=new Image();
	itNvlArma.addEventListener('load',finalizado);
	itEscudo=new Image();
	itEscudo.addEventListener('load',finalizado);
	itTps=new Image();
	itTps.addEventListener('load',finalizado);
	iniTiro=new Image();
	iniTiro.addEventListener('load',finalizado);
	tiroCan[0]=new Image();
	tiroCan[0].addEventListener('load',finalizado);
	tiroCan[1]=new Image();
	tiroCan[1].addEventListener('load',finalizado);
	plTiro=new Image();
	plTiro.addEventListener('load',finalizado);
	tiroMet=new Image();
	tiroMet.addEventListener('load',finalizado);

	guiMetranca.src="img/itens/metranca.png";
	guiCanhao.src="img/itens/canhao.png";
	fundo1.src="img/fundo.png";
	fundo2.src="img/fundo.png";
	explosao.src="img/explosao.png";
	explosao1.src="img/explosao1.png";
	explosao2.src="img/explosao2.png";
	explosao3.src="img/explosao3.png";
	for (var i = 1; i <= 16; i++) {
		escudo[i]=new Image();
		escudo[i].addEventListener('load',finalizado);
		escudo[i].src="img/itens/escudo ("+i+").png";
	}
	for (var i = 1; i <= 16; i++) {
		escudo2[i]=new Image();
		escudo2[i].addEventListener('load',finalizado);
		escudo2[i].src="img/itens/escudo2 ("+i+").png";
		
	}
	logo.src="interface/logo.png";
	loading.src="interface/loading.png";
	menu.src="interface/menu.png";
	for (var i = 0; i < 2; i++) {
		edit.img[i]=new Image();
		edit.img[i].addEventListener('load',finalizado);
		edit.img[i].src="interface/edit"+(i+1)+".png";
	}
	for (var i = 0; i < 3; i++) {
		btJogar.img[i]=new Image();
		btJogar.img[i].addEventListener('load',finalizado);
		btJogar.img[i].src="interface/btJogar"+(i+1)+".png";
	}
	for (var i = 0; i < 3; i++) {
		btContinuar.img[i]=new Image();
		btContinuar.img[i].addEventListener('load',finalizado);
		btContinuar.img[i].src="interface/btContinuar"+(i+1)+".png";
	}
	for (var i = 0; i < 3; i++) {
		btSair.img[i]=new Image();
		btSair.img[i].addEventListener('load',finalizado);
		btSair.img[i].src="interface/btSair"+(i+1)+".png";
	}
	estrela[0].src="img/objetos/estrela (1).png";
	estrela[1].src="img/objetos/estrela (2).png";
	sol.src="img/objetos/sol.png";
	planeta[1].src="img/objetos/planeta (1).png";
	planeta[2].src="img/objetos/planeta (2).png";
	planeta[3].src="img/objetos/planeta (3).png";
	planeta[4].src="img/objetos/planeta (4).png";
	planeta[5].src="img/objetos/planeta (5).png";
	planeta[6].src="img/objetos/planeta (6).png";
	nebulosaFundo[5].src="img/objetos/nebulosaFundo (5).png";
	nebulosaFundo[6].src="img/objetos/nebulosaFundo (6).png";
	zzz[1].src="img/objetos/z (1).png";
	zzz[2].src="img/objetos/z (2).png";
	zzz[3].src="img/objetos/z (3).png";
	nebulosa[1].src="img/objetos/nebulosa (1).png";
	nebulosa[2].src="img/objetos/nebulosa (2).png";
	nebulosa[3].src="img/objetos/nebulosa (3).png";
	for (var i = 1; i <= 4; i++) {
		player.img['movendo ('+i+')']=new Image();
		player.img['movendo ('+i+')'].addEventListener('load',finalizado);
		player.img['movendo ('+i+')'].src="img/player/movendo ("+i+").png";
	}
	for (var i = 1; i <=4 ; i++) {
		player.img['movendoC ('+i+')']=new Image();
		player.img['movendoC ('+i+')'].addEventListener('load',finalizado);
		player.img['movendoC ('+i+')'].src="img/player/movendoC ("+i+").png";
	}
	for (var i = 1; i <=4 ; i++) {
		player.img['movendoM ('+i+')']=new Image();
		player.img['movendoM ('+i+')'].addEventListener('load',finalizado);
		player.img['movendoM ('+i+')'].src="img/player/movendoM ("+i+").png";
	}
	for (var i = 1; i <=4 ; i++) {
		player.img['parado ('+i+')']=new Image();
		player.img['parado ('+i+')'].addEventListener('load',finalizado);
		player.img['parado ('+i+')'].src="img/player/parado ("+i+").png";
	}
	for (var i = 1; i <=4 ; i++) {
		player.img['paradoC ('+i+')']=new Image();
		player.img['paradoC ('+i+')'].addEventListener('load',finalizado);
		player.img['paradoC ('+i+')'].src="img/player/paradoC ("+i+").png";
	}
	for (var i = 1; i <=4 ; i++) {
		player.img['paradoM ('+i+')']=new Image();
		player.img['paradoM ('+i+')'].addEventListener('load',finalizado);
		player.img['paradoM ('+i+')'].src="img/player/paradoM ("+i+").png";
	}
	iniMini.src="img/inimigos/mini.png";
	iniGray.src="img/inimigos/gray.png";
	itVida.src="img/itens/vida.png";
	itMetranca.src="img/itens/metranca.png";
	itCanhao.src="img/itens/canhao.png";
	itNvlArma.src="img/itens/nvlArma.png";
	itEscudo.src="img/itens/escudo.png";
	itTps.src="img/itens/tps.png";
	iniTiro.src="img/inimigos/tiro.png";
	tiroCan[0].src="img/player/tiroCan.png";
	tiroCan[1].src="img/player/tiroCan2.png";
	plTiro.src="img/player/tiro.png";
	tiroMet.src="img/player/tiroMet.png";
}
