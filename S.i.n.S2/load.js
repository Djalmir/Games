var canvas = document.getElementById('tela')
var c = canvas.getContext('2d')
c.textAlign = "center"
var cWidth, cHeight
var canvasGUI = document.getElementById('gui')
var cGUI = canvasGUI.getContext('2d')
cGUI.textAlign = "center"
var logo
var sndLogo
var titulo
var bg
var mouseCursor
var limiteCorpo = 500
var ranking = []
var gradient
var meuSinS
var player
var inimigo = []
var olhos = []
var iris
var food = []
var isGameOver = false
var aberturaFill = 0
var aberturaOpacidade = 1
var fade = 0
var aberturaAtual = 1
var exibindoMenu = false
var exibindoMenuCriacao = false
var fundoMenu
var select
var setaEsq
var setaDir
var btCriar
var edNome
var btJogar
var btContinuar
var btSair
var btCor = []
var cSelecionadas = []
var recorde
var donoRecorde
var listColor
var btCorSelecionada = []
var distCor
var pausado = false
var novoRecorde = false
var mx, my, auxX, auxY
var iniVisible = []
var foodVisible = []
var body = []
var bodyFood = []
var events = []

function load() {

	var loadedResources = 0

	function finaliza() {

		if (++loadedResources >= 249) {
			for (var i = 0; i < events.length; i++) {
				if (events[i] != sndLogo)
					events[i].removeEventListener('load', finaliza)
				else
					events[i].removeEventListener('loadeddata', finaliza)
			}
			abertura1()
		}
		// else {
		// 	cGUI.clearRect(0, 0, 800, 600)
		// 	cGUI.strokeStyle = "darkred"
		// 	cGUI.lineCap = "round"
		// 	cGUI.lineWidth = 10
		// 	cGUI.beginPath()
		// 	cGUI.moveTo(350, 590)
		// 	cGUI.lineTo(450, 590)
		// 	cGUI.stroke()
		// 	cGUI.closePath()
		// 	cGUI.strokeStyle = "lime"
		// 	cGUI.lineWidth = 7
		// 	cGUI.beginPath()
		// 	cGUI.moveTo(350, 590)
		// 	cGUI.lineTo(350 + (loadedResources * (100 / 249)), 590)
		// 	cGUI.stroke()
		// 	cGUI.closePath()
		// }
	}

	logo = new Image()
	logo.addEventListener('load', finaliza)
	events.push(logo)
	titulo = new Object({
		img: new Image(),
		left: 0,
		top: 0,
		width: 800,
		height: 600
	})
	titulo.img.addEventListener('load', finaliza)
	events.push(titulo.img)
	bg = new Object({
		img: new Image(),
		left: 0,
		top: 0,
		raio: 4000
	})
	bg.img.addEventListener('load', finaliza)
	events.push(bg.img)

	mouseCursor = new Object({
		img: new Image(),
		left: 0,
		top: 0,
		width: 15,
		height: 15

	})
	mouseCursor.img.addEventListener('load', finaliza)
	events.push(mouseCursor.img)
	meuSinS = sins.length

	player = new Object({
		nome: "",
		cor: [],
		olhos: new Object({
			img: new Image(),
			iris: new Object({
				img: new Image(),
				x: 0,
				y: -1,
			}),
		}),
		raio: 12,
		fast: 6,
		slow: 3,
		velocidade: 3,
		rotacao: 0,
		rotVel: 10,
		rot: 0,
		dx: 0,
		dy: 0,
		crescimento: 0,
		corpo: [],
		run: false,
		timer: false,
		gradiente: 0,
		padrao: 1,
		pad: 0,
		pontos: 0,
		ia: false,
		inteligencia: function () {
			var ameaca, mx, my
			var ini, iniC
			ameaca = false
			for (var i = 0; i < inimigo.length; i++) {
				for (var x = 0; x < inimigo[i].corpo.length; x += 5) {
					if (Math.sqrt(Math.pow(this.corpo[0].left - inimigo[i].corpo[x].left, 2) + Math.pow(this.corpo[0].top - inimigo[i].corpo[x].top, 2)) < (this.raio + inimigo[i].raio) * 5) {
						ameaca = true
						ini = i
						iniC = x
						break
					}
				}
				if (ameaca)
					break
			}
			if (!ameaca) {
				var maisPerto = 0
				var menorDist = 500
				for (var i = food.length - 1; i >= 0; i--) {
					if (Math.sqrt(Math.pow(food[i].left - this.corpo[0].left, 2) + Math.pow(food[i].top - this.corpo[0].top, 2)) < this.raio + food[i].raio + menorDist) {
						maisPerto = i
						menorDist = Math.sqrt(Math.pow(food[i].left - this.corpo[0].left, 2) + Math.pow(food[i].top - this.corpo[0].top, 2))
					}
				}
				mx = Math.floor((food[maisPerto].left) - (this.corpo[0].left))
				my = Math.floor((food[maisPerto].top) - (this.corpo[0].top))
			}
			else {
				mx = -Math.floor(((inimigo[ini].corpo[iniC].left) - (this.corpo[0].left)))
				my = -Math.floor(((inimigo[ini].corpo[iniC].top) - (this.corpo[0].top)))
			}
			if (mx > 180)
				mx = 180
			if (mx < -180)
				mx = -180
			mx = Math.floor(mx / 4)
			if (my > 180)
				my = 180
			if (my < -180)
				my = -180
			my = Math.floor(my / 4)
			this.olhos.iris.x = -(Math.floor(Math.sqrt(Math.pow(0 - mx, 2) + Math.pow(my, 2)) * (.09)))
			this.rot = Math.floor(Math.atan2(my, mx) * (180 / Math.PI) + 180)
		},
		move: function () {
			if ((this.rot <= 90) && (this.rotacao >= 225)) {
				this.rotacao += this.rotVel
				if (this.rotacao >= 360)
					this.rotacao = 0
			}
			else if ((this.rot >= 270) && (this.rotacao <= 135)) {
				this.rotacao -= this.rotVel
				if (this.rotacao <= 0)
					this.rotacao = 360
			}
			else {
				if (this.rot + this.rotVel < this.rotacao) {
					this.rotacao -= this.rotVel
					if (this.rotacao < 0)
						this.rotacao = 360
				}
				else if (this.rot - this.rotVel > this.rotacao) {
					this.rotacao += this.rotVel
					if (this.rotacao > 360)
						this.rotacao = 0
				}
			}

			if (this.rotacao < this.rot - this.rotVel / 6) {
				if (this.olhos.iris.y > 0 - this.raio / 12)
					this.olhos.iris.y -= .75
			}
			else if (this.rotacao > this.rot + this.rotVel / 6) {
				if (this.olhos.iris.y < this.raio / 12)
					this.olhos.iris.y += .75
			}
			else {
				this.olhos.iris.y = 0
			}

			var aux = Math.floor(this.rotacao / 9 - 20)
			if (aux >= -10 && (aux <= 10)) {
				this.dy = this.velocidade * (aux / 10)
				if (this.dy > 0)
					this.dx = -(this.velocidade - this.dy)
				else
					this.dx = -(this.velocidade + this.dy)
			}
			else {
				if (aux > 0)
					aux = 20 - aux
				else
					aux = -(20 + aux)
				this.dy = (this.velocidade * (aux / 10))
				if (this.dy > 0)
					this.dx = (this.velocidade - this.dy)
				else
					this.dx = (this.velocidade + this.dy)
			}
			this.dx = -this.dx
			this.dy = -this.dy

			var r = this.raio / 1.25
			if (r > 12)
				r = 12
			var rr = this.raio / r
			r = (this.raio / (r / 2))
			for (var i = this.corpo.length - 1; i > 0; i--) {

				if (this.run && (this.pontos > 0)) {
					this.corpo[i].left += (this.corpo[(i - 1)].left - this.corpo[i].left) / rr
					this.corpo[i].top += (this.corpo[(i - 1)].top - this.corpo[i].top) / rr
				}
				else {
					this.corpo[i].left += (this.corpo[(i - 1)].left - this.corpo[i].left) / r
					this.corpo[i].top += (this.corpo[(i - 1)].top - this.corpo[i].top) / r
				}
			}

			if (this.run && (this.pontos > 0)) {
				this.velocidade = this.fast
				if (this.gradiente < 250)
					this.gradiente += 10
				if (!this.timer) {
					this.timer = true
					setTimeout('reduzSnake(-1)', 75)
				}
			}
			else {
				this.velocidade = this.slow
				if (this.gradiente > 0)
					this.gradiente -= 10
			}

			this.corpo[0].left += this.dx
			this.corpo[0].top -= this.dy
		},
		colisao: function () {
			if (Math.sqrt((Math.pow(this.corpo[0].left, 2)) + (Math.pow(this.corpo[0].top, 2))) > bg.raio) {
				for (var p = 0; p < this.corpo.length; p += 2) {
					if (Math.random() * 10 <= 7.5) {
						if (p == 0)
							criaFood(1, this.corpo[p].left, this.corpo[p].top, Math.floor(2 + Math.random() * this.raio / 1.5), this.cor[Math.floor(Math.random() * (this.cor.length))])
						else {
							if (this.corpo[p].left != this.corpo[(p - 1)].left &&
								(this.corpo[p].top != this.corpo[(p - 1)].top))
								criaFood(1, this.corpo[p].left, this.corpo[p].top, Math.floor(2 + Math.random() * this.raio / 1.5), this.cor[Math.floor(Math.random() * (this.cor.length))])
						}
					}
				}
				isGameOver = true
			}

			for (var i = 0; i < inimigo.length; i++) {
				for (var p = 0; p < inimigo[i].corpo.length; p++) {
					if (Math.sqrt((Math.pow(inimigo[i].corpo[p].left - this.corpo[0].left, 2)) + (Math.pow(inimigo[i].corpo[p].top - this.corpo[0].top, 2))) <= this.raio + inimigo[i].raio - 5) {
						for (var x = 0; x < this.corpo.length; x += 2) {
							if (x <= limiteCorpo) {
								if (Math.random() * 10 <= 7.5) {
									if (x == 0)
										criaFood(1, this.corpo[x].left, this.corpo[x].top, Math.floor(2 + Math.random() * this.raio / 1.5), this.cor[Math.floor(Math.random() * (this.cor.length))])
									else {
										if (this.corpo[x].left != this.corpo[(x - 1)].left &&
											(this.corpo[x].top != this.corpo[(x - 1)].top))
											criaFood(1, this.corpo[x].left, this.corpo[x].top, Math.floor(2 + Math.random() * this.raio / 1.5), this.cor[Math.floor(Math.random() * (this.cor.length))])
									}
								}
							}
						}
						isGameOver = true
					}
				}
			}

			for (var i = 0; i < food.length; i++) {
				if (Math.sqrt((Math.pow(food[i].left - this.corpo[0].left, 2)) + (Math.pow(food[i].top - this.corpo[0].top, 2))) < this.raio + 40 &&
					(Math.floor(Math.atan2(food[i].top - this.corpo[0].top, food[i].left - this.corpo[0].left) * (180 / Math.PI) + 180) >= this.rotacao - 67) &&
					(Math.floor(Math.atan2(food[i].top - this.corpo[0].top, food[i].left - this.corpo[0].left) * (180 / Math.PI) + 180) <= this.rotacao + 67)) {
					if (this.corpo[0].left > food[i].left)
						food[i].left += .5
					if (this.corpo[0].left < food[i].left)
						food[i].left -= .5
					if (this.corpo[0].top > food[i].top)
						food[i].top += .5
					if (this.corpo[0].top < food[i].top)
						food[i].top -= .5

					if (food[i].raioAtual > 1)
						food[i].raioAtual -= 1

				}
				if (Math.sqrt((Math.pow(food[i].left - this.corpo[0].left, 2)) + (Math.pow(food[i].top - this.corpo[0].top, 2))) < this.raio) {
					cresceSnake(-1, Math.floor(food[i].raio / 2))
					for (var p = i; p < food.length - 1; p++) {
						food[p] = food[(p + 1)]
					}
					food.pop()
				}
			}
		},
		draw: function () {
			for (var i = this.corpo.length - 1; i >= 0; i--) {
				if ((this.corpo[i].left > this.corpo[0].left - (canvas.width / 2 + 50)) && (this.corpo[i].left < this.corpo[0].left + (canvas.width / 2 + 50)) &&
					(this.corpo[i].top > this.corpo[0].top - (canvas.height / 2 + 50)) && (this.corpo[i].top < this.corpo[0].top + (canvas.height / 2 + 50))) {
					c.drawImage(body[this.cor[this.corpo[i].cor]].img[this.gradiente], 0, 0, 52, 52, this.corpo[i].left - this.raio, this.corpo[i].top - this.raio, this.raio * 2, this.raio * 2)
				}
			}

			c.save()
			c.translate(this.corpo[0].left, this.corpo[0].top)
			c.rotate(this.rotacao * (Math.PI / 180))
			c.drawImage(this.olhos.img, 0, 0, 50, 50, -this.raio, -this.raio, this.raio * 2, this.raio * 2)
			c.drawImage(this.olhos.iris.img, 0, 0, 50, 50, -this.raio + this.olhos.iris.x, -this.raio + this.olhos.iris.y, this.raio * 2, this.raio * 2)
			c.restore()
		}

	})

	sndLogo = new Audio()
	sndLogo.addEventListener('loadeddata', finaliza)
	events.push(sndLogo)

	olhos[0] = new Image()
	olhos[0].addEventListener('load', finaliza)
	events.push(olhos[0])
	olhos[1] = new Image()
	olhos[1].addEventListener('load', finaliza)
	events.push(olhos[1])
	iris = new Image()
	iris.addEventListener('load', finaliza)
	events.push(iris)

	player.olhos.img = olhos[Math.floor(Math.random() * 2)]
	player.olhos.iris.img = iris
	fundoMenu = new Image()
	fundoMenu.addEventListener('load', finaliza)
	events.push(fundoMenu)
	select = new Object({
		img: new Image(),
		left: 262.5,
		top: 200,
		width: 275,
		height: 80
	})
	select.img.addEventListener('load', finaliza)
	events.push(select.img)
	setaEsq = new Object({
		img: [],
		pos: 0,
		left: 210,
		top: 220,
		width: 40,
		height: 40
	})
	setaEsq.img[0] = new Image()
	setaEsq.img[0].addEventListener('load', finaliza)
	events.push(setaEsq.img[0])
	setaEsq.img[1] = new Image()
	setaEsq.img[1].addEventListener('load', finaliza)
	events.push(setaEsq.img[1])
	setaDir = new Object({
		img: [],
		pos: 0,
		left: 550,
		top: 220,
		width: 40,
		height: 40
	})
	setaDir.img[0] = new Image()
	setaDir.img[0].addEventListener('load', finaliza)
	events.push(setaDir.img[0])
	setaDir.img[1] = new Image()
	setaDir.img[1].addEventListener('load', finaliza)
	events.push(setaDir.img[1])
	btCriar = new Object({
		img: [],
		pos: 0,
		left: 295,
		top: 280,
		width: 210,
		height: 30
	})
	btCriar.img[0] = new Image()
	btCriar.img[0].addEventListener('load', finaliza)
	events.push(btCriar.img[0])
	btCriar.img[1] = new Image()
	btCriar.img[1].addEventListener('load', finaliza)
	events.push(btCriar.img[1])
	edNome = new Object({
		img: [],
		pos: 0,
		left: 275,
		top: 370,
		width: 250,
		height: 40,
		text: "Digite seu nome",
		focado: false
	})
	edNome.img[0] = new Image()
	edNome.img[0].addEventListener('load', finaliza)
	events.push(edNome.img[0])
	edNome.img[1] = new Image()
	edNome.img[1].addEventListener('load', finaliza)
	events.push(edNome.img[1])

	btJogar = new Object({
		img: [],
		pos: 0,
		left: 310,
		top: 470,
		width: 180,
		height: 40
	})
	btJogar.img[0] = new Image()
	btJogar.img[0].addEventListener('load', finaliza)
	events.push(btJogar.img[0])
	btJogar.img[1] = new Image()
	btJogar.img[1].addEventListener('load', finaliza)
	events.push(btJogar.img[1])
	btContinuar = new Object({
		img: [],
		pos: 0,
		left: 310,
		top: 470,
		width: 180,
		height: 40
	})
	btContinuar.img[0] = new Image()
	btContinuar.img[0].addEventListener('load', finaliza)
	events.push(btContinuar.img[0])
	btContinuar.img[1] = new Image()
	btContinuar.img[1].addEventListener('load', finaliza)
	events.push(btContinuar.img[1])
	btSair = new Object({
		img: [],
		pos: 0,
		left: 320,
		top: 530,
		width: 160,
		height: 30
	})
	btSair.img[0] = new Image()
	btSair.img[0].addEventListener('load', finaliza)
	events.push(btSair.img[0])
	btSair.img[1] = new Image()
	btSair.img[1].addEventListener('load', finaliza)
	events.push(btSair.img[1])

	if (localStorage.getItem("SinS2-player") != null)
		edNome.text = localStorage.getItem("SinS2-player")

	if (localStorage.getItem("SinS2-sinsPos") != null)
		sinsPos = localStorage.getItem("SinS2-sinsPos")

	if (localStorage.getItem("SinS2-recorde") != null) {
		recorde = localStorage.getItem("SinS2-recorde")
		donoRecorde = localStorage.getItem("SinS2-donoRecorde")
	}

	distCor = new Object({

		img: new Image(),
		left: 300,
		top: 190,
		width: 200,
		height: 5,
		focado: false,
		value: 1,
		selector: new Object({
			img: [],
			left: 495,
			top: 182,
			width: 8,
			height: 20,
			pos: 0
		})

	})
	distCor.img.addEventListener('load', finaliza)
	events.push(distCor.img)
	distCor.selector.img[0] = new Image()
	distCor.selector.img[0].addEventListener('load', finaliza)
	events.push(distCor.selector.img[0])
	distCor.selector.img[1] = new Image()
	distCor.selector.img[1].addEventListener('load', finaliza)
	events.push(distCor.selector.img[1])

	sndLogo.src = 'sons/logo.ogg'
	logo.src = "logo.png"
	titulo.img.src = "interface/titulo.png"
	bg.img.src = 'imgs/fundo.png'
	mouseCursor.img.src = 'interface/cursor/cur.png'
	olhos[0].src = "imgs/olhos0.png"
	olhos[1].src = "imgs/olhos1.png"
	iris.src = "imgs/iris.png"
	fundoMenu.src = 'interface/fundo.png'
	select.img.src = "interface/select.png"
	setaEsq.img[0].src = "interface/setaEsq1.png"
	setaEsq.img[1].src = "interface/setaEsq2.png"
	setaDir.img[0].src = "interface/setaDir1.png"
	setaDir.img[1].src = "interface/setaDir2.png"
	btCriar.img[0].src = "interface/btCriar1.png"
	btCriar.img[1].src = "interface/btCriar2.png"
	edNome.img[0].src = "interface/edNome1.png"
	edNome.img[1].src = "interface/edNome2.png"
	btJogar.img[0].src = "interface/btJogar1.png"
	btJogar.img[1].src = "interface/btJogar2.png"
	btContinuar.img[0].src = "interface/btContinuar1.png"
	btContinuar.img[1].src = "interface/btContinuar2.png"
	btSair.img[0].src = "interface/btSair1.png"
	btSair.img[1].src = "interface/btSair2.png"
	distCor.img.src = 'interface/range.png'
	distCor.selector.img[0].src = 'interface/selector1.png'
	distCor.selector.img[1].src = 'interface/selector2.png'

	canvas.width = 52
	canvas.height = 52
	canvas.hidden = true
	listColor = ["00", "33", "66", "99", "CC", "FF"]

	for (var i = 0; i < listColor.length; i++) {
		btCor.push(new Object({

			cor: "#" + listColor[i] + listColor[i] + listColor[i],
			left: 200,
			top: 350,
			raio: 5

		}))

		if (btCor.length > 1) {
			btCor[btCor.length - 1].top = btCor[btCor.length - 2].top + 11
			btCor[btCor.length - 1].left = btCor[btCor.length - 2].left
		}


		body[btCor[btCor.length - 1].cor] = new Object({
			img: []
		})
		for (var p = 0; p <= 250; p += 10) {
			c.clearRect(0, 0, 52, 52)
			c.beginPath()
			c.arc(26, 26, 25, Math.PI * 2, 0, true)
			c.closePath()
			gradient = c.createRadialGradient(26, 26, 21, 26, 26, 25)
			gradient.addColorStop(0, btCor[btCor.length - 1].cor)
			gradient.addColorStop(1, "rgba(" + p + "," + p + "," + p + ",.5")
			c.fillStyle = gradient
			c.fill()
			var imgData = canvas.toDataURL()

			body[btCor[btCor.length - 1].cor].img[p] = new Image()
			body[btCor[btCor.length - 1].cor].img[p].addEventListener('load', finaliza)
			events.push(body[btCor[btCor.length - 1].cor].img[p])
			body[btCor[btCor.length - 1].cor].img[p].src = imgData
		}

		c.clearRect(0, 0, 52, 52)
		c.beginPath()
		c.arc(25, 25, 25, Math.PI * 2, 0, true)
		c.closePath()
		gradient = c.createRadialGradient(25, 25, 8, 25, 25, 25)
		gradient.addColorStop(0, btCor[btCor.length - 1].cor)
		gradient.addColorStop(1, "rgba(0,0,0,.2")
		c.fillStyle = gradient
		c.fill()
		var imgData = canvas.toDataURL()

		bodyFood[btCor[btCor.length - 1].cor] = new Image()
		bodyFood[btCor[btCor.length - 1].cor].addEventListener('load', finaliza)
		events.push(bodyFood[btCor[btCor.length - 1].cor])
		bodyFood[btCor[btCor.length - 1].cor].src = imgData
	}
	for (var i = 0; i < listColor.length; i++) {
		for (var o = 0; o < listColor.length; o++) {
			for (var p = 0; p < listColor.length; p++) {
				btCor.push(new Object({
					cor: "#" + listColor[i] + listColor[o] + listColor[p],
					left: 200,
					top: 350,
					raio: 5

				}))

				if (btCor.length > 1) {
					btCor[btCor.length - 1].top = btCor[btCor.length - 2].top + 11
					btCor[btCor.length - 1].left = btCor[btCor.length - 2].left
					if (btCor[btCor.length - 1].top >= 410) {
						btCor[btCor.length - 1].top = 350
						btCor[btCor.length - 1].left += 11
					}
				}

				body[btCor[btCor.length - 1].cor] = new Object({
					img: []
				})
				for (var x = 0; x <= 250; x += 10) {
					c.clearRect(0, 0, 52, 52)
					c.beginPath()
					c.arc(26, 26, 25, Math.PI * 2, 0, true)
					c.closePath()
					gradient = c.createRadialGradient(26, 26, 21, 26, 26, 25)
					gradient.addColorStop(0, btCor[btCor.length - 1].cor)
					gradient.addColorStop(1, "rgba(" + x + "," + x + "," + x + ",.5")
					c.fillStyle = gradient
					c.fill()
					var imgData = canvas.toDataURL()

					body[btCor[btCor.length - 1].cor].img[x] = new Image()
					body[btCor[btCor.length - 1].cor].img[x].addEventListener('load', finaliza)
					events.push(body[btCor[btCor.length - 1].cor].img[x])
					body[btCor[btCor.length - 1].cor].img[x].src = imgData
				}

				c.clearRect(0, 0, 52, 52)
				c.beginPath()
				c.arc(25, 25, 25, Math.PI * 2, 0, true)
				c.closePath()
				gradient = c.createRadialGradient(25, 25, 8, 25, 25, 25)
				gradient.addColorStop(0, btCor[btCor.length - 1].cor)
				gradient.addColorStop(1, "rgba(0,0,0,.2")
				c.fillStyle = gradient
				c.fill()
				var imgData = canvas.toDataURL()

				bodyFood[btCor[btCor.length - 1].cor] = new Image()
				bodyFood[btCor[btCor.length - 1].cor].addEventListener('load', finaliza)
				events.push(bodyFood[btCor[btCor.length - 1].cor])
				bodyFood[btCor[btCor.length - 1].cor].src = imgData
			}
		}
	}
	c.clearRect(0, 0, 52, 52)
	canvas.hidden = false
}
