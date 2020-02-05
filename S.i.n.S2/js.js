function criaInimigo(qtd){
	for (var i = 0; i < qtd; i++) {
		inimigo.push(new Object({
			nome:"",
			cor:[],
			olhos:new Object({
				img:new Image(),
				iris:new Object({
					img:new Image(),
					x:0,
					y:0,
				}),
			}),
			raio:12,
			fast:6,
			slow:3,
			velocidade:3,
			rotacao:0,
			rotVel:10,
			rot:0,
			dx:0,
			dy:0,
			crescimento:0,
			corpo:[],
			run:false,
			timer:false,
			correu:false,
			timer:false,
			gradiente:0,
			padrao:1,
			pad:0,
			bateu:false,
			pontos:0,
			visible:false,
			inteligencia:function(){
				var ameaca,mx,my;
				var ini,iniC;
					ameaca=false;
					for (var i = -1; i < inimigo.length; i++) {
						if (inimigo[i]!=this) {
							if (i<0) {
								if (!isGameOver){
									for (var x = 0;x<player.corpo.length; x+=5) {
										if (Math.sqrt(Math.pow(this.corpo[0].left-player.corpo[x].left,2)+Math.pow(this.corpo[0].top-player.corpo[x].top,2))<this.raio*2+player.raio*2) {
											ameaca=true;
											ini=-1;
											iniC=x;
											break;
										}
									}
								}
							}
							else{
								for (var x = 0; x < inimigo[i].corpo.length; x+=5) {
									if (Math.sqrt(Math.pow(this.corpo[0].left-inimigo[i].corpo[x].left,2)+Math.pow(this.corpo[0].top-inimigo[i].corpo[x].top,2))<this.raio*2+inimigo[i].raio*2) {
										ameaca=true;
										ini=i;
										iniC=x;
										break;
									}
								}
							}
						}
						if (ameaca)
							break;
					}
					if (!ameaca) {
						var maisPerto=0;
						var menorDist=500;
						for (var i = food.length-1; i >= 0; i--) {
							if (Math.sqrt(Math.pow(food[i].left-this.corpo[0].left,2)+Math.pow(food[i].top-this.corpo[0].top,2))<this.raio+food[i].raio+menorDist) {
								maisPerto=i;
								menorDist=Math.sqrt(Math.pow(food[i].left-this.corpo[0].left,2)+Math.pow(food[i].top-this.corpo[0].top,2));
							}
						}
						mx=Math.floor((food[maisPerto].left)-(this.corpo[0].left));
						my=Math.floor((food[maisPerto].top)-(this.corpo[0].top));
					}
					else{
						if (ini<0) {
							mx=-Math.floor(((player.corpo[iniC].left)-(this.corpo[0].left)));
							my=-Math.floor(((player.corpo[iniC].top)-(this.corpo[0].top)));
						}
						else{
							mx=-Math.floor(((inimigo[ini].corpo[iniC].left)-(this.corpo[0].left)));
							my=-Math.floor(((inimigo[ini].corpo[iniC].top)-(this.corpo[0].top)));
						}
					}
					if (mx>180)
						mx=180;
					if (mx<-180)
						mx=-180;
					mx=Math.floor(mx/4);
					if (my>180)
						my=180;
					if (my<-180)
						my=-180;
					my=Math.floor(my/4);
					this.olhos.iris.x=-(Math.floor(Math.sqrt(Math.pow(0-mx,2)+Math.pow(my,2))*(.09)));
					this.rot=Math.floor(Math.atan2(my,mx)*(180/Math.PI)+180);
			},
			move:function(){
				if ((this.rot<=90)&&(this.rotacao>=270)){
					this.rotacao+=this.rotVel;
					if (this.rotacao>=360)
						this.rotacao=0;

				}
				else if ((this.rot>=270)&&(this.rotacao<=90)){
					this.rotacao-=this.rotVel;
					if (this.rotacao<=0)
						this.rotacao=360;
				}
				else{
					if (this.rot+this.rotVel<this.rotacao){
						this.rotacao-=this.rotVel;
						if (this.rotacao<0)
							this.rotacao=360;
					}
					else if (this.rot-this.rotVel>this.rotacao){
						this.rotacao+=this.rotVel;
						if (this.rotacao>360)
							this.rotacao=0;
					}
				}

				if (this.rotacao<this.rot-this.rotVel/6){
					if (this.olhos.iris.y>0-this.raio/12)
						this.olhos.iris.y-=.75;
				}
				else if (this.rotacao>this.rot+this.rotVel/6) {
					if (this.olhos.iris.y<this.raio/12)
						this.olhos.iris.y+=.75;
				}
				else{
					this.olhos.iris.y=0;
				}

				var aux=this.rotacao/9-20;
				if (aux>=-10&&(aux<=10)) {
					this.dy=this.velocidade*(aux/10);
					if (this.dy>0)
						this.dx=-(this.velocidade-this.dy);
					else
						this.dx=-(this.velocidade+this.dy);
				}
				else{
					if (aux>0)
						aux=20-aux;
					else
						aux=-(20+aux);
					this.dy=(this.velocidade*(aux/10));
					if (this.dy>0)
						this.dx=(this.velocidade-this.dy);
					else
						this.dx=(this.velocidade+this.dy);
				}
				this.dx=-this.dx;
				this.dy=-this.dy;

				var r=this.raio/1.25
				if(r>12)
					r=12			
				var rr=this.raio/r
				r=(this.raio/(r/2))
				for (var i = this.corpo.length-1;i>0; i--) {
					if (this.run&&(this.pontos>0)) {
						this.corpo[i].left+=(this.corpo[(i-1)].left-this.corpo[i].left)/rr;
						this.corpo[i].top+=(this.corpo[(i-1)].top-this.corpo[i].top)/rr;
					}
					else{
						this.corpo[i].left+=(this.corpo[(i-1)].left-this.corpo[i].left)/r;
						this.corpo[i].top+=(this.corpo[(i-1)].top-this.corpo[i].top)/r;
					}
				}

				if (this.run&&(this.pontos>0)){
					this.velocidade=this.fast;
					if (!this.timer){
						this.timer=true;
						setTimeout('reduzSnake(p)',75);
					}
				}
				else
					this.velocidade=this.slow;

				this.corpo[0].left+=this.dx;
				this.corpo[0].top-=this.dy;
			},
			colisao:function(){
				var i=0;
				while (inimigo[i]!=this)
					i++;

				for (var p = 0; p < food.length; p++) {
					if (Math.sqrt((Math.pow(food[p].left-this.corpo[0].left,2))+(Math.pow(food[p].top-this.corpo[0].top,2)))<this.raio+40&&
						(Math.floor(Math.atan2(food[p].top-this.corpo[0].top,food[p].left-this.corpo[0].left)*(180/Math.PI)+180)>=this.rotacao-67)&&
						(Math.floor(Math.atan2(food[p].top-this.corpo[0].top,food[p].left-this.corpo[0].left)*(180/Math.PI)+180)<=this.rotacao+67)){
						if (this.corpo[0].left>food[p].left)
							food[p].left+=1;
						if (this.corpo[0].left<food[p].left)
							food[p].left-=1;
						if (this.corpo[0].top>food[p].top)
							food[p].top+=1;
						if (this.corpo[0].top<food[p].top)
							food[p].top-=1;

						if (food[p].raioAtual>1)
							food[p].raioAtual-=1;

					}
					if (Math.sqrt((Math.pow(food[p].left-this.corpo[0].left,2))+(Math.pow(food[p].top-this.corpo[0].top,2)))<this.raio){
						cresceSnake(i,Math.floor(food[p].raio/2));
						for (var pp = p; pp < food.length-1; pp++) {
							food[pp]=food[(pp+1)];
						}
						food.pop();
					}
				}

				if (Math.sqrt((Math.pow(this.corpo[0].left,2))+(Math.pow(this.corpo[0].top,2)))>bg.raio){
					this.bateu=true;
				}

				if (!isGameOver) {
					for (var p = 0; p < player.corpo.length; p++) {
						if (Math.sqrt((Math.pow(this.corpo[0].left-player.corpo[p].left,2))+(Math.pow(this.corpo[0].top-player.corpo[p].top,2)))<=player.raio+this.raio-2){
							this.bateu=true;
						}
					}
				}

				for (var p = 0; p < inimigo.length; p++) {
					if (inimigo[p]!=this) {
						for (var x = 0; x < inimigo[p].corpo.length; x++) {
							if (Math.sqrt(Math.pow(this.corpo[0].left-inimigo[p].corpo[x].left,2)+Math.pow(this.corpo[0].top-inimigo[p].corpo[x].top,2))<=inimigo[p].raio+this.raio-2) {
								this.bateu=true;
							}
						}
					}

				}

				if (this.bateu) {
					this.pontos=0;
					for (var p=0;p<this.corpo.length;p+=2){
						if (Math.random()*10<=7.5){
							if (p==0)
								criaFood(1,this.corpo[p].left,this.corpo[p].top,Math.floor(2+Math.random()*this.raio/1.5),this.cor[Math.floor(Math.random()*(this.cor.length))]);
							else{
								if (this.corpo[p].left!=this.corpo[(p-1)].left&&
									(this.corpo[p].top!=this.corpo[(p-1)].top))
									criaFood(1,this.corpo[p].left,this.corpo[p].top,Math.floor(2+Math.random()*this.raio/1.5),this.cor[Math.floor(Math.random()*(this.cor.length))]);
							}
						}
					}
					for (var p=i;p<inimigo.length;p++)
						inimigo[p]=inimigo[(p+1)];
					inimigo.pop();
				}
			},
			draw:function(){
				for (var i = this.corpo.length - 1; i >= 0; i--) {
					if (this.corpo[i].visible){
						c.drawImage(body[this.cor[this.corpo[i].cor]].img[0],0,0,52,52,this.corpo[i].left-this.raio,this.corpo[i].top-this.raio,this.raio*2,this.raio*2);
					}
				}

				if (this.corpo[0].visible) {
					c.save();
					c.translate(this.corpo[0].left,this.corpo[0].top);
					c.fillStyle="white";
					c.font="15px Comic Sans MS";
					c.fillText(this.nome,this.raio+25,-(this.raio+15));
					c.rotate(this.rotacao*(Math.PI/180));
					c.drawImage(this.olhos.img,0,0,50,50,-this.raio,-this.raio,this.raio*2,this.raio*2);
					c.drawImage(this.olhos.iris.img,0,0,50,50,-this.raio+this.olhos.iris.x,-this.raio+this.olhos.iris.y,this.raio*2,this.raio*2);
					c.restore();
				}
			}
		}));
		inimigo[inimigo.length-1].nome=nomes[Math.floor(Math.random()*nomes.length)];
		var jaTem=true;
		while (jaTem){
			jaTem=false;
			for (var p = 0; p < inimigo.length-1; p++) {
				if (inimigo[p].nome==inimigo[inimigo.length-1].nome)
					jaTem=true;
			}
			if (jaTem) {
				inimigo[inimigo.length-1].nome=nomes[Math.floor(Math.random()*nomes.length)];
			}
		}
		var iniSinsPos=Math.floor(Math.random()*sins.length);
		if (iniSinsPos==0){

			for (var p = 0; p < Math.floor(1+Math.random()*5); p++) {
				inimigo[inimigo.length-1].cor.push("#"+listColor[Math.floor(Math.random()*6)]+listColor[Math.floor(Math.random()*6)]+listColor[Math.floor(Math.random()*6)]);
			}
			inimigo[inimigo.length-1].padrao=0.1+Math.random()*1;
			inimigo[inimigo.length-1].olhos.img=olhos[Math.floor(Math.random()*2)];
			inimigo[inimigo.length-1].olhos.iris.img=iris;
		}
		else{
			inimigo[inimigo.length-1].cor=sins[iniSinsPos].cor;
			inimigo[inimigo.length-1].padrao=sins[iniSinsPos].padrao;
			inimigo[inimigo.length-1].olhos.img=sins[iniSinsPos].olhosImg;
			inimigo[inimigo.length-1].olhos.iris.img=sins[iniSinsPos].irisImg;
		}


		inimigo[inimigo.length-1].corpo[0]=new Object({
			left:(1+Math.random()*bg.raio*2)-bg.raio,
			top:(1+Math.random()*bg.raio*2)-bg.raio,
			cor:0,
			visible:false
		});
		inimigo[inimigo.length-1].rotacao=Math.floor(Math.random()*360);

		while ((Math.sqrt(Math.pow(inimigo[inimigo.length-1].corpo[0].left-bg.left,2)+Math.pow(inimigo[inimigo.length-1].corpo[0].top-bg.top,2))>bg.raio)||
			((inimigo[inimigo.length-1].corpo[0].left>player.corpo[0].left-800)&&(inimigo[inimigo.length-1].corpo[0].left<player.corpo[0].left+800)&&
			(inimigo[inimigo.length-1].corpo[0].top>player.corpo[0].top-600)&&(inimigo[inimigo.length-1].corpo[0].top<player.corpo[0].top+600))){
			inimigo[inimigo.length-1].corpo[0].left=(1+Math.random()*(bg.raio*2))-bg.raio;
			inimigo[inimigo.length-1].corpo[0].top=(1+Math.random()*(bg.raio*2))-bg.raio;
		}

		cresceSnake((inimigo.length-1),50);
	}
}

function criaFood(qtd,l,t,r,cr){
	for (var i = 0; i < qtd; i++) {
		food.push(new Object({
			img:new Image(),
			raio:4,
			raioAtual:1,
			left:0,
			top:0,
			draw:function(){
				c.drawImage(this.img,0,0,52,52,this.left-this.raioAtual,this.top-this.raioAtual,this.raioAtual*2,this.raioAtual*2);
			}
		}));
		if ((l==0)&&(t==0)) {
			food[food.length-1].raio=Math.floor(4+Math.random()*10);
			food[food.length-1].img=bodyFood["#"+(listColor[Math.floor(Math.random()*6)]+listColor[Math.floor(Math.random()*6)]+listColor[Math.floor(Math.random()*6)])];
			food[food.length-1].left=(1+Math.random()*(bg.raio*2))-bg.raio;
			food[food.length-1].top=(1+Math.random()*(bg.raio*2))-bg.raio;
			while (Math.sqrt(Math.pow(food[food.length-1].left,2)+Math.pow(food[food.length-1].top,2))>bg.raio-50){
				food[food.length-1].left=(1+Math.random()*(bg.raio*2))-bg.raio;
				food[food.length-1].top=(1+Math.random()*(bg.raio*2))-bg.raio;
			}
		}
		else{
			food[food.length-1].left=l;
			food[food.length-1].top=t;
			food[food.length-1].img=bodyFood[cr];
			food[food.length-1].raio=r;
		}
	}
}

var pularAbertura1=false;
var pularAbertura2=false;

function abertura1(){

	document.getElementById("loadGif").style.display="none";
	document.onclick=function(){
		pularAbertura1=true;
		sndLogo.pause();
		abertura2();
	}

	if (!pularAbertura1)
		sndLogo.play();
	if (sndLogo.currentTime>0) {
		cGUI.fillStyle="black";
		cGUI.fillRect(0,0,canvasGUI.width,canvasGUI.height);
	}
	if (sndLogo.currentTime>=sndLogo.duration-2.15) {
		cGUI.drawImage(logo,0,0,920,720,0,0,canvasGUI.width,canvasGUI.height);
	}

	if (sndLogo.currentTime>=sndLogo.duration-0.1&&(!pularAbertura1))
		setTimeout(fadeAbertura,3000);
	else if (!pularAbertura1)
		requestAnimationFrame(abertura1);
}

function abertura2(){
	document.onclick=function(){pularAbertura2=true;}
	if (aberturaOpacidade>0)
		aberturaOpacidade-=.03;
	cGUI.drawImage(fundoMenu,0,0);
	cGUI.drawImage(titulo.img,0,titulo.top);
	cGUI.fillStyle="rgba("+aberturaFill+","+aberturaFill+","+aberturaFill+","+aberturaOpacidade+")";
	cGUI.fillRect(0,0,canvasGUI.width,canvasGUI.height);

	document.onmousemove=mm;
	document.onmousedown=md;
	document.onmouseup=mu;
	document.onmousewheel=mw;
	document.onkeydown=kd;
	exibindoMenu=true;
	if (aberturaOpacidade>0) {
		if (!pularAbertura2)
			requestAnimationFrame(abertura2);
		else{
			fade=1;
			aberturaFill=0;
			aberturaOpacidade=0;
			menuIni();
		}
	}
	else
		fadeAbertura();
}

function fadeAbertura(){
	if (fade>=1&&(aberturaFill<=0)){
		if (aberturaAtual==2){
			menuIni();
		}
		else{
			aberturaAtual++;
			abertura2();
		}
	}
	else{
		if (aberturaAtual==2) {

			cGUI.drawImage(fundoMenu,0,0);
			cGUI.drawImage(titulo.img,0,titulo.top);

			requestAnimationFrame(fadeAbertura);
		}
		else{
			if (!pularAbertura1){
				cGUI.fillStyle="rgba(0,0,0,"+fade+")";
				cGUI.fillRect(0,0,800,600);
				fade+=0.005;
			}
			else
				fade=1;
			requestAnimationFrame(fadeAbertura);
		}
	}
}

function menuIni(){
	cGUI.lineWidth=1;
	cGUI.clearRect(0,0,canvasGUI.width,canvasGUI.height);
	cGUI.drawImage(fundoMenu,0,0);
	cGUI.drawImage(titulo.img,0,0,800,600,titulo.left,titulo.top,titulo.width,titulo.height);
	if (!pularAbertura2) {
		if (titulo.width>300) {
			titulo.width-=6;
			titulo.height-=4.5;
			titulo.left+=3;
			titulo.top-=.1;
		}
	}
	else{
		titulo.width=296;
		titulo.height=222;
		titulo.top=-8.4;
		titulo.left=252;
	}

	if (titulo.width<=300){
		document.onclick='';
		if (exibindoMenu) {
			cGUI.drawImage(select.img,0,0,180,40,select.left,select.top,select.width,select.height);
			var l=505;

			if (localStorage.getItem('SinS2-meuSinS-cor0')!=''&&(localStorage.getItem('SinS2-meuSinS-cor0')!=null)&&(localStorage.getItem('SinS2-meuSinS-cor0')!='null')) {
				cSelecionadas=[];
				btCorSelecionada=[];
				sins[meuSinS]=new Object({

					cor:[],
					olhosImg:new Image(),
					irisImg:new Image(),
					corpo:[],
					padrao:0.1,
					pad:0

				});
				sins[meuSinS].olhosImg.src=localStorage.getItem('SinS2-meuSinS-olhos');
				sins[meuSinS].irisImg.src=localStorage.getItem('SinS2-meuSinS-iris');

				var qtdCores=parseInt(localStorage.getItem('SinS2-meuSinS-qtdCores'));
				for (var i = 0; i < qtdCores; i++) {
					cSelecionadas.push(localStorage.getItem('SinS2-meuSinS-cor'+i));
					sins[meuSinS].cor.push(localStorage.getItem('SinS2-meuSinS-cor'+i));

					btCorSelecionada.push(new Object({
						cor:cSelecionadas[i],
						left:400,
						top:300,
						raio:15
					}));

					if (btCorSelecionada.length>1) {
						for (var o = 0; o < btCorSelecionada.length-1; o++) {
							btCorSelecionada[o].left+=btCorSelecionada[o].raio+2;
						}
						btCorSelecionada[btCorSelecionada.length-1].left=btCorSelecionada[btCorSelecionada.length-2].left-btCorSelecionada[btCorSelecionada.length-1].raio*2.26;
					}

				}

				sins[meuSinS].padrao=parseFloat(localStorage.getItem('SinS2-meuSinS-padrao'));
				if (sins[meuSinS].padrao==0.1){
					distCor.selector.left=310;
					distCor.value=0.1;
				}
				else if (sins[meuSinS].padrao==0.2) {
					distCor.selector.left=330;
					distCor.value=0.2;
				}
				else if (sins[meuSinS].padrao==0.3) {
					distCor.selector.left=350;
					distCor.value=0.3;
				}
				else if (sins[meuSinS].padrao==0.4) {
					distCor.selector.left=370;
					distCor.value=0.4;
				}
				else if (sins[meuSinS].padrao==0.5) {
					distCor.selector.left=390;
					distCor.value=0.5;
				}
				else if (sins[meuSinS].padrao==0.6) {
					distCor.selector.left=410;
					distCor.value=0.6;
				}
				else if (sins[meuSinS].padrao==0.7) {
					distCor.selector.left=430;
					distCor.value=0.7;
				}
				else if (sins[meuSinS].padrao==0.8) {
					distCor.selector.left=450;
					distCor.value=0.8;
				}
				else if (sins[meuSinS].padrao==0.9) {
					distCor.selector.left=470;
					distCor.value=0.9;
				}
				else if (sins[meuSinS].padrao==1) {
					distCor.selector.left=490;
					distCor.value=1;
				}

			}
			else{
				if (sinsPos==meuSinS)
					sinsPos=0;
				if (sins.length==meuSinS+1)
					sins.pop();
			}

			if (sinsPos>0){
				for (var i = 0; i <= 19; i++) {
					sins[sinsPos].corpo.push(new Object({
						left:l,
						top:240,
						cor:Math.floor(sins[sinsPos].pad)
					}));
					sins[sinsPos].pad+=sins[sinsPos].padrao;
					if (sins[sinsPos].pad>=sins[sinsPos].cor.length)
						sins[sinsPos].pad=0;
					l-=10;
				}

				for (var i = 19; i >= 0; i--) {
					cGUI.beginPath();
					cGUI.arc(l,240,20,Math.PI*2,0,true);
					cGUI.closePath();
					gradient=cGUI.createRadialGradient(l,240,18,l,240,20);
					gradient.addColorStop(0,sins[sinsPos].cor[sins[sinsPos].corpo[i].cor]);
					gradient.addColorStop(1,"rgb(0,0,0)");
					cGUI.fillStyle=gradient;
					cGUI.fill();
					l+=10;
				}
				cGUI.save();
				cGUI.translate(515,220);
				cGUI.rotate(180*Math.PI/180);
				cGUI.drawImage(sins[sinsPos].olhosImg,0,0,50,50,0,-40,40,40);
				cGUI.drawImage(sins[sinsPos].irisImg,0,0,50,50,-3,-40,40,40);
				cGUI.restore();
			}
			else{
				cGUI.fillStyle="darkred";
				cGUI.strokeStyle='lime';
				cGUI.font="35px Comic Sans MS";
				cGUI.fillText("Aleatório",400,255);
				cGUI.strokeText("Aleatório",400,255);
			}

			cGUI.drawImage(setaEsq.img[setaEsq.pos],0,0,40,40,setaEsq.left,setaEsq.top,setaEsq.width,setaEsq.height);
			cGUI.drawImage(setaDir.img[setaDir.pos],0,0,40,40,setaDir.left,setaDir.top,setaDir.width,setaDir.height);
			cGUI.drawImage(btCriar.img[btCriar.pos],0,0,180,40,btCriar.left,btCriar.top,btCriar.width,btCriar.height);
			cGUI.drawImage(edNome.img[edNome.pos],0,0,180,40,edNome.left,edNome.top,edNome.width,edNome.height);
			if (edNome.pos==0)
				cGUI.fillStyle="red";
			else
				cGUI.fillStyle="white";
			cGUI.font="20px Comic Sans MS";
			cGUI.fillText(edNome.text,400,edNome.top+25);

			cGUI.drawImage(btJogar.img[btJogar.pos],0,0,180,40,btJogar.left,btJogar.top,btJogar.width,btJogar.height);
			cGUI.drawImage(btSair.img[btSair.pos],0,0,180,40,btSair.left,btSair.top,btSair.width,btSair.height);

			if (localStorage.getItem("SinS2-recorde")!=null) {
				cGUI.fillStyle="lime";
				cGUI.font="25px Comic Sans MS";
				cGUI.fillText("Recorde:",700,50);
				cGUI.fillStyle="white";
				cGUI.font="20px Comic Sans MS";
				cGUI.fillText(localStorage.getItem("SinS2-donoRecorde"),700,80);
				cGUI.fillText(localStorage.getItem("SinS2-recorde")+" pontos",700,110);
			}
		}
		else if (exibindoMenuCriacao){
			cGUI.drawImage(distCor.img,0,0,180,5,distCor.left,distCor.top,distCor.width,distCor.height);
			cGUI.drawImage(distCor.selector.img[distCor.selector.pos],0,0,15,30,distCor.selector.left,distCor.selector.top,distCor.selector.width,distCor.selector.height);
			cGUI.drawImage(select.img,0,0,180,40,select.left,select.top,select.width,select.height);
			var l=505;

			sins[meuSinS]=new Object({
				cor:["white"],
				olhosImg:new Image(),
				irisImg:new Image(),
				corpo:[],
				padrao:1,
				pad:0
			});
			sins[meuSinS].olhosImg=olhos[0];
			sins[meuSinS].irisImg=iris;

			sins[meuSinS].padrao=distCor.value;

			if (cSelecionadas.length>0) {
				for (var i = 0; i < cSelecionadas.length; i++) {
					sins[meuSinS].cor[i]=cSelecionadas[i];
				}
			}

			for (var i = 0; i <= 19; i++) {
				sins[meuSinS].corpo.push(new Object({
					left:l,
					top:240,
					cor:Math.floor(sins[meuSinS].pad)
				}));
				sins[meuSinS].pad+=sins[meuSinS].padrao;
				if (sins[meuSinS].pad>=sins[meuSinS].cor.length)
					sins[meuSinS].pad=0;
				l-=10;
			}

			for (var i = 19; i >= 0; i--) {
				cGUI.beginPath();
				cGUI.arc(l,240,20,Math.PI*2,0,true);
				cGUI.closePath();
				gradient=c.createRadialGradient(l,240,18,l,240,20);
				gradient.addColorStop(0,sins[meuSinS].cor[sins[meuSinS].corpo[i].cor]);
				gradient.addColorStop(1,"rgb(0,0,0)");
				cGUI.fillStyle=gradient;
				cGUI.fill();
				l+=10;
			}
			cGUI.save();
			cGUI.translate(515,220);
			cGUI.rotate(180*Math.PI/180);
			cGUI.drawImage(sins[meuSinS].olhosImg,0,0,50,50,0,-40,40,40);
			cGUI.drawImage(sins[meuSinS].irisImg,0,0,50,50,-3,-40,40,40);
			cGUI.restore();

			for (var o = 0; o < btCorSelecionada.length; o++) {
				if (o==0)
					btCorSelecionada[o].left=400
				else{
					for (var p = 0; p < o; p++) {
						btCorSelecionada[p].left+=16.8;
					}
					btCorSelecionada[o].left=btCorSelecionada[(o-1)].left-33.75;
				}
			}

			for (var i = 0; i < btCorSelecionada.length; i++) {

				cGUI.fillStyle=btCorSelecionada[i].cor;
				cGUI.beginPath();
				cGUI.arc(btCorSelecionada[i].left,btCorSelecionada[i].top,btCorSelecionada[i].raio,Math.PI*2,0,true);
				cGUI.closePath();
				cGUI.fill();

				cGUI.strokeStyle='rgba(255,255,255,.5)';
				cGUI.beginPath();
				cGUI.arc(btCorSelecionada[i].left,btCorSelecionada[i].top,btCorSelecionada[i].raio-.5,Math.PI*2,0,true);
				cGUI.closePath();
				cGUI.stroke();

				if (btCorSelecionada[i].raio==17||(btCorSelecionada[i].raio==13)) {
					cGUI.fillStyle='red';
					cGUI.fillText('x',btCorSelecionada[i].left,btCorSelecionada[i].top+5);
					cGUI.strokeStyle='black';
					cGUI.strokeText('x',btCorSelecionada[i].left,btCorSelecionada[i].top+5);
				}
			}

			cGUI.drawImage(select.img,0,0,180,40,170,325,455,110);

			for (var i = 0; i < btCor.length; i++) {
				cGUI.fillStyle=btCor[i].cor;
				cGUI.beginPath();
				cGUI.arc(btCor[i].left,btCor[i].top,btCor[i].raio,Math.PI*2,0,true);
				cGUI.closePath();
				cGUI.fill();
			}

			sinsPos=meuSinS;

			cGUI.drawImage(btJogar.img[btJogar.pos],0,0,180,40,btJogar.left,btJogar.top,btJogar.width,btJogar.height);
			cGUI.drawImage(btSair.img[btSair.pos],0,0,180,40,btSair.left,btSair.top,btSair.width,btSair.height);

			for (var i = 0; i < cSelecionadas.length; i++) {
				localStorage.setItem('SinS2-meuSinS-cor'+i,cSelecionadas[i]);
			}
			localStorage.setItem('SinS2-meuSinS-qtdCores',cSelecionadas.length);

			localStorage.setItem('SinS2-meuSinS-olhos',sins[meuSinS].olhosImg.src);
			localStorage.setItem('SinS2-meuSinS-iris',sins[meuSinS].irisImg.src);
			localStorage.setItem('SinS2-meuSinS-padrao',sins[meuSinS].padrao);

		}
	}

	if (exibindoMenu||(exibindoMenuCriacao))
		requestAnimationFrame(menuIni);
	else
		novoJogo()
}

function novoJogo(){
	canvas.width=500;
	canvas.height=360;
	cWidth=500;
	cHeight=360;
	isGameOver=false;
	novoRecorde=false;
	pausado=false;
	player.nome=edNome.text;
	localStorage.setItem('SinS2-player',edNome.text);
	localStorage.setItem('SinS2-sinsPos',sinsPos);
	player.raio=12;
	player.rotVel=15;
	player.corpo=[];
	player.cor=[];
	player.pad=0;
	player.run=false;
	player.pontos=0;
	player.rotacao=Math.floor(Math.random()*360);
	if (sinsPos==0) {
		for (var i = 0; i < Math.floor(1+Math.random()*5); i++) {
			player.cor.push("#"+(listColor[Math.floor(Math.random()*6)]+listColor[Math.floor(Math.random()*6)]+listColor[Math.floor(Math.random()*6)]));
		}
		player.padrao=0.1+Math.random()*1;
		player.olhos.img=olhos[Math.floor(Math.random()*2)];
	}
	else{
		player.cor=sins[sinsPos].cor;
		player.padrao=sins[sinsPos].padrao;
		player.olhos.img=sins[sinsPos].olhosImg;
	}
	player.corpo[0]=new Object({
		left:0,
		top:0,
		cor:0
	});

	cresceSnake(-1,50);
	player.pontos=0;

	inimigo=[];
	criaInimigo(25);

	var random;
	for (var i = 0; i < inimigo.length; i++) {
		if (Math.floor(Math.random()*10)<=4)
			random=Math.floor(50+Math.random()*1500)
		else
			random=Math.floor(50+Math.random()*500)
		cresceSnake(i,random);
	}

	ranking=[];
	for (var i = 0; i < 5; i++) {
		ranking.push(new Object({
			nome:'',
			pontos:0
		}));
	}
	atualizaRanking();
	setTimeout(atualizaRanking,500);

	food=[];
	criaFood(1000,0,0);

	c.resetTransform();
	c.translate(canvas.width/2,canvas.height/2);

	document.body.style.cursor='none';
	loop();
}

var lastTime=0
var refreshRate=16
var refreshCounter=refreshRate
function loop(time=0){
	
	var deltaTime=time-lastTime
	lastTime=time
	refreshCounter+=deltaTime
	if(refreshCounter>=refreshRate){	
		refreshCounter=0
		moveGame();
		detectaColisao();
		desenha();
	}

	if (!isGameOver&&(!pausado)){
		requestAnimationFrame(loop);
		gui();
	}
	else if (pausado){
		document.body.style.cursor='default';
		pausa();
	}
	else{
		document.body.style.cursor='default';
		cGUI.clearRect(0,0,800,600);
		fade=0;
		gameOver();
	}
}

function pausa(){
	desenha();
	cGUI.clearRect(0,0,800,600);
	gui();
	cGUI.fillStyle="rgba(0,0,0,.7)";
	cGUI.fillRect(0,0,canvasGUI.width,canvasGUI.height);

	cGUI.textAlign="center";
	cGUI.fillStyle="lime";
	cGUI.font="45px Comic Sans MS";
	cGUI.fillText("Jogo Pausado",canvasGUI.width/2,canvasGUI.height/4);

	cGUI.drawImage(btContinuar.img[btContinuar.pos],0,0,180,40,btContinuar.left,btContinuar.top,btContinuar.width,btContinuar.height);
	cGUI.drawImage(btSair.img[btSair.pos],0,0,180,40,btSair.left,btSair.top,btSair.width,btSair.height);

	if (pausado)
		requestAnimationFrame(pausa);
	else{
		document.body.style.cursor='none';
		loop();
	}

}

function desenha(){
	c.clearRect(player.corpo[0].left-(canvas.width/2+50),player.corpo[0].top-(canvas.height/2+50),canvas.width+50,canvas.height+50);
	c.beginPath();
	c.arc(0,0,bg.raio+150,Math.PI*2,0,true);
	c.closePath();
	gradient=c.createRadialGradient(0,0,bg.raio+50,0,0,bg.raio+150);
	gradient.addColorStop(0,"rgba(150,0,0,.5)");
	gradient.addColorStop(1,"black");
	c.fillStyle=gradient;
	c.fill();
	c.drawImage(bg.img,0,0,3200,3200,bg.left-bg.raio,bg.top-bg.raio,bg.raio*2,bg.raio*2);
	for (var i = 0; i < foodVisible.length; i++) {
		foodVisible[i].draw();
	}
	for (var p = 0; p < iniVisible.length; p++) {
		iniVisible[p].draw();
	}
	if (!isGameOver) {
		player.draw();
	}
}

function gui(){
	cGUI.clearRect(0,0,800,600);
	cGUI.fillStyle="lime";
	cGUI.font="14px Comic Sans MS";
	cGUI.textAlign="left";
	cGUI.fillText("Pontuação: "+player.pontos,15,585);
	cGUI.font="12px Comic Sans MS";
	var rTopo=25;
	cGUI.textAlign="end";
	for (var i = 0; i < ranking.length; i++) {
		if (ranking[i].nome==player.nome)
			cGUI.fillStyle="lime";
		else if (ranking[i].pontos!=0)
			cGUI.fillStyle="white";
		else
			cGUI.fillStyle="red";
		cGUI.fillText(ranking[i].nome+" - "+ranking[i].pontos,790,rTopo);
		rTopo+=17;
	}
	if (!pausado) {
		cGUI.save();
		cGUI.translate(mouseCursor.left,mouseCursor.top);
		cGUI.rotate(player.rot*(Math.PI/180));
		cGUI.drawImage(mouseCursor.img,0,0,50,38,-mouseCursor.width/2,-mouseCursor.height/2,mouseCursor.width,mouseCursor.height);
		cGUI.restore();
	}
}

function moveGame(){
	if (!isGameOver) {
		if (player.ia)
			player.inteligencia();
		player.move();
	}

	iniVisible=[];
	var cw=(canvas.width/2+50);
	var ch=(canvas.height/2+50);
	for (var p = 0; p < inimigo.length; p++) {
		inimigo[p].visible=false;
		for (var i = inimigo[p].corpo.length - 1; i >= 0; i--) {
			if ((inimigo[p].corpo[i].left>player.corpo[0].left-cw)&&(inimigo[p].corpo[i].left<player.corpo[0].left+cw)&&
				(inimigo[p].corpo[i].top>player.corpo[0].top-ch)&&(inimigo[p].corpo[i].top<player.corpo[0].top+ch)){
				inimigo[p].corpo[i].visible=true;
				inimigo[p].visible=true;
			}
			else
				inimigo[p].corpo[i].visible=false;
		}

		if (inimigo[p].visible) {
			iniVisible.push(inimigo[p]);
		}
		inimigo[p].inteligencia();
		inimigo[p].move();
	}

	foodVisible=[];
	for (var i = 0; i < food.length; i++) {
		if ((food[i].left>player.corpo[0].left-(canvas.width/2+50))&&(food[i].left<player.corpo[0].left+(canvas.width/2+50))&&
			(food[i].top>player.corpo[0].top-(canvas.height/2+50))&&(food[i].top<player.corpo[0].top+(canvas.height/2+50))){
			foodVisible.push(food[i]);
			if (food[i].raioAtual<=food[i].raio)
				food[i].raioAtual+=.75;
		}
	}

	if (food.length<3000)
		criaFood(1,0,0);

	if (inimigo.length<30)
		criaInimigo(1);

	if (!isGameOver){
		c.translate(-player.dx,player.dy);
	}

	if (cWidth>canvas.width) {
		c.resetTransform();
		canvas.width+=5;
		canvas.height+=4;
		c.translate(-player.corpo[0].left+canvas.width/2,-player.corpo[0].top+canvas.height/2);
	}
	else if (cWidth<canvas.width) {
		c.resetTransform();
		canvas.width-=5;
		canvas.height-=4;
		c.translate(-player.corpo[0].left+canvas.width/2,-player.corpo[0].top+canvas.height/2);
	}
}

function detectaColisao(){
	if (!isGameOver) {
		player.colisao();
	}

	for (var i = 0; i < inimigo.length; i++) {
		inimigo[i].colisao();
	}
}

function gameOver(){
	if (fade<1){
		moveGame();
		detectaColisao();
		desenha();
		cGUI.fillStyle="rgba(0,0,0,"+fade+")";
		cGUI.fillRect(0,0,canvasGUI.width,canvasGUI.height);
		fade+=0.01;
	}
	else{
		cGUI.resetTransform();
		canvasGUI.width=800;
		canvasGUI.height=600;
		cGUI.fillStyle="black";
		cGUI.fillRect(0,0,800,600);
		cGUI.fillStyle="lime";
		cGUI.font="45px Comic Sans MS";
		cGUI.textAlign="center";
		cGUI.fillText("Fim de Jogo",400,150);

		if (player.pontos>localStorage.getItem("SinS2-recorde")) {
			localStorage.setItem("SinS2-recorde",player.pontos);
			localStorage.setItem("SinS2-donoRecorde",player.nome);
			novoRecorde=true;

		}

		if (novoRecorde) {
			cGUI.fillStyle="white"
			cGUI.font="40px Comic Sans MS";
			cGUI.fillText("Novo Recorde!",400,275);
		}

		cGUI.fillStyle="white";
		cGUI.font="30px Comic Sans MS";
		cGUI.fillText(player.pontos+" pontos",400,350);

		cGUI.drawImage(btContinuar.img[btContinuar.pos],0,0,180,40,btContinuar.left,btContinuar.top,btContinuar.width,btContinuar.height);
	}

	if (isGameOver)
		requestAnimationFrame(gameOver);
	else{
		exibindoMenu=true;
		menuIni();
	}
}

function mm(e){

	mx=(e.clientX*(canvas.width/window.innerWidth));
	my=(e.clientY*(canvas.height/window.innerHeight));

	auxX=(e.clientX*(canvasGUI.width/window.innerWidth));
	auxY=(e.clientY*(canvasGUI.height/window.innerHeight));

	mouseCursor.left=auxX;
	mouseCursor.top=auxY;

	if (exibindoMenu) {

		document.body.style.cursor="default";
		if ((mouseCursor.left>=btCriar.left)&&(mouseCursor.left<=btCriar.left+btCriar.width)&&
			(mouseCursor.top>=btCriar.top)&&(mouseCursor.top<=btCriar.top+btCriar.height)) {
			btCriar.pos=1;
			document.body.style.cursor="pointer";
		}
		else{
			btCriar.pos=0;
		}

		if ((mouseCursor.left>=edNome.left)&&(mouseCursor.left<=edNome.left+edNome.width)&&
			(mouseCursor.top>=edNome.top)&&(mouseCursor.top<=edNome.top+edNome.height)) {
			edNome.pos=1;
			document.body.style.cursor="pointer";
		}
		else if (!edNome.focado){
			edNome.pos=0;
		}

		if ((mouseCursor.left>=btJogar.left)&&(mouseCursor.left<=btJogar.left+btJogar.width)&&
			(mouseCursor.top>=btJogar.top)&&(mouseCursor.top<=btJogar.top+btJogar.height)) {
			btJogar.pos=1;
			document.body.style.cursor="pointer";
		}
		else{
			btJogar.pos=0;
		}

		if ((mouseCursor.left>=btSair.left)&&(mouseCursor.left<=btSair.left+btSair.width)&&
			(mouseCursor.top>=btSair.top)&&(mouseCursor.top<=btSair.top+btSair.height)) {
			btSair.pos=1;
			document.body.style.cursor="pointer";
		}
		else{
			btSair.pos=0;
		}

		if ((mouseCursor.left>=setaEsq.left)&&(mouseCursor.left<=setaEsq.left+setaEsq.width)&&
			(mouseCursor.top>=setaEsq.top)&&(mouseCursor.top<=setaEsq.top+setaEsq.height)) {
			setaEsq.pos=1;
			document.body.style.cursor="pointer";
		}
		else{
			setaEsq.pos=0;
		}

		if ((mouseCursor.left>=setaDir.left)&&(mouseCursor.left<=setaDir.left+setaDir.width)&&
			(mouseCursor.top>=setaDir.top)&&(mouseCursor.top<=setaDir.top+setaDir.height)) {
			setaDir.pos=1;
			document.body.style.cursor="pointer";
		}
		else{
			setaDir.pos=0;
		}
	}
	else if (exibindoMenuCriacao) {

		document.body.style.cursor="default";
		if ((mouseCursor.left>=distCor.selector.left)&&(mouseCursor.left<=distCor.selector.left+distCor.selector.width)&&
			(mouseCursor.top>=distCor.selector.top)&&(mouseCursor.top<=distCor.selector.top+distCor.selector.height)) {
			document.body.style.cursor="pointer";
			if (!distCor.focado)
				distCor.selector.pos=1;
		}
		else if (!distCor.focado){
			distCor.selector.pos=0;
		}

		if (distCor.focado) {
			if (mouseCursor.left>distCor.left&&(mouseCursor.left<distCor.left+distCor.width)){
				distCor.selector.left=mouseCursor.left-distCor.selector.width/2;
				if (distCor.selector.left<=320)
					distCor.value=0.1
				else if (distCor.selector.left<=340)
					distCor.value=0.2
				else if (distCor.selector.left<=360)
					distCor.value=0.3
				else if (distCor.selector.left<=380)
					distCor.value=0.4
				else if (distCor.selector.left<=400)
					distCor.value=0.5
				else if (distCor.selector.left<=420)
					distCor.value=0.6
				else if (distCor.selector.left<=440)
					distCor.value=0.7
				else if (distCor.selector.left<=460)
					distCor.value=0.8
				else if (distCor.selector.left<=480)
					distCor.value=0.9
				else
					distCor.value=1;
			}
		}

		for (var i = 0; i < btCorSelecionada.length; i++) {
			if (Math.sqrt(Math.pow(btCorSelecionada[i].left-mouseCursor.left,2)+Math.pow(btCorSelecionada[i].top-mouseCursor.top,2))<btCorSelecionada[i].raio) {
				btCorSelecionada[i].raio=17;
				document.body.style.cursor='pointer';
			}
			else{
				btCorSelecionada[i].raio=15;
			}
		}

		for (var i = 0; i < btCor.length; i++) {
			if (Math.sqrt(Math.pow(btCor[i].left-mouseCursor.left,2)+Math.pow(btCor[i].top-mouseCursor.top,2))<btCor[i].raio) {
				btCor[i].raio=7;
			}
			else
				btCor[i].raio=5;
		}

		if ((mouseCursor.left>=btJogar.left)&&(mouseCursor.left<=btJogar.left+btJogar.width)&&
			(mouseCursor.top>=btJogar.top)&&(mouseCursor.top<=btJogar.top+btJogar.height)) {
			btJogar.pos=1;
			document.body.style.cursor="pointer";
		}
		else{
			btJogar.pos=0;
		}


		if ((mouseCursor.left>=btSair.left)&&(mouseCursor.left<=btSair.left+btSair.width)&&
			(mouseCursor.top>=btSair.top)&&(mouseCursor.top<=btSair.top+btSair.height)) {
			btSair.pos=1;
			document.body.style.cursor="pointer";
		}
		else{
			btSair.pos=0;
		}

	}
	else if (pausado) {
		document.body.style.cursor="default";
		if ((mouseCursor.left>=btContinuar.left)&&(mouseCursor.left<=btContinuar.left+btContinuar.width)&&
			(mouseCursor.top>=btContinuar.top)&&(mouseCursor.top<=btContinuar.top+btContinuar.height)) {
			btContinuar.pos=1;
			document.body.style.cursor="pointer";
		}
		else{
			btContinuar.pos=0;
		}

		if ((mouseCursor.left>=btSair.left)&&(mouseCursor.left<=btSair.left+btSair.width)&&
			(mouseCursor.top>=btSair.top)&&(mouseCursor.top<=btSair.top+btSair.height)) {
			btSair.pos=1;
			document.body.style.cursor="pointer";
		}
		else{
			btSair.pos=0;
		}
	}
	else if (isGameOver) {
		if ((mouseCursor.left>=btContinuar.left)&&(mouseCursor.left<=btContinuar.left+btContinuar.width)&&
			(mouseCursor.top>=btContinuar.top)&&(mouseCursor.top<=btContinuar.top+btContinuar.height)) {
			btContinuar.pos=1;
			document.body.style.cursor="pointer";
		}
		else{
			btContinuar.pos=0;
		}
	}
	else{
		auxX=(mx-canvas.width/2);
		if (auxX>180)
			auxX=180;
		if (auxX<-180)
			auxX=-180;
		auxX=(auxX/4);


		auxY=(my-canvas.height/2);
		if (auxY>180)
			auxY=180;
		if (auxY<-180)
			auxY=-180;
		auxY=(auxY/4);

		player.olhos.iris.x=-(Math.floor(Math.sqrt(Math.pow(0-auxX,2)+Math.pow(auxY,2))*(player.raio/250)));
		player.rot=(Math.atan2(my-canvas.height/2,mx-canvas.width/2)*(180/Math.PI)+180);
	}
}

function md(e){
	if (exibindoMenu) {

		if ((mouseCursor.left>=btCriar.left)&&(mouseCursor.left<=btCriar.left+btCriar.width)&&
			(mouseCursor.top>=btCriar.top)&&(mouseCursor.top<=btCriar.top+btCriar.height)) {
			btCriar.pos=0;
		}

		if ((mouseCursor.left>=edNome.left)&&(mouseCursor.left<=edNome.left+edNome.width)&&
			(mouseCursor.top>=edNome.top)&&(mouseCursor.top<=edNome.top+edNome.height)) {
			edNome.pos=1;
			edNome.focado=true;
			if (edNome.text=="Digite seu nome")
				edNome.text="";
		}
		else{
			edNome.pos=0;
			edNome.focado=false;
			if (edNome.text=="")
				edNome.text="Digite seu nome";
		}

		if ((mouseCursor.left>=edNome.left)&&(mouseCursor.left<=edNome.left+edNome.width)&&
			(mouseCursor.top>=edNome.top)&&(mouseCursor.top<=edNome.top+edNome.height)) {
			edNome.pos=0;
		}

		if ((mouseCursor.left>=btJogar.left)&&(mouseCursor.left<=btJogar.left+btJogar.width)&&
			(mouseCursor.top>=btJogar.top)&&(mouseCursor.top<=btJogar.top+btJogar.height)) {
			btJogar.pos=0;
		}

		if ((mouseCursor.left>=btSair.left)&&(mouseCursor.left<=btSair.left+btSair.width)&&
			(mouseCursor.top>=btSair.top)&&(mouseCursor.top<=btSair.top+btSair.height)) {
			btSair.pos=0;
		}

		if ((mouseCursor.left>=setaEsq.left)&&(mouseCursor.left<=setaEsq.left+setaEsq.width)&&
			(mouseCursor.top>=setaEsq.top)&&(mouseCursor.top<=setaEsq.top+setaEsq.height)) {
			setaEsq.pos=0;
		}

		if ((mouseCursor.left>=setaDir.left)&&(mouseCursor.left<=setaDir.left+setaDir.width)&&
			(mouseCursor.top>=setaDir.top)&&(mouseCursor.top<=setaDir.top+setaDir.height)) {
			setaDir.pos=0;
		}

	}
	else if (exibindoMenuCriacao){

		if ((mouseCursor.left>=distCor.selector.left)&&(mouseCursor.left<=distCor.selector.left+distCor.selector.width)&&
			(mouseCursor.top>=distCor.selector.top)&&(mouseCursor.top<=distCor.selector.top+distCor.selector.height)) {
			distCor.selector.pos=0;
			distCor.focado=true;
		}

		for (var i = 0; i < btCorSelecionada.length; i++) {
			if (Math.sqrt(Math.pow(btCorSelecionada[i].left-mouseCursor.left,2)+Math.pow(btCorSelecionada[i].top-mouseCursor.top,2))<btCorSelecionada[i].raio) {
				btCorSelecionada[i].raio=13;
			}
			else{
				btCorSelecionada[i].raio=15;
			}
		}

		for (var i = 0; i < btCor.length; i++) {
			if (Math.sqrt(Math.pow(btCor[i].left-mouseCursor.left,2)+Math.pow(btCor[i].top-mouseCursor.top,2))<btCor[i].raio) {
				btCor[i].raio=5;
			}
		}

		if ((mouseCursor.left>=btJogar.left)&&(mouseCursor.left<=btJogar.left+btJogar.width)&&
			(mouseCursor.top>=btJogar.top)&&(mouseCursor.top<=btJogar.top+btJogar.height)) {
			btJogar.pos=0;
		}

		if ((mouseCursor.left>=btSair.left)&&(mouseCursor.left<=btSair.left+btSair.width)&&
			(mouseCursor.top>=btSair.top)&&(mouseCursor.top<=btSair.top+btSair.height)) {
			btSair.pos=0;
		}

	}
	else if (pausado) {
		if ((mouseCursor.left>=btContinuar.left)&&(mouseCursor.left<=btContinuar.left+btContinuar.width)&&
			(mouseCursor.top>=btContinuar.top)&&(mouseCursor.top<=btContinuar.top+btContinuar.height)) {
			btContinuar.pos=0;
		}

		if ((mouseCursor.left>=btSair.left)&&(mouseCursor.left<=btSair.left+btSair.width)&&
			(mouseCursor.top>=btSair.top)&&(mouseCursor.top<=btSair.top+btSair.height)) {
			btSair.pos=0;
		}
	}
	else if (isGameOver) {
		if ((mx>=btContinuar.left)&&(mx<=btContinuar.left+btContinuar.width)&&
			(my>=btContinuar.top)&&(my<=btContinuar.top+btContinuar.height)) {
			btContinuar.pos=0;
		}
	}
	else{
		if (e.which==1) {
			player.run=true;
		}
	}
}

function mu(e){
	if (exibindoMenu) {
		if ((mouseCursor.left>=btCriar.left)&&(mouseCursor.left<=btCriar.left+btCriar.width)&&
			(mouseCursor.top>=btCriar.top)&&(mouseCursor.top<=btCriar.top+btCriar.height)) {
			btCriar.pos=1;
			if (edNome.text!="Digite seu nome"&&(edNome.text!="")&&(edNome.text!=" ")) {
				exibindoMenuCriacao=true;
				exibindoMenu=false;
			}
			else{
				edNome.pos=1;
			}
		}

		if ((mouseCursor.left>=edNome.left)&&(mouseCursor.left<=edNome.left+edNome.width)&&
			(mouseCursor.top>=edNome.top)&&(mouseCursor.top<=edNome.top+edNome.height)) {
			edNome.pos=1;
		}

		if ((mouseCursor.left>=btJogar.left)&&(mouseCursor.left<=btJogar.left+btJogar.width)&&
			(mouseCursor.top>=btJogar.top)&&(mouseCursor.top<=btJogar.top+btJogar.height)) {
			btJogar.pos=1;
			if (edNome.text!="Digite seu nome"&&(edNome.text!="")&&(edNome.text!=" ")) {
				document.body.style.cursor="default";
				exibindoMenu=false;
			}
			else{
				edNome.pos=1;
			}
		}

		if ((mouseCursor.left>=btSair.left)&&(mouseCursor.left<=btSair.left+btSair.width)&&
			(mouseCursor.top>=btSair.top)&&(mouseCursor.top<=btSair.top+btSair.height)) {
				document.onmousedown="";
				document.onmouseup="";
				document.onmousemove="";
				document.onmousewheel="";
				document.onkeydown="";
				javascript:location.href='../menu.html';
				btSair.pos=1;
		}

		if ((mouseCursor.left>=setaEsq.left)&&(mouseCursor.left<=setaEsq.left+setaEsq.width)&&
			(mouseCursor.top>=setaEsq.top)&&(mouseCursor.top<=setaEsq.top+setaEsq.height)) {
			setaEsq.pos=1;
			if (sinsPos>0)
				sinsPos--;
			else
				sinsPos=sins.length-1;
		}

		if ((mouseCursor.left>=setaDir.left)&&(mouseCursor.left<=setaDir.left+setaDir.width)&&
			(mouseCursor.top>=setaDir.top)&&(mouseCursor.top<=setaDir.top+setaDir.height)) {
			setaDir.pos=1;
			if (sinsPos<sins.length-1)
				sinsPos++;
			else
				sinsPos=0;
		}
	}
	else if (exibindoMenuCriacao) {

		if ((mouseCursor.left>=distCor.selector.left)&&(mouseCursor.left<=distCor.selector.left+distCor.selector.width)&&
			(mouseCursor.top>=distCor.selector.top)&&(mouseCursor.top<=distCor.selector.top+distCor.selector.height)) {
			distCor.selector.pos=1;
		}

		if (distCor.focado)
			distCor.focado=false;

		for (var i = 0; i < btCorSelecionada.length; i++) {
			if (Math.sqrt(Math.pow(btCorSelecionada[i].left-mouseCursor.left,2)+Math.pow(btCorSelecionada[i].top-mouseCursor.top,2))<btCorSelecionada[i].raio) {
				btCorSelecionada[i].raio=17;
				for (var o = i; o < btCorSelecionada.length-1; o++) {
					btCorSelecionada[o]=btCorSelecionada[o+1];
					cSelecionadas[o]=cSelecionadas[o+1];
				}
				btCorSelecionada.pop();
				cSelecionadas.pop();
				if (cSelecionadas.length==0)
					localStorage.setItem('SinS2-meuSinS-cor0',null);
			}
		}

		for (var i = 0; i < btCor.length; i++) {
			if (Math.sqrt(Math.pow(btCor[i].left-mouseCursor.left,2)+Math.pow(btCor[i].top-mouseCursor.top,2))<btCor[i].raio) {
				btCor[i].raio=7;
				if (cSelecionadas.length<10) {
					if (cSelecionadas.length==0) {
						sins[meuSinS].cor[0]=btCor[i].cor;
						cSelecionadas.push(btCor[i].cor);
					}
					else{
						sins[meuSinS].cor.push(btCor[i].cor);
						cSelecionadas.push(btCor[i].cor);
					}
					btCorSelecionada.push(new Object({
						cor:btCor[i].cor,
						left:400,
						top:300,
						raio:15
					}));

					if (btCorSelecionada.length>1) {
						for (var o = 0; o < btCorSelecionada.length-1; o++) {
							btCorSelecionada[o].left+=btCorSelecionada[o].raio+2;
						}
						btCorSelecionada[btCorSelecionada.length-1].left=btCorSelecionada[btCorSelecionada.length-2].left-btCorSelecionada[btCorSelecionada.length-1].raio*2.26;
					}
				}
			}
		}

		if ((mouseCursor.left>=btJogar.left)&&(mouseCursor.left<=btJogar.left+btJogar.width)&&
			(mouseCursor.top>=btJogar.top)&&(mouseCursor.top<=btJogar.top+btJogar.height)) {
			btJogar.pos=1;
			if(cSelecionadas.length>0){
				exibindoMenu=false;
				exibindoMenuCriacao=false;
			}
		}

		if ((mouseCursor.left>=btSair.left)&&(mouseCursor.left<=btSair.left+btSair.width)&&
			(mouseCursor.top>=btSair.top)&&(mouseCursor.top<=btSair.top+btSair.height)) {
				if (cSelecionadas.length==0) {
					sinsPos=0;
				}
				exibindoMenuCriacao=false;
				exibindoMenu=true;
				btSair.pos=1;
		}

	}
	else if (pausado) {
		if ((mouseCursor.left>=btContinuar.left)&&(mouseCursor.left<=btContinuar.left+btContinuar.width)&&
			(mouseCursor.top>=btContinuar.top)&&(mouseCursor.top<=btContinuar.top+btContinuar.height)) {
			btContinuar.pos=1;
			pausado=false;
		}

		if ((mouseCursor.left>=btSair.left)&&(mouseCursor.left<=btSair.left+btSair.width)&&
			(mouseCursor.top>=btSair.top)&&(mouseCursor.top<=btSair.top+btSair.height)) {
			btSair.pos=1;
			pausado=false;
			for (var p=0;p<player.corpo.length;p+=2){
				if (p<=limiteCorpo) {
					if (Math.random()*10<=7.5){
						if (p==0)
							criaFood(1,player.corpo[p].left,player.corpo[p].top,Math.floor(2+Math.random()*player.raio/1.5),player.cor[Math.floor(Math.random()*(player.cor.length))]);
						else{
							if (player.corpo[p].left!=player.corpo[(p-1)].left&&
								(player.corpo[p].top!=player.corpo[(p-1)].top))
								criaFood(1,player.corpo[p].left,player.corpo[p].top,Math.floor(2+Math.random()*player.raio/1.5),player.cor[Math.floor(Math.random()*(player.cor.length))]);

						}
					}
				}
			}
			isGameOver=true;
		}
	}
	else if (isGameOver) {
		if ((mouseCursor.left>=btContinuar.left)&&(mouseCursor.left<=btContinuar.left+btContinuar.width)&&
			(mouseCursor.top>=btContinuar.top)&&(mouseCursor.top<=btContinuar.top+btContinuar.height)) {
			btContinuar.pos=1;
			isGameOver=false;
		}
	}
	else{
		if (e.which==1){
			player.run=false;
		}
	}
}

function mw(e){
	if (!isGameOver&&(!exibindoMenu)&&(!pausado)) {
		if (e.deltaY>0){
			if (cWidth<1200) {
				cWidth+=50;
				cHeight+=40;
			}
		}
		else{
			if (cWidth>500){
				cWidth-=50;
				cHeight-=40;
			}
		}
	}
}

function kd(e){

	switch(e.keyCode){
		case 38:
		case 40:
			e.preventDefault()
			break
	}

	if (exibindoMenu||exibindoMenuCriacao) {
		if (edNome.focado) {
			if ((e.keyCode!=16)&&(e.keyCode!=20)&&(e.keyCode!=13)&&(e.keyCode!=17)&&(e.keyCode!=18)
				&&(e.keyCode!=37)&&(e.keyCode!=38)&&(e.keyCode!=39)&&(e.keyCode!=40)&&(e.keyCode!=46)&&
				(e.keyCode!=33)&&(e.keyCode!=34)&&(e.keyCode!=35)&&(e.keyCode!=36)&&(e.keyCode!=45)&&
				(e.keyCode!=91)&&(e.keyCode!=92)&&(e.keyCode!=93)&&(e.keyCode!=144)&&(e.keyCode!=27)&&
				(e.keyCode!=9)&&(e.keyCode!=219)&&(e.keyCode!=222)&&(e.key!="F1")&&(e.key!="F2")&&(e.key!="F3")&&(e.key!="F4")&&(e.key!="F5")&&
				(e.key!="F6")&&(e.key!="F7")&&(e.key!="F8")&&(e.key!="F9")&&(e.key!="F10")&&(e.key!="F11")&&
				(e.key!="F12")) {
				if (e.keyCode==8)
					edNome.text=edNome.text.substring(0,edNome.text.length-1);
				else {
					if (edNome.text.length<20)
						edNome.text+=e.key;
				}

			}
		}

		if (e.keyCode==13) {
			if (edNome.text!="Digite seu nome"&&(edNome.text!="")&&(edNome.text!=" ")) {
				document.body.style.cursor="default";
				exibindoMenu=false;
				exibindoMenuCriacao=false;
			}
		}
	}
	else if (!isGameOver){
		switch (e.keyCode){
			case 27:
				pausado=!pausado;
				break;
			case 13:
				if (pausado)
					pausado=!pausado;
				break;
		}
	}
	else{
		if (e.keyCode==13||(e.keyCode==27))
			isGameOver=false;
	}
	
}

function cresceSnake(snake,qtd){
	if (snake==-1) {
		player.pontos+=qtd;
		for (var i = 0; i < qtd; i++) {
			if(++player.crescimento>=5){
				player.crescimento=0;
				if (player.corpo.length<limiteCorpo) {
					player.corpo.push(new Object({
						left:player.corpo[player.corpo.length-1].left,
						top:player.corpo[player.corpo.length-1].top,
						cor:Math.floor(player.pad)
					}));
					player.pad+=player.padrao;
					if (player.pad>=player.cor.length)
						player.pad=0;
				}
				if (player.raio<50)
					player.raio+=.03;
				if (player.rotVel>1.5)
					player.rotVel-=.025;
			}
		}
	}
	else{
		inimigo[snake].pontos+=qtd;
		for (var i = 0; i < qtd; i++) {
			if (++inimigo[snake].crescimento>=5) {
				inimigo[snake].crescimento=0;
				if (inimigo[snake].corpo.length<limiteCorpo) {
					inimigo[snake].corpo.push(new Object({
						left:inimigo[snake].corpo[inimigo[snake].corpo.length-1].left,
						top:inimigo[snake].corpo[inimigo[snake].corpo.length-1].top,
						cor:Math.floor(inimigo[snake].pad),
						visible:false
					}));
					inimigo[snake].pad+=inimigo[snake].padrao;
					if (inimigo[snake].pad>=inimigo[snake].cor.length)
						inimigo[snake].pad=0;
				}
				if (inimigo[snake].raio<50)
					inimigo[snake].raio+=.03;
				if (inimigo[snake].rotVel>1.5)
					inimigo[snake].rotVel-=.025;
			}
		}
	}
}

function reduzSnake(snake){
	if (snake==-1) {
		player.timer=false;
		if (player.run) {
			if (--player.crescimento<=0) {
				if (player.pontos>2)
					player.pontos-=3
				else
					player.pontos=0;
				player.crescimento=4;
				criaFood(1,player.corpo[player.corpo.length-1].left,player.corpo[player.corpo.length-1].top,4,player.cor[Math.floor(Math.random()*player.cor.length)]);
				if (player.corpo.length>10){
					player.corpo.pop();
					player.pad-=player.padrao;
				}
				if (player.pad<0){
					if (player.padrao<1)
						player.pad=player.cor.length-1+player.padrao
					else
						player.pad=player.cor.length-1;
				}
				if (player.raio>12)
					player.raio-=.03;
				if (player.rotVel<10)
					player.rotVel+=.025;
			}
		}
	}
	else{
		inimigo[snake].timer=false;
		if (inimigo[snake].run) {
			if (--inimigo[snake].crescimento<=0) {
				if (inimigo[snake].pontos>2)
					inimigo[snake].pontos-=3
				else
					inimigo[snake].pontos=0;
				inimigo[snake].crescimento=4;
				criaFood(1,inimigo[snake].corpo[inimigo[snake].corpo.length-1].left,inimigo[snake].corpo[inimigo[snake].corpo.length-1].top,4,inimigo[snake].cor[Math.floor(1+Math.random()*4)]);
				if (inimigo[snake].corpo.length>10){
					inimigo[snake].corpo.pop();
					inimigo[snake].pad-=inimigo[snake].padrao;
				}
				if (inimigo[snake].pad<0)
					inimigo[snake].pad=inimigo[snake].cor.length-.01;
				if (inimigo[snake].raio>12)
					inimigo[snake].raio-=.03;
				if (inimigo[snake].rotVel<10)
					inimigo[snake].rotVel+=.025;
			}
		}
	}
}

function atualizaRanking(){

	for (var i = -1; i<inimigo.length; i++){
		var alreadyInRanking=false;
		if (i<0) {
			for (var p=0;p<ranking.length;p++){
				if (ranking[p].nome==player.nome){
					alreadyInRanking=true;
					break;
				}
			}
			if (player.pontos>ranking[4].pontos&&(!alreadyInRanking)) {
				ranking[4]=player;
			}
		}
		else{
			for (var p=0;p<ranking.length;p++){
				if (ranking[p].nome==inimigo[i].nome){
					alreadyInRanking=true;
					break;
				}
			}
			if (inimigo[i].pontos>ranking[4].pontos&&(!alreadyInRanking)) {
				ranking[4]=inimigo[i];
			}
		}
	}

	var aux;
	if (ranking[4].pontos>ranking[3].pontos) {
		aux=ranking[4];
		ranking[4]=ranking[3];
		ranking[3]=aux;
	}

	if (ranking[3].pontos>ranking[2].pontos) {
		aux=ranking[3];
		ranking[3]=ranking[2];
		ranking[2]=aux;
	}

	if (ranking[2].pontos>ranking[1].pontos) {
		aux=ranking[2];
		ranking[2]=ranking[1];
		ranking[1]=aux;
	}

	if (ranking[1].pontos>ranking[0].pontos) {
		aux=ranking[1];
		ranking[1]=ranking[0];
		ranking[0]=aux;
	}

	if (!isGameOver)
		setTimeout(atualizaRanking,500);
}

document.oncontextmenu=function(){
	return false;
}

document.body.onblur=()=>{	
	if(!pausado&&(!isGameOver)&&(!exibindoMenu)&&(!exibindoMenuCriacao))
		pausado=true
}

window.onload=function(){
	load();
}