function menuIni() {

	c.drawImage(imgs.fundo, 0, 0, 800, 600, 0, 0, 800, 600)

	c.fillStyle = "rgba(0,0,0," + opacidadeFundo + ")"
	c.fillRect(0, 0, 800, 600)
	if (opacidadeFundo > .4)
		opacidadeFundo -= 0.02

	c.drawImage(imgs.imgLoading, 0, 0, 800, 600, 0, 0, imgWidth, imgHeight)
	if (imgWidth > 400) {
		imgWidth -= 5
		imgHeight -= 3.5
	}
	else {
		if (localStorage.getItem('QuebraTudo-recorde') != null) {
			c.fillStyle = "gold"
			c.font = "25px Arial"
			c.fillText("Recorde", 680.5, 30)
			c.fillText(localStorage.getItem('QuebraTudo-nome'), 680, 60)
			c.fillText(localStorage.getItem('QuebraTudo-recorde') + " pontos", 680, 90)
		}
		c.drawImage(edit.img[edit.pos], 0, 0, 400, 60, edit.left, edit.top, 400, 60)
		c.fillStyle = "lime"
		c.font = "40px Arial"
		c.fillText(edit.text, 400, edit.top + 45)
		if (((edit.text == "") || (edit.text == " ")) && (!edit.focado)) {
			c.fillStyle = "rgb(0,90,141)"
			c.font = "35px Arial"
			c.fillText("Digite seu nome", 400, edit.top + 45)

		}
		c.drawImage(btJogar.img[btJogar.pos], 0, 0, 200, 40, btJogar.left, btJogar.top, btJogar.width, btJogar.height)
		c.drawImage(btSair.img[btSair.pos], 0, 0, 200, 40, btSair.left, btSair.top, btSair.width, btSair.height)
	}
	if (jogoRodando == undefined)
		requestAnimationFrame(menuIni)

	// snds.music.play()
}

function novoJogo() {
	jogoRodando = false
	canvas.style.cursor = "none"
	c.fillStyle = "black"
	c.fillRect(0, 0, 800, 600)

	player.vidas = 3
	player.pontos = 0
	player.left = 0
	player.width = 80
	player.moving = ""
	player.nome = edit.text

	bola.tamanho = 10
	bola.dirY = 0
	bola.dirX = 0
	bola.left = 400
	bola.top = 570
	bola.movendo = false
	bola.velocidade = 6
	gameOverFade = 0.0
	fase = 1
	itens = []
	blocos = []
	blocosQtd = fase * 12
	for (var i = 0; i < blocosQtd; i++) {
		blocos[i] = new Object({
			img: [],
			left: 31,
			top: 31,
			width: 80,
			heigth: 20,
			visible: true
		})
	}

	blocos[0].img[0] = new Image()
	if (Math.floor(Math.random() * 2) == 0)
		blocos[0].img[0] = imgs.bloco1
	else
		blocos[0].img[0] = imgs.bloco2

	for (var i = 1; i < blocos.length; i++) {
		if (Math.floor(1 + Math.random() * 2) == 1)
			blocos[i].left = blocos[(i - 1)].left + blocos[(i - 1)].width + 2
		else
			blocos[i].left = blocos[(i - 1)].left + (blocos[(i - 1)].width * 2) + 4
		blocos[i].top = blocos[(i - 1)].top
		if (blocos[i].left + blocos[i].width > 800) {
			if (Math.floor(1 + Math.random() * 2) == 1)
				blocos[i].left = 31
			else
				blocos[i].left = 113
			blocos[i].top += 22
		}
		blocos[i].img[0] = new Image()
		if (Math.floor(Math.random() * 2) == 0)
			blocos[i].img[0] = imgs.bloco1
		else
			blocos[i].img[0] = imgs.bloco2
	}

	player.left = 360
	player.width = 80
	bola.dirX = 0
	while ((bola.dirX > -1) && (bola.dirX < 1))
		bola.dirX = Math.random() * bola.velocidade - (bola.velocidade / 2)
	if (bola.dirX > 0)
		bola.dirY = -(bola.velocidade - bola.dirX)
	else
		bola.dirY = -(bola.velocidade - (bola.dirX * -1))
	jogoRodando = true
	loop()
}

function pause() {
	desenha()
	c.fillStyle = "rgba(0,0,0,.5)"
	c.fillRect(0, 0, 800, 600)
	c.fillStyle = "gold"
	c.font = "50px Arial"
	c.fillText("Jogo Pausado", 400, 150)
	c.drawImage(btContinuar.img[btContinuar.pos], 0, 0, 200, 40, btContinuar.left, btContinuar.top, btContinuar.width, btContinuar.height)
	c.drawImage(btSair.img[btSair.pos], 0, 0, 200, 40, btSair.left, btSair.top, btSair.width, btSair.height)
	canvas.style.cursor = "default"

	if (!jogoRodando)
		requestAnimationFrame(pause)
	else
		canvas.style.cursor = "none"

}
var frame = 0
function loop() {
	if (jogoRodando && (player.vidas > 0))
		requestAnimationFrame(loop)
	else if (player.vidas > 0)
		requestAnimationFrame(pause)
	else
		requestAnimationFrame(gameOver)
	detectaColisoes()
	desenha()
	moveGame()
	// snds.music.play()
}

function desenha() {
	c.drawImage(imgs.fundo, 0, 0, 800, 600, 0, 0, 800, 600)

	for (var i = 0; i < blocos.length; i++) {
		if (blocos[i].visible) {
			c.fillStyle = "rgba(0,0,0,.5)"
			c.fillRect(blocos[i].left + 5, blocos[i].top + 5, blocos[i].width, blocos[i].heigth)
			c.drawImage(blocos[i].img[0], 0, 0, 80, 20, blocos[i].left, blocos[i].top, blocos[i].width, blocos[i].heigth)
		}
	}

	for (var i = 0; i < itens.length; i++) {
		if (itens[i].visible)
			c.drawImage(itens[i].img, 0, 0, 30, 30, itens[i].left, itens[i].top, 25, 25)
	}

	c.fillStyle = "rgba(0,0,0,.5)"
	c.beginPath()
	c.arc(bola.left + 6, bola.top + 6, bola.tamanho, Math.PI * 2, 0, true)
	c.closePath()
	c.fill()

	c.drawImage(bola.img[0], 0, 0, 84, 84, bola.left - bola.tamanho, bola.top - bola.tamanho, bola.tamanho * 2, bola.tamanho * 2)

	c.fillStyle = "rgba(0,0,0,.5)"
	c.fillRect(player.left + 5, 585, player.width, 20)

	c.drawImage(player.img[0], 0, 0, 256, 128, player.left, 580, player.width, 20)

	c.fillStyle = "gold"
	c.font = "20px Arial"

	c.fillText(fase + "ª fase", 400, 20)

	c.fillText(player.pontos, 750, 20)
	for (var i = 0; i < player.vidas; i++) {
		c.drawImage(imgs.coracao, 0, 0, 30, 30, i * 21, 0, 20, 20)
	}

}

function detectaColisoes() {
	var aux = 0

	for (var i = 0; i < itens.length; i++) {
		if ((itens[i].top + 30 >= 580) &&
			(itens[i].left + 30 >= player.left) &&
			(itens[i].left <= player.left + player.width) &&
			(itens[i].visible)) {
			itens[i].visible = false
			if (itens[i].nome == "vida") {
				player.vidas++
				player.pontos += 5
				snds.sndVida.play()
			}
			else if (itens[i].nome == "ampPlayer") {
				player.width += 10
				player.pontos++
				snds.sndPowerUp.currentTime = 0
				snds.sndPowerUp.play()
			}
			else if (itens[i].nome == "redPlayer") {
				player.width -= 10
				player.pontos += 2
				snds.sndPowerUp.currentTime = 0
				snds.sndPowerUp.play()
			}
			else if (itens[i].nome == "ampBola") {
				bola.tamanho += 2
				player.pontos++
				snds.sndPowerUp.currentTime = 0
				snds.sndPowerUp.play()
			}
			else if (itens[i].nome == "redBola") {
				bola.tamanho -= 2
				player.pontos += 2
				snds.sndPowerUp.currentTime = 0
				snds.sndPowerUp.play()
			}
		}
	}

	if (bola.left - bola.tamanho <= 0) {
		bola.left = bola.tamanho
		bola.dirX = -bola.dirX
		snds.sndToc.currentTime = 0
		snds.sndToc.play()
	}

	if (bola.left + bola.tamanho >= 800) {
		bola.left = 800 - bola.tamanho
		bola.dirX = -bola.dirX
		snds.sndToc.currentTime = 0
		snds.sndToc.play()
	}

	if (bola.top - bola.tamanho <= 0) {
		bola.top = bola.tamanho
		bola.dirY = -bola.dirY
		snds.sndToc.currentTime = 0
		snds.sndToc.play()
	}

	if ((bola.top + bola.tamanho >= 580) && (bola.left + bola.tamanho >= player.left) && (bola.left - bola.tamanho <= player.left + player.width)) {
		if (bola.movendo) {
			bola.top = 580 - bola.tamanho
			if (bola.dirY > 0)
				bola.dirY = -bola.dirY
			if (player.moving == "left") {
				bola.dirX--
				if (bola.dirX > 0)
					bola.dirY = -(bola.velocidade - bola.dirX)
				else
					bola.dirY = -(bola.velocidade - (bola.dirX * -1))
			}
			else if (player.moving == "right") {
				bola.dirX++
				if (bola.dirX > 0)
					bola.dirY = -(bola.velocidade - bola.dirX)
				else
					bola.dirY = -(bola.velocidade - (bola.dirX * -1))
			}
			snds.sndToc.currentTime = 0
			snds.sndToc.play()
		}
	}

	if (bola.top + bola.tamanho >= 600) {
		player.vidas--
		player.width = 80
		player.left = 400 - (player.width / 2)
		bola.tamanho = 10
		bola.top = 580 - bola.tamanho
		bola.left = 400
		bola.movendo = false

		bola.dirX = 0
		while ((bola.dirX > -1) && (bola.dirX < 1))
			bola.dirX = Math.random() * bola.velocidade - (bola.velocidade / 2)
		if (bola.dirX > 0)
			bola.dirY = -(bola.velocidade - bola.dirX)
		else
			bola.dirY = -(bola.velocidade - (bola.dirX * -1))
	}

	for (var i = 0; i < blocos.length; i++) {
		var colidiu = false

		if ((bola.top - bola.tamanho <= blocos[i].top + blocos[i].heigth) &&
			(bola.left + (bola.tamanho / 2) >= blocos[i].left) && (bola.left - (bola.tamanho / 2) <= blocos[i].left + blocos[i].width) &&
			(bola.top + bola.tamanho >= blocos[i].top + blocos[i].heigth) && (blocos[i].visible)) {
			blocosQtd--
			bola.top = blocos[i].top + blocos[i].heigth + bola.tamanho
			if (bola.dirY < 0)
				bola.dirY = -bola.dirY
			if (bola.dirX < 0)
				aux = -bola.dirX
			else
				aux = bola.dirX
			if (aux > bola.dirY) {
				bola.dirY++
				if (bola.dirX < 0)
					bola.dirX++
				else
					bola.dirX--
			}
			blocos[i].visible = false
			colidiu = true
		}

		if ((bola.left + bola.tamanho >= blocos[i].left) &&
			(bola.left - bola.tamanho <= blocos[i].left) && (bola.top + (bola.tamanho / 2) >= blocos[i].top) &&
			(bola.top - (bola.tamanho / 2) <= blocos[i].top + blocos[i].heigth) && (blocos[i].visible)) {
			blocosQtd--
			bola.left = blocos[i].left - bola.tamanho
			if (bola.dirX > 0)
				bola.dirX = -bola.dirX
			if (bola.dirY > 0)
				aux = -bola.dirY
			else
				aux = bola.dirY
			if (aux < bola.dirX) {
				bola.dirX--
				if (bola.dirY < 0)
					bola.dirY++
				else
					bola.dirY--
			}
			blocos[i].visible = false
			colidiu = true
		}

		if ((bola.left - bola.tamanho <= blocos[i].left + blocos[i].width) &&
			(bola.left + bola.tamanho >= blocos[i].left + blocos[i].width) && (bola.top + (bola.tamanho / 2) >= blocos[i].top) &&
			(bola.top - (bola.tamanho / 2) <= blocos[i].top + blocos[i].heigth) && (blocos[i].visible)) {
			blocosQtd--
			bola.left = blocos[i].left + blocos[i].width + bola.tamanho
			if (bola.dirX < 0)
				bola.dirX = -bola.dirX
			if (bola.dirY < 0)
				aux = -bola.dirY
			else
				aux = bola.dirY
			if (aux > bola.dirX) {
				bola.dirX++
				if (bola.dirY < 0)
					bola.dirY++
				else
					bola.dirY--
			}
			blocos[i].visible = false
			colidiu = true
		}

		if ((bola.top + bola.tamanho >= blocos[i].top) &&
			(bola.left + (bola.tamanho / 2) >= blocos[i].left) && (bola.left - (bola.tamanho / 2) <= blocos[i].left + blocos[i].width) &&
			(bola.top - bola.tamanho <= blocos[i].top) && (blocos[i].visible)) {
			blocosQtd--
			bola.top = blocos[i].top - bola.tamanho
			if (bola.dirY > 0)
				bola.dirY = -bola.dirY
			if (bola.dirX > 0)
				aux = -bola.dirX
			else
				aux = bola.dirX
			if (aux < bola.dirY) {
				bola.dirY--
				if (bola.dirX < 0)
					bola.dirX++
				else
					bola.dirX--
			}
			blocos[i].visible = false
			colidiu = true
		}

		if (colidiu) {
			snds.sndCroc.currentTime = 0
			snds.sndCroc.play()
			player.pontos++
			if ((1 + Math.random() * 100 <= 10)) {
				if (1 + Math.random() * 100 <= 30) {
					if (player.vidas < 5) {
						itens.push(new Object({
							nome: "vida",
							img: new Image(),
							top: 0,
							left: 0,
							visible: true
						}))
						itens[itens.length - 1].img = imgs.coracao
						itens[itens.length - 1].top = blocos[i].top + 20
						itens[itens.length - 1].left = blocos[i].left + (blocos[i].width / 2) - 15
					}
				}
				else if (player.width < 200) {
					itens.push(new Object({
						nome: "ampPlayer",
						img: new Image(),
						top: 0,
						left: 0,
						visible: true
					}))
					itens[itens.length - 1].img = imgs.ampPlayer
					itens[itens.length - 1].top = blocos[i].top + 20
					itens[itens.length - 1].left = blocos[i].left + (blocos[i].width / 2) - 15
				}
			}
			else
				if (1 + Math.random() * 100 <= 20) {
					if (1 + Math.random() * 100 <= 50) {
						if (bola.tamanho <= 24) {
							itens.push(new Object({
								nome: "ampBola",
								img: new Image(),
								top: 0,
								left: 0,
								visible: true
							}))
							itens[itens.length - 1].img = imgs.ampBola
							itens[itens.length - 1].top = blocos[i].top + 20
							itens[itens.length - 1].left = blocos[i].left + (blocos[i].width / 2) - 15
						}
					}
					else {
						if (bola.tamanho >= 8) {
							itens.push(new Object({
								nome: "redBola",
								img: new Image(),
								top: 0,
								left: 0,
								visible: true
							}))
							itens[itens.length - 1].img = imgs.redBola
							itens[itens.length - 1].top = blocos[i].top + 20
							itens[itens.length - 1].left = blocos[i].left + (blocos[i].width / 2) - 15
						}
					}
				}
				else
					if (1 + Math.random() * 100 <= 30) {
						if (player.width >= 90) {
							itens.push(new Object({
								nome: "redPlayer",
								img: new Image(),
								top: 0,
								left: 0,
								visible: true
							}))
							itens[itens.length - 1].img = imgs.redPlayer
							itens[itens.length - 1].top = blocos[i].top + 20
							itens[itens.length - 1].left = blocos[i].left + (blocos[i].width / 2) - 15
						}
					}
		}

		if (blocosQtd == 0) {
			fase++

			c.fillStyle = "black"
			c.fillRect(0, 0, 800, 600)

			itens = []
			blocos = []
			if (fase <= 6)
				blocosQtd = fase * 12
			else
				blocosQtd = 72
			for (var i = 0; i < blocosQtd; i++) {
				blocos[i] = new Object({
					img: [],
					left: 31,
					top: 31,
					width: 80,
					heigth: 20,
					visible: true
				})
			}

			blocos[0].img[0] = new Image()
			if (Math.floor(Math.random() * 2) == 0)
				blocos[0].img[0] = imgs.bloco1
			else
				blocos[0].img[0] = imgs.bloco2

			for (var i = 1; i < blocos.length; i++) {
				if (Math.floor(1 + Math.random() * 2) == 1)
					blocos[i].left = blocos[(i - 1)].left + blocos[(i - 1)].width + 2
				else
					blocos[i].left = blocos[(i - 1)].left + (blocos[(i - 1)].width * 2) + 4
				blocos[i].top = blocos[(i - 1)].top
				if (blocos[i].left + blocos[i].width > 800) {
					if (Math.floor(1 + Math.random() * 2) == 1)
						blocos[i].left = 31
					else
						blocos[i].left = 113
					blocos[i].top += 22
				}
				blocos[i].img[0] = new Image()
				if (Math.floor(Math.random() * 2) == 0)
					blocos[i].img[0] = imgs.bloco1
				else
					blocos[i].img[0] = imgs.bloco2

				c.fillStyle = blocos[i].cor
				c.fillRect(blocos[i].left, blocos[i].top, blocos[i].width, blocos[i].heigth)
			}

			player.left = 400 - (player.width / 2)
			bola.top = 580 - bola.tamanho
			bola.left = 400
			bola.movendo = false
			if (bola.velocidade < 20)
				bola.velocidade += 1
			bola.dirX = 0
			while (bola.dirX == 0)
				bola.dirX = (1 + Math.random() * (bola.velocidade - 1)) - (bola.velocidade / 2)
			if (bola.dirX > 0)
				bola.dirY = -(bola.velocidade - bola.dirX)
			else
				bola.dirY = -(bola.velocidade - (bola.dirX * -1))

		}
	}
}

function moveGame() {
	if (bola.movendo) {
		bola.left += bola.dirX
		bola.top += bola.dirY
	}

	for (var i = 0; i < itens.length; i++) {
		if (itens[i].visible) {
			itens[i].top += bola.velocidade / 3
			if (itens[i].top >= 600)
				itens[i].visible = false
		}
	}

	if (ia) {
		player.left = bola.left - player.width / 2
	}
}

function gameOver() {
	desenha()
	c.fillStyle = "rgba(0,0,0,.5)"
	c.fillRect(0, 0, 800, 600)
	c.fillStyle = "darkred"
	c.font = "50px Arial"
	c.fillText("Fim de Jogo", 400, 150)
	if (localStorage.getItem('QuebraTudo-recorde') != null) {
		if (player.pontos > parseFloat(localStorage.getItem('QuebraTudo-recorde'))) {
			c.fillStyle = "gold"
			c.font = "35px Arial"
			c.fillText("Novo Recorde!", 400, 220)
			c.fillText(player.pontos + " pontos!", 400, 265)
			localStorage.setItem('QuebraTudo-nome', player.nome)
			localStorage.setItem('QuebraTudo-recorde', player.pontos)
		}
		else {
			c.fillStyle = "gold"
			c.font = "35px Arial"
			c.fillText(player.pontos + " pontos", 400, 220)
		}
	}
	else {
		c.fillStyle = "gold"
		c.font = "35px Arial"
		c.fillText("Novo Recorde!", 400, 220)
		c.fillText(player.pontos + " pontos!", 400, 265)
		localStorage.setItem('QuebraTudo-nome', player.nome)
		localStorage.setItem('QuebraTudo-recorde', player.pontos)
	}
	jogoRodando = undefined
	canvas.style.cursor = "default"
	setTimeout(function () {
		exibindoMenu = true

		document.onmousemove = mouseMove
		document.onmousedown = md
		document.onmouseup = mu
		menuIni()
	}, 2500)
}

function kd(e) {
	switch (e.keyCode) {
		case 38:
		case 40:
			e.preventDefault()
			break
	}
	if (e.keyCode == 27) {
		if (jogoRodando) {
			jogoRodando = false
			document.onmousemove = mouseMove
			document.onmousedown = md
			document.onmouseup = mu
		}
		else if (jogoRodando == false) {
			jogoRodando = true
			loop()
			canvas.style.cursor = "none"
		}
	}

	if (!jogoRodando && (!exibindoMenu)) {
		if (ia == false) {
			switch (e.keyCode) {
				case 37:
					if (player.left > 0) {
						player.left -= player.velocidade
						if (player.left < 0)
							player.left = 0
					}
					if (!bola.movendo)
						bola.left = player.left + (player.width / 2)
					break
				case 39:
					if (player.left + player.width < 800) {
						player.left += player.velocidade
						if (player.left + player.width > 800)
							player.left = 800 - player.width
					}
					if (!bola.movendo)
						bola.left = player.left + (player.width / 2)
					break
			}
		}
	}
	else if (exibindoMenu) {
		if (edit.focado) {
			if ((e.keyCode != 16) && (e.keyCode != 20) && (e.keyCode != 13) && (e.keyCode != 17) && (e.keyCode != 18)
				&& (e.keyCode != 37) && (e.keyCode != 38) && (e.keyCode != 39) && (e.keyCode != 40) && (e.keyCode != 46) &&
				(e.keyCode != 33) && (e.keyCode != 34) && (e.keyCode != 35) && (e.keyCode != 36) && (e.keyCode != 45) &&
				(e.keyCode != 91) && (e.keyCode != 92) && (e.keyCode != 93) && (e.keyCode != 144) && (e.keyCode != 27) &&
				(e.keyCode != 9) && (e.keyCode != 219) && (e.keyCode != 222) && (e.key != "F1") && (e.key != "F2") &&
				(e.key != "F3") && (e.key != "F4") && (e.key != "F5") && (e.key != "F6") && (e.key != "F7") &&
				(e.key != "F8") && (e.key != "F9") && (e.key != "F10") && (e.key != "F11") && (e.key != "F12")) {
				if (e.keyCode == 8)
					edit.text = edit.text.substring(0, edit.text.length - 1)
				else {
					if (edit.text.length < 20)
						edit.text += e.key
				}

			}
		}

		if (e.keyCode == 13) {
			btJogar.pos = 1
		}
	}
}

document.onkeyup = ku
function ku(e) {
	if (exibindoMenu) {
		if (e.keyCode == 13) {
			if (edit.text != "" && (edit.text != " ")) {
				exibindoMenu = false
				novoJogo()
			}
			btJogar.pos = 0
		}
	}
}

function mouseMove(e) {
	var aux = ""
	if (ia == false && (jogoRodando)) {
		aux = player.left
		player.left = e.clientX * (800 / document.body.offsetWidth) - (player.width / 2)
		player.moving = "none"
		if (aux - 2 > player.left)
			player.moving = "left"
		else if (aux + 2 < player.left)
			player.moving = "right"
		else
			player.moving = "none"
		if (player.left < 0) {
			player.left = 0
			player.moving = "none"
		}
		if (player.left + player.width > 800) {
			player.left = 800 - player.width
			player.moving = "none"
		}
		if (!bola.movendo)
			bola.left = player.left + (player.width / 2)
	}
	else {
		var mX = e.clientX * (800 / window.innerWidth)
		var mY = e.clientY * (600 / window.innerHeight)

		if ((mX >= btJogar.left) && (mX <= btJogar.left + btJogar.width) &&
			(mY >= btJogar.top) && (mY <= btJogar.top + btJogar.height)) {
			btJogar.pos = 1
		}
		else {
			btJogar.pos = 0
		}

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
}

function md(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)
	if (exibindoMenu) {

		if ((mX >= edit.left) && (mX <= edit.left + edit.width) &&
			(mY >= edit.top) && (mY <= edit.top + edit.height)) {
			edit.focado = true
		}
		else {
			edit.focado = false
			edit.pos = 0
		}

		if ((mX >= btJogar.left) && (mX <= btJogar.left + btJogar.width) &&
			(mY >= btJogar.top) && (mY <= btJogar.top + btJogar.height)) {
			btJogar.pos = 0
		}

		if ((mX >= btContinuar.left) && (mX <= btContinuar.left + btContinuar.width) &&
			(mY >= btContinuar.top) && (mY <= btContinuar.top + btContinuar.height)) {
			btContinuar.pos = 0
		}

		if ((mX >= btSair.left) && (mX <= btSair.left + btSair.width) &&
			(mY >= btSair.top) && (mY <= btSair.top + btSair.height)) {
			btSair.pos = 0
		}
	}
	else if (!jogoRodando) {
		if ((mX >= btContinuar.left) && (mX <= btContinuar.left + btContinuar.width) &&
			(mY >= btContinuar.top) && (mY <= btContinuar.top + btContinuar.height)) {
			btContinuar.pos = 0
		}

		if ((mX >= btSair.left) && (mX <= btSair.left + btSair.width) &&
			(mY >= btSair.top) && (mY <= btSair.top + btSair.height)) {
			btSair.pos = 0
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
				exibindoMenu = false
				novoJogo()
			}
		}
		else {
			btJogar.pos = 0
		}

		if ((mX >= btSair.left) && (mX <= btSair.left + btSair.width) &&
			(mY >= btSair.top) && (mY <= btSair.top + btSair.height)) {
			btSair.pos = 1
			document.onmousedown = ""
			document.onmouseup = ""
			document.onmousemove = ""
			location.href = '../index.html'
		}
		else {
			btSair.pos = 0
		}
	}
	else if (jogoRodando && (!bola.movendo)) {
		bola.movendo = true
	}
	else if (!jogoRodando) {
		if ((mX >= btContinuar.left) && (mX <= btContinuar.left + btContinuar.width) &&
			(mY >= btContinuar.top) && (mY <= btContinuar.top + btContinuar.height)) {
			btContinuar.pos = 1
			jogoRodando = true
			loop()
			canvas.style.cursor = "none"
		}
		else
			btContinuar.pos = 0

		if ((mX >= btSair.left) && (mX <= btSair.left + btSair.width) &&
			(mY >= btSair.top) && (mY <= btSair.top + btSair.height)) {
			btSair.pos = 1
			jogoRodando = true
			player.vidas = 0
			loop()
		}
		else {
			btSair.pos = 0
		}
	}
}

function abertura1() {
	snds.sndLogo.play()
	if (snds.sndLogo.currentTime > 0) {
		c.fillStyle = "black"
		c.fillRect(0, 0, 800, 600)
		document.getElementById("loadGif").style.display = "none"
	}
	if (snds.sndLogo.currentTime >= snds.sndLogo.duration - 2.15) {
		c.drawImage(imgs.logo, 0, 0, 920, 720, 0, 0, 800, 600)
		setTimeout(abertura2, 3000)
	}
	else
		requestAnimationFrame(abertura1)
}

function abertura2() {
	c.fillStyle = "rgb(0,0,0)"
	c.fillRect(0, 0, 800, 600)
	c.drawImage(imgs.imgLoading, 0, 0, 800, 600, 0, 0, 800, 600)
	setTimeout(menuIni, 2500)
	exibindoMenu = true

	document.onmousemove = mouseMove
	document.onmousedown = md
	document.onmouseup = mu
}

window.onblur = function () {
	if (jogoRodando) {
		jogoRodando = false
		document.onmousemove = mouseMove
		document.onmousedown = md
		document.onmouseup = mu
	}
}

document.onkeydown = kd
window.onload = function () {
	load()
}