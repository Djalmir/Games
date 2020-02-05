var canvas = document.getElementById("tela");
var c = canvas.getContext("2d");
c.textAlign="center";
var sndLogo,logo,loading,menu,edQtdJogadores,selNJog,edModo,selModo,rangeVel;
var selVel,bateParede,bateEmSi,bateOutro,p1Nome,p2Nome,btJogar,btSair,sinsImg;
var btCorCab1,btCorCorpo1,btCorCab2,btCorCorpo2,btIaP1,btIaP2,colorPicker;
var exibindoMenu=true;
var fade=0.01;
var nx = 0;
var ny = 0;
var largura = 15;
var distancia = .35;
var borda_x, borda_y;
var nodos = new Array();
nodos.length = 0;
var nodos2 = new Array();
nodos2.length = 0;
var sndcomer,sndcomer2,sndcomerS,sndgameover,bg1,player1,player2,p1Irel,p2Irel;
var p1Imortal=false;
var p2Imortal=false;
var p1ICor="#FFFFFF";
var p2ICor="#FFFFFF";
var recorde,donoRecorde,pts,ptsP1,ptsP2,nvl,vel,velocidade,numJog;
var modo="Coop";
var corCabeca1,corCorpo1,corCabeca2,corCorpo2,gradient;
var rodando = false;
var xfruta,xfruta2,yfruta,yfruta2,xSFruit,ySFruit,xSFruit2,ySFruit2,fruta,fruta2,sFruta,sFruta2;
var frutaEspecial=false;
var frutaEspecial2=false;
var isGameOver=true;
var relMouseControl;
var mouseControl=false;
var iaP1=false;
var iaP2=false;
var obstaculoMovel=false;
var direcaoObstaculo,direcaoObstaculo2;
var obstaculoMovel2=false;
var relogio,intervalo,relFruit,fruitIntervalo,relEscondeFruit,escondeIntervalo;
var relFruit2,fruitIntervalo2,relEscondeFruit2,escondeIntervalo2;
var timef1=30;
var timeEf1=-10;
var timef2=47;
var timeEf2=-5;
var cronometro=1000;
var proxDirec = new Array();
proxDirec.length = 0;
var proxDirec2 = new Array();
proxDirec2.length = 0;
var rotacao = 0;
var rotacao2 = 0;
var pausado=false;
var exibindoMenuPausa=false;
var btContinuar;
var tamF=15;
var fCrescendo=true;
var tamF2=20;
var f2Crescendo=false;
var tamSF=20;
var sfCrescendo=true;
var tamSF2=25;
var sf2Crescendo=false;
var distDaFruta1,distDaFruta2;
var frutaPerseguidaP1,frutaPerseguidaP2;
var difX1,difY1,difX2,difY2,difX3,difY3,difX4,difY4;
var difXP1,difYP1,difXP2,difYP2,difXP3,difYP3,difXP4,difYP4;
var bgs=new Array();

function load(){

	var loadedImgs=0;
	var loadedSnds=0;
	function loaded(resource){

		if (resource=='snd')
			loadedSnds++
		else if (resource=='img')
			loadedImgs++;

		c.clearRect(0,0,800,600);
		c.strokeStyle='blue';
		c.strokeRect(357,580,86,10);
		c.fillStyle='lime';
		c.fillRect(357,581,(loadedSnds+loadedImgs)*2,8);

		if (loadedSnds==5&&(loadedImgs==38)) {
			abertura1();
		}

	}

	sndLogo=new Audio("sons/logo.ogg");
	sndLogo.addEventListener('loadeddata',loaded('snd'));
	sndcomer=new Audio("sons/eat.wav");
	sndcomer.addEventListener('loadeddata',loaded('snd'));
	sndcomer2=new Audio("sons/eat2.wav");
	sndcomer2.addEventListener('loadeddata',loaded('snd'));
	sndcomerS=new Audio("sons/eatS.wav");
	sndcomerS.addEventListener('loadeddata',loaded('snd'));
	sndgameover=new Audio("sons/die.wav");
	sndgameover.addEventListener('loadeddata',loaded('snd'));
	sndcomer2.volume=0.50;
	sndcomer.volume=0.50;
	sndcomerS.volume=0.50;
	sndgameover.volume=0.50;


	logo=new Image();
	logo.addEventListener('load',loaded('img'));
	loading=new Image();
	loading.addEventListener('load',loaded('img'));
	menu=new Image();
	menu.addEventListener('load',loaded('img'));
	edQtdJogadores=new Object({
		img:new Image(),
		oW:80,
		oH:50,
		width:80,
		height:50,
		left:310,
		top:115
	});
	edQtdJogadores.img.addEventListener('load',loaded('img'));
	
	selNJog=new Object({
		img:new Image(),
		iniLeft:0,
		oW:80,
		oH:50,
		width:80,
		height:50,
		left:310,
		top:115,
		value:1
	});
	selNJog.img.addEventListener('load',loaded('img'));

	edModo=new Object({
		img:new Image(),
		oW:80,
		oH:50,
		width:200,
		height:50,
		left:300,
		top:180
	});
	edModo.img.addEventListener('load',loaded('img'));

	selModo=new Object({
		img:new Image(),
		oW:200,
		oH:50,
		iniTop:0,
		left:300,
		top:180,
		width:200,
		height:50,
		value:1
	});
	selModo.img.addEventListener('load',loaded('img'));

	rangeVel=new Object({
		img:new Image(),
		oW:200,
		oH:5,
		left:80,
		top:270,
		width:200,
		height:5
	});
	rangeVel.img.addEventListener('load',loaded('img'));

	selVel=new Object({
		img:new Image(),
		oW:15,
		oH:30,
		left:80,
		top:260,
		width:15,
		height:30,
		value:0,
		moving:false
	});
	selVel.img.addEventListener('load',loaded('img'));

	bateParede=new Object({
		img:[],
		oW:200,
		oH:50,
		left:520,
		top:270,
		width:200,
		height:40,
		checked:false
	});
	bateParede.img[0]=new Image();
	bateParede.img[0].addEventListener('load',loaded('img'));
	bateParede.img[1]=new Image();
	bateParede.img[1].addEventListener('load',loaded('img'));

	bateEmSi=new Object({
		img:[],
		oW:200,
		oH:50,
		left:520,
		top:320,
		width:200,
		height:40,
		checked:true
	});
	bateEmSi.img[0]=new Image();
	bateEmSi.img[0].addEventListener('load',loaded('img'));
	bateEmSi.img[1]=new Image();
	bateEmSi.img[1].addEventListener('load',loaded('img'));

	bateOutro=new Object({
		img:[],
		oW:200,
		oH:50,
		left:520,
		top:370,
		width:200,
		height:40,
		checked:false
	});
	bateOutro.img[0]=new Image();
	bateOutro.img[0].addEventListener('load',loaded('img'));
	bateOutro.img[1]=new Image();
	bateOutro.img[1].addEventListener('load',loaded('img'));

	p1Nome=new Object({
		img:new Image(),
		oW:80,
		oH:50,
		width:220,
		height:40,
		left:70,
		top:350,
		value:localStorage.getItem('SinS-player1'),
		focado:false,
		enabled:true
	});
	if (p1Nome.value==null)
		p1Nome.value="SinS 1";
	p1Nome.img.addEventListener('load',loaded('img'));

	p2Nome=new Object({
		img:new Image(),
		oW:80,
		oH:50,
		width:220,
		height:40,
		left:70,
		top:400,
		value:localStorage.getItem('SinS-player2'),
		focado:false,
		enabled:true
	});
	if (p2Nome.value==null)
		p2Nome.value="SinS 2";
	p2Nome.img.addEventListener('load',loaded('img'));

	btJogar=new Object({
		img:[],
		pos:0,
		oW:200,
		oH:50,
		width:200,
		height:50,
		left:300,
		top:460
	});
	btJogar.img[0]=new Image();
	btJogar.img[0].addEventListener('load',loaded('img'));
	btJogar.img[1]=new Image();
	btJogar.img[1].addEventListener('load',loaded('img'));

	btSair=new Object({
		img:[],
		pos:0,
		oW:200,
		oH:50,
		width:180,
		height:30,
		left:310,
		top:520
	});
	btSair.img[0]=new Image();
	btSair.img[0].addEventListener('load',loaded('img'));
	btSair.img[1]=new Image();
	btSair.img[1].addEventListener('load',loaded('img'));

	sinsImg=new Image();
	sinsImg.addEventListener('load',loaded('img'));

	btIaP1=new Object({
		img:[],
		pos:1,
		left:300,
		top:356,
		width:40,
		height:25
	});
	btIaP1.img[0]=new Image();
	btIaP1.img[0].addEventListener('load',loaded('img'));
	btIaP1.img[1]=new Image();
	btIaP1.img[1].addEventListener('load',loaded('img'));

	btIaP2=new Object({
		img:[],
		pos:1,
		left:300,
		top:406,
		width:40,
		height:25
	});
	btIaP2.img[0]=new Image();
	btIaP2.img[0].addEventListener('load',loaded('img'));
	btIaP2.img[1]=new Image();
	btIaP2.img[1].addEventListener('load',loaded('img'));
	colorPicker=document.getElementById('colorPicker');

	for (var i = 0; i < 6; i++) {
		bgs[i]=new Image();
		bgs[i].addEventListener('load',loaded('img'));
		bgs[i].src="imgs/bg"+(i+1)+".png"
	}

	corCabeca1=localStorage.getItem('SinS-corCabeca1');
	if (corCabeca1==null)
		corCabeca1="#717171";
	corCorpo1=localStorage.getItem('SinS-corCorpo1');
	if (corCorpo1==null)
		corCorpo1="#a5a5a5";
	corCabeca2=localStorage.getItem('SinS-corCabeca2');
	if (corCabeca2==null)
		corCabeca2="#414141";
	corCorpo2=localStorage.getItem('SinS-corCorpo2');
	if (corCorpo2==null)
		corCorpo2="#686868";

	btCorCab1=new Object({
		cor:corCabeca1,
		left:375,
		top:370
	});
	btCorCorpo1=new Object({
		cor:corCorpo1,
		left:385,
		top:370
	});
	btCorCab2=new Object({
		cor:corCabeca2,
		left:375,
		top:420
	});
	btCorCorpo2=new Object({
		cor:corCorpo2,
		left:385,
		top:420
	});

	fruta=new Image();
	fruta.addEventListener('load',loaded('img'));
	fruta2=new Image();
	fruta2.addEventListener('load',loaded('img'));
	sFruta=new Image();
	sFruta.addEventListener('load',loaded('img'));
	sFruta2=new Image();
	sFruta2.addEventListener('load',loaded('img'));
	btContinuar=new Object({
		img:[],
		pos:0,
		oW:200,
		oH:50,
		width:200,
		height:50,
		left:300,
		top:460
	});
	btContinuar.img[0]=new Image();
	btContinuar.img[0].addEventListener('load',loaded('img'));
	btContinuar.img[1]=new Image();
	btContinuar.img[1].addEventListener('load',loaded('img'));

	logo.src="interface/logo.png";	
	loading.src="interface/loading.png";	
	menu.src="interface/menu.png";
	edQtdJogadores.img.src="interface/edit.png";
	selNJog.img.src="interface/1-2.png";
	edModo.img.src="interface/edit.png";
	selModo.img.src="interface/modo.png";
	rangeVel.img.src="interface/range.png";
	selVel.img.src="interface/selVel.png";
	bateParede.img[0].src="interface/unchecked.png";
	bateParede.img[1].src="interface/checked.png";
	bateEmSi.img[0].src="interface/unchecked.png";
	bateEmSi.img[1].src="interface/checked.png";
	bateOutro.img[0].src="interface/unchecked.png";
	bateOutro.img[1].src="interface/checked.png";
	p1Nome.img.src="interface/edit.png";
	p2Nome.img.src="interface/edit.png";
	btJogar.img[0].src="interface/Jogar1.png";
	btJogar.img[1].src="interface/Jogar2.png";
	btSair.img[0].src="interface/Sair1.png";
	btSair.img[1].src="interface/Sair2.png";
	sinsImg.src="interface/S.i.n.S.png";
	btIaP1.img[0].src="interface/ia1.png";
	btIaP1.img[1].src="interface/ia2.png";
	btIaP2.img[0].src="interface/ia1.png";
	btIaP2.img[1].src="interface/ia2.png";
	fruta.src="imgs/macaVermelha.png";
	fruta2.src="imgs/macaVerde.png";
	sFruta.src="imgs/uva.png";
	sFruta2.src="imgs/melancia.png";
	btContinuar.img[0].src="interface/Continuar1.png";
	btContinuar.img[1].src="interface/Continuar2.png";

}