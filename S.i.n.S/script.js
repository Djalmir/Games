function pausa(){
	rodando = !rodando;
	if (rodando) {
		if (!isGameOver) {
			relogio = setInterval("loopPrincipal()" , intervalo);
			if (pausado&&(!frutaEspecial)){ 
				fruitIntervalo=timef1*1000;
			}
			else if (pausado&&(frutaEspecial)) {
				escondeIntervalo=(timeEf1*1000)*(-1);
			}
			if (pausado&&(!frutaEspecial2)){
				fruitIntervalo2=timef2*1000;
			}
			else if (pausado&&(frutaEspecial2)) {
				escondeIntervalo2=(timeEf2*1000)*(-1);
			}
			if (!frutaEspecial)
				relFruit = setInterval("criaFrutaEspecial()", fruitIntervalo);
			else
				relEscondeFruit = setInterval("escondeFruit()", escondeIntervalo);
			if (!frutaEspecial2)
				relFruit2 = setInterval("criaFrutaEspecial2()", fruitIntervalo2);
			else
				relEscondeFruit2 = setInterval("escondeFruit2()", escondeIntervalo2);
			pausado=false;
		}
	}
	else {
		if (!isGameOver) {
			c.fillStyle="rgba(0,0,0,.7)";
			c.fillRect(0,0,800,600);
			c.fillStyle="lime";
			c.font="45px Comic Sans MS";
			c.fillText("Jogo Pausado",400,100);
			clearInterval(relogio);
			clearInterval(relFruit);
			clearInterval(relEscondeFruit);
			clearInterval(relFruit2);
			clearInterval(relEscondeFruit2);
			pausado=true;
			exibindoMenuPausa=true;
			menuPausa();
		}
		else if(isGameOver){
			clearInterval(relogio);
			clearInterval(relFruit);
			clearInterval(relEscondeFruit);
			clearInterval(relFruit2);
			clearInterval(relEscondeFruit2);
			frutaEspecial=false;
			frutaEspecial2=false;
			p1Imortal=false;
			p2Imortal=false;
			timef1=30;
			timef2=47;
			exibindoMenuPausa=false;
			menuGameOver();
		}
	}
	
}

function menuGameOver(){
	desenhar();
	c.fillStyle="rgba(0,0,0,.7)";
	c.fillRect(0,0,800,600);
	c.fillStyle="lime";
	c.font="45px Comic Sans MS";
	c.fillText("Fim de Jogo",400,100);

	c.fillText(gameOverMsg2,400,200);
	c.fillText(gameOverMsg,400,270);	

	c.drawImage(btContinuar.img[btContinuar.pos],0,0,btContinuar.oW,btContinuar.oH,btContinuar.left,btContinuar.top,btContinuar.width,btContinuar.height);

	if (isGameOver)
		requestAnimationFrame(menuGameOver);
	else{
		exibindoMenu=true;
		menuIni();
	}
}

function menuPausa(){
	desenhar();
	c.fillStyle="rgba(0,0,0,.7)";
	c.fillRect(0,0,800,600);
	c.fillStyle="lime";
	c.font="45px Comic Sans MS";
	c.fillText("Jogo Pausado",400,100);

	c.drawImage(btContinuar.img[btContinuar.pos],0,0,btContinuar.oW,btContinuar.oH,btContinuar.left,btContinuar.top,btContinuar.width,btContinuar.height);

	c.drawImage(btSair.img[btSair.pos],0,0,btSair.oW,btSair.oH,btSair.left,btSair.top,btSair.width,btSair.height);

	if (exibindoMenuPausa)
		requestAnimationFrame(menuPausa);
	else if (!isGameOver)
		pausa();
}

function inicio(){
	numJog=selNJog.value;
	criarTabuleiro();
	bg1=new Image();
	bg1=bgs[Math.floor(Math.random()*6)];
	novoJogo();
}

function criarTabuleiro(){
	nx=Math.floor((canvas.width-distancia)/(largura+distancia));
	ny=Math.floor((canvas.height-distancia)/(largura+distancia));
	borda_x= nx * (distancia+largura)+distancia+2;
	borda_y= ny * (distancia+largura)+distancia+1;
}

function novoJogo() {
	player1=p1Nome.value;
	if (player1==''){
		player1='SinS 1';
	}
	else{
		if (!iaP1) 
		localStorage.setItem('SinS-player1',player1);
	}
	player2=p2Nome.value;
	if (player2==''){
		player2='SinS 2';
	}
	else{
		if (!iaP2)
		localStorage.setItem('SinS-player2',player2);
	}
	
	localStorage.setItem('SinS-corCabeca1',corCabeca1);
	localStorage.setItem('SinS-corCorpo1',corCorpo1);
	localStorage.setItem('SinS-corCabeca2',corCabeca2);
	localStorage.setItem('SinS-corCorpo2',corCorpo2);
	isGameOver=false;
	velocidade= selVel.value;
	recorde = localStorage.getItem('SinS-record-'+numJog+'-'+modo+'-'+velocidade+'-'+bateParede.checked+'-'+bateEmSi.checked+'-'+bateOutro.checked);
	donoRecorde= localStorage.getItem('SinS-donoRecord-'+numJog+'-'+modo+'-'+velocidade+'-'+bateParede.checked+'-'+bateEmSi.checked+'-'+bateOutro.checked);
	if (recorde==null) {
		recorde=0;
		donoRecorde="";
	}

	if (rodando)
		pausa();
	pts=0;
	nvl=0;
	ptsP1=25;
	ptsP2=25;
	
	if (velocidade==0) {
		intervalo = 300;
		vel=0;
	}
	else if (velocidade==1) {
		intervalo = 250;
		vel=10;
	}
	else if (velocidade==2){
		intervalo = 200;
		vel=20;
	}
	else if (velocidade==3) {
		intervalo = 150;
		vel=30;
	}
	else{
		intervalo = 100;
		vel=40;
	}

	fruitIntervalo = 30000;
	fruitIntervalo2 = 47000;
	var xcenter = Math.floor(nx / 2);
	var ycenter = Math.floor(ny / 2);
	novaPosFruta(1);
	novaPosFruta(2);
	if (numJog==2) {
		nodos.length = 0;
		nodos.push(new Nodo(Math.floor(xcenter/2), ycenter + 2, dbaixo));
		nodos.push(new Nodo(Math.floor(xcenter/2), ycenter + 1, dbaixo));
		nodos.push(new Nodo(Math.floor(xcenter/2), ycenter, dbaixo));
		nodos.push(new Nodo(Math.floor(xcenter/2), ycenter - 1, dbaixo));
		nodos.push(new Nodo(Math.floor(xcenter/2), ycenter - 2, dbaixo));

		nodos2.length = 0;
		nodos2.push(new Nodo(Math.floor(xcenter*1.5), ycenter + 2, dbaixo));
		nodos2.push(new Nodo(Math.floor(xcenter*1.5), ycenter + 1, dbaixo));
		nodos2.push(new Nodo(Math.floor(xcenter*1.5), ycenter, dbaixo));
		nodos2.push(new Nodo(Math.floor(xcenter*1.5), ycenter - 1, dbaixo));
		nodos2.push(new Nodo(Math.floor(xcenter*1.5), ycenter - 2, dbaixo));
	}
	else{
		nodos.length = 0;
		nodos.push(new Nodo(xcenter, ycenter + 2, dbaixo));
		nodos.push(new Nodo(xcenter, ycenter + 1, dbaixo));
		nodos.push(new Nodo(xcenter, ycenter, dbaixo));
		nodos.push(new Nodo(xcenter, ycenter - 1, dbaixo));
		nodos.push(new Nodo(xcenter, ycenter - 2, dbaixo));
	}
	pausa();
}

function desenhar() {
	
	var xi, yi;
	c.drawImage(bg1,0,0);
	c.fillStyle="rgba(0,0,0,.3)";
	c.fillRect(0,0,800,600);
	for (i = nodos.length-1; i > 0; i--) {
		xi = distancia + nodos[i].x * (largura + distancia);
		yi = distancia + nodos[i].y * (largura + distancia);
		c.beginPath();
		c.arc(xi+(largura/2), yi+(largura/2), largura/2, Math.PI*2, 0, true);
		gradient=c.createRadialGradient(xi+(largura/2),yi+(largura/2),5,xi+(largura/2),yi+(largura/2),8);
		c.closePath();
		gradient.addColorStop(0,corCorpo1);
		gradient.addColorStop(1,'rgba(0,0,0,.7)');
		if (p1Imortal) {
			if (p1ICor=="#FFFFFF")
				p1ICor="#fffc00";
			else
				p1ICor="#FFFFFF";
			c.fillStyle=p1ICor;
		}
		else
			c.fillStyle = gradient;
		c.fill();

		c.beginPath();
		if (nodos[(i-1)].x<nodos[i].x){
			c.arc(xi, yi+(largura/2), largura/2, Math.PI*2, 0, true);
			gradient=c.createRadialGradient(xi,yi+(largura/2),5,xi,yi+(largura/2),8);
		}

		if (nodos[(i-1)].x>nodos[i].x){
			c.arc(xi+largura, yi+(largura/2), largura/2, Math.PI*2, 0, true);
			gradient=c.createRadialGradient(xi+largura,yi+(largura/2),5,xi+largura,yi+(largura/2),8);
		}

		if (nodos[(i-1)].y<nodos[i].y){
			c.arc(xi+(largura/2), yi, largura/2, Math.PI*2, 0, true);
			gradient=c.createRadialGradient(xi+(largura/2),yi,5,xi+(largura/2),yi,8);
		}

		if (nodos[(i-1)].y>nodos[i].y){
			c.arc(xi+(largura/2), yi+largura, largura/2, Math.PI*2, 0, true);
			gradient=c.createRadialGradient(xi+(largura/2),yi+largura,5,xi+(largura/2),yi+largura,8);
		}
		c.closePath();
		gradient.addColorStop(0,corCorpo1);
		gradient.addColorStop(1,'rgba(0,0,0,.7)');
		if (p1Imortal) {
			if (p1ICor=="#FFFFFF")
				p1ICor="#fffc00";
			else
				p1ICor="#FFFFFF";
			c.fillStyle=p1ICor;
		}
		else
			c.fillStyle = gradient;
		c.fill();
	}

	xi = distancia + nodos[0].x * (largura + distancia);
	yi = distancia + nodos[0].y * (largura + distancia);
	if (p1Imortal) {
		if (p1ICor=="#FFFFFF")
			c.fillStyle="#fffc00";
		else
			c.fillStyle="#FFFFFF";
	}
	else{
		gradient=c.createRadialGradient(xi+(largura/2),yi+(largura/2),5,xi+(largura/2),yi+(largura/2),8);
		gradient.addColorStop(0,corCabeca1);
		gradient.addColorStop(1,'rgba(0,0,0,.7)');
		c.fillStyle = gradient;
	}

	c.beginPath();
	c.arc(xi+(largura/2), yi+(largura/2), largura/2, Math.PI*2, 0, true);
	c.closePath();
	c.fill();

	if (numJog==2) {
		for (i = nodos2.length-1; i > 0; i--) {
			xi = distancia + nodos2[i].x * (largura + distancia);
			yi = distancia + nodos2[i].y * (largura + distancia);
			c.beginPath();
			c.arc(xi+(largura/2), yi+(largura/2), largura/2, Math.PI*2, 0, true);
			gradient=c.createRadialGradient(xi+(largura/2),yi+(largura/2),5,xi+(largura/2),yi+(largura/2),8);
			c.closePath();
			gradient.addColorStop(0,corCorpo2);
			gradient.addColorStop(1,'rgba(0,0,0,.7)');
			if (p2Imortal) {
				if (p2ICor=="#FFFFFF")
					p2ICor="#fffc00";
				else
					p2ICor="#FFFFFF";
				c.fillStyle=p2ICor;
			}
			else
				c.fillStyle = gradient;
			c.fill();

			c.beginPath();
			if (nodos2[(i-1)].x<nodos2[i].x){
				c.arc(xi, yi+(largura/2), largura/2, Math.PI*2, 0, true);
				gradient=c.createRadialGradient(xi,yi+(largura/2),5,xi,yi+(largura/2),8);
			}

			if (nodos2[(i-1)].x>nodos2[i].x){
				c.arc(xi+largura, yi+(largura/2), largura/2, Math.PI*2, 0, true);
				gradient=c.createRadialGradient(xi+largura,yi+(largura/2),5,xi+largura,yi+(largura/2),8);
			}

			if (nodos2[(i-1)].y<nodos2[i].y){
				c.arc(xi+(largura/2), yi, largura/2, Math.PI*2, 0, true);
				gradient=c.createRadialGradient(xi+(largura/2),yi,5,xi+(largura/2),yi,8);
			}

			if (nodos2[(i-1)].y>nodos2[i].y){
				c.arc(xi+(largura/2), yi+largura, largura/2, Math.PI*2, 0, true);
				gradient=c.createRadialGradient(xi+(largura/2),yi+largura,5,xi+(largura/2),yi+largura,8);
			}
			c.closePath();
			gradient.addColorStop(0,corCorpo2);
			gradient.addColorStop(1,'rgba(0,0,0,.7)');
			if (p2Imortal) {
				if (p2ICor=="#FFFFFF")
					p2ICor="#fffc00";
				else
					p2ICor="#FFFFFF";
				c.fillStyle=p2ICor;
			}
			else
				c.fillStyle = gradient;
			c.fill();
		}

		xi = distancia + nodos2[0].x * (largura + distancia);
		yi = distancia + nodos2[0].y * (largura + distancia);
		if (p2Imortal) {
			if (p2ICor=="#FFFFFF")
				c.fillStyle="#fffc00";
			else
				c.fillStyle="#FFFFFF";
		}
		else{
			gradient=c.createRadialGradient(xi+(largura/2),yi+(largura/2),5,xi+(largura/2),yi+(largura/2),8);
			gradient.addColorStop(0,corCabeca2);
			gradient.addColorStop(1,'rgba(0,0,0,.7)');
			c.fillStyle = gradient;
		}

		c.beginPath();
		c.arc(xi+(largura/2), yi+(largura/2), largura/2, Math.PI*2, 0, true);
		c.closePath();
		c.fill();
	}
	xi = distancia + (xfruta * (largura + distancia)) + Math.floor(largura / 2);
	yi = distancia + (yfruta * (largura + distancia)) + Math.floor(largura / 2);
	c.drawImage(fruta,0,0,30,35,xi-(tamF-3)/2,yi-tamF/2,tamF-3,tamF);

	
	xi = distancia + (xfruta2 * (largura + distancia)) + Math.floor(largura / 2);
	yi = distancia + (yfruta2 * (largura + distancia)) + Math.floor(largura / 2);
	c.drawImage(fruta2,0,0,30,35,xi-(tamF2-3)/2,yi-tamF2/2,tamF2-3,tamF2);

	if (frutaEspecial) {
		
		xi = distancia + (xSFruit * (largura + distancia)) + Math.floor(largura / 2);
		yi = distancia + (ySFruit * (largura + distancia)) + Math.floor(largura / 2);
		c.drawImage(sFruta,0,0,35,36,xi-tamSF/2,yi-tamSF/2,tamSF,tamSF);
	}

	if (frutaEspecial2) {
		xi = distancia + (xSFruit2 * (largura + distancia)) + Math.floor(largura / 2);
		yi = distancia + (ySFruit2 * (largura + distancia)) + Math.floor(largura / 2);
		c.drawImage(sFruta2,0,0,45,35,xi-(tamSF2+2)/2,yi-tamSF2/2,tamSF2+5,tamSF2);
	}

	c.font="20px Comic Sans MS";
	if (numJog==1||(modo=="Coop")) {
		c.fillStyle="rgba(250,250,250,.3)";
		c.fillText("Pontuação:",200,25);
		c.fillText("Recorde:",600,25);		
		c.fillStyle="rgba(100,250,0,.3)";
		c.fillText(pts,200,50);
		c.fillText(recorde+"  "+donoRecorde,600,50);		
	}
	else{
		c.fillStyle="rgba(250,250,250,.3)";
		c.fillText(player1,200,25);
		c.fillText(player2,600,25);
		c.fillStyle="rgba(100,250,0,.3)";
		c.fillText(ptsP1,200,50);
		c.fillText(ptsP2,600,50);
	}

} 

function loopPrincipal() {
	if (iaP1&&(iaP2)) {
		Dolores();
		Bernard();
	}
	else{
		if (iaP1)
			Dolores();
		else if (iaP2)
			maisPerto(1);
		if (iaP2)
			Bernard();
		else if ((iaP1)&&(numJog==2))
			maisPerto(2);
	}
	moverSnake();
	detectarColisoes();
	desenhar();
	if (tamF<20&&(fCrescendo))
		tamF+=2;
	else if (tamF>15){
		fCrescendo=false;
		tamF-=2;
	}
	else
		fCrescendo=true;

	if (tamF2<20&&(f2Crescendo))
		tamF2+=2;
	else if (tamF2>15){
		f2Crescendo=false;
		tamF2-=2;
	}
	else
		f2Crescendo=true;

	if (tamSF<25&&(sfCrescendo))
		tamSF+=2;
	else if (tamSF>20){
		sfCrescendo=false;
		tamSF-=2;
	}
	else
		sfCrescendo=true;

	if (tamSF2<25&&(sf2Crescendo))
		tamSF2+=2;
	else if (tamSF2>20){
		sf2Crescendo=false;
		tamSF2-=2;
	}
	else
		sf2Crescendo=true;
}

function detectarColisoes() {
	var p1bateu=false;
	var p2bateu=false;
	if (bateParede.checked) {
		if ((nodos[0].x < 0) || (nodos[0].x >= nx) || (nodos[0].y < 0) || (nodos[0].y >= ny)) {
			if (!p1Imortal)
				p1bateu=true;
			else{
				if(nodos[0].x < 0)
					nodos[0].x=nx-1;
				if (nodos[0].x>=nx)
					nodos[0].x=0;
				if(nodos[0].y < 0)
					nodos[0].y=ny-1;
				if (nodos[0].y>=ny)
					nodos[0].y=0;
			}
		}

		if (numJog==2) {
			if ((nodos2[0].x < 0) || (nodos2[0].x >= nx) || (nodos2[0].y < 0) || (nodos2[0].y >= ny)) {
				if (!p2Imortal)
					p2bateu=true;
				else{
					if(nodos2[0].x < 0)
						nodos2[0].x=nx-1;
					if (nodos2[0].x>=nx)
						nodos2[0].x=0;
					if(nodos2[0].y < 0)
						nodos2[0].y=ny-1;
					if (nodos2[0].y>=ny)
						nodos2[0].y=0;
				}
			}
		}
	}
	else{
		if(nodos[0].x < 0)
			nodos[0].x=nx-1;
		if (nodos[0].x>=nx)
			nodos[0].x=0;
		if(nodos[0].y < 0)
			nodos[0].y=ny-1;
		if (nodos[0].y>=ny)
			nodos[0].y=0;
		
		if (numJog==2) {
			if(nodos2[0].x < 0)
				nodos2[0].x=nx-1;
			if (nodos2[0].x>=nx)
				nodos2[0].x=0;
			if(nodos2[0].y < 0)
				nodos2[0].y=ny-1;
			if (nodos2[0].y>=ny)
				nodos2[0].y=0;
		}

	}
	
	if (bateEmSi.checked) {
		for (i = 1; i < nodos.length; i++) {
			if ((nodos[0].x == nodos[i].x) && (nodos[0].y == nodos[i].y)) {
				if (!p1Imortal){
					if (numJog==2) 
						p1bateu=true;
					else
						executarGameOver();
				}
			}
		}
	}

	if (numJog==2) {
		if (bateOutro.checked) {
			for (i = 0; i < nodos2.length; i++) {
				if ((nodos[0].x == nodos2[i].x) && (nodos[0].y == nodos2[i].y)) {
					if (!p1Imortal)
						p1bateu=true;
				}
			}
		}

		if (bateEmSi.checked) {
			for (i = 1; i < nodos2.length; i++) {
				if ((nodos2[0].x == nodos2[i].x) && (nodos2[0].y == nodos2[i].y)) {
					if (!p2Imortal)
						p2bateu=true;
				}
			}
		}

		if (bateOutro.checked) {
			for (i = 0; i < nodos.length; i++) {
				if ((nodos2[0].x == nodos[i].x) && (nodos2[0].y == nodos[i].y)) {
					if (!p2Imortal)
						p2bateu=true;
				}
			}
		}
	}

	if (p1bateu&&p2bateu){
		executarGameOver(player1+" e "+player2);
	}
	else if (p1bateu){
		executarGameOver(player1);
	}
	else if (p2bateu){
		executarGameOver(player2);
	}

	if ((nodos[0].x == xfruta) && (nodos[0].y == yfruta)) {
		sndComer();
		if (modo=="Coop") 
			pts=pts+2;
		else
			ptsP1+=2;
		if (vel<40) {
			if (((nvl+10)<=pts)||((nvl+10)<=ptsP1)) {
				nvl+=10;
				intervalo-=5;
				clearInterval(relogio);
				relogio = setInterval("loopPrincipal()",intervalo);
				vel+=1;
			}
		}
		else{
			if (((nvl+30)<=pts)||((nvl+30)<=ptsP1)) {
				nvl+=30;
				if (intervalo>60){
					intervalo-=5;
					clearInterval(relogio);
					relogio = setInterval("loopPrincipal()",intervalo);
					vel+=1;
				}
			}
		}

		for (var i = 0; i < 2; i++) {
			var ultimo = nodos.length - 1;
			var novoultimo = ultimo + 1;
			nodos.push(new Nodo(nodos[ultimo].x, nodos[ultimo].y, nodos[ultimo].direc));
			switch (nodos[ultimo].direc) {
				case dbaixo:
					nodos[novoultimo].y -= 1;
					break;
				case ddireita:
					nodos[novoultimo].x -= 1;
					break;
				case dcima:
					nodos[novoultimo].y += 1;
					break;
				case desquerda:
					nodos[novoultimo].x += 1;
					break;
			}
		}
		
		novaPosFruta(1);
	}

	if (numJog==2) {
		if ((nodos2[0].x == xfruta) && (nodos2[0].y == yfruta)) {
			sndComer();
			if (modo=="Coop")
				pts=pts+2;
			else
				ptsP2+=2;
			if (vel<40) {
				if (((nvl+10)<=pts)||((nvl+10)<=ptsP2)) {
					nvl+=10;
					intervalo-=5;
					clearInterval(relogio);
					relogio = setInterval("loopPrincipal()",intervalo);
					vel+=1;
				}
			}
			else{
				if (((nvl+30)<=pts)||((nvl+30)<=ptsP2)) {
					nvl+=30;
					if (intervalo>60){
						intervalo-=5;
						clearInterval(relogio);
						relogio = setInterval("loopPrincipal()",intervalo);
						vel+=1;
					}
				}
			}

			for (var i = 0; i < 2; i++) {
				var ultimo = nodos2.length - 1;
				nodos2.push(new Nodo(nodos2[ultimo].x, nodos2[ultimo].y, nodos2[ultimo].direc));
				var novoultimo = ultimo + 1;
				switch (nodos2[ultimo].direc) {
					case dbaixo:
						nodos2[novoultimo].y -= 1;
						break;
					case ddireita:
						nodos2[novoultimo].x -= 1;
						break;
					case dcima:
						nodos2[novoultimo].y += 1;
						break;
					case desquerda:
						nodos2[novoultimo].x += 1;
						break;
				}
			}
			
			novaPosFruta(1);
		}
	}

	if ((nodos[0].x == xfruta2) && (nodos[0].y == yfruta2)) {
		sndComer();
		if (modo=="Coop")
			pts=pts+1;
		else
			ptsP1+=1;
		if (vel<40) {
			if (((nvl+10)<=pts)||((nvl+10)<=ptsP1)) {
				nvl+=10;
				intervalo-=5;
				clearInterval(relogio);
				relogio = setInterval("loopPrincipal()",intervalo);
				vel+=1;
			}
		}
		else{
			if (((nvl+30)<=pts)||((nvl+30)<=ptsP1)) {
				nvl+=30;
				if (intervalo>60){
					intervalo-=5;
					clearInterval(relogio);
					relogio = setInterval("loopPrincipal()",intervalo);
					vel+=1;
				}
			}
		}

		var ultimo = nodos.length - 1;
		nodos.push(new Nodo(nodos[ultimo].x, nodos[ultimo].y, nodos[ultimo].direc));
		var novoultimo = ultimo + 1;
		switch (nodos[ultimo].direc) {
			case dbaixo:
				nodos[novoultimo].y -= 1;
				break;
			case ddireita:
				nodos[novoultimo].x -= 1;
				break;
			case dcima:
				nodos[novoultimo].y += 1;
				break;
			case desquerda:
				nodos[novoultimo].x += 1;
				break;
		}		
		novaPosFruta(2);
	}

	if (numJog==2) {
		if ((nodos2[0].x == xfruta2) && (nodos2[0].y == yfruta2)) {
			sndComer();
			if (modo=="Coop")
				pts=pts+1;
			else
				ptsP2+=1;
			if (vel<40) {
				if (((nvl+10)<=pts)||((nvl+10)<=ptsP2)) {
					nvl+=10;
					intervalo-=5;
					clearInterval(relogio);
					relogio = setInterval("loopPrincipal()",intervalo);
					vel+=1;
				}
			}
			else{
				if (((nvl+30)<=pts)||((nvl+30)<=ptsP2)) {
					nvl+=30;
					if (intervalo>60){
						intervalo-=5;
						clearInterval(relogio);
						relogio = setInterval("loopPrincipal()",intervalo);
						vel+=1;
					}
				}
			}

			var ultimo = nodos2.length - 1;
			nodos2.push(new Nodo(nodos2[ultimo].x, nodos2[ultimo].y, nodos2[ultimo].direc));
			var novoultimo = ultimo + 1;
			switch (nodos2[ultimo].direc) {
				case dbaixo:
					nodos2[novoultimo].y -= 1;
					break;
				case ddireita:
					nodos2[novoultimo].x -= 1;
					break;
				case dcima:
					nodos2[novoultimo].y += 1;
					break;
				case desquerda:
					nodos2[novoultimo].x += 1;
					break;
			}			
			novaPosFruta(2);
		}
	}

	if (frutaEspecial) {
		if ((nodos[0].x == xSFruit) && (nodos[0].y == ySFruit)) {
			sndComerS();
			if (modo=="Coop")
				pts=pts+5;
			else{
				ptsP1+=5;
				if ((nodos2.length>=15)&&(nodos2.length>=nodos.length)) {
					for (var i = 0; i <= 9; i++) {
						nodos2.pop();					
					}
				}
				ptsP2-=10;
			}

			if (vel<40) {
				if (((nvl+10)<=pts)||((nvl+10)<=ptsP1)) {
					nvl+=10;
					intervalo-=5;
					clearInterval(relogio);
					relogio = setInterval("loopPrincipal()",intervalo);
					vel+=1;
				}
			}
			else{
				if (((nvl+30)<=pts)||((nvl+30)<=ptsP1)) {
					nvl+=30;
					if (intervalo>60){
						intervalo-=5;
						clearInterval(relogio);
						relogio = setInterval("loopPrincipal()",intervalo);
						vel+=1;
					}
				}
			}
			if (modo=="Vs"){
				if (ptsP2<=0){
					ptsP2=0;
					executarGameOver(player2);
				}
			}

			for (var i = 0; i < 5 ; i++) {
				var ultimo = nodos.length - 1;
				nodos.push(new Nodo(nodos[ultimo].x, nodos[ultimo].y, nodos[ultimo].direc));
				var novoultimo = ultimo + 1;
				switch (nodos[ultimo].direc) {
					case dbaixo:
						nodos[novoultimo].y -= 1;
						break;
					case ddireita:
						nodos[novoultimo].x -= 1;
						break;
					case dcima:
						nodos[novoultimo].y += 1;
						break;
					case desquerda:
						nodos[novoultimo].x += 1;
						break;
				}
			}	
			if (rodando) {
				frutaEspecial=false;
				clearInterval(relEscondeFruit);	
				clearInterval(relFruit);
				fruitIntervalo = 30000;
				relFruit = setInterval("criaFrutaEspecial()",fruitIntervalo);
				timef1=30;
				timeEf1=-10;
			}
		}

		if (numJog==2) {
			if ((nodos2[0].x == xSFruit) && (nodos2[0].y == ySFruit)) {
				sndComerS();
				if (modo=="Coop")
					pts=pts+5;
				else{
					ptsP2+=5;
					if ((nodos.length>=15)&&(nodos.length>=nodos2.length)) {
						for (var i = 0; i <= 9; i++) {
							nodos.pop();							
						}
					}
					ptsP1-=10;
				}

				if (vel<40) {
					if (((nvl+10)<=pts)||((nvl+10)<=ptsP2)) {
						nvl+=10;
						intervalo-=5;
						clearInterval(relogio);
						relogio = setInterval("loopPrincipal()",intervalo);
						vel+=1;
					}
				}
				else{
					if (((nvl+30)<=pts)||((nvl+30)<=ptsP2)) {
						nvl+=30;
						if (intervalo>60){
							intervalo-=5;
							clearInterval(relogio);
							relogio = setInterval("loopPrincipal()",intervalo);
							vel+=1;
						}
					}
				}
				if (modo=="Vs"){
					if (ptsP1<=0){
						ptsP1=0;
						executarGameOver(player1);
					}
				}

				for (var i = 0; i < 5 ;i++) {
					var ultimo = nodos2.length - 1;
					nodos2.push(new Nodo(nodos2[ultimo].x, nodos2[ultimo].y, nodos2[ultimo].direc));
					var novoultimo = ultimo + 1;
					switch (nodos2[ultimo].direc) {
						case dbaixo:
							nodos2[novoultimo].y -= 1;
							break;
						case ddireita:
							nodos2[novoultimo].x -= 1;
							break;
						case dcima:
							nodos2[novoultimo].y += 1;
							break;
						case desquerda:
							nodos2[novoultimo].x += 1;
							break;
					}			
				}			
				if (rodando) {
					frutaEspecial=false;
					clearInterval(relEscondeFruit);	
					clearInterval(relFruit);
					fruitIntervalo = 30000;
					relFruit = setInterval("criaFrutaEspecial()",fruitIntervalo);
					timef1=30;
					timeEf1=-10;
				}
			}
		}
	}

	if (frutaEspecial2) {
		if ((nodos[0].x == xSFruit2) && (nodos[0].y == ySFruit2)) {
			sndComerS();
			if (modo=="Coop")
				pts=pts+10;
			else{
				ptsP1+=10;
				if ((nodos2.length>=25)&&(nodos2.length>=nodos.length)) {
					for (var i = 0; i <= 19; i++) {
						nodos2.pop();
					}
				}
				ptsP2-=20;
			}

			if (vel<40) {
				if (((nvl+10)<=pts)||((nvl+10)<=ptsP1)) {
					nvl+=10;
					intervalo-=5;
					clearInterval(relogio);
					relogio = setInterval("loopPrincipal()",intervalo);
					vel+=1;
				}
			}
			else{
				if (((nvl+30)<=pts)||((nvl+30)<=ptsP1)) {
					nvl+=30;
					if (intervalo>60){
						intervalo-=5;
						clearInterval(relogio);
						relogio = setInterval("loopPrincipal()",intervalo);
						vel+=1;
					}
				}
			}
			if (modo=="Vs"){
				if (ptsP2<=0){
					ptsP2=0;
					executarGameOver(player2);
				}
			}

			for (var i = 0; i < 10 ; i++) {
				var ultimo = nodos.length - 1;
				nodos.push(new Nodo(nodos[ultimo].x, nodos[ultimo].y, nodos[ultimo].direc));
				var novoultimo = ultimo + 1;
				switch (nodos[ultimo].direc) {
					case dbaixo:
						nodos[novoultimo].y -= 1;
						break;
					case ddireita:
						nodos[novoultimo].x -= 1;
						break;
					case dcima:
						nodos[novoultimo].y += 1;
						break;
					case desquerda:
						nodos[novoultimo].x += 1;
						break;
				}
			}
			if (rodando) {	
				frutaEspecial2=false;	
				clearInterval(relEscondeFruit2);
				clearInterval(relFruit2);
				fruitIntervalo2 = 47000;
				relFruit2 = setInterval("criaFrutaEspecial2()",fruitIntervalo2);
				timef2=47;
				timeEf2=-5;
			}
		}

		if (numJog==2) {
			if ((nodos2[0].x == xSFruit2) && (nodos2[0].y == ySFruit2)) {
				sndComerS();
				if (modo=="Coop")
					pts=pts+10;
				else{
					ptsP2+=10;
					if ((nodos.length>=25)&&(nodos.length>=nodos2.length)) {
						for (var i = 0; i <= 19; i++) {
							nodos.pop();							
						}
					}
					ptsP1-=20;
				}

				if (vel<=40) {
					if (((nvl+10)<=pts)||((nvl+10)<=ptsP2)) {
						nvl+=10;
						intervalo-=5;
						clearInterval(relogio);
						relogio = setInterval("loopPrincipal()",intervalo);
						vel+=1;
					}
				}
				else{
					if (((nvl+30)<=pts)||((nvl+30)<=ptsP2)) {
						nvl+=30;
						if (intervalo>60){
							intervalo-=5;
							clearInterval(relogio);
							relogio = setInterval("loopPrincipal()",intervalo);
							vel+=1;
						}
					}
				}
				if (modo=="Vs") {
					if (ptsP1<=0){
						ptsP1=0;
						executarGameOver(player1);
					}
				}

				for (var i = 0; i < 10 ;i++) {
					var ultimo = nodos2.length - 1;
					nodos2.push(new Nodo(nodos2[ultimo].x, nodos2[ultimo].y, nodos2[ultimo].direc));
					var novoultimo = ultimo + 1;
					switch (nodos2[ultimo].direc) {
						case dbaixo:
							nodos2[novoultimo].y -= 1;
							break;
						case ddireita:
							nodos2[novoultimo].x -= 1;
							break;
						case dcima:
							nodos2[novoultimo].y += 1;
							break;
						case desquerda:
							nodos2[novoultimo].x += 1;
							break;
					}			
				}
				if (rodando) {			
					frutaEspecial2=false;
					clearInterval(relEscondeFruit2);	
					clearInterval(relFruit2);
					fruitIntervalo2 = 47000;
					relFruit2 = setInterval("criaFrutaEspecial2()",fruitIntervalo2);
					timef2=47;
					timeEf2=-5;
				}
			}
		}
	}
}

function moverSnake() {
	for (i = nodos.length - 1; i > 0; i--) {
		nodos[i].x = nodos[i-1].x;
		nodos[i].y = nodos[i-1].y;
		nodos[i].direc = nodos[i-1].direc;
	}

	if (numJog==2) {
		for (i = nodos2.length - 1; i > 0; i--) {
			nodos2[i].x = nodos2[i-1].x;
			nodos2[i].y = nodos2[i-1].y;
			nodos2[i].direc = nodos2[i-1].direc;
		}
	}

	if (proxDirec.length > 0){
		if (nodos[0].direc != proxDirec[0])
			nodos[0].direc = proxDirec[0];
	}

	if (numJog==2) {
		if (proxDirec2.length > 0)
			if (nodos2[0].direc != proxDirec2[0])
				nodos2[0].direc = proxDirec2[0];
	}

	nodos[0].Mover();

	if (numJog==2) 
		nodos2[0].Mover();

	while (proxDirec.length > 0) {
		if (proxDirec[0] == nodos[0].direc)
			proxDirec.shift();
		else
			break;
	}

	if (numJog==2) {
		while (proxDirec2.length > 0) {
			if (proxDirec2[0] == nodos2[0].direc)
				proxDirec2.shift();
			else
				break;
		}
	}
}

function executarGameOver(falecido) {
	sndgameover.play();
	if (modo=="Coop"||(falecido==null)){
		isGameOver=true;
		if (pts>recorde) {
			localStorage.setItem('SinS-record-'+numJog+'-'+modo+'-'+velocidade+'-'+bateParede.checked+'-'+bateEmSi.checked+'-'+bateOutro.checked,pts);
			if (numJog==1){
				localStorage.setItem('SinS-donoRecord-'+numJog+'-'+modo+'-'+velocidade+'-'+bateParede.checked+'-'+bateEmSi.checked+'-'+bateOutro.checked,player1);
			}
			else{
				if (modo=='Coop') {
					localStorage.setItem('SinS-donoRecord-'+numJog+'-'+modo+'-'+velocidade+'-'+bateParede.checked+'-'+bateEmSi.checked+'-'+bateOutro.checked,player1+" - "+player2);
				}
			}
			if (pts>1)
				gameOverMsg=pts+" pontos!";
			else if (pts>0) 
				gameOverMsg=pts+" ponto!";
			else
				gameOverMsg="";
			gameOverMsg2="Novo Recorde!";
		}
		else{
			if (pts>1)
				gameOverMsg=pts+" pontos";
			else if (pts>0) 
				gameOverMsg=pts+" ponto";
			else
				gameOverMsg="";
			gameOverMsg2="";
		}

		if (rodando&&(!pausado)){
			pausa();
		}
	}
	else{
		var p1perdeu=false;
		var p2perdeu=false;
		var xcenter = Math.floor(nx / 2);
		var ycenter = Math.floor(ny / 2);
		if (falecido==(player1+' e '+player2)) {
			ptsP2-=25;
			if(ptsP2<=0){
				ptsP2=0;
				p2perdeu=true;
			}
			else{
				nodos2.length=5;
				for (var i = 0; i < 4; i++) {
					nodos2[i].direc=dbaixo;
				}
				nodos2[4].x=Math.floor(xcenter*1.5);nodos2[4].y=ycenter - 2;
				nodos2[3].x=Math.floor(xcenter*1.5);nodos2[3].y=ycenter - 1;
				nodos2[2].x=Math.floor(xcenter*1.5);nodos2[2].y=ycenter;
				nodos2[1].x=Math.floor(xcenter*1.5);nodos2[1].y=ycenter + 1;
				nodos2[0].x=Math.floor(xcenter*1.5);nodos2[0].y=ycenter + 2;
				p2Imortal=true;	
				p2Irel=setInterval("fimImortal(2)",5000);			
			}

			ptsP1-=25;
			if (ptsP1<=0) {
				ptsP1=0;
				p1perdeu=true;
			}
			else{
				nodos.length=5;
				for (var i = 0; i < 4; i++) {
					nodos[i].direc=dbaixo;
				}
				nodos[4].x=Math.floor(xcenter/2);nodos[4].y=ycenter - 2;
				nodos[3].x=Math.floor(xcenter/2);nodos[3].y=ycenter - 1;
				nodos[2].x=Math.floor(xcenter/2);nodos[2].y=ycenter;
				nodos[1].x=Math.floor(xcenter/2);nodos[1].y=ycenter + 1;
				nodos[0].x=Math.floor(xcenter/2);nodos[0].y=ycenter + 2;	
				p1Imortal=true;	
				p1Irel=setInterval("fimImortal(1)",5000);		
			}
			if (p1perdeu||p2perdeu){
				isGameOver=true;
				if (rodando&&(!pausado)){ 
					verificaEmpate();
					pausa();
				}
			}
		}
		else if (falecido==player1){
			ptsP1-=25;
			if (ptsP1<=0) {
				ptsP1=0;
				p1perdeu=true;
			}
			else{
				nodos.length=5;
				for (var i = 0; i < 4; i++) {
					nodos[i].direc=dbaixo;
				}
				nodos[4].x=Math.floor(xcenter/2);nodos[4].y=ycenter - 2;
				nodos[3].x=Math.floor(xcenter/2);nodos[3].y=ycenter - 1;
				nodos[2].x=Math.floor(xcenter/2);nodos[2].y=ycenter;
				nodos[1].x=Math.floor(xcenter/2);nodos[1].y=ycenter + 1;
				nodos[0].x=Math.floor(xcenter/2);nodos[0].y=ycenter + 2;	
				p1Imortal=true;	
				p1Irel=setInterval("fimImortal(1)",5000);		
			}
		}
		else if (falecido==player2){
			ptsP2-=25;
			if(ptsP2<=0){
				ptsP2=0;
				p2perdeu=true;
			}
			else{
				nodos2.length=5;
				for (var i = 0; i < 4; i++) {
					nodos2[i].direc=dbaixo;
				}
				nodos2[4].x=Math.floor(xcenter*1.5);nodos2[4].y=ycenter - 2;
				nodos2[3].x=Math.floor(xcenter*1.5);nodos2[3].y=ycenter - 1;
				nodos2[2].x=Math.floor(xcenter*1.5);nodos2[2].y=ycenter;
				nodos2[1].x=Math.floor(xcenter*1.5);nodos2[1].y=ycenter + 1;
				nodos2[0].x=Math.floor(xcenter*1.5);nodos2[0].y=ycenter + 2;
				p2Imortal=true;	
				p2Irel=setInterval("fimImortal(2)",5000);			
			}
		}
		if (p1perdeu||p2perdeu){
			isGameOver=true;
			if (rodando&&(!pausado)){ 
				verificaEmpate();
				pausa();
			}
		}
	}
}

var gameOverMsg,gameOverMsg2;
function verificaEmpate(){
		gameOverMsg=player1+": "+ptsP1+"     "+player2+": "+ptsP2;
		if (ptsP1<=0&&(ptsP2<=0))
			gameOverMsg2="Houve um empate!";
		else if (ptsP1<=0) 
			gameOverMsg2=player2+" venceu!";
		else if (ptsP2<=0)
			gameOverMsg2=player1+" venceu!";
}

function fimImortal(p){
	if (p==1) {
		p1Imortal=false;
		clearInterval(p1Irel);		
	}
	else{
		p2Imortal=false;
		clearInterval(p2Irel);		
	}
}

document.onkeydown=onKD;
function onKD(evt) {
	if (evt.keyCode==17) 
		localStorage.setItem('dGames-ctrlPressed','true');
	if (!exibindoMenu&&(!isGameOver)){
		if (numJog==2) {
			switch (evt.keyCode) {
				case 37:
					if (nodos2[0].direc!=ddireita && rodando) {
						nodos2[0].direc = desquerda;
						proxDirec2.push(desquerda);
					}
					break;
				case 65:
					if (nodos[0].direc!=ddireita && rodando) {
						nodos[0].direc = desquerda;
						proxDirec.push(desquerda);
					}
					break;
				case 38:
					if (nodos2[0].direc!=dbaixo && rodando) {
						nodos2[0].direc = dcima;
						proxDirec2.push(dcima);
					}
					break;
				case 87:
					if (nodos[0].direc!=dbaixo && rodando) {
						nodos[0].direc = dcima;
						proxDirec.push(dcima);
					}
					break;
				case 39:
					if (nodos2[0].direc!=desquerda && rodando) {
						nodos2[0].direc = ddireita;
						proxDirec2.push(ddireita);
					}
					break;
				case 68:
					if (nodos[0].direc!=desquerda && rodando) {
						nodos[0].direc = ddireita;
						proxDirec.push(ddireita);
					}
					break;
				case 40:
					if (nodos2[0].direc!=dcima && rodando) {
						nodos2[0].direc = dbaixo;
						proxDirec2.push(dbaixo);
					}
					break;
				case 83:
					if (nodos[0].direc!=dcima && rodando) {
						nodos[0].direc = dbaixo;
						proxDirec.push(dbaixo);
					}
					break;
				case 27:
					if (!exibindoMenuPausa)
						pausa();
					else
						exibindoMenuPausa=false;
					break;
			}
		}
		else{
			switch (evt.keyCode) {
				case 37:
				case 65:
					if (nodos[0].direc!=ddireita && rodando) {
						nodos[0].direc = desquerda;
						proxDirec.push(desquerda);
					}
					break;
				case 38:
				case 87:
					if (nodos[0].direc!=dbaixo && rodando) {
						nodos[0].direc = dcima;
						proxDirec.push(dcima);
					}
					return false
				case 39:
				case 68:
					if (nodos[0].direc!=desquerda && rodando) {
						nodos[0].direc = ddireita;
						proxDirec.push(ddireita);
					}
					break;
				case 40:
				case 83:
					if (nodos[0].direc!=dcima && rodando) {
						nodos[0].direc = dbaixo;
						proxDirec.push(dbaixo);
					}
					return false
				case 27:				
					if (!exibindoMenuPausa)
						pausa();
					else 
						exibindoMenuPausa=false;
					break;					
			}
		}
	}
	else{
		if (p1Nome.focado) {
			if ((evt.keyCode!=16)&&(evt.keyCode!=20)&&(evt.keyCode!=13)&&(evt.keyCode!=17)&&(evt.keyCode!=18)
				&&(evt.keyCode!=37)&&(evt.keyCode!=38)&&(evt.keyCode!=39)&&(evt.keyCode!=40)&&(evt.keyCode!=46)&&
				(evt.keyCode!=33)&&(evt.keyCode!=34)&&(evt.keyCode!=35)&&(evt.keyCode!=36)&&(evt.keyCode!=45)&&
				(evt.keyCode!=91)&&(evt.keyCode!=92)&&(evt.keyCode!=93)&&(evt.keyCode!=144)&&(evt.keyCode!=27)&&
				(evt.keyCode!=9)&&(evt.keyCode!=219)&&(evt.keyCode!=222)&&(evt.key!="F1")&&(evt.key!="F2")&&(evt.key!="F3")&&(evt.key!="F4")&&(evt.key!="F5")&&
				(evt.key!="F6")&&(evt.key!="F7")&&(evt.key!="F8")&&(evt.key!="F9")&&(evt.key!="F10")&&(evt.key!="F11")&&
				(evt.key!="F12")) {
				if (evt.keyCode==8)
					p1Nome.value=p1Nome.value.substring(0,p1Nome.value.length-1);
				else {
					if (p1Nome.value.length<20)
						p1Nome.value+=evt.key;
				}

			}
		}
		else if (p2Nome.focado) {
			if ((evt.keyCode!=16)&&(evt.keyCode!=20)&&(evt.keyCode!=13)&&(evt.keyCode!=17)&&(evt.keyCode!=18)
				&&(evt.keyCode!=37)&&(evt.keyCode!=38)&&(evt.keyCode!=39)&&(evt.keyCode!=40)&&(evt.keyCode!=46)&&
				(evt.keyCode!=33)&&(evt.keyCode!=34)&&(evt.keyCode!=35)&&(evt.keyCode!=36)&&(evt.keyCode!=45)&&
				(evt.keyCode!=91)&&(evt.keyCode!=92)&&(evt.keyCode!=93)&&(evt.keyCode!=144)&&(evt.keyCode!=27)&&
				(evt.keyCode!=9)&&(evt.keyCode!=219)&&(evt.keyCode!=222)&&(evt.key!="F1")&&(evt.key!="F2")&&(evt.key!="F3")&&(evt.key!="F4")&&(evt.key!="F5")&&
				(evt.key!="F6")&&(evt.key!="F7")&&(evt.key!="F8")&&(evt.key!="F9")&&(evt.key!="F10")&&(evt.key!="F11")&&
				(evt.key!="F12")) {
				if (evt.keyCode==8)
					p2Nome.value=p2Nome.value.substring(0,p2Nome.value.length-1);
				else {
					if (p2Nome.value.length<20)
						p2Nome.value+=evt.key;
				}

			}
		}
	}
}

document.onkeyup=ku;
function ku(evt){
	if (evt.keyCode==17) 
		localStorage.setItem('dGames-ctrlPressed','false');
}

function finalizaJogo(){
	pausa();
	executarGameOver();
}

function sndComer() {
	if (Math.random() < 0.7){
		sndcomer.currentTime=0;
		sndcomer.play();
	}
	else{
		sndcomer2.currentTime=0;
		sndcomer2.play();
	}
}

function sndComerS() {
	sndcomerS.currentTime=0;
	sndcomerS.play();
}

function colisaoFruta1(n) {
	
	if (n==1) {
		for (i = 0; i < nodos.length; i++) {
			if ((xfruta == nodos[i].x) && (yfruta == nodos[i].y))
				return true;
		}
		return false;
	}
	else if (n==2) {
		for (i = 0; i < nodos.length; i++) {
			if ((xfruta2 == nodos[i].x) && (yfruta2 == nodos[i].y))
				return true;
		}
		return false;
	}
	else if (n==3) {
		for (i = 0; i < nodos.length; i++) {
			if ((xSFruit == nodos[i].x) && (ySFruit == nodos[i].y))
				return true;
		}
		return false;
	}
	else {
		for (i = 0; i < nodos.length; i++) {
			if ((xSFruit2 == nodos[i].x) && (ySFruit2 == nodos[i].y))
				return true;
		}
		return false;
	}
}

function colisaoFruta2(n){
	if (n==1) {
		for (i = 0; i < nodos2.length; i++) {
			if ((xfruta == nodos2[i].x) && (yfruta == nodos2[i].y))
				return true;
		}
		return false;
	}
	else if (n==2) {
		for (i = 0; i < nodos2.length; i++) {
			if ((xfruta2 == nodos2[i].x) && (yfruta2 == nodos2[i].y))
				return true;
		}
		return false;
	}
	else if (n==3) {
		for (i = 0; i < nodos2.length; i++) {
			if ((xSFruit == nodos2[i].x) && (ySFruit == nodos2[i].y))
				return true;
		}
		return false;
	}
	else {
		for (i = 0; i < nodos2.length; i++) {
			if ((xSFruit2 == nodos2[i].x) && (ySFruit2 == nodos2[i].y))
				return true;
		}
		return false;
	}
}

function novaPosFruta(f) {
	if (f==1){
		do{
			xfruta = Math.floor(Math.random() * nx);
			yfruta = Math.floor(Math.random() * ny);
		}while((colisaoFruta1(1)==true)||(colisaoFruta2(1)==true)||((xfruta==xfruta2)&&(yfruta==yfruta2)));
	}
	else{
		do{
			xfruta2 = Math.floor(Math.random() * nx);
			yfruta2 = Math.floor(Math.random() * ny);
		}while((colisaoFruta1(2)==true)||(colisaoFruta2(2)==true)||((xfruta==xfruta2)&&(yfruta==yfruta2)));
	}
}

function criaFrutaEspecial(){
	if (!frutaEspecial) {
		do{		
			xSFruit = Math.floor(Math.random() * nx);
			ySFruit = Math.floor(Math.random() * ny);
		}while((colisaoFruta1(3)==true)||(colisaoFruta2(3)==true));
		frutaEspecial=true;
		escondeIntervalo=10000;
		clearInterval(relEscondeFruit);
		relEscondeFruit = setInterval("escondeFruit()",escondeIntervalo);
		timeEf1=-10;
	}
}

function criaFrutaEspecial2(){
	if (!frutaEspecial2) {
		do{		
			xSFruit2 = Math.floor(Math.random() * nx);
			ySFruit2 = Math.floor(Math.random() * ny);
		}while((colisaoFruta1(4)==true)||(colisaoFruta2(4)==true));
		frutaEspecial2=true;
		escondeIntervalo2=5000;
		clearInterval(relEscondeFruit2);
		relEscondeFruit2 = setInterval("escondeFruit2()",escondeIntervalo2);
		timeEf1=-5;
	}
}

function escondeFruit(){
	frutaEspecial=false;
	clearInterval(relEscondeFruit);
	clearInterval(relFruit);
	fruitIntervalo=30000;
	relFruit=setInterval("criaFrutaEspecial()",fruitIntervalo);
	timef1=30;
	timeEf1=-10;
}

function escondeFruit2(){
	frutaEspecial2=false;
	clearInterval(relEscondeFruit2);
	clearInterval(relFruit2);
	fruitIntervalo2=47000;
	relFruit2=setInterval("criaFrutaEspecial2()",fruitIntervalo2);
	timef2=47;
	timeEf2=-5;
}

function temQueMorrer(){
	if ((!bateParede.checked)&&(!bateEmSi.checked)&&(selNJog.value==1)) {
		bateParede.checked=true;
	}
	else if ((!bateParede.checked)&&(!bateEmSi.checked)&&(!bateOutro.checked)) {
		bateOutro.checked=true;
	}
}

function Dolores(){
	if (maisPerto(1)==1){		
		if ((xfruta<=nodos[0].x)&&(yfruta<=nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (nodos[0].x-xfruta>nodos[0].y-yfruta) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=ddireita;
				}
				else if (vaiBater(1,'cima')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'esq'))
							nodos[0].direc=desquerda;
						else
							nodos[0].direc=ddireita;
					}
				}
			}
			else if (nodos[0].direc==ddireita) {				
				if ((yfruta==nodos[0].y)&&(!vaiBater(1,'baixo')))
					nodos[0].direc=dbaixo;
				else
				if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
				else if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
			}
			else if (nodos[0].direc==dbaixo) {
				if ((xfruta==nodos[0].x)&&(!vaiBater(1,'dir')))
					nodos[0].direc=ddireita;
				else
				if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
				else if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
			}
			else if (nodos[0].direc==desquerda) {
				if (nodos[0].y-yfruta>nodos[0].x-xfruta) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dbaixo;
				}
				else if (vaiBater(1,'esq')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'cima'))
							nodos[0].direc=dcima;
						else
							nodos[0].direc=dbaixo;
					}
				}
			}
		}
		else if((xfruta<=nodos[0].x)&&(yfruta>nodos[0].y)){
			if (nodos[0].direc==dcima) {
				if ((xfruta==nodos[0].x)&&(!vaiBater(1,'dir')))
					nodos[0].direc=ddireita;
				else
				if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
				else if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;					
			}
			else if (nodos[0].direc==ddireita) {
				if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
				else if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
			}
			else if (nodos[0].direc==dbaixo) {
				if (nodos[0].x-xfruta>yfruta-nodos[0].y) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=ddireita;
				}
				else if (vaiBater(1,'baixo')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'esq'))
							nodos[0].direc=desquerda;
						else
							nodos[0].direc=ddireita;
					}
				}
			}
			else if (nodos[0].direc==desquerda) {
				if (yfruta-nodos[0].y>nodos[0].x-xfruta) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dcima;
				}
				else if (vaiBater(1,'esq')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'baixo'))
							nodos[0].direc=dbaixo;
						else
							nodos[0].direc=dcima;
					}
				}
			}
		}
		else if ((xfruta>nodos[0].x)&&(yfruta<=nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (xfruta-nodos[0].x>nodos[0].y-yfruta) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=desquerda;
				}
				else if (vaiBater(1,'cima')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'dir'))
							nodos[0].direc=ddireita;
						else
							nodos[0].direc=desquerda;
					}
				}
			}
			else if (nodos[0].direc==ddireita) {
				if (nodos[0].y-yfruta>xfruta-nodos[0].x) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dbaixo;
				}
				else if (vaiBater(1,'dir')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'cima'))
							nodos[0].direc=dcima;
						else
							nodos[0].direc=dbaixo;
					}
				}
			}
			else if (nodos[0].direc==dbaixo) {
				if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
				else if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
			}
			else if (nodos[0].direc==desquerda) {
				if ((yfruta==nodos[0].y)&&(!vaiBater(1,'baixo')))
					nodos[0].direc=dbaixo;
				else
				if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
				else if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
			}
		}
		else if ((xfruta>nodos[0].x)&&(yfruta>nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
				else if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
			}
			else if (nodos[0].direc==ddireita) {
				if (yfruta-nodos[0].y>xfruta-nodos[0].x) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dcima;
				}
				else if (vaiBater(1,'dir')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'baixo'))
							nodos[0].direc=dbaixo;
						else
							nodos[0].direc=dcima;
					}
				}
			}
			else if (nodos[0].direc==dbaixo) {
				if (xfruta-nodos[0].x>yfruta-nodos[0].y) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=desquerda;
				}
				else if (vaiBater(1,'baixo')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'dir'))
							nodos[0].direc=ddireita;
						else
							nodos[0].direc=desquerda;
					}
				}
			}
			else if (nodos[0].direc==desquerda) {
				if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
				else if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
			}
		}
	}
	else if (maisPerto(1)==2){
		if ((xfruta2<=nodos[0].x)&&(yfruta2<=nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (nodos[0].x-xfruta2>nodos[0].y-yfruta2) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=ddireita;
				}
				else if (vaiBater(1,'cima')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'esq'))
							nodos[0].direc=desquerda;
						else
							nodos[0].direc=ddireita;
					}
				}
			}
			else if (nodos[0].direc==ddireita) {				
				if ((yfruta2==nodos[0].y)&&(!vaiBater(1,'baixo')))
					nodos[0].direc=dbaixo;
				else
				if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
				else if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
			}
			else if (nodos[0].direc==dbaixo) {
				if ((xfruta2==nodos[0].x)&&(!vaiBater(1,'dir')))
					nodos[0].direc=ddireita;
				else
				if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
				else if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
			}
			else if (nodos[0].direc==desquerda) {
				if (nodos[0].y-yfruta2>nodos[0].x-xfruta2) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dbaixo;
				}
				else if (vaiBater(1,'esq')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'cima'))
							nodos[0].direc=dcima;
						else
							nodos[0].direc=dbaixo;
					}
				}
			}
		}
		else if((xfruta2<=nodos[0].x)&&(yfruta2>nodos[0].y)){
			if (nodos[0].direc==dcima) {
				if ((xfruta2==nodos[0].x)&&(!vaiBater(1,'dir')))
					nodos[0].direc=ddireita;
				else
				if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
				else if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;					
			}
			else if (nodos[0].direc==ddireita) {
				if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
				else if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
			}
			else if (nodos[0].direc==dbaixo) {
				if (nodos[0].x-xfruta2>yfruta2-nodos[0].y) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=ddireita;
				}
				else if (vaiBater(1,'baixo')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'esq'))
							nodos[0].direc=desquerda;
						else
							nodos[0].direc=ddireita;
					}
				}
			}
			else if (nodos[0].direc==desquerda) {
				if (yfruta2-nodos[0].y>nodos[0].x-xfruta2) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dcima;
				}
				else if (vaiBater(1,'esq')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'baixo'))
							nodos[0].direc=dbaixo;
						else
							nodos[0].direc=dcima;
					}
				}
			}
		}
		else if ((xfruta2>nodos[0].x)&&(yfruta2<=nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (xfruta2-nodos[0].x>nodos[0].y-yfruta2) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=desquerda;
				}
				else if (vaiBater(1,'cima')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'dir'))
							nodos[0].direc=ddireita;
						else
							nodos[0].direc=desquerda;
					}
				}
			}
			else if (nodos[0].direc==ddireita) {
				if (nodos[0].y-yfruta2>xfruta2-nodos[0].x) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dbaixo;
				}
				else if (vaiBater(1,'dir')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'cima'))
							nodos[0].direc=dcima;
						else
							nodos[0].direc=dbaixo;
					}
				}
			}
			else if (nodos[0].direc==dbaixo) {
				if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
				else if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
			}
			else if (nodos[0].direc==desquerda) {
				if ((yfruta2==nodos[0].y)&&(!vaiBater(1,'baixo')))
					nodos[0].direc=dbaixo;
				else
				if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
				else if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
			}
		}
		else if ((xfruta2>nodos[0].x)&&(yfruta2>nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
				else if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
			}
			else if (nodos[0].direc==ddireita) {
				if (yfruta2-nodos[0].y>xfruta2-nodos[0].x) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dcima;
				}
				else if (vaiBater(1,'dir')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'baixo'))
							nodos[0].direc=dbaixo;
						else
							nodos[0].direc=dcima;
					}
				}
			}
			else if (nodos[0].direc==dbaixo) {
				if (xfruta2-nodos[0].x>yfruta2-nodos[0].y) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=desquerda;
				}
				else if (vaiBater(1,'baixo')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'dir'))
							nodos[0].direc=ddireita;
						else
							nodos[0].direc=desquerda;
					}
				}
			}
			else if (nodos[0].direc==desquerda) {
				if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
				else if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
			}
		}
	}
	else if (maisPerto(1)==3){
		if ((xSFruit<=nodos[0].x)&&(ySFruit<=nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (nodos[0].x-xSFruit>nodos[0].y-ySFruit) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=ddireita;
				}
				else if (vaiBater(1,'cima')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'esq'))
							nodos[0].direc=desquerda;
						else
							nodos[0].direc=ddireita;
					}
				}
			}
			else if (nodos[0].direc==ddireita) {				
				if ((ySFruit==nodos[0].y)&&(!vaiBater(1,'baixo')))
					nodos[0].direc=dbaixo;
				else
				if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
				else if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
			}
			else if (nodos[0].direc==dbaixo) {
				if ((xSFruit==nodos[0].x)&&(!vaiBater(1,'dir')))
					nodos[0].direc=ddireita;
				else
				if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
				else if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
			}
			else if (nodos[0].direc==desquerda) {
				if (nodos[0].y-ySFruit>nodos[0].x-xSFruit) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dbaixo;
				}
				else if (vaiBater(1,'esq')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'cima'))
							nodos[0].direc=dcima;
						else
							nodos[0].direc=dbaixo;
					}
				}
			}
		}
		else if((xSFruit<=nodos[0].x)&&(ySFruit>nodos[0].y)){
			if (nodos[0].direc==dcima) {
				if ((xSFruit==nodos[0].x)&&(!vaiBater(1,'dir')))
					nodos[0].direc=ddireita;
				else
				if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
				else if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;					
			}
			else if (nodos[0].direc==ddireita) {
				if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
				else if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
			}
			else if (nodos[0].direc==dbaixo) {
				if (nodos[0].x-xSFruit>ySFruit-nodos[0].y) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=ddireita;
				}
				else if (vaiBater(1,'baixo')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'esq'))
							nodos[0].direc=desquerda;
						else
							nodos[0].direc=ddireita;
					}
				}
			}
			else if (nodos[0].direc==desquerda) {
				if (ySFruit-nodos[0].y>nodos[0].x-xSFruit) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dcima;
				}
				else if (vaiBater(1,'esq')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'baixo'))
							nodos[0].direc=dbaixo;
						else
							nodos[0].direc=dcima;
					}
				}
			}
		}
		else if ((xSFruit>nodos[0].x)&&(ySFruit<=nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (xSFruit-nodos[0].x>nodos[0].y-ySFruit) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=desquerda;
				}
				else if (vaiBater(1,'cima')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'dir'))
							nodos[0].direc=ddireita;
						else
							nodos[0].direc=desquerda;
					}
				}
			}
			else if (nodos[0].direc==ddireita) {
				if (nodos[0].y-ySFruit>xSFruit-nodos[0].x) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dbaixo;
				}
				else if (vaiBater(1,'dir')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'cima'))
							nodos[0].direc=dcima;
						else
							nodos[0].direc=dbaixo;
					}
				}
			}
			else if (nodos[0].direc==dbaixo) {
				if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
				else if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
			}
			else if (nodos[0].direc==desquerda) {
				if ((ySFruit==nodos[0].y)&&(!vaiBater(1,'baixo')))
					nodos[0].direc=dbaixo;
				else
				if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
				else if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
			}
		}
		else if ((xSFruit>nodos[0].x)&&(ySFruit>nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
				else if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
			}
			else if (nodos[0].direc==ddireita) {
				if (ySFruit-nodos[0].y>xSFruit-nodos[0].x) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dcima;
				}
				else if (vaiBater(1,'dir')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'baixo'))
							nodos[0].direc=dbaixo;
						else
							nodos[0].direc=dcima;
					}
				}
			}
			else if (nodos[0].direc==dbaixo) {
				if (xSFruit-nodos[0].x>ySFruit-nodos[0].y) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=desquerda;
				}
				else if (vaiBater(1,'baixo')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'dir'))
							nodos[0].direc=ddireita;
						else
							nodos[0].direc=desquerda;
					}
				}
			}
			else if (nodos[0].direc==desquerda) {
				if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
				else if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
			}
		}
	}
	else if (maisPerto(1)==4) {
		if ((xSFruit2<=nodos[0].x)&&(ySFruit2<=nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (nodos[0].x-xSFruit2>nodos[0].y-ySFruit2) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=ddireita;
				}
				else if (vaiBater(1,'cima')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'esq'))
							nodos[0].direc=desquerda;
						else
							nodos[0].direc=ddireita;
					}
				}
			}
			else if (nodos[0].direc==ddireita) {				
				if ((ySFruit2==nodos[0].y)&&(!vaiBater(1,'baixo')))
					nodos[0].direc=dbaixo;
				else
				if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
				else if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
			}
			else if (nodos[0].direc==dbaixo) {
				if ((ySFruit2==nodos[0].y)&&(!vaiBater(1,'dir')))
					nodos[0].direc=ddireita;
				else
				if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
				else if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
			}
			else if (nodos[0].direc==desquerda) {
				if (nodos[0].y-ySFruit2>nodos[0].x-xSFruit2) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dbaixo;
				}
				else if (vaiBater(1,'esq')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'cima'))
							nodos[0].direc=dcima;
						else
							nodos[0].direc=dbaixo;
					}
				}
			}
		}
		else if((xSFruit2<=nodos[0].x)&&(ySFruit2>nodos[0].y)){
			if (nodos[0].direc==dcima) {
				if ((xSFruit2==nodos[0].x)&&(!vaiBater(1,'dir')))
					nodos[0].direc=ddireita;
				else
				if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
				else if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;					
			}
			else if (nodos[0].direc==ddireita) {
				if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
				else if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
			}
			else if (nodos[0].direc==dbaixo) {
				if (nodos[0].x-xSFruit2>ySFruit2-nodos[0].y) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=ddireita;
				}
				else if (vaiBater(1,'baixo')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'esq'))
							nodos[0].direc=desquerda;
						else
							nodos[0].direc=ddireita;
					}
				}
			}
			else if (nodos[0].direc==desquerda) {
				if (ySFruit2-nodos[0].y>nodos[0].x-xSFruit2) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dcima;
				}
				else if (vaiBater(1,'esq')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'baixo'))
							nodos[0].direc=dbaixo;
						else
							nodos[0].direc=dcima;
					}
				}
			}
		}
		else if ((xSFruit2>nodos[0].x)&&(ySFruit2<=nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (xSFruit2-nodos[0].x>nodos[0].y-ySFruit2) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=desquerda;
				}
				else if (vaiBater(1,'cima')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'dir'))
							nodos[0].direc=ddireita;
						else
							nodos[0].direc=desquerda;
					}
				}
			}
			else if (nodos[0].direc==ddireita) {
				if (nodos[0].y-ySFruit2>xSFruit2-nodos[0].x) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dbaixo;
				}
				else if (vaiBater(1,'dir')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'cima'))
							nodos[0].direc=dcima;
						else
							nodos[0].direc=dbaixo;
					}
				}
			}
			else if (nodos[0].direc==dbaixo) {
				if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
				else if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
			}
			else if (nodos[0].direc==desquerda) {
				if ((ySFruit2==nodos[0].y)&&(!vaiBater(1,'baixo')))
					nodos[0].direc=dbaixo;
				else
				if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
				else if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
			}
		}
		else if ((xSFruit2>nodos[0].x)&&(ySFruit2>nodos[0].y)) {
			if (nodos[0].direc==dcima) {
				if (!vaiBater(1,'dir'))
					nodos[0].direc=ddireita;
				else if (!vaiBater(1,'esq'))
					nodos[0].direc=desquerda;
			}
			else if (nodos[0].direc==ddireita) {
				if (ySFruit2-nodos[0].y>xSFruit2-nodos[0].x) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dcima;
				}
				else if (vaiBater(1,'dir')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'baixo'))
							nodos[0].direc=dbaixo;
						else
							nodos[0].direc=dcima;
					}
				}
			}
			else if (nodos[0].direc==dbaixo) {
				if (xSFruit2-nodos[0].x>ySFruit2-nodos[0].y) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=desquerda;
				}
				else if (vaiBater(1,'baixo')) {
					if (obstaculoMovel) 
						fujaDoAbraco(1);
					else{
						if (!vaiBater(1,'dir'))
							nodos[0].direc=ddireita;
						else
							nodos[0].direc=desquerda;
					}
				}
			}
			else if (nodos[0].direc==desquerda) {
				if (!vaiBater(1,'baixo'))
					nodos[0].direc=dbaixo;
				else if (!vaiBater(1,'cima'))
					nodos[0].direc=dcima;
			}
		}
	}
	else if (maisPerto(1)==5) {
		if ((difXP1<difX1)&&(difYP1<difY1)) {
			if ((xfruta<=nodos[0].x)&&(yfruta<=nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dcima;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
				}
			}
			else if ((xfruta<=nodos[0].x)&&(yfruta>nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dbaixo;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
				}
			}
			else if ((xfruta>nodos[0].x)&&(yfruta<=nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dcima;
				}
			}
			else if ((xfruta>nodos[0].x)&&(yfruta>nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;	
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dbaixo;					
				}
			}
		}
		else if ((difXP1<difX1)&&(difY1<difYP1)) {
			if ((xfruta<=nodos[0].x)&&(yfruta<=nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dbaixo;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
				}
			}
			else if ((xfruta<=nodos[0].x)&&(yfruta>nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if(!vaiBater(1,'esq'))
						nodos[0].direc=desquerda; 
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dcima;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;	
				}
			}
			else if ((xfruta>nodos[0].x)&&(yfruta<=nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dbaixo;
				}
			}
			else if ((xfruta>nodos[0].x)&&(yfruta>nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dcima;
				}
			}	
		}
		else if ((difX1<difXP1)&&(difYP1<difY1)) {
			if ((xfruta<=nodos[0].x)&&(yfruta<=nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dcima;
				}
			}
			else if ((xfruta<=nodos[0].x)&&(yfruta>nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater('cima'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=ddireita;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'esq'))
						nodos[0].direc=dcima;
				}
			}
			else if ((xfruta>nodos[0].x)&&(yfruta<=nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dcima;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'baixo'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
					else if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
				}
			}
			else if ((xfruta>nodos[0].x)&&(yfruta>nodos[0].y)) {
				if (nodos[0].direc==dcima) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (vaiBater(1,'cima'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==ddireita) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (vaiBater(1,'dir'))
						nodos[0].direc=dbaixo;
				}
				else if (nodos[0].direc==dbaixo) {
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
				}
				else if (nodos[0].direc==desquerda) {
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else if (!vaiBater(1,'baixo'))
						nodos[0].direc=dbaixo;
				}
			}
		}
	}
}

function Bernard(){
	
	if (maisPerto(2)==1){		
		if ((xfruta<=nodos2[0].x)&&(yfruta<=nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (nodos2[0].x-xfruta>nodos2[0].y-yfruta) {
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else if (vaiBater(2,'cima'))
						nodos2[0].direc=ddireita;
				}
				else if (vaiBater(2,'cima')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'esq'))
							nodos2[0].direc=desquerda;
						else
							nodos2[0].direc=ddireita;
					}
				}
			}
			else if (nodos2[0].direc==ddireita) {				
				if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
				else if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
			}
			else if (nodos2[0].direc==dbaixo) {
				if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
				else if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
			}
			else if (nodos2[0].direc==desquerda) {
				if (nodos2[0].y-yfruta>nodos2[0].x-xfruta) {
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else if (vaiBater(2,'esq'))
						nodos2[0].direc=dbaixo;
				}
				else if (vaiBater(2,'esq')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'cima'))
							nodos2[0].direc=dcima;
						else
							nodos2[0].direc=dbaixo;
					}
				}
			}
		}
		else if((xfruta<=nodos2[0].x)&&(yfruta>nodos2[0].y)){
			if (nodos2[0].direc==dcima) {
				if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
				else if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;					
			}
			else if (nodos2[0].direc==ddireita) {
				if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
				else if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
			}
			else if (nodos2[0].direc==dbaixo) {
				if (nodos2[0].x-xfruta>yfruta-nodos2[0].y) {
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else if (vaiBater(2,'baixo'))
						nodos2[0].direc=ddireita;
				}
				else if (vaiBater(2,'baixo')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'esq'))
							nodos2[0].direc=desquerda;
						else
							nodos2[0].direc=ddireita;
					}
				}
			}
			else if (nodos2[0].direc==desquerda) {
				if (yfruta-nodos2[0].y>nodos2[0].x-xfruta) {
					if (!vaiBater(2,'baixo'))
						nodos2[0].direc=dbaixo;
					else if (vaiBater(2,'esq'))
						nodos2[0].direc=dcima;
				}
				else if (vaiBater(2,'esq')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'baixo'))
							nodos2[0].direc=dbaixo;
						else
							nodos2[0].direc=dcima;
					}
				}
			}
		}
		else if ((xfruta>nodos2[0].x)&&(yfruta<=nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (xfruta-nodos2[0].x>nodos2[0].y-yfruta) {
					if (!vaiBater(2,'dir'))
						nodos2[0].direc=ddireita;
					else if (vaiBater(2,'cima'))
						nodos2[0].direc=desquerda;
				}
				else if (vaiBater(2,'cima')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'dir'))
							nodos2[0].direc=ddireita;
						else
							nodos2[0].direc=desquerda;
					}
				}
			}
			else if (nodos2[0].direc==ddireita) {
				if (nodos2[0].y-yfruta>xfruta-nodos2[0].x) {
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else if (vaiBater(2,'dir'))
						nodos2[0].direc=dbaixo;
				}
				else if (vaiBater(2,'dir')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'cima'))
							nodos2[0].direc=dcima;
						else
							nodos2[0].direc=dbaixo;
					}
				}
			}
			else if (nodos2[0].direc==dbaixo) {
				if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
				else if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
			}
			else if (nodos2[0].direc==desquerda) {
				if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
				else if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
			}
		}
		else if ((xfruta>nodos2[0].x)&&(yfruta>nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
				else if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
			}
			else if (nodos2[0].direc==ddireita) {
				if (yfruta-nodos2[0].y>xfruta-nodos2[0].x) {
					if (!vaiBater(2,'baixo'))
						nodos2[0].direc=dbaixo;
					else if (vaiBater(2,'dir'))
						nodos2[0].direc=dcima;
				}
				else if (vaiBater(2,'dir')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'baixo'))
							nodos2[0].direc=dbaixo;
						else
							nodos2[0].direc=dcima;
					}
				}
			}
			else if (nodos2[0].direc==dbaixo) {
				if (xfruta-nodos2[0].x>yfruta-nodos2[0].y) {
					if (!vaiBater(2,'dir'))
						nodos2[0].direc=ddireita;
					else if (vaiBater(2,'baixo'))
						nodos2[0].direc=desquerda;
				}
				else if (vaiBater(2,'baixo')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'dir'))
							nodos2[0].direc=ddireita;
						else
							nodos2[0].direc=desquerda;
					}
				}
			}
			else if (nodos2[0].direc==desquerda) {
				if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
				else if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
			}
		}
	}
	else if (maisPerto(2)==2){
		if ((xfruta2<=nodos2[0].x)&&(yfruta2<=nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (nodos2[0].x-xfruta2>nodos2[0].y-yfruta2) {
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else if (vaiBater(2,'cima'))
						nodos2[0].direc=ddireita;
				}
				else if (vaiBater(2,'cima')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'esq'))
							nodos2[0].direc=desquerda;
						else
							nodos2[0].direc=ddireita;
					}
				}
			}
			else if (nodos2[0].direc==ddireita) {				
				if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
				else if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
			}
			else if (nodos2[0].direc==dbaixo) {
				if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
				else if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
			}
			else if (nodos2[0].direc==desquerda) {
				if (nodos2[0].y-yfruta2>nodos2[0].x-xfruta2) {
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else if (vaiBater(2,'esq'))
						nodos2[0].direc=dbaixo;
				}
				else if (vaiBater(2,'esq')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'cima'))
							nodos2[0].direc=dcima;
						else
							nodos2[0].direc=dbaixo;
					}
				}
			}
		}
		else if((xfruta2<=nodos2[0].x)&&(yfruta2>nodos2[0].y)){
			if (nodos2[0].direc==dcima) {
				if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
				else if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;					
			}
			else if (nodos2[0].direc==ddireita) {
				if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
				else if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
			}
			else if (nodos2[0].direc==dbaixo) {
				if (nodos2[0].x-xfruta2>yfruta2-nodos2[0].y) {
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else if (vaiBater(2,'baixo'))
						nodos2[0].direc=ddireita;
				}
				else if (vaiBater(2,'baixo')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'esq'))
							nodos2[0].direc=desquerda;
						else
							nodos2[0].direc=ddireita;
					}
				}
			}
			else if (nodos2[0].direc==desquerda) {
				if (yfruta2-nodos2[0].y>nodos2[0].x-xfruta2) {
					if (!vaiBater(2,'baixo'))
						nodos2[0].direc=dbaixo;
					else if (vaiBater(2,'esq'))
						nodos2[0].direc=dcima;
				}
				else if (vaiBater(2,'esq')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'baixo'))
							nodos2[0].direc=dbaixo;
						else
							nodos2[0].direc=dcima;
					}
				}
			}
		}
		else if ((xfruta2>nodos2[0].x)&&(yfruta2<=nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (xfruta2-nodos2[0].x>nodos2[0].y-yfruta2) {
					if (!vaiBater(2,'dir'))
						nodos2[0].direc=ddireita;
					else if (vaiBater(2,'cima'))
						nodos2[0].direc=desquerda;
				}
				else if (vaiBater(2,'cima')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'dir'))
							nodos2[0].direc=ddireita;
						else
							nodos2[0].direc=desquerda;
					}
				}
			}
			else if (nodos2[0].direc==ddireita) {
				if (nodos2[0].y-yfruta2>xfruta2-nodos2[0].x) {
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else if (vaiBater(2,'dir'))
						nodos2[0].direc=dbaixo;
				}
				else if (vaiBater(2,'dir')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'cima'))
							nodos2[0].direc=dcima;
						else
							nodos2[0].direc=dbaixo;
					}
				}
			}
			else if (nodos2[0].direc==dbaixo) {
				if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
				else if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
			}
			else if (nodos2[0].direc==desquerda) {
				if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
				else if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
			}
		}
		else if ((xfruta2>nodos2[0].x)&&(yfruta2>nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
				else if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
			}
			else if (nodos2[0].direc==ddireita) {
				if (yfruta2-nodos2[0].y>xfruta2-nodos2[0].x) {
					if (!vaiBater(2,'baixo'))
						nodos2[0].direc=dbaixo;
					else if (vaiBater(2,'dir'))
						nodos2[0].direc=dcima;
				}
				else if (vaiBater(2,'dir')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'baixo'))
							nodos2[0].direc=dbaixo;
						else
							nodos2[0].direc=dcima;
					}
				}
			}
			else if (nodos2[0].direc==dbaixo) {
				if (xfruta2-nodos2[0].x>yfruta2-nodos2[0].y) {
					if (!vaiBater(2,'dir'))
						nodos2[0].direc=ddireita;
					else if (vaiBater(2,'baixo'))
						nodos2[0].direc=desquerda;
				}
				else if (vaiBater(2,'baixo')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'dir'))
							nodos2[0].direc=ddireita;
						else
							nodos2[0].direc=desquerda;
					}
				}
			}
			else if (nodos2[0].direc==desquerda) {
				if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
				else if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
			}
		}
	}
	else if (maisPerto(2)==3){
		if ((xSFruit<=nodos2[0].x)&&(ySFruit<=nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (nodos2[0].x-xSFruit>nodos2[0].y-ySFruit) {
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else if (vaiBater(2,'cima'))
						nodos2[0].direc=ddireita;
				}
				else if (vaiBater(2,'cima')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'esq'))
							nodos2[0].direc=desquerda;
						else
							nodos2[0].direc=ddireita;
					}
				}
			}
			else if (nodos2[0].direc==ddireita) {				
				if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
				else if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
			}
			else if (nodos2[0].direc==dbaixo) {
				if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
				else if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
			}
			else if (nodos2[0].direc==desquerda) {
				if (nodos2[0].y-ySFruit>nodos2[0].x-xSFruit) {
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else if (vaiBater(2,'esq'))
						nodos2[0].direc=dbaixo;
				}
				else if (vaiBater(2,'esq')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'cima'))
							nodos2[0].direc=dcima;
						else
							nodos2[0].direc=dbaixo;
					}
				}
			}
		}
		else if((xSFruit<=nodos2[0].x)&&(ySFruit>nodos2[0].y)){
			if (nodos2[0].direc==dcima) {
				if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
				else if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;					
			}
			else if (nodos2[0].direc==ddireita) {
				if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
				else if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
			}
			else if (nodos2[0].direc==dbaixo) {
				if (nodos2[0].x-xSFruit>ySFruit-nodos2[0].y) {
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else if (vaiBater(2,'baixo'))
						nodos2[0].direc=ddireita;
				}
				else if (vaiBater(2,'baixo')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'esq'))
							nodos2[0].direc=desquerda;
						else
							nodos2[0].direc=ddireita;
					}
				}
			}
			else if (nodos2[0].direc==desquerda) {
				if (ySFruit-nodos2[0].y>nodos2[0].x-xSFruit) {
					if (!vaiBater(2,'baixo'))
						nodos2[0].direc=dbaixo;
					else if (vaiBater(2,'esq'))
						nodos2[0].direc=dcima;
				}
				else if (vaiBater(2,'esq')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'baixo'))
							nodos2[0].direc=dbaixo;
						else
							nodos2[0].direc=dcima;
					}
				}
			}
		}
		else if ((xSFruit>nodos2[0].x)&&(ySFruit<=nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (xSFruit-nodos2[0].x>nodos2[0].y-ySFruit) {
					if (!vaiBater(2,'dir'))
						nodos2[0].direc=ddireita;
					else if (vaiBater(2,'cima'))
						nodos2[0].direc=desquerda;
				}
				else if (vaiBater(2,'cima')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'dir'))
							nodos2[0].direc=ddireita;
						else
							nodos2[0].direc=desquerda;
					}
				}
			}
			else if (nodos2[0].direc==ddireita) {
				if (nodos2[0].y-ySFruit>xSFruit-nodos2[0].x) {
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else if (vaiBater(2,'dir'))
						nodos2[0].direc=dbaixo;
				}
				else if (vaiBater(2,'dir')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'cima'))
							nodos2[0].direc=dcima;
						else
							nodos2[0].direc=dbaixo;
					}
				}
			}
			else if (nodos2[0].direc==dbaixo) {
				if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
				else if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
			}
			else if (nodos2[0].direc==desquerda) {
				if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
				else if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
			}
		}
		else if ((xSFruit>nodos2[0].x)&&(ySFruit>nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
				else if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
			}
			else if (nodos2[0].direc==ddireita) {
				if (ySFruit-nodos2[0].y>xSFruit-nodos2[0].x) {
					if (!vaiBater(2,'baixo'))
						nodos2[0].direc=dbaixo;
					else if (vaiBater(2,'dir'))
						nodos2[0].direc=dcima;
				}
				else if (vaiBater(2,'dir')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'baixo'))
							nodos2[0].direc=dbaixo;
						else
							nodos2[0].direc=dcima;
					}
				}
			}
			else if (nodos2[0].direc==dbaixo) {
				if (xSFruit-nodos2[0].x>ySFruit-nodos2[0].y) {
					if (!vaiBater(2,'dir'))
						nodos2[0].direc=ddireita;
					else if (vaiBater(2,'baixo'))
						nodos2[0].direc=desquerda;
				}
				else if (vaiBater(2,'baixo')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'dir'))
							nodos2[0].direc=ddireita;
						else
							nodos2[0].direc=desquerda;
					}
				}
			}
			else if (nodos2[0].direc==desquerda) {
				if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
				else if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
			}
		}
	}
	else if (maisPerto(2)==4) {
		if ((xSFruit2<=nodos2[0].x)&&(ySFruit2<=nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (nodos2[0].x-xSFruit2>nodos2[0].y-ySFruit2) {
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else if (vaiBater(2,'cima'))
						nodos2[0].direc=ddireita;
				}
				else if (vaiBater(2,'cima')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'esq'))
							nodos2[0].direc=desquerda;
						else
							nodos2[0].direc=ddireita;
					}
				}
			}
			else if (nodos2[0].direc==ddireita) {				
				if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
				else if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
			}
			else if (nodos2[0].direc==dbaixo) {
				if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
				else if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
			}
			else if (nodos2[0].direc==desquerda) {
				if (nodos2[0].y-ySFruit2>nodos2[0].x-xSFruit2) {
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else if (vaiBater(2,'esq'))
						nodos2[0].direc=dbaixo;
				}
				else if (vaiBater(2,'esq')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'cima'))
							nodos2[0].direc=dcima;
						else
							nodos2[0].direc=dbaixo;
					}
				}
			}
		}
		else if((xSFruit2<=nodos2[0].x)&&(ySFruit2>nodos2[0].y)){
			if (nodos2[0].direc==dcima) {
				if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
				else if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;					
			}
			else if (nodos2[0].direc==ddireita) {
				if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
				else if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
			}
			else if (nodos2[0].direc==dbaixo) {
				if (nodos2[0].x-xSFruit2>ySFruit2-nodos2[0].y) {
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else if (vaiBater(2,'baixo'))
						nodos2[0].direc=ddireita;
				}
				else if (vaiBater(2,'baixo')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'esq'))
							nodos2[0].direc=desquerda;
						else
							nodos2[0].direc=ddireita;
					}
				}
			}
			else if (nodos2[0].direc==desquerda) {
				if (ySFruit2-nodos2[0].y>nodos2[0].x-xSFruit2) {
					if (!vaiBater(2,'baixo'))
						nodos2[0].direc=dbaixo;
					else if (vaiBater(2,'esq'))
						nodos2[0].direc=dcima;
				}
				else if (vaiBater(2,'esq')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'baixo'))
							nodos2[0].direc=dbaixo;
						else
							nodos2[0].direc=dcima;
					}
				}
			}
		}
		else if ((xSFruit2>nodos2[0].x)&&(ySFruit2<=nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (xSFruit2-nodos2[0].x>nodos2[0].y-ySFruit2) {
					if (!vaiBater(2,'dir'))
						nodos2[0].direc=ddireita;
					else if (vaiBater(2,'cima'))
						nodos2[0].direc=desquerda;
				}
				else if (vaiBater(2,'cima')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'dir'))
							nodos2[0].direc=ddireita;
						else
							nodos2[0].direc=desquerda;
					}
				}
			}
			else if (nodos2[0].direc==ddireita) {
				if (nodos2[0].y-ySFruit2>xSFruit2-nodos2[0].x) {
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else if (vaiBater(2,'dir'))
						nodos2[0].direc=dbaixo;
				}
				else if (vaiBater(2,'dir')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'cima'))
							nodos2[0].direc=dcima;
						else
							nodos2[0].direc=dbaixo;
					}
				}
			}
			else if (nodos2[0].direc==dbaixo) {
				if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
				else if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
			}
			else if (nodos2[0].direc==desquerda) {
				if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
				else if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
			}
		}
		else if ((xSFruit2>nodos2[0].x)&&(ySFruit2>nodos2[0].y)) {
			if (nodos2[0].direc==dcima) {
				if (!vaiBater(2,'dir'))
					nodos2[0].direc=ddireita;
				else if (!vaiBater(2,'esq'))
					nodos2[0].direc=desquerda;
			}
			else if (nodos2[0].direc==ddireita) {
				if (ySFruit2-nodos2[0].y>xSFruit2-nodos2[0].x) {
					if (!vaiBater(2,'baixo'))
						nodos2[0].direc=dbaixo;
					else if (vaiBater(2,'dir'))
						nodos2[0].direc=dcima;
				}
				else if (vaiBater(2,'dir')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'baixo'))
							nodos2[0].direc=dbaixo;
						else
							nodos2[0].direc=dcima;
					}
				}
			}
			else if (nodos2[0].direc==dbaixo) {
				if (xSFruit2-nodos2[0].x>ySFruit2-nodos2[0].y) {
					if (!vaiBater(2,'dir'))
						nodos2[0].direc=ddireita;
					else if (vaiBater(2,'baixo'))
						nodos2[0].direc=desquerda;
				}
				else if (vaiBater(2,'baixo')) {
					if (obstaculoMovel2) 
						fujaDoAbraco(2);
					else{
						if (!vaiBater(2,'dir'))
							nodos2[0].direc=ddireita;
						else
							nodos2[0].direc=desquerda;
					}
				}
			}
			else if (nodos2[0].direc==desquerda) {
				if (!vaiBater(2,'baixo'))
					nodos2[0].direc=dbaixo;
				else if (!vaiBater(2,'cima'))
					nodos2[0].direc=dcima;
			}
		}
	}
}

function maisPerto(p){	
	if (p==1) {
		difX1=xfruta-nodos[0].x;
		if (difX1<0)
			difX1=difX1*(-1);
		difY1=yfruta-nodos[0].y;
		if (difY1<0)
			difY1=difY1*(-1);

		if (!bateParede.checked) {
			if (xfruta>nodos[0].x) {
				difXP1=nodos[0].x+(nx-xfruta);
			}
			else{
				difXP1=(nx-nodos[0].x)+xfruta;
			}
			
			if (yfruta>nodos[0].y) {
				difYP1=nodos[0].y+(ny-yfruta);
			}
			else{
				difYP1=(ny-nodos[0].y)+yfruta;
			}
		}
		
		difX2=xfruta2-nodos[0].x;
		if (difX2<0)
			difX2=difX2*(-1);
		difY2=yfruta2-nodos[0].y;
		if (difY2<0)
			difY2=difY2*(-1);


		if (frutaEspecial) {
			difX3=xSFruit-nodos[0].x;
			if (difX3<0)
				difX3=difX3*(-1);
			difY3=ySFruit-nodos[0].y;
			if (difY3<0)
				difY3=difY3*(-1);
		}
		if (frutaEspecial2) {
			difX4=xSFruit2-nodos[0].x;
			if (difX4<0)
				difX4=difX4*(-1);
			difY4=ySFruit2-nodos[0].y;
			if (difY4<0)
				difY4=difY4*(-1);
		}

		if (frutaEspecial&&frutaEspecial2) {
			if (difX3+difY3<difX4+difY4){
				distDaFruta1=difX3+difY3;
				frutaPerseguidaP1=3;
				if (!sinsMaisPerto(2,3))
					return(3);
				else
					return(4);
			}
			else if (difX4+difY4<difX3+difY3){
				distDaFruta1=difX4+difY4;
				frutaPerseguidaP1=4;
				if (!sinsMaisPerto(2,4))
					return(4);
				else
					return(3);
			}
		}
		else if (frutaEspecial) {
			distDaFruta1=difX3+difY3;
			frutaPerseguidaP1=3;
			if (!sinsMaisPerto(2,3)){
				return(3);
			}
			else{
				if (bateParede.checked) {
					if (difX1+difY1<difX2+difY2)
						return(1);
					else if (difX2+difY2<difX1+difY1)
						return(2);
					else
						return(1);				
				}
				else{
					if ((difXP1<difX1)&&(difYP1<difY1)&&(difXP1+difYP1<difX2+difY2))
						return(5);
					else if ((difXP1<difX1)&&(difY1<difYP1)&&(difXP1+difY1<difX2+difY2))
						return(5);
					else if ((difX1<difXP1)&&(difYP1<difY1)&&(difX1+difYP1<difX2+difY2))
						return(5);
					else
					if ((difX1+difY1<difX2+difY2)){
						return(1);
					}
					else if (difX2+difY2<difX1+difY1)
						return(2);
					else
						return(1);
				}
			}
		}
		else if (frutaEspecial2) {
			distDaFruta1=difX4+difY4;
			frutaPerseguidaP1=4;
			if (!sinsMaisPerto(2,4))
				return(4);
			else{
				if (bateParede.checked) {
					if (difX1+difY1<difX2+difY2)
						return(1);
					else if (difX2+difY2<difX1+difY1)
						return(2);
					else
						return(1);				
				}
				else{
					if ((difXP1<difX1)&&(difYP1<difY1)&&(difXP1+difYP1<difX2+difY2))
						return(5);
					else if ((difXP1<difX1)&&(difY1<difYP1)&&(difXP1+difY1<difX2+difY2))
						return(5);
					else if ((difX1<difXP1)&&(difYP1<difY1)&&(difX1+difYP1<difX2+difY2))
						return(5);
					else
					if ((difX1+difY1<difX2+difY2)){
						return(1);
					}
					else if (difX2+difY2<difX1+difY1)
						return(2);
					else
						return(1);
				}
			}
		}
		else{
			if (bateParede.checked) {
				if (difX1+difY1<difX2+difY2){
					distDaFruta1=difX1+difY1;
					frutaPerseguidaP1=1;
					if (!sinsMaisPerto(2,1))
						return(1);
					else
						return(2);
				}
				else if (difX2+difY2<difX1+difY1){
					distDaFruta1=difX2+difY2;
					frutaPerseguidaP1=2;
					if (!sinsMaisPerto(2,2))
						return(2);
					else
						return(1);
				}
				else{
					distDaFruta1=difX1+difY1;
					frutaPerseguidaP1=1;
					return(1);
				}					
			}
			else{
				if ((difXP1<difX1)&&(difYP1<difY1)&&(difXP1+difYP1<difX2+difY2)){
					return(5);
				}
				else if ((difXP1<difX1)&&(difY1<difYP1)&&(difXP1+difY1<difX2+difY2))
					return(5);
				else if ((difX1<difXP1)&&(difYP1<difY1)&&(difX1+difYP1<difX2+difY2))
					return(5);
				else
				if (difX1+difY1<difX2+difY2){
					distDaFruta1=difX1+difY1;
					frutaPerseguidaP1=1;
					if (!sinsMaisPerto(2,1))
						return(1);
					else
						return(2);
				}
				else if (difX2+difY2<difX1+difY1){
					distDaFruta1=difX2+difY2;
					frutaPerseguidaP1=2;
					if (!sinsMaisPerto(2,2))
						return(2);
					else
						return(1);
				}
			}
		}
	}
	else if (p==2) {
		difX1=xfruta-nodos2[0].x;
		if (difX1<0)
			difX1=difX1*(-1);
		difY1=yfruta-nodos2[0].y;
		if (difY1<0)
			difY1=difY1*(-1);
		difX2=xfruta2-nodos2[0].x;
		if (difX2<0)
			difX2=difX2*(-1);
		difY2=yfruta2-nodos2[0].y;
		if (difY2<0)
			difY2=difY2*(-1);

		if (frutaEspecial) {
			difX3=xSFruit-nodos2[0].x;
			if (difX3<0)
				difX3=difX3*(-1);
			difY3=ySFruit-nodos2[0].y;
			if (difY3<0)
				difY3=difY3*(-1);
		}
		if (frutaEspecial2) {
			difX4=xSFruit2-nodos2[0].x;
			if (difX4<0)
				difX4=difX4*(-1);
			difY4=ySFruit2-nodos2[0].y;
			if (difY4<0)
				difY4=difY4*(-1);
		}

		if (frutaEspecial&&frutaEspecial2) {
			if (difX3+difY3<difX4+difY4){
				distDaFruta2=difX3+difY3;
				frutaPerseguidaP2=3;
				if (!sinsMaisPerto(1,3))
					return(3);
				else
					return(4);
			}
			else if (difX4+difY4<difX3+difY3){
				distDaFruta2=difX4+difY4;
				frutaPerseguidaP2=4;
				if (!sinsMaisPerto(1,4))
					return(4);
				else
					return(3);
			}
		}
		else if (frutaEspecial) {
			distDaFruta2=difX3+difY3;
			frutaPerseguidaP2=3;
			if (!sinsMaisPerto(1,3))
					return(3);
			else{
				if (difX1+difY1<difX2+difY2)
					return(1);
				else
					return(2);
			}
		}
		else if (frutaEspecial2) {
			distDaFruta2=difX4+difY4;
			frutaPerseguidaP2=4;
			if (!sinsMaisPerto(1,4))
					return(4);
			else{
				if (difX1+difY1<difX2+difY2)
					return(1);
				else
					return(2);
			}
		}
		else{
			if (difX1+difY1<difX2+difY2){
				distDaFruta2=difX1+difY1;
				frutaPerseguidaP2=1;
				if (!sinsMaisPerto(1,1))
					return(1);
				else
					return(2);
			}
			else if (difX2+difY2<difX1+difY1){
				distDaFruta2=difX2+difY2;
				frutaPerseguidaP2=2;
				if (!sinsMaisPerto(1,2))
					return(2);
				else
					return(1);
			}
			else{
				distDaFruta2=difX2+difY2;
				frutaPerseguidaP2=2;
				return(2);
			}
		}
	}
}

function vaiBater(player,direcao){
	obstaculoMovel=false;
	obstaculoMovel2=false;
	if (player==1) {
		if (direcao=='esq') {
			if (bateEmSi.checked&&(!p1Imortal)) {
				for (var i = 1; i < nodos.length; i++) {
					if ((nodos[0].x-1==nodos[i].x)&&(nodos[0].y==nodos[i].y)){
						obstaculoMovel=true;
						direcaoObstaculo=nodos[i].direc;
						return(true);
					}
				}
			}
			if (bateOutro.checked&&(!p1Imortal)) {
				for (var i = 0; i < nodos2.length; i++) {
					if ((nodos[0].x-1==nodos2[i].x)&&(nodos[0].y==nodos2[i].y)){
						obstaculoMovel=true;
						direcaoObstaculo=nodos2[i].direc;
						return(true);
					}
				}
			}
			if (bateParede.checked&&(!p1Imortal)) {
				if (nodos[0].x-1==-1)
					return(true);
			}
		}
		if (direcao=='dir') {
			if (bateEmSi.checked&&(!p1Imortal)) {
				for (var i = 1; i < nodos.length; i++) {
					if ((nodos[0].x+1==nodos[i].x)&&(nodos[0].y==nodos[i].y)){
						obstaculoMovel=true;
						direcaoObstaculo=nodos[i].direc;
						return(true);
					}
				}
			}
			if (bateOutro.checked&&(!p1Imortal)) {
				for (var i = 0; i < nodos2.length; i++) {
					if ((nodos[0].x+1==nodos2[i].x)&&(nodos[0].y==nodos2[i].y)){					
						obstaculoMovel=true;
						direcaoObstaculo=nodos2[i].direc;
						return(true);
					}
				}
			}
			if (bateParede.checked&&(!p1Imortal)) {
				if (nodos[0].x+1==nx)
					return(true);
			}
		}
		if (direcao=='cima') {
			if (bateEmSi.checked&&(!p1Imortal)) {
				for (var i = 1; i < nodos.length; i++) {
					if ((nodos[0].y-1==nodos[i].y)&&(nodos[0].x==nodos[i].x)){
						obstaculoMovel=true;
						direcaoObstaculo=nodos[i].direc;
						return(true);
					}
				}
			}
			if (bateOutro.checked&&(!p1Imortal)) {
				for (var i = 0; i < nodos2.length; i++) {
					if ((nodos[0].y-1==nodos2[i].y)&&(nodos[0].x==nodos2[i].x)){
						obstaculoMovel=true;
						direcaoObstaculo=nodos2[i].direc;
						return(true);
					}
				}
			}
			if (bateParede.checked&&(!p1Imortal)) {
				if (nodos[0].y-1==-1)
					return(true);
			}
		}
		if (direcao=='baixo') {
			if (bateEmSi.checked&&(!p1Imortal)) {
				for (var i = 1; i < nodos.length; i++) {
					if ((nodos[0].y+1==nodos[i].y)&&(nodos[0].x==nodos[i].x)){
						obstaculoMovel=true;
						direcaoObstaculo=nodos[i].direc;
						return(true);
					}
				}
			}
			if (bateOutro.checked&&(!p1Imortal)) {
				for (var i = 0; i < nodos2.length; i++) {
					if ((nodos[0].y+1==nodos2[i].y)&&(nodos[0].x==nodos2[i].x)){					
						obstaculoMovel=true;
						direcaoObstaculo=nodos2[i].direc;
						return(true);
					}
				}
			}
			if (bateParede.checked&&(!p1Imortal)) {
				if (nodos[0].y+1==ny)
					return(true);
			}
		}
		return(false);
	}
	else
	if (player==2) {
		if (direcao=='esq') {
			if (bateEmSi.checked&&(!p2Imortal)) {
				for (var i = 1; i < nodos2.length; i++) {
					if ((nodos2[0].x-1==nodos2[i].x)&&(nodos2[0].y==nodos2[i].y)){
						obstaculoMovel2=true;
						direcaoObstaculo2=nodos2[i].direc;
						return(true);
					}
				}
			}
			if (bateOutro.checked&&(!p2Imortal)) {
				for (var i = 0; i < nodos.length; i++) {
					if ((nodos2[0].x-1==nodos[i].x)&&(nodos2[0].y==nodos[i].y)){
						obstaculoMovel2=true;
						direcaoObstaculo2=nodos[i].direc;
						return(true);
					}
				}
			}
			if (bateParede.checked&&(!p2Imortal)) {
				if (nodos2[0].x-1==-1)
					return(true);
			}
		}
		if (direcao=='dir') {
			if (bateEmSi.checked&&(!p2Imortal)) {
				for (var i = 1; i < nodos2.length; i++) {
					if ((nodos2[0].x+1==nodos2[i].x)&&(nodos2[0].y==nodos2[i].y)){
						obstaculoMovel2=true;
						direcaoObstaculo2=nodos2[i].direc;
						return(true);
					}
				}
			}
			if (bateOutro.checked&&(!p2Imortal)) {
				for (var i = 0; i < nodos.length; i++) {
					if ((nodos2[0].x+1==nodos[i].x)&&(nodos2[0].y==nodos[i].y)){					
						obstaculoMovel2=true;
						direcaoObstaculo2=nodos[i].direc;
						return(true);
					}
				}
			}
			if (bateParede.checked&&(!p2Imortal)) {
				if (nodos2[0].x+1==nx)
					return(true);
			}
		}
		if (direcao=='cima') {
			if (bateEmSi.checked&&(!p2Imortal)) {
				for (var i = 1; i < nodos2.length; i++) {
					if ((nodos2[0].y-1==nodos2[i].y)&&(nodos2[0].x==nodos2[i].x)){
						obstaculoMovel2=true;
						direcaoObstaculo2=nodos2[i].direc;
						return(true);
					}
				}
			}
			if (bateOutro.checked&&(!p2Imortal)) {
				for (var i = 0; i < nodos.length; i++) {
					if ((nodos2[0].y-1==nodos[i].y)&&(nodos2[0].x==nodos[i].x)){
						obstaculoMovel2=true;
						direcaoObstaculo2=nodos[i].direc;
						return(true);
					}
				}
			}
			if (bateParede.checked&&(!p2Imortal)) {
				if (nodos2[0].y-1==-1)
					return(true);
			}
		}
		if (direcao=='baixo') {
			if (bateEmSi.checked&&(!p2Imortal)) {
				for (var i = 1; i < nodos2.length; i++) {
					if ((nodos2[0].y+1==nodos2[i].y)&&(nodos2[0].x==nodos2[i].x)){
						obstaculoMovel2=true;
						direcaoObstaculo2=nodos2[i].direc;
						return(true);
					}
				}
			}
			if (bateOutro.checked&&(!p2Imortal)) {
				for (var i = 0; i < nodos.length; i++) {
					if ((nodos2[0].y+1==nodos[i].y)&&(nodos2[0].x==nodos[i].x)){					
						obstaculoMovel2=true;
						direcaoObstaculo2=nodos[i].direc;
						return(true);
					}
				}
			}
			if (bateParede.checked&&(!p2Imortal)) {
				if (nodos2[0].y+1==ny)
					return(true);
			}
		}
		return(false);
	}
}

function fujaDoAbraco(player){
	if (player==1) {
		switch (direcaoObstaculo){
			case dcima:
				if ((nodos[0].direc!=dcima)&&(nodos[0].direc!=dbaixo))
					if (!vaiBater(1,'baixo')) 
						nodos[0].direc=dbaixo;
					else
						nodos[0].direc=dcima;
				else{
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else
						nodos[0].direc=ddireita;
				}
				break;
			case dbaixo:
				if ((nodos[0].direc!=dcima)&&(nodos[0].direc!=dbaixo))
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else 
						nodos[0].direc=dbaixo
				else{
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else
						nodos[0].direc=ddireita;
				}
				break;
			case desquerda:
				if ((nodos[0].direc!=ddireita)&&(nodos[0].direc!=desquerda))
					if (!vaiBater(1,'dir'))
						nodos[0].direc=ddireita;
					else
						nodos[0].direc=desquerda;
				else{
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else
						nodos[0].direc=dbaixo;
				}					
				break;
			case ddireita:
				if ((nodos[0].direc!=ddireita)&&(nodos[0].direc!=desquerda))
					if (!vaiBater(1,'esq'))
						nodos[0].direc=desquerda;
					else
						nodos[0].direc=ddireita;
				else{
					if (!vaiBater(1,'cima'))
						nodos[0].direc=dcima;
					else
						nodos[0].direc=dbaixo;
				}
				break;
		}
	}
	else
	if (player==2) {		
		switch (direcaoObstaculo2){
			case dcima:
				if ((nodos2[0].direc!=dcima)&&(nodos2[0].direc!=dbaixo))
					if (!vaiBater(2,'baixo')) 
						nodos2[0].direc=dbaixo;
					else
						nodos2[0].direc=dcima;
				else{
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else
						nodos2[0].direc=ddireita;
				}
				break;
			case dbaixo:
				if ((nodos2[0].direc!=dcima)&&(nodos2[0].direc!=dbaixo))
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else 
						nodos2[0].direc=dbaixo
				else{
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else
						nodos2[0].direc=ddireita;
				}
				break;
			case desquerda:
				if ((nodos2[0].direc!=ddireita)&&(nodos2[0].direc!=desquerda))
					if (!vaiBater(2,'dir'))
						nodos2[0].direc=ddireita;
					else
						nodos2[0].direc=desquerda;
				else{
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else
						nodos2[0].direc=dbaixo;
				}					
				break;
			case ddireita:
				if ((nodos2[0].direc!=ddireita)&&(nodos2[0].direc!=desquerda))
					if (!vaiBater(2,'esq'))
						nodos2[0].direc=desquerda;
					else
						nodos2[0].direc=ddireita;
				else{
					if (!vaiBater(2,'cima'))
						nodos2[0].direc=dcima;
					else
						nodos2[0].direc=dbaixo;
				}
				break;
		}
	}
}

function sinsMaisPerto(player,fruta){
	if (player==2) {
		if ((distDaFruta2<distDaFruta1)&&(frutaPerseguidaP2==fruta))
			return(true);
		else
			return(false);
	}
	else
	if (player==1) {
		if ((distDaFruta1<distDaFruta2)&&(frutaPerseguidaP1==fruta))
			return(true);
		else
			return(false);
	}
}

window.onmousewheel=noZoom;
function noZoom(){
	if (localStorage.getItem('dGames-ctrlPressed')=='true')
		return false;
}

window.onblur=blur;
function blur(){
	if (!isGameOver&&(rodando)&&(!pausado))
		pausa();	
}

function abertura1(){
	document.onclick="";
	sndLogo.play();
		
	if (sndLogo.currentTime>0) {
		c.fillStyle="black";
		c.fillRect(0,0,800,600);
		document.getElementById("loadGif").style.display="none";
	}
	if (sndLogo.currentTime>=sndLogo.duration-2.15) {
		c.drawImage(logo,0,0,920,720,0,0,800,600);
	}
		
	if (sndLogo.currentTime>=sndLogo.duration-0.1)
		setTimeout(abertura2,3000);
	else
		requestAnimationFrame(abertura1);
}

function abertura2(){
	c.clearRect(0,0,800,600);
	c.drawImage(loading,0,0,800,600,0,0,800,600);

	bgLeft=1100;
	bgPos1=0;
	bgPos2=-600;

	document.onmousedown=md;
	document.onmousemove=mm;
	document.onmouseup=mu;
	exibindoMenu=true;
	setTimeout(fadeAbertura,3000);
}

function fadeAbertura(){
	if (fade>=1)
		menuIni();
	else{
		c.fillStyle="rgba(0,0,0,"+fade+")";
		c.fillRect(0,0,800,600);
		fade+=0.01;
		requestAnimationFrame(fadeAbertura);
	}
}

function menuIni(){
	c.fillStyle="black";
	c.fillRect(0,0,800,600);

	c.drawImage(menu,0,0);

	c.fillStyle="white";
	c.font="20px Comic Sans MS";
	if (selNJog.value==1)
		c.fillText("Jogador",435,150)
	else
		c.fillText("Jogadores",440,150);

	c.drawImage(edQtdJogadores.img,0,0,edQtdJogadores.oW,edQtdJogadores.oH,edQtdJogadores.left,edQtdJogadores.top,edQtdJogadores.width,edQtdJogadores.height);
	c.drawImage(selNJog.img,selNJog.iniLeft,0,selNJog.oW,selNJog.oH,selNJog.left,selNJog.top,selNJog.width,selNJog.height);
	if (selNJog.value==2) {
		c.drawImage(edModo.img,0,0,edModo.oW,edModo.oH,edModo.left,edModo.top,edModo.width,edModo.height);
		c.drawImage(selModo.img,0,selModo.iniTop,selModo.oW,selModo.oH,selModo.left,selModo.top,selModo.width,selModo.height);
	}
	
	if (selNJog.value==2&&(selNJog.iniLeft<80))
		selNJog.iniLeft+=5;
	else if (selNJog.value==1&&(selNJog.iniLeft>0))
		selNJog.iniLeft-=5;

	if (selModo.value==2&&(selModo.iniTop<50))
		selModo.iniTop+=5;
	else if (selModo.value==1&&(selModo.iniTop>0))
		selModo.iniTop-=5;

	c.fillStyle="white";
	c.fillText("Velocidade",180,250);
	c.drawImage(rangeVel.img,0,0,rangeVel.oW,rangeVel.oH,rangeVel.left,rangeVel.top,rangeVel.width,rangeVel.height);
	c.drawImage(selVel.img,0,0,selVel.oW,selVel.oH,selVel.left,selVel.top,selVel.width,selVel.height);

	c.fillText("Morre ao bater",620,250);
	c.fillStyle="lime";
	if (bateParede.checked)
		c.drawImage(bateParede.img[1],0,0,bateParede.oW,bateParede.oH,bateParede.left,bateParede.top,bateParede.width,bateParede.height);
	else
		c.drawImage(bateParede.img[0],0,0,bateParede.oW,bateParede.oH,bateParede.left,bateParede.top,bateParede.width,bateParede.height);
	c.fillText("na Parede",620,bateParede.top+25);

	if (bateEmSi.checked)
		c.drawImage(bateEmSi.img[1],0,0,bateEmSi.oW,bateEmSi.oH,bateEmSi.left,bateEmSi.top,bateEmSi.width,bateEmSi.height);
	else
		c.drawImage(bateEmSi.img[0],0,0,bateEmSi.oW,bateEmSi.oH,bateEmSi.left,bateEmSi.top,bateEmSi.width,bateEmSi.height);
	c.fillText("no próprio corpo",630,bateEmSi.top+25);

	if (selNJog.value==2) {
		if (bateOutro.checked)
			c.drawImage(bateOutro.img[1],0,0,bateOutro.oW,bateOutro.oH,bateOutro.left,bateOutro.top,bateOutro.width,bateOutro.height);
		else
			c.drawImage(bateOutro.img[0],0,0,bateOutro.oW,bateOutro.oH,bateOutro.left,bateOutro.top,bateOutro.width,bateOutro.height);
		c.fillText("no amigo",620,bateOutro.top+25);
	}

	c.fillStyle="white";
	if (selNJog.value==2)
		c.fillText("Nomes",180,340);
	else
		c.fillText("Nome",180,340);
	c.drawImage(p1Nome.img,0,0,p1Nome.oW,p1Nome.oH,p1Nome.left,p1Nome.top,p1Nome.width,p1Nome.height);
	if (p1Nome.focado)
		c.fillStyle="gold";
	else
		c.fillStyle="lime";
	c.fillText(p1Nome.value,180,p1Nome.top+25);

	if (selNJog.value==2) {
		c.drawImage(p2Nome.img,0,0,p2Nome.oW,p2Nome.oH,p2Nome.left,p2Nome.top,p2Nome.width,p2Nome.height);
		if (p2Nome.focado)
			c.fillStyle="gold";
		else
			c.fillStyle="lime";
		c.fillText(p2Nome.value,180,p2Nome.top+25);
	}

	c.drawImage(sinsImg,355,255);

	c.drawImage(btIaP1.img[btIaP1.pos],0,0,80,50,btIaP1.left,btIaP1.top,40,25);

	if (selNJog.value==2) 
		c.drawImage(btIaP2.img[btIaP2.pos],0,0,80,50,btIaP2.left,btIaP2.top,40,25);

	for (var z = 425 ; z >= btCorCorpo1.left; z-=10) {
		c.beginPath();
		c.arc(z,btCorCorpo1.top,10,0,Math.PI*2,0,true);
		gradient=c.createRadialGradient(z,btCorCorpo1.top,6,z,btCorCorpo1.top,10);
		c.closePath();
		gradient.addColorStop(0,btCorCorpo1.cor);
		gradient.addColorStop(1,'rgba(0,0,0,.7)');
		c.fillStyle=gradient;
		c.fill();
	}

	c.beginPath();
	c.arc(btCorCab1.left,btCorCab1.top,10,0,Math.PI*2,0,true);
	gradient=c.createRadialGradient(btCorCab1.left,btCorCab1.top,6,btCorCab1.left,btCorCab1.top,10);
	c.closePath();
	gradient.addColorStop(0,btCorCab1.cor);
	gradient.addColorStop(1,'rgba(0,0,0,.7)');
	c.fillStyle=gradient;
	c.fill();

	if (selNJog.value==2) {
		for (var z = 425 ; z >= btCorCorpo2.left; z-=10) {
			c.beginPath();
			c.arc(z,btCorCorpo2.top,10,0,Math.PI*2,0,true);
			gradient=c.createRadialGradient(z,btCorCorpo2.top,6,z,btCorCorpo2.top,10);
			c.closePath();
			gradient.addColorStop(0,btCorCorpo2.cor);
			gradient.addColorStop(1,'rgba(0,0,0,.7)');
			c.fillStyle=gradient;
			c.fill();
		}

		c.beginPath();
		c.arc(btCorCab2.left,btCorCab2.top,10,0,Math.PI*2,0,true);
		gradient=c.createRadialGradient(btCorCab2.left,btCorCab2.top,6,btCorCab2.left,btCorCab2.top,10);
		c.closePath();
		gradient.addColorStop(0,btCorCab2.cor);
		gradient.addColorStop(1,'rgba(0,0,0,.7)');
		c.fillStyle=gradient;
		c.fill();
	}

	c.drawImage(btJogar.img[btJogar.pos],0,0,btJogar.oW,btJogar.oH,btJogar.left,btJogar.top,btJogar.width,btJogar.height);

	c.drawImage(btSair.img[btSair.pos],0,0,btSair.oW,btSair.oH,btSair.left,btSair.top,btSair.width,btSair.height);

	if (exibindoMenu) 
		requestAnimationFrame(menuIni);
	else 
		inicio();
}

function md(e){
	var mX=e.clientX*(800/window.innerWidth);
	var mY=e.clientY*(600/window.innerHeight);
	
	if (exibindoMenu) {
		if ((mX>=edQtdJogadores.left)&&(mX<=edQtdJogadores.left+edQtdJogadores.width)&&
			(mY>=edQtdJogadores.top)&&(mY<=edQtdJogadores.top+edQtdJogadores.height)) {
			if (selNJog.value>1){
				selNJog.value=1;
				selModo.value=1;
				modo="Coop";
				bateOutro.checked=false;
			}
			else
				selNJog.value=2;
			temQueMorrer();
		}

		if ((mX>=edModo.left)&&(mX<=edModo.left+edModo.width)&&
			(mY>=edModo.top)&&(mY<=edModo.top+edModo.height)&&(selNJog.value==2)) {
			if (selModo.value>1){
				selModo.value=1;
				modo="Coop";
			}
			else{
				selModo.value=2;
				modo="Vs";
			}
		}

		if ((mX>=rangeVel.left)&&(mX<=rangeVel.left+rangeVel.width)&&
			(mY>=rangeVel.top-15)&&(mY<=rangeVel.top+rangeVel.height+15)) {
			selVel.moving=true;
		}

		if ((mX>=selVel.left)&&(mX<=selVel.left+selVel.width)&&
			(mY>=selVel.top)&&(mY<=selVel.top+selVel.height)) {
			selVel.moving=true;
		}

		if ((mX>=bateParede.left)&&(mX<=bateParede.left+bateParede.width)&&
			(mY>=bateParede.top)&&(mY<=bateParede.top+bateParede.height)) {
			bateParede.checked=!bateParede.checked;
			temQueMorrer();
		}

		if ((mX>=bateEmSi.left)&&(mX<=bateEmSi.left+bateEmSi.width)&&
			(mY>=bateEmSi.top)&&(mY<=bateEmSi.top+bateEmSi.height)) {
			bateEmSi.checked=!bateEmSi.checked;
			temQueMorrer();
		}

		if ((mX>=bateOutro.left)&&(mX<=bateOutro.left+bateOutro.width)&&
			(mY>=bateOutro.top)&&(mY<=bateOutro.top+bateOutro.height)&&(selNJog.value==2)) {
			bateOutro.checked=!bateOutro.checked;
			temQueMorrer();
		}

		p1Nome.focado=false;
		if (p1Nome.value==""||(p1Nome.value==" "))
			p1Nome.value="SinS 1";
		p2Nome.focado=false;
		if (p2Nome.value==""||(p2Nome.value==" "))
			p2Nome.value="SinS 2";
		if ((mX>=p1Nome.left)&&(mX<=p1Nome.left+p1Nome.width)&&
			(mY>=p1Nome.top)&&(mY<=p1Nome.top+p1Nome.height)&&(p1Nome.enabled)) {
			p1Nome.focado=true;
			if (p1Nome.value=="SinS 1")
				p1Nome.value="";
		}

		if ((mX>=p2Nome.left)&&(mX<=p2Nome.left+p2Nome.width)&&
			(mY>=p2Nome.top)&&(mY<=p2Nome.top+p2Nome.height)&&(selNJog.value==2)&&(p2Nome.enabled)) {
			p2Nome.focado=true;
			if (p2Nome.value=="SinS 2")
				p2Nome.value="";
		}

		if ((mX>=btJogar.left)&&(mX<=btJogar.left+btJogar.width)&&
			(mY>=btJogar.top)&&(mY<=btJogar.top+btJogar.height)) {
			btJogar.pos=0;
		}

		if ((mX>=btIaP1.left)&&(mX<=btIaP1.left+btIaP1.width)&&
			(mY>=btIaP1.top)&&(mY<=btIaP1.top+btIaP1.height)) {
			if (iaP1) {
				btIaP1.pos=1;
				iaP1=false;
				p1Nome.value=localStorage.getItem("SinS-player1")!=null?localStorage.getItem("SinS-player1"):"SinS 1";
				p1Nome.enabled=true;
			}
			else{
				btIaP1.pos=0;
				iaP1=true;
				p1Nome.value="Dolores";
				p1Nome.enabled=false;
			}
		}

		if ((mX>=btIaP2.left)&&(mX<=btIaP2.left+btIaP2.width)&&
			(mY>=btIaP2.top)&&(mY<=btIaP2.top+btIaP2.height)&&(selNJog.value==2)) {
			if (iaP2) {
				btIaP2.pos=1;
				iaP2=false;
				p2Nome.value=localStorage.getItem("SinS-player2")!=null?localStorage.getItem("SinS-player2"):"SinS 2";
				p2Nome.enabled=true;
			}
			else{
				btIaP2.pos=0;
				iaP2=true;
				p2Nome.value="Bernard";
				p2Nome.enabled=false;
			}
		}
	}

	if ((mX>=btContinuar.left)&&(mX<=btContinuar.left+btContinuar.width)&&
		(mY>=btContinuar.top)&&(mY<=btContinuar.top+btContinuar.height)) {
		btContinuar.pos=0;
	}

	if ((mX>=btSair.left)&&(mX<=btSair.left+btSair.width)&&
		(mY>=btSair.top)&&(mY<=btSair.top+btSair.height)) {
		btSair.pos=0;
	}
}

function mm(e){
	var mX=e.clientX*(800/window.innerWidth);
	var mY=e.clientY*(600/window.innerHeight);

	if (selVel.moving) {
		if (mX-30>selVel.left) {
			if (selVel.value<4) {
				selVel.left+=46;
				selVel.value++;
			}
		}

		if (mX+30<selVel.left) {
			if (selVel.value>0) {
				selVel.left-=46;
				selVel.value--;
			}
		}
	}

	if ((mX>=btJogar.left)&&(mX<=btJogar.left+btJogar.width)&&
		(mY>=btJogar.top)&&(mY<=btJogar.top+btJogar.height)) {
		btJogar.pos=1;
	}
	else
		btJogar.pos=0;

	if ((mX>=btContinuar.left)&&(mX<=btContinuar.left+btContinuar.width)&&
		(mY>=btContinuar.top)&&(mY<=btContinuar.top+btContinuar.height)) {
		btContinuar.pos=1;
	}
	else
		btContinuar.pos=0;

	if ((mX>=btSair.left)&&(mX<=btSair.left+btSair.width)&&
		(mY>=btSair.top)&&(mY<=btSair.top+btSair.height)) {
		btSair.pos=1;
	}
	else
		btSair.pos=0;
}

function mu(e){
	var mX=e.clientX*(800/window.innerWidth);
	var mY=e.clientY*(600/window.innerHeight);

	selVel.moving=false;

	if (exibindoMenuPausa||(isGameOver)) {
		if ((mX>=btContinuar.left)&&(mX<=btContinuar.left+btContinuar.width)&&
			(mY>=btContinuar.top)&&(mY<=btContinuar.top+btContinuar.height)) {
			btContinuar.pos=1;
			if (exibindoMenuPausa)
				exibindoMenuPausa=false;
			else
				isGameOver=false;
		}
	}

	if (exibindoMenu) {	
		if ((mX>=btJogar.left)&&(mX<=btJogar.left+btJogar.width)&&
			(mY>=btJogar.top)&&(mY<=btJogar.top+btJogar.height)) {
			btJogar.pos=1;
			exibindoMenu=false;
		}

		if ((mX>=btCorCab1.left-15)&&(mX<=btCorCab1.left+15)&&
			(mY>=btCorCab1.top-15)&&(mY<=btCorCab1.top+15)) {
			colorPicker.onchange= function(){
				btCorCab1.cor=colorPicker.value;
				corCabeca1=colorPicker.value;
			};
			colorPicker.value=corCabeca1;
			colorPicker.click();
		}

		if ((mX>=btCorCorpo1.left+5)&&(mX<=btCorCorpo1.left+55)&&
			(mY>=btCorCorpo1.top-15)&&(mY<=btCorCorpo1.top+15)) {
			colorPicker.onchange= function(){
				btCorCorpo1.cor=colorPicker.value;
				corCorpo1=colorPicker.value;
			};
			colorPicker.value=corCorpo1;
			colorPicker.click();
		}

		if ((mX>=btCorCab2.left-15)&&(mX<=btCorCab2.left+15)&&
			(mY>=btCorCab2.top-15)&&(mY<=btCorCab2.top+15)&&(selNJog.value==2)) {
			colorPicker.onchange= function(){
				btCorCab2.cor=colorPicker.value;
				corCabeca2=colorPicker.value;
			};
			colorPicker.value=corCabeca2;
			colorPicker.click();
		}

		if ((mX>=btCorCorpo2.left+5)&&(mX<=btCorCorpo2.left+55)&&
			(mY>=btCorCorpo2.top-15)&&(mY<=btCorCorpo2.top+15)&&(selNJog.value==2)) {
			colorPicker.onchange= function(){
				btCorCorpo2.cor=colorPicker.value;
				corCorpo2=colorPicker.value;
			};
			colorPicker.value=corCorpo2;
			colorPicker.click();
		}
	}

	if ((mX>=btSair.left)&&(mX<=btSair.left+btSair.width)&&
		(mY>=btSair.top)&&(mY<=btSair.top+btSair.height)) {
		btSair.pos=1;
		if (exibindoMenu) {
			document.onmousedown="";
			document.onmouseup="";
			document.onmousemove="";
			javascript:location.href='../menu.html';
		}
		else if (exibindoMenuPausa) {
			exibindoMenuPausa=false;
			exibindoMenu=true;
			executarGameOver();
			menuIni();
		}
	}
}

document.oncontextmenu= function(){
	return false;
}

window.onload=function(){
	load();
}