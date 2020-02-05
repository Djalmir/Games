var canvas = document.getElementById('tela');
var c = canvas.getContext('2d');
c.textAlign="center";
var player,bola,blocos,blocosQtd,fase,itens,jogoRodando;
var imgs=[];
var snds=[];
var ia=false;
var exibindoMenu;
var imgWidth=800;
var imgHeight=600;
var edit;
var opacidadeFundo=1;
var btJogar;
var btContinuar;
var btSair;

function load(){
	var loadedImgs=0;
	var loadedSnds=0;
	function loaded(source){
		if (source=='img')
			loadedImgs++;
		if (source=='snd')
			loadedSnds++;
		c.clearRect(0,0,800,600);
		c.strokeStyle="red";
		c.strokeRect(348,580,104,10);
		c.fillStyle='yellow';
		c.fillRect(348,581,(loadedImgs+loadedSnds)*4,8);
		if (loadedImgs==Object.keys(imgs).length&&(loadedSnds==Object.keys(snds).length))
			abertura1();
	}

	snds=new Object({
		music:new Audio('snd/loop (1).ogg'),
		sndLogo:new Audio('snd/logo.ogg'),
		sndToc:new Audio('snd/toc.ogg'),
		sndCroc:new Audio('snd/croc.ogg'),
		sndVida:new Audio('snd/vida.ogg'),
		sndPowerUp:new Audio('snd/powerUp.ogg')		
	});
	snds.music.volume=0.3;

	for (var i in snds){
		snds[i].addEventListener('loadeddata',loaded('snd'));
	}

	imgs=new Object({
		logo:new Image(),
		fundo:new Image(),
		imgLoading:new Image(),
		edit1:new Image(),		
		edit2:new Image(),
		btJogar1:new Image(),
		btJogar2:new Image(),
		btContinuar1:new Image(),
		btContinuar2:new Image(),
		btSair1:new Image(),
		btSair2:new Image(),
		player:new Image(),
		bola:new Image(),
		bloco1:new Image(),
		bloco2:new Image(),
		coracao:new Image(),
		ampPlayer:new Image(),
		ampBola:new Image(),
		redBola:new Image(),
		redPlayer:new Image()
	});

	for (var i in imgs){
		imgs[i].addEventListener('load',loaded('img'));
	}

	imgs.logo.src="interface/logo.png";
	imgs.fundo.src="img/fundo.png";
	imgs.imgLoading.src="interface/loading.png";
	imgs.edit1.src="interface/edit1.png";
	imgs.edit2.src="interface/edit2.png";
	imgs.btJogar1.src="interface/btJogar1.png";
	imgs.btJogar2.src="interface/btJogar2.png";
	imgs.btContinuar1.src="interface/btContinuar1.png";
	imgs.btContinuar2.src="interface/btContinuar2.png";
	imgs.btSair1.src="interface/btSair1.png";
	imgs.btSair2.src="interface/btSair2.png";
	imgs.player.src="img/player.png";
	imgs.bola.src="img/bola.png";
	imgs.bloco1.src="img/bloco1.png";
	imgs.bloco2.src="img/bloco2.png";
	imgs.coracao.src="img/coracao.png";
	imgs.ampPlayer.src="img/ampPlayer.png";
	imgs.ampBola.src="img/ampBola.png";
	imgs.redBola.src="img/redBola.png";
	imgs.redPlayer.src="img/redPlayer.png";

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
	edit.img[0]=new Image();
	edit.img[0]=imgs.edit1;
	edit.img[1]=new Image();
	edit.img[1]=imgs.edit2;
	
	btJogar=new Object({
		img:[],
		left:300,
		top:350,
		width:200,
		height:40,
		pos:0
	});
	btJogar.img[0]=new Image();
	btJogar.img[0]=imgs.btJogar1;
	btJogar.img[1]=new Image();
	btJogar.img[1]=imgs.btJogar2;
	
	btContinuar=new Object({
		img:[],
		left:300,
		top:350,
		width:200,
		height:40,
		pos:0
	});
	btContinuar.img[0]=new Image();
	btContinuar.img[0]=imgs.btContinuar1;
	btContinuar.img[1]=new Image();
	btContinuar.img[1]=imgs.btContinuar2;
	
	btSair=new Object({
		img:[],
		left:320,
		top:430,
		width:160,
		height:30,
		pos:0
	});
	btSair.img[0]=new Image();
	btSair.img[0]=imgs.btSair1;
	btSair.img[1]=new Image();
	btSair.img[1]=imgs.btSair2;
	
	player=new Object({
		nome:"",
		img:[],
		vidas:3,
		pontos:0,
		left:0,
		width:80,
		velocidade:20,
		moving:""
	});
	player.img[0]=new Image();
	player.img[0]=imgs.player;

	bola=new Object({
		img:[],
		tamanho:10,
		dirY:0,
		dirX:0,
		left:400,
		top:570,
		movendo:false,
		velocidade:6
	});
	bola.img[0]=new Image();
	bola.img[0]=imgs.bola;
}