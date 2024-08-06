function abertura1() {
	sndLogo.play()

	if (sndLogo.currentTime > 0) {
		document.getElementById("loadGif").style.display = "none"
		c.fillStyle = "black"
		c.fillRect(0, 0, 800, 600)
	}
	if (sndLogo.currentTime >= sndLogo.duration - 2.15) {
		c.drawImage(logo, 0, 0, 920, 720, 0, 0, 800, 600)
	}

	if (sndLogo.currentTime >= sndLogo.duration - 0.1)
		setTimeout(abertura2, 3000)
	else
		requestAnimationFrame(abertura1)
}

function abertura2() {
	music.oncanplaythrough = music.play()
	c.clearRect(0, 0, 800, 600)
	c.drawImage(loading, 0, 0, 800, 600, 0, 0, 800, 600)

	bgLeft = 1100
	bgPos1 = 0
	bgPos2 = -600

	document.onmousemove = mm
	document.onmousedown = md
	document.onmouseup = mu
	exibindoMenu = true
	setTimeout(menuIni, 3500)
}

function mm(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if ((mX >= btJogar.left) && (mX <= btJogar.left + btJogar.width) &&
		(mY >= btJogar.top) && (mY <= btJogar.top + btJogar.height)) {
		btJogar.pos = 1
	}
	else
		btJogar.pos = 0

	if ((mX >= btContinuar.left) && (mX <= btContinuar.left + btContinuar.width) &&
		(mY >= btContinuar.top) && (mY <= btContinuar.top + btContinuar.height)) {
		btContinuar.pos = 1
	}
	else
		btContinuar.pos = 0

	if ((mX >= btSair.left) && (mX <= btSair.left + btSair.width) &&
		(mY >= btSair.top) && (mY <= btSair.top + btSair.height)) {
		btSair.pos = 1
	}
	else
		btSair.pos = 0

	if ((mX >= edit.left) && (mX <= edit.left + edit.width) &&
		(mY >= edit.top) && (mY <= edit.top + edit.height)) {
		edit.pos = 1
	}
	else if (!edit.focado)
		edit.pos = 0
}

function md(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if ((mX >= btJogar.left) && (mX <= btJogar.left + btJogar.width) &&
		(mY >= btJogar.top) && (mY <= btJogar.top + btJogar.height)) {
		btJogar.pos = 2
	}

	if ((mX >= btContinuar.left) && (mX <= btContinuar.left + btContinuar.width) &&
		(mY >= btContinuar.top) && (mY <= btContinuar.top + btContinuar.height)) {
		btContinuar.pos = 2
	}

	if ((mX >= btSair.left) && (mX <= btSair.left + btSair.width) &&
		(mY >= btSair.top) && (mY <= btSair.top + btSair.height)) {
		btSair.pos = 2
	}

	if (exibindoMenu) {
		if ((mX >= edit.left) && (mX <= edit.left + edit.width) &&
			(mY >= edit.top) && (mY <= edit.top + edit.height)) {
			edit.focado = true
		}
		else {
			edit.focado = false
			edit.pos = 0
		}
	}
}

function mu(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if (exibindoMenu) {
		if ((mX >= btJogar.left) && (mX <= btJogar.left + btJogar.width) &&
			(mY >= btJogar.top) && (mY <= btJogar.top + btJogar.height)) {
			btJogar.pos = 1
			if (edit.text != "" && (edit.text != " ")) {
				document.onmousedown = ""
				document.onmouseup = ""
				document.onmousemove = ""
				exibindoMenu = false
				novoJogo()
				player.nome = edit.text
			}
		}

		if ((mX >= btSair.left) && (mX <= btSair.left + btSair.width) &&
			(mY >= btSair.top) && (mY <= btSair.top + btSair.height)) {
			btSair.pos = 1
			document.onmousedown = ""
			document.onmouseup = ""
			document.onmousemove = ""
			location.href = '../index.html'
		}
	}
	else if (pausado) {
		if ((mX >= btSair.left) && (mX <= btSair.left + btSair.width) &&
			(mY >= btSair.top) && (mY <= btSair.top + btSair.height)) {
			btSair.pos = 1
			pausado = undefined
			isGameOver = true
			gameOver()
		}

		if ((mX >= btContinuar.left) && (mX <= btContinuar.left + btContinuar.width) &&
			(mY >= btContinuar.top) && (mY <= btContinuar.top + btContinuar.height)) {
			btContinuar.pos = 1
			pausado = false
			document.onmousemove = ""
			document.onmousedown = ""
			document.onmouseup = ""
			loop()
		}
	}
}

var exibindoMenu = false
function menuIni() {
	bgPos1 += 1.5
	bgPos2 += 1.5
	if (bgPos1 >= 600)
		bgPos1 = -600
	if (bgPos2 >= 600)
		bgPos2 = -600

	for (var i = 0; i < objetos.length; i++) {
		switch (objetos[i].plano) {
			case 1:
				objetos[i].top += 2
				break
			case 2:
				objetos[i].top += 2.5
				break
			case 3:
				objetos[i].top += 2.5
				break
			case 4:
				objetos[i].top += 3
				break
			case 5:
				objetos[i].top += 3.5
				break
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].top > 600) {
			for (var p = i; p < objetos.length - 1; p++) {
				objetos[p] = objetos[(p + 1)]
			}
			objetos.pop()
		}
	}

	if (objetos.length < 5) {

		objetos.push(new Object({
			plano: 0,
			colide: false,
			img: new Image(),
			left: 0,
			top: 0,
			oriWidth: 0,
			oriHeight: 0,
			width: 0,
			height: 0
		}))

		var random = Math.floor(1 + Math.random() * 10)
		if (random <= 2) {
			objetos[objetos.length - 1].plano = 1
			var pl = Math.floor(1 + Math.random() * 2)
			if (pl == 1) {
				objetos[objetos.length - 1].img = estrela[0]
				objetos[objetos.length - 1].oriWidth = 30
				objetos[objetos.length - 1].oriHeight = 30
				objetos[objetos.length - 1].width = 30
				objetos[objetos.length - 1].height = 30
			}
			else {
				objetos[objetos.length - 1].img = estrela[1]
				objetos[objetos.length - 1].oriWidth = 35
				objetos[objetos.length - 1].oriHeight = 35
				objetos[objetos.length - 1].width = 35
				objetos[objetos.length - 1].height = 35
			}
		}
		else
			if (random <= 4) {
				objetos[objetos.length - 1].plano = 2
				var pl = Math.floor(1 + Math.random() * 7)
				if (pl == 7) {
					objetos[objetos.length - 1].img = sol
					objetos[objetos.length - 1].oriWidth = 100
					objetos[objetos.length - 1].oriHeight = 100
					objetos[objetos.length - 1].width = 150
					objetos[objetos.length - 1].height = 150
				}
				else {
					objetos[objetos.length - 1].img = planeta[pl]
					switch (pl) {
						case 1:
							objetos[objetos.length - 1].oriWidth = 90
							objetos[objetos.length - 1].oriHeight = 90
							objetos[objetos.length - 1].width = 130
							objetos[objetos.length - 1].height = 130
							break
						case 2:
							objetos[objetos.length - 1].oriWidth = 85
							objetos[objetos.length - 1].oriHeight = 85
							objetos[objetos.length - 1].width = 115
							objetos[objetos.length - 1].height = 115
							break
						case 3:
							objetos[objetos.length - 1].oriWidth = 90
							objetos[objetos.length - 1].oriHeight = 90
							objetos[objetos.length - 1].width = 100
							objetos[objetos.length - 1].height = 100
							break
						case 4:
							objetos[objetos.length - 1].oriWidth = 80
							objetos[objetos.length - 1].oriHeight = 80
							objetos[objetos.length - 1].width = 90
							objetos[objetos.length - 1].height = 90
							break
						case 5:
							objetos[objetos.length - 1].oriWidth = 70
							objetos[objetos.length - 1].oriHeight = 70
							objetos[objetos.length - 1].width = 75
							objetos[objetos.length - 1].height = 75
							break
						case 6:
							objetos[objetos.length - 1].oriWidth = 65
							objetos[objetos.length - 1].oriHeight = 65
							objetos[objetos.length - 1].width = 65
							objetos[objetos.length - 1].height = 65
							break
					}
				}
			}
			else
				if (random <= 6) {
					objetos[objetos.length - 1].plano = 3
					objetos[objetos.length - 1].img = nebulosaFundo[random]
					if (random == 5) {
						objetos[objetos.length - 1].oriWidth = 300
						objetos[objetos.length - 1].oriHeight = 323
						objetos[objetos.length - 1].width = 400
						objetos[objetos.length - 1].height = 423
					}
					else {
						objetos[objetos.length - 1].oriWidth = 260
						objetos[objetos.length - 1].oriHeight = 322
						objetos[objetos.length - 1].width = 360
						objetos[objetos.length - 1].height = 422
					}
				}
				else
					if (random <= 8) {
						objetos[objetos.length - 1].plano = 4
						var pl = Math.floor(1 + Math.random() * 3)
						objetos[objetos.length - 1].img = zzz[pl]
						objetos[objetos.length - 1].colide = true
						if (pl == 1) {
							objetos[objetos.length - 1].oriWidth = 90
							objetos[objetos.length - 1].oriHeight = 92
							objetos[objetos.length - 1].width = 90
							objetos[objetos.length - 1].height = 92
						}
						else if (pl == 2) {
							objetos[objetos.length - 1].oriWidth = 100
							objetos[objetos.length - 1].oriHeight = 154
							objetos[objetos.length - 1].width = 100
							objetos[objetos.length - 1].height = 154
						}
						else {
							objetos[objetos.length - 1].oriWidth = 120
							objetos[objetos.length - 1].oriHeight = 138
							objetos[objetos.length - 1].width = 120
							objetos[objetos.length - 1].height = 138
						}
					}
					else {
						objetos[objetos.length - 1].plano = 5
						var pl = Math.floor(1 + Math.random() * 3)
						objetos[objetos.length - 1].img = nebulosa[pl]
						if (pl == 1) {
							objetos[objetos.length - 1].oriWidth = 300
							objetos[objetos.length - 1].oriHeight = 167
							objetos[objetos.length - 1].width = 400
							objetos[objetos.length - 1].height = 267
						}
						else if (pl == 2) {
							objetos[objetos.length - 1].oriWidth = 320
							objetos[objetos.length - 1].oriHeight = 166
							objetos[objetos.length - 1].width = 420
							objetos[objetos.length - 1].height = 266
						}
						else {
							objetos[objetos.length - 1].oriWidth = 280
							objetos[objetos.length - 1].oriHeight = 199
							objetos[objetos.length - 1].width = 380
							objetos[objetos.length - 1].height = 299
						}
					}
		objetos[objetos.length - 1].left = Math.floor(Math.random() * 800 - objetos[objetos.length - 1].width / 2)
		objetos[objetos.length - 1].top = 0
		while (objetos[objetos.length - 1].top + objetos[objetos.length - 1].height >= 0)
			objetos[objetos.length - 1].top = -Math.floor(150 + Math.random() * 750)
	}

	c.drawImage(fundo1, bgLeft, 0, 800, 1500, 0, bgPos1, 800, 600)
	c.drawImage(fundo2, bgLeft, 0, 800, 1500, 0, bgPos2, 800, 600)

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].plano == 1) {
			c.drawImage(objetos[i].img, 0, 0, objetos[i].oriWidth, objetos[i].oriHeight, objetos[i].left, objetos[i].top, objetos[i].width, objetos[i].height)
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].plano == 2) {
			c.drawImage(objetos[i].img, 0, 0, objetos[i].oriWidth, objetos[i].oriHeight, objetos[i].left, objetos[i].top, objetos[i].width, objetos[i].height)
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].plano == 3) {
			c.drawImage(objetos[i].img, 0, 0, objetos[i].oriWidth, objetos[i].oriHeight, objetos[i].left, objetos[i].top, objetos[i].width, objetos[i].height)
		}
	}


	c.drawImage(menu, 0, 0, 800, 600, 0, 0, 800, 600)
	c.drawImage(edit.img[edit.pos], 0, 0, 400, 60, edit.left, edit.top, edit.width, edit.height)
	if (localStorage.getItem("Invasores.recorde") != null) {
		c.fillStyle = "red"
		c.font = "30px mag"
		c.textAlign = "center"
		c.fillText("Recorde:", 400, 500)
		c.font = "20px mag"
		c.fillText(localStorage.getItem("Invasores.player"), 400, 530)
		c.fillText(localStorage.getItem("Invasores.recorde") + " pontos", 400, 560)
	}
	c.fillStyle = "red"
	c.font = "30px mag"
	c.textAlign = "center"
	c.fillText(edit.text, 400, edit.top + 40)
	if (((edit.text == "") || (edit.text == " ")) && (!edit.focado)) {
		c.fillStyle = "rgb(86,182,193)"
		c.font = "20px mag"
		c.fillText("Digite seu nome", 400, edit.top + 40)

	}
	c.drawImage(btJogar.img[btJogar.pos], 0, 0, 200, 40, btJogar.left, btJogar.top, btJogar.width, btJogar.height)
	c.drawImage(btSair.img[btSair.pos], 0, 0, 100, 30, btSair.left, btSair.top, btSair.width, btSair.height)

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].plano == 4) {
			c.drawImage(objetos[i].img, 0, 0, objetos[i].oriWidth, objetos[i].oriHeight, objetos[i].left, objetos[i].top, objetos[i].width, objetos[i].height)
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].plano == 5) {
			c.drawImage(objetos[i].img, 0, 0, objetos[i].oriWidth, objetos[i].oriHeight, objetos[i].left, objetos[i].top, objetos[i].width, objetos[i].height)
		}
	}

	if (pausado == undefined)
		requestAnimationFrame(menuIni)


}

function novoJogo() {
	clearInterval(t)
	isGameOver = false

	player.left = 390
	player.top = 500
	player.movendo = false
	player.vidas = 3
	player.tps = 800
	player.tiros = []
	player.nvlArma = 1
	player.vivo = true
	player.ae = ""
	player.municaoMetranca = 0
	player.tirosMetranca = []
	player.velMet = 5.5
	player.metDir = 'dir'
	player.municaoCanhao = 0
	player.tirosCanhao = []
	player.escudo = 0
	player.pos = 1
	player.pontos = 0

	fase = 1
	inimigo = []
	qtdInimigos = 5
	for (var i = 0; i < qtdInimigos; i++) {
		inimigo[i] = new Object({
			img: [],
			left: 5,
			top: 10,
			width: 40,
			height: 60,
			vX: 0,
			vY: 0,
			vivo: true,
			nome: "",
			escudo: false,
			pos: 0
		})

		inimigo[i].img[0] = new Image()
		if (Math.random() * 100 <= 95) {
			inimigo[i].img[0] = iniMini
			inimigo[i].nome = "mini"
		}
		else {
			inimigo[i].img[0] = iniGray
			inimigo[i].nome = "gray"
		}

		if (Math.random() * 100 < 20) {
			inimigo[i].escudo = true
			inimigo[i].pos = Math.floor(1 + Math.random() * 16)
		}

		inimigo[i].left = Math.floor(-100 + Math.random() * 1000)
		inimigo[i].top = -Math.floor((i * 30) + Math.random() * (fase * 200))
		inimigo[i].vY = Math.random() * 2

		while (inimigo[i].vX > -0.1 && (inimigo[i].vX < 0.1))
			inimigo[i].vX = Math.random() * fase / 2 - fase / 4
	}

	tirosInimigos = []
	explosoes = []
	explosoes1 = []
	explosoes2 = []
	explosoes3 = []
	itens = []
	bgLeft = 1100
	bgPos1 = 0
	bgPos2 = -600
	pausado = false
	canvas.style.cursor = "none"
	loop()
}

var passandoFase = false
function passaFase() {
	player.movendo = true
	player.top -= 5
	desenha()
	moveGame()
	detectaColisao()
	if (player.top + player.height < 0) {
		fase++
		inimigo = []
		itens = []
		tirosInimigos = []
		player.tiros = []
		explosoes = []
		explosoes1 = []
		explosoes2 = []
		explosoes3 = []
		objetos = []
		player.tirosMetranca = []
		player.tirosCanhao = []
		wPressed = false
		aPressed = false
		dPressed = false
		sPressed = false
		jPressed = false
		clearInterval(tCanhao)

		bgLeft = 1100
		qtdInimigos = fase * 5
		for (var i = 0; i < qtdInimigos; i++) {
			inimigo[i] = new Object({
				img: [],
				left: 5,
				top: 10,
				width: 40,
				height: 60,
				vX: 0,
				vY: 0.01,
				vivo: true,
				nome: "",
				escudo: false,
				pos: 0
			})

			inimigo[i].img[0] = new Image()
			if (Math.random() * 100 <= 95) {
				inimigo[i].img[0] = iniMini
				inimigo[i].nome = "mini"
			}
			else {
				inimigo[i].img[0] = iniGray
				inimigo[i].nome = "gray"
			}

			if (Math.random() * 100 < 20) {
				inimigo[i].escudo = true
				inimigo[i].pos = Math.floor(1 + Math.random() * 16)
			}


			inimigo[i].left = Math.floor(-100 + Math.random() * 1000)
			inimigo[i].top = -Math.floor((i * 30) + Math.random() * (fase * 200))
			if (fase <= 5)
				inimigo[i].vY = Math.random() * 1
			else if (fase <= 10)
				inimigo[i].vY = Math.random() * 2
			else
				inimigo[i].vY = Math.random() * 3

			while (inimigo[i].vX > -0.25 && (inimigo[i].vX < 0.25)) {
				if (fase <= 8)
					inimigo[i].vX = Math.random() * fase / 2 - fase / 4
				else
					inimigo[i].vX = Math.random() * 5 - 2.5
			}

		}

		player.top = 620
		player.left = 400 - (player.width / 2)

		passandoFase = false
	}
	else
		loop()
}

function pausa() {
	desenha()
	c.fillStyle = "rgba(0,0,0,.7)"
	c.fillRect(0, 0, 800, 600)

	c.textAlign = "center"

	c.strokeStyle = "darkred"
	c.font = "45px mag"
	c.strokeText("Jogo Pausado", 400, 200)

	c.drawImage(btContinuar.img[btContinuar.pos], 0, 0, 200, 40, btContinuar.left, btContinuar.top, btContinuar.width, btContinuar.height)
	c.drawImage(btSair.img[btSair.pos], 0, 0, 100, 30, btSair.left, btSair.top, btSair.width, btSair.height)

	if (pausado) {
		requestAnimationFrame(pausa)
	}
	else if (pausado != undefined)
		canvas.style.cursor = "none"
}

let lastTimesptamp = 0
function loop(timestamp) {
	const delta = timestamp - lastTimesptamp
	if (delta > 1000 / 120) {
		lastTimesptamp = timestamp
		music.oncanplaythrough = music.play()
		if (pausado) {
			canvas.style.cursor = "default"
			requestAnimationFrame(pausa)
		}
		else
			if (isGameOver) {
				canvas.style.cursor = "default"
				requestAnimationFrame(gameOver)
			}
			else
				if (passandoFase) {
					requestAnimationFrame(passaFase)
				}
				else {
					requestAnimationFrame(loop)
					moveGame()
					detectaColisao()
					desenha()
					if (passandoFase)
						passaFase()
				}
	}
	else
		requestAnimationFrame(loop)
}

function desenha() {
	c.clearRect(0, 0, 800, 600)
	c.drawImage(fundo1, bgLeft, 0, 800, 1500, 0, bgPos1, 800, 600)
	c.drawImage(fundo2, bgLeft, 0, 800, 1500, 0, bgPos2, 800, 600)

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].plano == 1) {
			c.drawImage(objetos[i].img, 0, 0, objetos[i].oriWidth, objetos[i].oriHeight, objetos[i].left, objetos[i].top, objetos[i].width, objetos[i].height)
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].plano == 2) {
			c.drawImage(objetos[i].img, 0, 0, objetos[i].oriWidth, objetos[i].oriHeight, objetos[i].left, objetos[i].top, objetos[i].width, objetos[i].height)
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].plano == 3) {
			c.drawImage(objetos[i].img, 0, 0, objetos[i].oriWidth, objetos[i].oriHeight, objetos[i].left, objetos[i].top, objetos[i].width, objetos[i].height)
		}
	}

	for (var i = 0; i < inimigo.length; i++) {
		if (inimigo[i].vivo) {
			c.drawImage(inimigo[i].img[0], 0, 0, 40, 60, inimigo[i].left, inimigo[i].top, inimigo[i].width, inimigo[i].height)
			if (inimigo[i].escudo)
				c.drawImage(escudo[inimigo[i].pos], 0, 0, 50, 70, inimigo[i].left - 5, inimigo[i].top - 5, 50, 70)
		}
	}

	for (var i = 0; i < itens.length; i++) {
		if (itens[i].visible) {
			c.drawImage(itens[i].img, 0, 0, 45, 45, itens[i].left, itens[i].top, 45, 45)

		}
	}

	for (var i = 0; i < tirosInimigos.length; i++) {
		if (tirosInimigos[i].visible) {
			c.drawImage(tirosInimigos[i].img, 0, 0, 10, 26, tirosInimigos[i].left, tirosInimigos[i].top, 4, 9)
		}
	}

	if (player.vivo) {
		if (player.movendo)
			c.drawImage(player.img[('movendo' + player.ae + ' (' + player.nvlArma + ')')], 0, 0, 65, 100, player.left, player.top, 64.5, 100)
		else
			c.drawImage(player.img[('parado' + player.ae + ' (' + player.nvlArma + ')')], 0, 0, 65, 100, player.left, player.top, 64.5, 100)
	}

	for (var i = 0; i < explosoes.length; i++) {
		c.drawImage(explosao, explosoes[i].posX * 100, explosoes[i].posY * 100, 100, 100, explosoes[i].left, explosoes[i].top, 100, 100)
	}

	for (var i = 0; i < explosoes1.length; i++) {
		c.drawImage(explosao1, explosoes1[i].posX * 100, explosoes1[i].posY * 100, 100, 100, explosoes1[i].left, explosoes1[i].top, 100, 100)
	}

	for (var i = 0; i < explosoes2.length; i++) {
		c.drawImage(explosao2, explosoes2[i].posX * 100, explosoes2[i].posY * 100, 100, 100, explosoes2[i].left, explosoes2[i].top, 100, 100)
	}

	for (var i = 0; i < explosoes3.length; i++) {
		c.drawImage(explosao3, explosoes3[i].posX * 100, explosoes3[i].posY * 100, 100, 100, explosoes3[i].left, explosoes3[i].top, explosoes3[i].width, explosoes3[i].height)
	}

	for (var i = 0; i < player.tiros.length; i++) {
		if (player.tiros[i].visible) {
			c.drawImage(player.tiros[i].img, 0, 0, 9, 24, player.tiros[i].left, player.tiros[i].top, player.tiroWidth, player.tiroHeight)
		}
	}

	for (var i = 0; i < player.tirosMetranca.length; i++) {
		if (player.tirosMetranca[i].visible) {
			c.drawImage(player.tirosMetranca[i].img, 0, 0, 12, 12, player.tirosMetranca[i].left - player.tirosMetRaio, player.tirosMetranca[i].top - player.tirosMetRaio, player.tirosMetRaio * 2, player.tirosMetRaio * 2)
		}
	}

	for (var i = 0; i < player.tirosCanhao.length; i++) {
		if (player.tirosCanhao[i].visible) {
			c.drawImage(player.tirosCanhao[i].img, 0, 0, 15, 75, player.tirosCanhao[i].left, player.tirosCanhao[i].top, player.tirosCanhao[i].width, player.tirosCanhao[i].height)
		}
	}

	if (player.vivo) {
		if (player.escudo == 1) {
			c.drawImage(escudo2[player.pos], 0, 0, 50, 70, player.left - 10, player.top - 10, player.width + 20, player.height + 25)
		}

		if (player.escudo == 2) {
			c.drawImage(escudo[player.pos], 0, 0, 50, 70, player.left - 10, player.top - 10, player.width + 20, player.height + 25)
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].plano == 4) {
			c.drawImage(objetos[i].img, 0, 0, objetos[i].oriWidth, objetos[i].oriHeight, objetos[i].left, objetos[i].top, objetos[i].width, objetos[i].height)
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].plano == 5) {
			c.drawImage(objetos[i].img, 0, 0, objetos[i].oriWidth, objetos[i].oriHeight, objetos[i].left, objetos[i].top, objetos[i].width, objetos[i].height)
		}
	}

	c.fillStyle = "red"
	c.font = "20px mag"
	c.textAlign = "left"
	c.fillText(fase + "ª Fase", 20, 22)
	c.fillText(player.pontos + " pontos", 670, 22)

	if (player.municaoMetranca > 0) {
		c.drawImage(guiMetranca, 0, 0, 45, 45, 720, 550, 40, 40)
		c.fillText(player.municaoMetranca, 755, 590)
	}

	if (player.municaoCanhao > 0) {
		c.drawImage(guiCanhao, 0, 0, 45, 45, 710, 550, 40, 40)
		c.fillText(player.municaoCanhao, 755, 590)
	}

	for (var i = 0; i < player.vidas; i++) {
		c.drawImage(player.img['paradoM (4)'], 0, 0, 65, 100, 0, 570 - i * 25, 17, 25)
	}
}

function criaItem(i) {
	var jaTem
	var random = Math.floor(1 + Math.random() * 100)
	if (random <= 10 && (player.vidas < 5)) {
		jaTem = false
		for (var x = 0; x < itens.length; x++) {
			if (itens[x].visible) {
				if (itens[x].nome == "vida")
					jaTem = true
			}
		}
		if (!jaTem) {
			itens.push(new Object({
				nome: "vida",
				img: new Image(),
				top: 0,
				left: 0,
				visible: true
			}))
			itens[itens.length - 1].img = itVida
			itens[itens.length - 1].top = inimigo[i].top + inimigo[i].height + 2
			itens[itens.length - 1].left = inimigo[i].left + (inimigo[i].width / 2) - 30
		}
	}
	else if (random <= 20 && (player.municaoMetranca < 400)) {
		jaTem = false
		for (var x = 0; x < itens.length; x++) {
			if (itens[x].visible) {
				if (itens[x].nome == "metranca")
					jaTem = true
			}
		}
		if (!jaTem) {
			itens.push(new Object({
				nome: "metranca",
				img: new Image(),
				top: 0,
				left: 0,
				visible: true
			}))
			itens[itens.length - 1].img = itMetranca
			itens[itens.length - 1].top = inimigo[i].top + inimigo[i].height + 2
			itens[itens.length - 1].left = inimigo[i].left + (inimigo[i].width / 2) - 30
		}
	}
	else if (random <= 30 && (player.municaoCanhao <= 20)) {
		jaTem = false
		for (var x = 0; x < itens.length; x++) {
			if (itens[x].visible) {
				if (itens[x].nome == "canhao")
					jaTem = true
			}
		}
		if (!jaTem) {
			itens.push(new Object({
				nome: "canhao",
				img: new Image(),
				top: 0,
				left: 0,
				visible: true
			}))
			itens[itens.length - 1].img = itCanhao
			itens[itens.length - 1].top = inimigo[i].top + inimigo[i].height + 2
			itens[itens.length - 1].left = inimigo[i].left + (inimigo[i].width / 2) - 30
		}
	}
	else if (random <= 55 && (player.nvlArma < 4)) {
		jaTem = false
		for (var x = 0; x < itens.length; x++) {
			if (itens[x].visible) {
				if (itens[x].nome == "nvlArma")
					jaTem = true
			}
		}
		if (!jaTem) {
			itens.push(new Object({
				nome: "nvlArma",
				img: new Image(),
				top: 0,
				left: 0,
				visible: true
			}))
			itens[itens.length - 1].img = itNvlArma
			itens[itens.length - 1].top = inimigo[i].top + inimigo[i].height + 2
			itens[itens.length - 1].left = inimigo[i].left + (inimigo[i].width / 2) - 30
		}
	}
	else if (random <= 70 && (player.escudo < 2)) {
		jaTem = false
		for (var x = 0; x < itens.length; x++) {
			if (itens[x].visible) {
				if (itens[x].nome == "escudo")
					jaTem = true
			}
		}
		if (!jaTem) {
			itens.push(new Object({
				nome: "escudo",
				img: new Image(),
				top: 0,
				left: 0,
				visible: true
			}))
			itens[itens.length - 1].img = itEscudo
			itens[itens.length - 1].top = inimigo[i].top + inimigo[i].height + 2
			itens[itens.length - 1].left = inimigo[i].left + (inimigo[i].width / 2) - 30
		}
	}
	else if (player.tps > 550) {
		jaTem = false
		for (var x = 0; x < itens.length; x++) {
			if (itens[x].visible) {
				if (itens[x].nome == "tps")
					jaTem = true
			}
		}
		if (!jaTem) {
			itens.push(new Object({
				nome: "tps",
				img: new Image(),
				top: 0,
				left: 0,
				visible: true
			}))
			itens[itens.length - 1].img = itTps
			itens[itens.length - 1].top = inimigo[i].top + inimigo[i].height + 2
			itens[itens.length - 1].left = inimigo[i].left + (inimigo[i].width / 2) - 30
		}
	}
}

function detectaColisao() {

	for (var i = 0; i < itens.length; i++) {
		if ((itens[i].top + 45 >= player.top) &&
			(itens[i].top <= player.top + player.height) &&
			(itens[i].left + 45 >= player.left) &&
			(itens[i].left <= player.left + player.width) &&
			(itens[i].visible) && (player.vivo)) {
			player.pontos++
			itens[i].visible = false
			if (itens[i].nome == "vida") {
				player.vidas++
			}
			else if (itens[i].nome == "nvlArma") {
				player.nvlArma++
			}
			else if (itens[i].nome == "tps") {
				player.tps -= 50
			}
			else if (itens[i].nome == "metranca") {
				player.municaoCanhao = 0
				clearInterval(tCanhao)
				player.ae = "M"
				player.municaoMetranca += 100
			}
			else if (itens[i].nome == "escudo") {
				player.escudo++
			}
			else if (itens[i].nome == "canhao") {
				player.municaoMetranca = 0
				player.ae = "C"
				player.municaoCanhao += 10
				if (jPressed && (player.municaoCanhao == 10)) {
					canContagem = false
				}
			}
		}
	}

	if (player.left < 0)
		player.left = 0
	if (player.left + player.width > 800)
		player.left = 800 - player.width
	if (player.top + player.height > 600)
		player.top -= player.velocidade
	if (player.top < 0 && (!passandoFase))
		player.top = 0

	for (var i = 0; i < inimigo.length; i++) {

		if (inimigo[i].left <= 0 && (inimigo[i].vX < 0))
			inimigo[i].vX = -inimigo[i].vX

		if (inimigo[i].left + inimigo[i].width >= 800 && (inimigo[i].vX > 0))
			inimigo[i].vX = -inimigo[i].vX

		if ((inimigo[i].top > 600) && (inimigo[i].vivo)) {
			inimigo[i].top = -Math.floor(100 + Math.random() * (fase * 200))
			inimigo[i].left = Math.floor(-100 + Math.random() * 1000)
		}

		for (var p = 0; p < inimigo.length; p++) {
			if (i != p && (inimigo[i].vivo) && (inimigo[p].vivo)) {
				if ((inimigo[i].left <= inimigo[p].left + inimigo[p].width) &&
					(inimigo[i].left + inimigo[i].width > inimigo[p].left + inimigo[p].width) &&
					(inimigo[i].top + inimigo[i].height >= inimigo[p].top) &&
					(inimigo[i].top <= inimigo[p].top + inimigo[p].height)) {
					if ((inimigo[i].vX < 0) && (inimigo[p].vX < 0)) {
						inimigo[i].vX = -inimigo[i].vX
					}
					else if ((inimigo[i].vX > 0) && (inimigo[p].vX > 0)) {
						inimigo[p].vX = -inimigo[p].vX
					}
					else if ((inimigo[i].vX < 0) && (inimigo[p].vX > 0)) {
						inimigo[i].vX = -inimigo[i].vX
						inimigo[p].vX = -inimigo[p].vX
					}
				}
			}
		}

		for (var p = 0; p < player.tiros.length; p++) {
			if ((player.tiros[p].top > 0) && (player.tiros[p].top <= inimigo[i].top + inimigo[i].height) &&
				(player.tiros[p].top + player.tiroHeight > inimigo[i].top) &&
				(player.tiros[p].left >= inimigo[i].left) &&
				(player.tiros[p].left + player.tiroWidth <= inimigo[i].left + inimigo[i].width) &&
				(inimigo[i].vivo) && (player.tiros[p].visible)) {
				if (inimigo[i].escudo) {
					inimigo[i].escudo = false
					player.tiros[p].visible = false
					explosoes2.push(new Object({
						left: 0,
						top: 0,
						posX: 0,
						posY: 0
					}))
					explosoes2[explosoes2.length - 1].left = inimigo[i].left - 30
					explosoes2[explosoes2.length - 1].top = inimigo[i].top - 25
				}
				else {
					player.pontos++
					inimigo[i].vivo = false
					player.tiros[p].visible = false
					explosoes.push(new Object({
						left: 0,
						top: 0,
						posX: 0,
						posY: 0
					}))
					explosoes[explosoes.length - 1].left = inimigo[i].left - 30
					explosoes[explosoes.length - 1].top = inimigo[i].top - 25
					qtdInimigos--
					if (Math.floor(1 + Math.random() * 2) == 1) {
						sndExplode.currentTime = 0
						sndExplode.play()
					}
					else {
						sndExplode2.currentTime = 0
						sndExplode2.play()
					}
					if (qtdInimigos == 0) {
						wPressed = false
						sPressed = false
						jPressed = false
						passandoFase = true
						tirosInimigos = []
						player.tiros = []
					}

					if (inimigo[i].nome == 'gray') {
						criaItem(i)
					}
					else if (inimigo[i].nome == 'mini') {
						if (Math.random() * 100 <= 25) {
							criaItem(i)
						}
					}
				}
			}
		}

		for (var p = 0; p < player.tirosMetranca.length; p++) {

			if ((player.tirosMetranca[p].top > 0) && (player.tirosMetranca[p].top - player.tirosMetRaio <= inimigo[i].top + inimigo[i].height) &&
				(player.tirosMetranca[p].top + player.tirosMetRaio > inimigo[i].top) &&
				(player.tirosMetranca[p].left - player.tirosMetRaio >= inimigo[i].left) &&
				(player.tirosMetranca[p].left + player.tirosMetRaio <= inimigo[i].left + inimigo[i].width) &&
				(inimigo[i].vivo) && (player.tirosMetranca[p].visible)) {
				if (inimigo[i].escudo) {
					inimigo[i].escudo = false
					player.tirosMetranca[p].visible = false
					explosoes2.push(new Object({
						left: 0,
						top: 0,
						posX: 0,
						posY: 0
					}))
					explosoes2[explosoes2.length - 1].left = inimigo[i].left - 30
					explosoes2[explosoes2.length - 1].top = inimigo[i].top - 25
				}
				else {
					player.pontos++
					inimigo[i].vivo = false
					player.tirosMetranca[p].visible = false
					explosoes.push(new Object({
						left: 0,
						top: 0,
						posX: 0,
						posY: 0
					}))
					explosoes[explosoes.length - 1].left = inimigo[i].left - 30
					explosoes[explosoes.length - 1].top = inimigo[i].top - 25
					qtdInimigos--
					if (Math.floor(1 + Math.random() * 2) == 1) {
						sndExplode.currentTime = 0
						sndExplode.play()
					}
					else {
						sndExplode2.currentTime = 0
						sndExplode2.play()
					}
					if (qtdInimigos == 0) {
						wPressed = false
						sPressed = false
						jPressed = false
						passandoFase = true
						tirosInimigos = []
						player.tiros = []
						player.tirosMetranca = []
					}

					if (inimigo[i].nome == 'gray') {
						criaItem(i)

					}
					else if (inimigo[i].nome == 'mini') {
						if (Math.random() * 100 <= 25) {
							criaItem(i)
						}
					}
				}
			}
		}

		for (var p = 0; p < player.tirosCanhao.length; p++) {
			if ((player.tirosCanhao[p].top > 0) && (player.tirosCanhao[p].top <= inimigo[i].top + inimigo[i].height) &&
				(player.tirosCanhao[p].top + player.tirosCanhao[p].height > inimigo[i].top) &&
				(player.tirosCanhao[p].left >= inimigo[i].left) &&
				(player.tirosCanhao[p].left + player.tirosCanhao[p].width <= inimigo[i].left + inimigo[i].width) &&
				(inimigo[i].vivo) && (player.tirosCanhao[p].visible)) {
				player.tirosCanhao[p].visible = false
				explosoes3.push(new Object({
					left: 0,
					top: 0,
					width: 300,
					height: 300,
					posX: 0,
					posY: 0
				}))
				explosoes3[explosoes3.length - 1].left = inimigo[i].left - 150
				explosoes3[explosoes3.length - 1].top = inimigo[i].top - 150
				if (Math.floor(1 + Math.random() * 2) == 1) {
					sndExplode3.currentTime = 0
					sndExplode3.play()
				}
				else {
					sndExplode4.currentTime = 0
					sndExplode4.play()
				}
			}
		}

		if ((player.top <= inimigo[i].top + inimigo[i].height) &&
			(player.top + player.height - 15 >= inimigo[i].top) &&
			(player.left + player.width - 15 >= inimigo[i].left) && (player.left + 15 <= inimigo[i].left + inimigo[i].width) &&
			(inimigo[i].vivo) && (player.vivo)) {
			inimigo[i].vivo = false
			explosoes.push(new Object({
				left: 0,
				top: 0,
				posX: 0,
				posY: 0
			}))
			explosoes[explosoes.length - 1].left = inimigo[i].left - 30
			explosoes[explosoes.length - 1].top = inimigo[i].top - 25
			qtdInimigos--
			if (Math.floor(1 + Math.random() * 2) == 1) {
				sndExplode.currentTime = 0
				sndExplode.play()
			}
			else {
				sndExplode2.currentTime = 0
				sndExplode2.play()
			}
			player.escudo = 0
			player.vivo = false
			explosoes.push(new Object({
				left: 0,
				top: 0,
				posX: 0,
				posY: 0
			}))
			explosoes[explosoes.length - 1].left = player.left
			explosoes[explosoes.length - 1].top = player.top

			player.vidas--
			player.tps = 800
			player.nvlArma = 1
			player.ae = ""
			player.municaoMetranca = 0
			player.municaoCanhao = 0
			clearInterval(tCanhao)
		}

	}

	for (var p = 0; p < explosoes3.length; p++) {
		for (var i = 0; i < inimigo.length; i++) {
			if ((inimigo[i].top + inimigo[i].height > explosoes3[p].top) &&
				(inimigo[i].left + inimigo[i].width > explosoes3[p].left) &&
				(inimigo[i].left < explosoes3[p].left + explosoes3[p].width) &&
				(inimigo[i].top < explosoes3[p].top + explosoes3[p].height) &&
				(inimigo[i].vivo)) {
				player.pontos++
				inimigo[i].vivo = false
				explosoes2.push(new Object({
					left: 0,
					top: 0,
					posX: 0,
					posY: 0
				}))
				explosoes2[explosoes2.length - 1].left = inimigo[i].left - 30
				explosoes2[explosoes2.length - 1].top = inimigo[i].top - 25
				qtdInimigos--
				if (qtdInimigos == 0) {
					wPressed = false
					sPressed = false
					jPressed = false
					passandoFase = true
					tirosInimigos = []
					player.tiros = []
					player.tirosMetranca = []
				}

				if (inimigo[i].nome == 'gray') {
					criaItem(i)

				}
				else if (inimigo[i].nome == 'mini') {
					if (Math.random() * 100 <= 25) {
						criaItem(i)
					}
				}
			}
		}
	}

	for (var i = 0; i < tirosInimigos.length; i++) {
		if (tirosInimigos.length > 0) {
			if ((tirosInimigos[i].top + 9 >= player.top) &&
				(tirosInimigos[i].top < player.top + player.height) &&
				(tirosInimigos[i].left + 2 >= player.left + 10) &&
				(tirosInimigos[i].left <= player.left + player.width - 10) &&
				(tirosInimigos[i].visible) && (!passandoFase) && (player.vivo)) {
				tirosInimigos[i].visible = false
				if (player.escudo > 0) {
					if (player.escudo == 1) {
						explosoes1.push(new Object({
							left: 0,
							top: 0,
							posX: 0,
							posY: 0
						}))
						explosoes1[explosoes1.length - 1].left = player.left - 20
						explosoes1[explosoes1.length - 1].top = player.top - 20
					}
					else {
						explosoes2.push(new Object({
							left: 0,
							top: 0,
							posX: 0,
							posY: 0
						}))
						explosoes2[explosoes2.length - 1].left = player.left - 20
						explosoes2[explosoes2.length - 1].top = player.top - 20
					}
					player.escudo--
				}
				else {
					player.vivo = false
					explosoes.push(new Object({
						left: 0,
						top: 0,
						posX: 0,
						posY: 0
					}))
					explosoes[explosoes.length - 1].left = player.left
					explosoes[explosoes.length - 1].top = player.top

					if (Math.floor(1 + Math.random() * 2) == 1) {
						sndExplode.currentTime = 0
						sndExplode.play()
					}
					else {
						sndExplode2.currentTime = 0
						sndExplode2.play()
					}

					player.vidas--
					player.tps = 800
					player.nvlArma = 1
					player.ae = ""
					player.municaoMetranca = 0
					player.municaoCanhao = 0
					clearInterval(tCanhao)
				}
			}
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].top > 600) {
			for (var p = i; p < objetos.length - 1; p++) {
				objetos[p] = objetos[(p + 1)]
			}
			objetos.pop()
		}
	}

	if (objetos.length < 5) {

		objetos.push(new Object({
			plano: 0,
			colide: false,
			img: new Image(),
			left: 0,
			top: 0,
			oriWidth: 0,
			oriHeight: 0,
			width: 0,
			height: 0
		}))

		var random = Math.floor(1 + Math.random() * 10)
		if (random <= 2) {
			objetos[objetos.length - 1].plano = 1
			var pl = Math.floor(1 + Math.random() * 2)
			if (pl == 1) {
				objetos[objetos.length - 1].img = estrela[0]
				objetos[objetos.length - 1].oriWidth = 30
				objetos[objetos.length - 1].oriHeight = 30
				objetos[objetos.length - 1].width = 30
				objetos[objetos.length - 1].height = 30
			}
			else {
				objetos[objetos.length - 1].img = estrela[1]
				objetos[objetos.length - 1].oriWidth = 35
				objetos[objetos.length - 1].oriHeight = 35
				objetos[objetos.length - 1].width = 35
				objetos[objetos.length - 1].height = 35
			}
		}
		else
			if (random <= 4) {
				objetos[objetos.length - 1].plano = 2
				var pl = Math.floor(1 + Math.random() * 7)
				if (pl == 7) {
					objetos[objetos.length - 1].img = sol
					objetos[objetos.length - 1].oriWidth = 100
					objetos[objetos.length - 1].oriHeight = 100
					objetos[objetos.length - 1].width = 150
					objetos[objetos.length - 1].height = 150
				}
				else {
					objetos[objetos.length - 1].img = planeta[pl]
					switch (pl) {
						case 1:
							objetos[objetos.length - 1].oriWidth = 90
							objetos[objetos.length - 1].oriHeight = 90
							objetos[objetos.length - 1].width = 130
							objetos[objetos.length - 1].height = 130
							break
						case 2:
							objetos[objetos.length - 1].oriWidth = 85
							objetos[objetos.length - 1].oriHeight = 85
							objetos[objetos.length - 1].width = 115
							objetos[objetos.length - 1].height = 115
							break
						case 3:
							objetos[objetos.length - 1].oriWidth = 90
							objetos[objetos.length - 1].oriHeight = 90
							objetos[objetos.length - 1].width = 100
							objetos[objetos.length - 1].height = 100
							break
						case 4:
							objetos[objetos.length - 1].oriWidth = 80
							objetos[objetos.length - 1].oriHeight = 80
							objetos[objetos.length - 1].width = 90
							objetos[objetos.length - 1].height = 90
							break
						case 5:
							objetos[objetos.length - 1].oriWidth = 70
							objetos[objetos.length - 1].oriHeight = 70
							objetos[objetos.length - 1].width = 75
							objetos[objetos.length - 1].height = 75
							break
						case 6:
							objetos[objetos.length - 1].oriWidth = 65
							objetos[objetos.length - 1].oriHeight = 65
							objetos[objetos.length - 1].width = 65
							objetos[objetos.length - 1].height = 65
							break
					}
				}
			}
			else
				if (random <= 6) {
					objetos[objetos.length - 1].plano = 3
					objetos[objetos.length - 1].img = nebulosaFundo[random]
					if (random == 5) {
						objetos[objetos.length - 1].oriWidth = 300
						objetos[objetos.length - 1].oriHeight = 323
						objetos[objetos.length - 1].width = 400
						objetos[objetos.length - 1].height = 423
					}
					else {
						objetos[objetos.length - 1].oriWidth = 260
						objetos[objetos.length - 1].oriHeight = 322
						objetos[objetos.length - 1].width = 360
						objetos[objetos.length - 1].height = 422
					}
				}
				else
					if (random <= 8) {
						objetos[objetos.length - 1].plano = 4
						var pl = Math.floor(1 + Math.random() * 3)
						objetos[objetos.length - 1].img = zzz[pl]
						objetos[objetos.length - 1].colide = true
						if (pl == 1) {
							objetos[objetos.length - 1].oriWidth = 90
							objetos[objetos.length - 1].oriHeight = 92
							objetos[objetos.length - 1].width = 90
							objetos[objetos.length - 1].height = 92
						}
						else if (pl == 2) {
							objetos[objetos.length - 1].oriWidth = 100
							objetos[objetos.length - 1].oriHeight = 154
							objetos[objetos.length - 1].width = 100
							objetos[objetos.length - 1].height = 154
						}
						else {
							objetos[objetos.length - 1].oriWidth = 120
							objetos[objetos.length - 1].oriHeight = 138
							objetos[objetos.length - 1].width = 120
							objetos[objetos.length - 1].height = 138
						}
					}
					else {
						objetos[objetos.length - 1].plano = 5
						var pl = Math.floor(1 + Math.random() * 3)
						objetos[objetos.length - 1].img = nebulosa[pl]
						if (pl == 1) {
							objetos[objetos.length - 1].oriWidth = 300
							objetos[objetos.length - 1].oriHeight = 167
							objetos[objetos.length - 1].width = 400
							objetos[objetos.length - 1].height = 267
						}
						else if (pl == 2) {
							objetos[objetos.length - 1].oriWidth = 320
							objetos[objetos.length - 1].oriHeight = 166
							objetos[objetos.length - 1].width = 420
							objetos[objetos.length - 1].height = 266
						}
						else {
							objetos[objetos.length - 1].oriWidth = 280
							objetos[objetos.length - 1].oriHeight = 199
							objetos[objetos.length - 1].width = 380
							objetos[objetos.length - 1].height = 299
						}
					}
		objetos[objetos.length - 1].left = Math.floor(Math.random() * 800 - objetos[objetos.length - 1].width / 2)
		objetos[objetos.length - 1].top = 0
		while (objetos[objetos.length - 1].top + objetos[objetos.length - 1].height >= 0)
			objetos[objetos.length - 1].top = -Math.floor(150 + Math.random() * 750)
	}
}

function inimigoAtira(ini) {
	tirosInimigos.push(new Object({
		img: new Image(),
		left: 0,
		top: 0,
		visible: true,
		velocidade: 6
	}))
	tirosInimigos[tirosInimigos.length - 1].img = iniTiro
	tirosInimigos[tirosInimigos.length - 1].left = inimigo[ini].left + (inimigo[ini].width / 2 - 1)
	tirosInimigos[tirosInimigos.length - 1].top = inimigo[ini].top + inimigo[ini].height + 10
}

var inimigosNaTela = true
function moveGame() {
	bgPos1 += 1.5
	bgPos2 += 1.5
	if (bgPos1 >= 600)
		bgPos1 = -600
	if (bgPos2 >= 600)
		bgPos2 = -600

	if (player.vivo) {
		for (var i = 0; i < inimigo.length; i++) {
			if (inimigo[i].vivo) {
				inimigo[i].left += inimigo[i].vX
				inimigo[i].top += inimigo[i].vY + (player.velocidade / 1.5)
				if (Math.random() * 10000 < fase)
					inimigoAtira(i)
				if (inimigo[i].escudo) {
					if (inimigo[i].pos < 16)
						inimigo[i].pos++
					else
						inimigo[i].pos = 1
				}
			}
		}
	}
	else {
		inimigosNaTela = false
		for (var i = 0; i < inimigo.length; i++) {
			if ((inimigo[i].vivo) && (inimigo[i].top + inimigo[i].height >= 0) &&
				(inimigo[i].top <= 600)) {
				inimigosNaTela = true
				inimigo[i].left += inimigo[i].vX
				inimigo[i].top += inimigo[i].vY + 5
				if (inimigo[i].escudo) {
					if (inimigo[i].pos < 16)
						inimigo[i].pos++
					else
						inimigo[i].pos = 1
				}
			}
		}

		if (!inimigosNaTela) {
			if (player.vidas > 0) {
				tirosInimigos = []
				player.escudo = 0
				player.municaoCanhao = 0
				player.municaoMetranca = 0
				player.ae = ""
				player.tps = 800
				player.top = 600
				player.left = 400 - (player.width / 2)
				player.vivo = true
				if (qtdInimigos == 0) {
					wPressed = false
					sPressed = false
					jPressed = false
					passandoFase = true
				}
			}
		}
	}

	for (var i = 0; i < itens.length; i++) {
		itens[i].top += 2
	}

	if (player.vivo) {
		if (wPressed) {
			player.top -= player.velocidade / 2
			for (var i = 0; i < objetos.length; i++) {
				objetos[i].top += 1
			}
			for (var i = 0; i < inimigo.length; i++) {
				inimigo[i].top += 1
			}
			for (var i = 0; i < tirosInimigos.length; i++) {
				tirosInimigos[i].top += 1
			}
			for (var i = 0; i < player.tiros.length; i++) {
				player.tiros[i].top += 1
			}
			for (var i = 0; i < player.tirosMetranca.length; i++) {
				player.tirosMetranca[i].top += 1
			}
			for (var i = 0; i < player.tirosCanhao.length; i++) {
				player.tirosCanhao[i].top += 1
			}
			for (var i = 0; i < explosoes.length; i++) {
				explosoes[i].top += 1
			}
			for (var i = 0; i < explosoes1.length; i++) {
				explosoes1[i].top += 1
			}
			for (var i = 0; i < explosoes2.length; i++) {
				explosoes2[i].top += 1
			}
			for (var i = 0; i < explosoes3.length; i++) {
				explosoes3[i].top += 1
			}
			for (var i = 0; i < itens.length; i++) {
				itens[i].top += 1
			}
		}

		if (sPressed) {
			if (player.top + player.height <= 600) {
				player.top += player.velocidade / 1.5
				for (var i = 0; i < objetos.length; i++) {
					objetos[i].top -= 1
				}
				for (var i = 0; i < inimigo.length; i++) {
					inimigo[i].top -= 1
				}
				for (var i = 0; i < tirosInimigos.length; i++) {
					tirosInimigos[i].top -= 1
				}
				for (var i = 0; i < player.tiros.length; i++) {
					player.tiros[i].top -= 1
				}
				for (var i = 0; i < player.tirosMetranca.length; i++) {
					player.tirosMetranca[i].top -= 1
				}
				for (var i = 0; i < player.tirosCanhao.length; i++) {
					player.tirosCanhao[i].top -= 1
				}
				for (var i = 0; i < explosoes.length; i++) {
					explosoes[i].top -= 1
				}
				for (var i = 0; i < explosoes1.length; i++) {
					explosoes1[i].top -= 1
				}
				for (var i = 0; i < explosoes2.length; i++) {
					explosoes2[i].top -= 1
				}
				for (var i = 0; i < explosoes3.length; i++) {
					explosoes3[i].top -= 1
				}
				for (var i = 0; i < itens.length; i++) {
					itens[i].top -= 1
				}
			}
		}

		if (aPressed) {
			player.left -= player.velocidade
			if (bgLeft > 0)
				bgLeft -= 0.5
			for (var i = 0; i < objetos.length; i++) {
				switch (objetos[i].plano) {
					case 1:
						objetos[i].left += 1
						break
					case 2:
						objetos[i].left += 1.5
						break
					case 3:
						objetos[i].left += 1.5
						break
					case 4:
						objetos[i].left += 2
						break
					case 5:
						objetos[i].left += 2.5
						break
				}
			}
			for (var i = 0; i < inimigo.length; i++) {
				inimigo[i].left += 2
			}
			for (var i = 0; i < tirosInimigos.length; i++) {
				tirosInimigos[i].left += 2
			}
			for (var i = 0; i < player.tiros.length; i++) {
				player.tiros[i].left += 2
			}
			for (var i = 0; i < player.tirosMetranca.length; i++) {
				player.tirosMetranca[i].left += 2
			}
			for (var i = 0; i < player.tirosCanhao.length; i++) {
				player.tirosCanhao[i].left += 2
			}
			for (var i = 0; i < explosoes.length; i++) {
				explosoes[i].left += 2
			}
			for (var i = 0; i < explosoes1.length; i++) {
				explosoes1[i].left += 2
			}
			for (var i = 0; i < explosoes2.length; i++) {
				explosoes2[i].left += 2
			}
			for (var i = 0; i < explosoes3.length; i++) {
				explosoes3[i].left += 2
			}
			for (var i = 0; i < itens.length; i++) {
				itens[i].left += 2
			}
		}

		if (dPressed) {
			player.left += player.velocidade
			if (bgLeft < 2199)
				bgLeft += 0.5
			for (var i = 0; i < objetos.length; i++) {
				switch (objetos[i].plano) {
					case 1:
						objetos[i].left -= 1
						break
					case 2:
						objetos[i].left -= 1.5
						break
					case 3:
						objetos[i].left -= 1.5
						break
					case 4:
						objetos[i].left -= 2
						break
					case 5:
						objetos[i].left -= 2.5
						break
				}
			}
			for (var i = 0; i < inimigo.length; i++) {
				inimigo[i].left -= 2
			}
			for (var i = 0; i < tirosInimigos.length; i++) {
				tirosInimigos[i].left -= 2
			}
			for (var i = 0; i < player.tiros.length; i++) {
				player.tiros[i].left -= 2
			}
			for (var i = 0; i < player.tirosMetranca.length; i++) {
				player.tirosMetranca[i].left -= 2
			}
			for (var i = 0; i < player.tirosCanhao.length; i++) {
				player.tirosCanhao[i].left -= 2
			}
			for (var i = 0; i < explosoes.length; i++) {
				explosoes[i].left -= 2
			}
			for (var i = 0; i < explosoes1.length; i++) {
				explosoes1[i].left -= 2
			}
			for (var i = 0; i < explosoes2.length; i++) {
				explosoes2[i].left -= 2
			}
			for (var i = 0; i < explosoes3.length; i++) {
				explosoes3[i].left -= 2
			}
			for (var i = 0; i < itens.length; i++) {
				itens[i].left -= 2
			}
		}

		if (jPressed) {

			if (tiroPronto) {
				tiroPronto = false
				tTiro = setInterval(preparaTiro, player.tps)
				playerTiro()
			}

			if (player.municaoMetranca >= 2) {
				if (tMetPronto) {
					tMetPronto = false
					tMet = setInterval(preparaTiroMet, (player.tps / 4))
					playerMetTiro()
				}
			}

			if (player.municaoCanhao > 0 && (!canContagem)) {
				tCanhao = setInterval(playerCanTiro, 1000)
				canContagem = true
			}
		}
	}

	if (player.escudo > 0) {
		if (player.pos > 1)
			player.pos--
		else
			player.pos = 16
	}

	for (var i = 0; i < player.tiros.length; i++) {
		player.tiros[i].top -= player.tiros[i].velTiro
	}

	for (var i = 0; i < player.tirosCanhao.length; i++) {
		player.tirosCanhao[i].top += player.tirosCanhao[i].dY
		if (player.tirosCanhao[i].initialTop - player.tirosCanhao[i].top >= 50) {
			player.tirosCanhao[i].dY = -4
			player.tirosCanhao[i].img = tiroCan[1]
		}
		if (player.tirosCanhao[i].top <= 150 && (player.tirosCanhao[i].visible)) {
			player.tirosCanhao[i].visible = false
			explosoes3.push(new Object({
				left: 0,
				top: 0,
				width: 300,
				height: 300,
				posX: 0,
				posY: 0
			}))
			explosoes3[explosoes3.length - 1].left = player.tirosCanhao[i].left - 150
			explosoes3[explosoes3.length - 1].top = player.tirosCanhao[i].top - 150
			if (Math.floor(1 + Math.random() * 2) == 1) {
				sndExplode3.currentTime = 0
				sndExplode3.play()
			}
			else {
				sndExplode4.currentTime = 0
				sndExplode4.play()
			}
		}
	}

	for (var i = 0; i < player.tirosMetranca.length; i++) {
		player.tirosMetranca[i].top -= player.velMet
		player.tirosMetranca[i].left += player.tirosMetranca[i].dX
	}

	for (var i = 0; i < tirosInimigos.length; i++) {
		tirosInimigos[i].top += tirosInimigos[i].velocidade + player.velocidade / 1.5
	}

	for (var i = 0; i < explosoes.length; i++) {
		explosoes[i].posX++
		if (explosoes[i].posX == 3) {
			explosoes[i].posX = 0
			explosoes[i].posY++
		}
		if (explosoes[i].posY > 3) {
			explosoes.shift()
			if (player.vivo == false && (player.vidas <= 0)) {
				isGameOver = true
			}
		}
	}

	for (var i = 0; i < explosoes1.length; i++) {
		explosoes1[i].posX++
		if (explosoes1[i].posX == 3) {
			explosoes1[i].posX = 0
			explosoes1[i].posY++
		}
		if (explosoes1[i].posY > 3) {
			explosoes1.shift()
		}
	}

	for (var i = 0; i < explosoes2.length; i++) {
		explosoes2[i].posX++
		if (explosoes2[i].posX == 3) {
			explosoes2[i].posX = 0
			explosoes2[i].posY++
		}
		if (explosoes2[i].posY > 3) {
			explosoes2.shift()
		}
	}

	for (var i = 0; i < explosoes3.length; i++) {
		explosoes3[i].posX++
		if (explosoes3[i].posX == 3) {
			explosoes3[i].posX = 0
			explosoes3[i].posY++
		}
		if (explosoes3[i].posY > 3) {
			explosoes3.shift()
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		switch (objetos[i].plano) {
			case 1:
				objetos[i].top += 3
				break
			case 2:
				objetos[i].top += 3.5
				break
			case 3:
				objetos[i].top += 4
				break
			case 4:
				objetos[i].top += 4.5
				break
			case 5:
				objetos[i].top += 6
				break
		}
	}
}

function playerTiro() {
	var qtdTiros = 1
	if (player.nvlArma == 2)
		qtdTiros = 3
	else if (player.nvlArma == 3)
		qtdTiros = 5
	else if (player.nvlArma == 4)
		qtdTiros = 7
	for (var i = 1; i <= qtdTiros; i++) {
		if (i <= 7) {
			player.tiros.push(new Object({
				img: new Image(),
				left: 0,
				top: 0,
				velTiro: 5,
				visible: true
			}))
		}
		player.tiros[player.tiros.length - 1].img = plTiro
		switch (i) {
			case 1:
				player.tiros[player.tiros.length - 1].left = player.left + (player.width / 2 - player.tiroWidth / 2)
				player.tiros[player.tiros.length - 1].top = player.top - 5
				player.tiros[player.tiros.length - 1].velTiro = 4.1
				break
			case 2:
				player.tiros[player.tiros.length - 1].left = player.left + (player.width / 2 - (2 * player.tiroWidth + 6))
				player.tiros[player.tiros.length - 1].top = player.top - 10
				player.tiros[player.tiros.length - 1].velTiro = 4
				break
			case 3:
				player.tiros[player.tiros.length - 1].left = player.left + (player.width / 2 + (player.tiroWidth + 7))
				player.tiros[player.tiros.length - 1].top = player.top - 10
				player.tiros[player.tiros.length - 1].velTiro = 4
				break
			case 4:
				player.tiros[player.tiros.length - 1].left = player.left + (player.width / 2 - (3 * player.tiroWidth + 9))
				player.tiros[player.tiros.length - 1].top = player.top + 30
				player.tiros[player.tiros.length - 1].velTiro = 4.2
				break
			case 5:
				player.tiros[player.tiros.length - 1].left = player.left + (player.width / 2 + (2 * player.tiroWidth + 9))
				player.tiros[player.tiros.length - 1].top = player.top + 30
				player.tiros[player.tiros.length - 1].velTiro = 4.2
				break
			case 6:
				player.tiros[player.tiros.length - 1].left = player.left + (player.width / 2 - (4 * player.tiroWidth + 12))
				player.tiros[player.tiros.length - 1].top = player.top + 35
				player.tiros[player.tiros.length - 1].velTiro = 4.2
				break
			case 7:
				player.tiros[player.tiros.length - 1].left = player.left + (player.width / 2 + (3 * player.tiroWidth + 12))
				player.tiros[player.tiros.length - 1].top = player.top + 35
				player.tiros[player.tiros.length - 1].velTiro = 4.2
				break
		}
	}
	var randomSom = Math.floor(1 + Math.random() * 2)
	sndTiro[randomSom].currentTime = 0
	sndTiro[randomSom].play()
}

function playerMetTiro() {
	for (var i = 0; i < 2; i++) {
		player.tirosMetranca.push(new Object({
			img: new Image(),
			left: 0,
			top: 0,
			dX: 0,
			visible: true
		}))
		if (player.tirosMetranca.length == 1) {
			player.tirosMetranca[0].dX = -0.5
		}
		else if (player.tirosMetranca[player.tirosMetranca.length - 1].dX <= 1 && (player.metDir == 'dir')) {
			player.tirosMetranca[player.tirosMetranca.length - 1].dX = player.tirosMetranca[player.tirosMetranca.length - 2].dX + 0.1
			if (player.tirosMetranca[player.tirosMetranca.length - 1].dX >= 0.5)
				player.metDir = 'esq'
		}
		else {
			player.tirosMetranca[player.tirosMetranca.length - 1].dX = player.tirosMetranca[player.tirosMetranca.length - 2].dX - 0.1
			if (player.tirosMetranca[player.tirosMetranca.length - 1].dX <= -0.5)
				player.metDir = 'dir'
		}
		player.tirosMetranca[player.tirosMetranca.length - 1].img = tiroMet
		switch (i) {
			case 0:
				player.tirosMetranca[player.tirosMetranca.length - 1].left = player.left + (player.width / 2 - (5 * player.tiroWidth + 15))
				player.tirosMetranca[player.tirosMetranca.length - 1].top = player.top + 30
				break
			case 1:
				player.tirosMetranca[player.tirosMetranca.length - 1].left = player.left + (player.width / 2 + (4 * player.tiroWidth + 18))
				player.tirosMetranca[player.tirosMetranca.length - 1].top = player.top + 30
				break
		}
		player.municaoMetranca -= 1
		if (player.municaoMetranca == 0)
			player.ae = ""
	}
}

function preparaTiro() {
	clearInterval(tTiro)
	tiroPronto = true
}

function preparaTiroMet() {
	clearInterval(tMet)
	tMetPronto = true
}

var canContagem = false
function playerCanTiro() {
	player.tirosCanhao.push(new Object({
		img: new Image(),
		initialTop: 0,
		left: 0,
		top: 0,
		dY: 0,
		visible: true,
		width: 15,
		height: 75
	}))
	player.tirosCanhao[player.tirosCanhao.length - 1].dY = -1.5
	player.tirosCanhao[player.tirosCanhao.length - 1].img = tiroCan[0]
	player.tirosCanhao[player.tirosCanhao.length - 1].left = player.left + (player.width / 2) - 7.5
	player.tirosCanhao[player.tirosCanhao.length - 1].top = player.top + 5
	player.tirosCanhao[player.tirosCanhao.length - 1].initialTop = player.top + 5
	player.municaoCanhao -= 1
	if (player.municaoCanhao == 0) {
		player.ae = ""
		clearInterval(tCanhao)
	}
}

document.onkeydown = kd
function kd(e) {
	if (!exibindoMenu) {
		if (!passandoFase && (pausado != undefined)) {
			switch (e.keyCode) {
				case 80:
				case 27:
					pausado = !pausado
					if (pausado) {
						document.onmousemove = mm
						document.onmousedown = md
						document.onmouseup = mu
					}
					else {
						document.onmousemove = ""
						document.onmousedown = ""
						document.onmouseup = ""
						loop()
					}
					break
				case 37:
				case 65:
					aPressed = true
					player.movendo = true
					break
				case 39:
				case 68:
					dPressed = true
					player.movendo = true
					break
				case 38:
				case 87:
					e.preventDefault()
					wPressed = true
					player.movendo = true
					break
				case 40:
				case 83:
					e.preventDefault()
					sPressed = true
					player.movendo = false
					break
				case 32:
				case 74:
				case 16:
				case 96:
					jPressed = true
					break
			}
		}
	}
	else {
		if (edit.focado) {
			if ((e.keyCode != 16) && (e.keyCode != 20) && (e.keyCode != 13) && (e.keyCode != 17) && (e.keyCode != 18)
				&& (e.keyCode != 37) && (e.keyCode != 38) && (e.keyCode != 39) && (e.keyCode != 40) && (e.keyCode != 46) &&
				(e.keyCode != 33) && (e.keyCode != 34) && (e.keyCode != 35) && (e.keyCode != 36) && (e.keyCode != 45) &&
				(e.keyCode != 91) && (e.keyCode != 92) && (e.keyCode != 93) && (e.keyCode != 144) && (e.keyCode != 27) &&
				(e.keyCode != 9) && (e.keyCode != 219) && (e.keyCode != 222) && (e.key != "F1") && (e.key != "F2") && (e.key != "F3") && (e.key != "F4") &&
				(e.key != "F5") && (e.key != "F6") && (e.key != "F7") && (e.key != "F8") && (e.key != "F9") &&
				(e.key != "F10") && (e.key != "F11") && (e.key != "F12")) {
				if (e.keyCode == 8)
					edit.text = edit.text.substring(0, edit.text.length - 1)
				else {
					if (edit.text.length < 20)
						edit.text += e.key
				}

			}
		}

		if (e.keyCode == 13) {
			btJogar.pos = 2
		}
	}
}

document.onkeyup = ku
function ku(e) {
	if (!exibindoMenu) {
		if (!passandoFase && (pausado != undefined)) {
			switch (e.keyCode) {
				case 37:
				case 65:
					aPressed = false
					if (!wPressed)
						player.movendo = false
					break
				case 39:
				case 68:
					dPressed = false
					if (!wPressed)
						player.movendo = false
					break
				case 38:
				case 87:
					wPressed = false
					if (!aPressed && (!dPressed))
						player.movendo = false
					break
				case 40:
				case 83:
					if (aPressed || (dPressed))
						player.movendo = true
					sPressed = false
					break
				case 32:
				case 74:
				case 16:
				case 96:
					jPressed = false
					clearInterval(tCanhao)
					canContagem = false
					break
			}
		}
	}
	else {
		if (e.keyCode == 13) {
			btJogar.pos = 1
			if (edit.text != "" && (edit.text != " ")) {
				document.onmousedown = ""
				document.onmouseup = ""
				document.onmousemove = ""
				exibindoMenu = false
				novoJogo()
				player.nome = edit.text
			}
		}
	}
}

var opacidade = 0.0
function gameOver() {
	c.fillStyle = "rgba(0,0,0," + opacidade + ")"
	c.fillRect(0, 0, 800, 600)
	c.strokeStyle = "red"
	c.font = "45px mag"
	c.textAlign = "center"
	c.strokeText("Fim de Jogo", 400, 200)
	opacidade += 0.020
	if (opacidade >= 1) {
		if (player.pontos > parseInt(localStorage.getItem("Invasores.recorde")) || (localStorage.getItem("Invasores.recorde") == null)) {
			localStorage.setItem("Invasores.player", player.nome)
			localStorage.setItem("Invasores.recorde", player.pontos)
			c.fillStyle = "darkred"
			c.font = "30px mag"
			c.fillText("Novo Recorde!", 400, 400)
			c.fillText(player.pontos + " pontos!", 400, 450)
		}
		else {
			c.fillStyle = "darkred"
			c.font = "30px mag"
			c.fillText(player.pontos + " pontos", 400, 400)
		}
		opacidade = 0.0
		exibindoMenu = true
		pausado = undefined
		document.onmousemove = mm
		document.onmousedown = md
		document.onmouseup = mu
		setTimeout(menuIni, 5000)
	}
	else
		loop()
}

window.onblur = cblur
function cblur() {
	if (pausado == false) {
		pausado = true
		document.onmousemove = mm
		document.onmousedown = md
		document.onmouseup = mu
	}
}

document.oncontextmenu = function () {
	return false
}

window.onload = function () {
	load()
}
