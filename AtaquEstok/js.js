function mainMenuBackground() {
	if (boxes.length < 10) {
		createNewBox(0, 0)
		boxes[boxes.length - 1].onClaw = false
		boxes[boxes.length - 1].left = boxes[boxes.length - 1].dropPosition
		boxes[boxes.length - 1].top = -(Math.floor(16 + Math.random() * 550))
		var occupiedPlace = true
		while (occupiedPlace) {
			occupiedPlace = false
			for (var p = 0; p < i; p++) {
				if (boxes[p].dropPosition == boxes[boxes.length - 1].dropPosition &&
					((boxes[p].top + boxes[p].collisionY >= boxes[boxes.length - 1].top - boxes[boxes.length - 1].collisionY &&
						boxes[p].top - boxes[p].collisionY < boxes[boxes.length - 1].top + boxes[boxes.length - 1].collisionY) ||
						(boxes[p].top - boxes[p].collisionY <= boxes[boxes.length - 1].top + boxes[boxes.length - 1].collisionY &&
							boxes[p].top + boxes[p].collisionY > boxes[boxes.length - 1].top - boxes[boxes.length - 1].collisionY))) {
					occupiedPlace = true
					boxes[boxes.length - 1].top -= 64
				}

			}
		}

	}
	for (var i = 0; i < boxes.length; i++) {
		try {
			boxes[i].move()
		}
		catch { }
		if (boxes[i].top > 617) {
			for (var p = i; p < boxes.length - 1; p++) {
				boxes[p] = boxes[p + 1]
			}
			boxes.pop()
		}
		try {
			c.drawImage(box, boxes[i].left - 16, boxes[i].top - 16)
		}
		catch { }
	}
	c.fillStyle = 'rgba(0,0,0,.3)'
	c.fillRect(0, 0, 800, 600)
}

var fade = 1
var faded = false
var cutOpenning = false
function openning1() {
	mainMenuBackground()
	if (!faded && fade > 0) {

		c.fillStyle = 'rgba(0,0,0,' + fade + ')'
		c.fillRect(0, 0, 800, 600)

		fade -= .005
		if (fade <= 0)
			faded = true
		requestAnimationFrame(openning1)
	}
	else {

		c.fillStyle = 'rgba(255,215,0,' + fade + ')'
		c.font = '50px Quantico'
		c.fillText('AtaquEstok', 400, 150)

		c.font = '20px Quantico'
		c.fillText('por', 400, 450)

		c.font = '30px Quantico'
		c.fillText('Djalmir Miodutzki', 400, 500)

		if (fade < 1)
			fade += .005
		else
			setTimeout(() => { cutOpenning = true }, 1000)

		if (!cutOpenning)
			requestAnimationFrame(openning1)
		else {
			faded = false
			mainMenu()
		}

		if (musicPlayer.ended || musicPlayer.paused) {
			var rand = Math.floor(1 + Math.random() * 3)
			if (rand == 1 && musicPlayer != music1) {
				musicPlayer = music1
				musicPlayer.play()
			}
			else if (rand == 2 && musicPlayer != music2) {
				musicPlayer = music2
				musicPlayer.play()
			}
			else if (rand == 3 && musicPlayer != music3) {
				musicPlayer = music3
				musicPlayer.play()
			}
		}
	}
}

var showingMainMenu = true
var onGreetings = true
function mainMenu() {
	document.onmousemove = mainMenuMouseMove
	document.onmousedown = mainMenuMouseDown
	document.onmouseup = mainMenuMouseUp
	document.onkeydown = mainMenuKd
	document.onkeyup = mainMenuKu

	mainMenuBackground()

	c.fillStyle = 'rgb(255,215,0)'
	c.font = '50px Quantico'
	c.fillText('AtaquEstok', 400, 150)

	if (fade >= 0 && onGreetings) {

		c.fillStyle = 'rgba(255,215,0,' + fade + ')'
		c.font = '20px Quantico'
		c.fillText('por', 400, 450)

		c.font = '30px Quantico'
		c.fillText('Djalmir Miodutzki', 400, 500)

		fade -= .005
	}
	else {
		onGreetings = false

		mainMenu_editName.draw()
		mainMenu_playBtn.draw()
		mainMenu_exitBtn.draw()

		if (localStorage.getItem('AtaquEstok-Record')) {

			c.fillStyle = 'rgb(255,215,0)'
			c.font = '20px Quantico'
			c.fillText('Recorde', 400, 520)


			c.fillStyle = 'rgb(100,255,0)'
			c.font = '24px Quantico'
			c.fillText(localStorage.getItem('AtaquEstok-RecordOwner'), 400, 550)

			c.fillStyle = 'rgb(255,215,0)'
			c.font = '20px Quantico'
			c.fillText(localStorage.getItem('AtaquEstok-Record'), 400, 580)

		}

	}

	if (showingMainMenu)
		requestAnimationFrame(mainMenu)
	else
		newGame()
}

function newGame() {
	restarting = false
	newRecord = false
	document.onmousemove = ''
	document.onmousedown = ''
	document.onmouseup = ''
	document.onkeydown = kd
	document.onkeyup = ku
	document.ontouchstart = ts
	document.ontouchmove = tm
	document.ontouchend = te
	claws = []
	boxes = []
	for (var i = 0; i < startingBoxes; i++) {
		createNewBox(0, 0)
		boxes[i].onClaw = false
		boxes[i].left = boxes[i].dropPosition
		boxes[i].top = 560
		var occupiedPlace = true
		while (occupiedPlace) {
			occupiedPlace = false
			for (var p = 0; p < i; p++) {
				if (boxes[p].dropPosition == boxes[i].dropPosition && (boxes[p].top == boxes[i].top)) {
					occupiedPlace = true
					boxes[i].top -= 32
				}

			}
		}
	}
	var higher = 560
	for (var i = 0; i < startingBoxes; i++) {
		if (boxes[i].left == 400) {
			if (boxes[i].top < higher)
				higher = boxes[i].top
		}
	}
	player.top = higher - 64
	player.left = 400
	player.score = 0

	paused = false
	gameOver = false
	lastLevelChange = 0
	level = 1
	loop()
}

let lastTimesptamp = 0
function loop(timestamp) {
	const delta = timestamp - lastTimesptamp
	if (delta > 1000 / 120) {
		lastTimesptamp = timestamp
		player.detectCollision()
		player.move()
		for (var i = 0; i < claws.length; i++) {
			claws[i].move()
		}
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].detectCollision()
			try {
				boxes[i].move()
			}
			catch { }

		}
		for (var i = 0; i < particles.length; i++) {
			particles[i].move()
		}

		createNewClaw()

		draw()
	}

	if (musicPlayer.ended || musicPlayer.paused) {
		var rand = Math.floor(1 + Math.random() * 3)
		if (rand == 1 && musicPlayer != music1) {
			musicPlayer = music1
			musicPlayer.play()
		}
		else if (rand == 2 && musicPlayer != music2) {
			musicPlayer = music2
			musicPlayer.play()
		}
		else if (rand == 3 && musicPlayer != music3) {
			musicPlayer = music3
			musicPlayer.play()
		}
	}

	if (paused)
		pauseMenu()
	else if (restarting)
		newGame()
	else if (gameOver) {
		if (localStorage.getItem('AtaquEstok-RecordOwner')) {
			if (player.score > Number(localStorage.getItem('AtaquEstok-Record'))) {
				localStorage.setItem('AtaquEstok-RecordOwner', player.name)
				localStorage.setItem('AtaquEstok-Record', player.score)
				newRecord = true
			}
		}
		else {
			localStorage.setItem('AtaquEstok-RecordOwner', player.name)
			localStorage.setItem('AtaquEstok-Record', player.score)
		}
		fade = 0
		showingGameOverBackground = false
		document.onmousemove = gameOverMouseMove
		document.onmousedown = gameOverMouseDown
		document.onmouseup = gameOverMouseUp
		gameOverMenu()
	}
	else if (showingMainMenu) {
		boxes = []
		mainMenu()
	}
	else
		requestAnimationFrame(loop)
}

function draw() {
	c.clearRect(0, 0, 800, 600)
	c.drawImage(bg, 0, 0)
	c.drawImage(player.img, player.action * 64, player.pos * 64, 64, 64, player.left - player.collisionX * 2, player.top - player.collisionY, 64, 64)

	for (var i = 0; i < claws.length; i++) {
		c.drawImage(claw, claws[i].left - 33.5, 0)
	}
	for (var i = 0; i < boxes.length; i++) {
		c.drawImage(box, boxes[i].left - 16, boxes[i].top - 16)
	}
	if (particles.length > 0) {
		for (var i = 0; i < particles.length; i++) {
			c.drawImage(box, particles[i].imgPositionX * 16, particles[i].imgPositionY * 16, 16, 16, particles[i].left, particles[i].top, 16, 16)
		}
	}

	c.strokeStyle = "rgba(0,0,0,.8)"
	c.lineCap = "round"
	c.lineWidth = 50
	c.beginPath()
	c.moveTo(200, 0)
	c.lineTo(600, 0)
	c.stroke()
	c.closePath()

	c.fillStyle = 'white'
	c.font = '16px Quantico'
	c.fillText(player.score + " pontos", 270, 15.5)
	c.fillText("Nível " + level, 530, 15.5)

	c.strokeStyle = "rgba(0,0,0,.7)"
	c.lineCap = "round"
	c.lineWidth = 50
	c.beginPath()
	c.moveTo(400, 0)
	c.lineTo(400, 16)
	c.stroke()
	c.closePath()
	c.drawImage(pauseImg, 0, 0, 64, 64, 384, 0, 32, 32)

}

var pauseMenuSize = 1
function pauseMenu() {
	draw()
	c.fillStyle = 'rgba(0,0,0,.8)'
	c.fillRect(400 - pauseMenuSize / 2, 300 - pauseMenuSize / 4, pauseMenuSize, pauseMenuSize / 2)
	c.strokeStyle = 'gold'
	c.lineWidth = 1
	c.strokeRect(400 - pauseMenuSize / 2, 300 - pauseMenuSize / 4, pauseMenuSize, pauseMenuSize / 2)

	if (paused) {
		if (pauseMenuSize < 400)
			pauseMenuSize += 20
		else {
			pauseMenuSize = 400
			c.fillStyle = 'gold'
			c.font = '35px Quantico'
			c.fillText('Jogo Pausado', 400, 270)
			pauseMenu_restartBtn.draw()
			pauseMenu_exitBtn.draw()
			pauseMenu_continueBtn.draw()

		}
		requestAnimationFrame(pauseMenu)
	}
	else {

		if (pauseMenuSize > 1) {
			pauseMenuSize -= 20
			requestAnimationFrame(pauseMenu)
		}
		else {
			pauseMenuSize = 1
			document.onmousemove = ''
			document.onmousedown = ''
			document.onmouseup = ''
			loop()
		}

	}

}

function gameOverMenu() {

	if (fade < 1) {
		draw()
		fade += .005
		c.fillStyle = 'rgba(0,0,0,' + fade + ')'
		c.fillRect(0, 0, 800, 600)
	}
	else {
		if (!showingGameOverBackground) {
			boxes = []
			showingGameOverBackground = true
		}
		else
			mainMenuBackground()
	}

	c.font = '50px Quantico'
	c.fillStyle = 'rgb(255,0,0)'
	c.fillText('Fim de jogo', 400, 150)

	if (newRecord) {
		c.font = '40px Quantico'
		c.fillStyle = 'lime'
		c.fillText('Novo Recorde', 400, 250)
	}

	if (player.score > 0) {
		c.font = '30px Quantico'
		c.fillStyle = 'gold'
		c.fillText(player.score + ' pontos', 400, 300)
	}

	gameOverMenu_restartBtn.draw()
	gameOverMenu_exitBtn.draw()

	if (showingMainMenu) {
		if (fade < 1)
			boxes = []
		mainMenu()
	}
	else if (restarting) {
		newGame()
	}
	else
		requestAnimationFrame(gameOverMenu)

}

function kd(e) {
	switch (e.keyCode) {
		case 37:
		case 65:
			if (!paused)
				player.action = walkL
			break

		case 39:
		case 68:
			if (!paused)
				player.action = walkR
			break

		case 87:
		case 38:
		case 32:
			if (player.collision.bottom && (!paused)) {
				player.startJump = player.top
				player.jumpping = true
			}
			break
		case 80:
		case 27:
			if (!gameOver) {
				paused = !paused
				if (paused) {
					document.onmousemove = pauseMouseMove
					document.onmousedown = pauseMouseDown
					document.onmouseup = pauseMouseUp
				}
			}
			break
	}
}

function ku(e) {
	switch (e.keyCode) {
		case 37:
		case 65:
		case 39:
		case 68:
			player.action = idle
			break
	}
}

function mainMenuMouseMove(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if (mX >= mainMenu_editName.left && mX <= mainMenu_editName.left + mainMenu_editName.width &&
		mY >= mainMenu_editName.top && mY <= mainMenu_editName.top + mainMenu_editName.height) {
		mainMenu_editName.backgroundColor = 'rgba(50,50,50,.3)'
		mainMenu_editName.textColor = 'white'
	}
	else {
		if (!mainMenu_editName.focused) {
			mainMenu_editName.backgroundColor = 'rgba(100,100,100,.3)'
			mainMenu_editName.textColor = 'yellow'
		}
	}

	if (mX >= mainMenu_playBtn.left && mX <= mainMenu_playBtn.left + mainMenu_playBtn.width &&
		mY >= mainMenu_playBtn.top && mY <= mainMenu_playBtn.top + mainMenu_playBtn.height) {
		mainMenu_playBtn.backgroundColor = 'rgba(0,155,0,.7)'
		mainMenu_playBtn.textColor = 'black'
	}
	else {
		mainMenu_playBtn.backgroundColor = 'rgba(100,255,0,.7)'
		mainMenu_playBtn.textColor = 'black'
	}

	if (mX >= mainMenu_exitBtn.left && mX <= mainMenu_exitBtn.left + mainMenu_exitBtn.width &&
		mY >= mainMenu_exitBtn.top && mY <= mainMenu_exitBtn.top + mainMenu_exitBtn.height) {
		mainMenu_exitBtn.backgroundColor = 'rgba(155,0,0,.7)'
		mainMenu_exitBtn.textColor = 'white'
	}
	else {
		mainMenu_exitBtn.backgroundColor = 'rgba(255,0,0,.7)'
		mainMenu_exitBtn.textColor = 'white'
	}
}

function mainMenuMouseDown(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if (mX >= mainMenu_editName.left && mX <= mainMenu_editName.left + mainMenu_editName.width &&
		mY >= mainMenu_editName.top && mY <= mainMenu_editName.top + mainMenu_editName.height) {
		mainMenu_editName.backgroundColor = 'rgba(20,20,20,.3)'
		mainMenu_editName.textColor = 'white'
	}
	else {
		if (mainMenu_editName.text.trim() == '')
			mainMenu_editName.text = ''
		mainMenu_editName.focused = false
		mainMenu_editName.backgroundColor = 'rgba(100,100,100,.3)'
		mainMenu_editName.textColor = 'yellow'
	}

	if (mX >= mainMenu_playBtn.left && mX <= mainMenu_playBtn.left + mainMenu_playBtn.width &&
		mY >= mainMenu_playBtn.top && mY <= mainMenu_playBtn.top + mainMenu_playBtn.height) {
		mainMenu_playBtn.backgroundColor = 'rgba(0,125,0,.7)'
		mainMenu_playBtn.textColor = 'black'
	}

	if (mX >= mainMenu_exitBtn.left && mX <= mainMenu_exitBtn.left + mainMenu_exitBtn.width &&
		mY >= mainMenu_exitBtn.top && mY <= mainMenu_exitBtn.top + mainMenu_exitBtn.height) {
		mainMenu_exitBtn.backgroundColor = 'rgba(125,0,0,.7)'
		mainMenu_exitBtn.textColor = 'white'
	}
}

function mainMenuMouseUp(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if (mX >= mainMenu_editName.left && mX <= mainMenu_editName.left + mainMenu_editName.width &&
		mY >= mainMenu_editName.top && mY <= mainMenu_editName.top + mainMenu_editName.height) {
		mainMenu_editName.backgroundColor = 'rgba(50,50,50,.3)'
		mainMenu_editName.textColor = 'white'
		mainMenu_editName.focused = true
		inputText.focus()
		var v = inputText.value
		inputText.value = ''
		inputText.value = v
	}
	else {
		inputText.blur()
	}

	if (mX >= mainMenu_playBtn.left && mX <= mainMenu_playBtn.left + mainMenu_playBtn.width &&
		mY >= mainMenu_playBtn.top && mY <= mainMenu_playBtn.top + mainMenu_playBtn.height) {
		mainMenu_playBtn.backgroundColor = 'rgba(0,155,0,.7)'
		mainMenu_playBtn.textColor = 'black'
		if (mainMenu_editName.text.trim() != '') {
			player.name = mainMenu_editName.text
			showingMainMenu = false
		}
		else {
			mainMenu_editName.textColor = 'red'
			mainMenu_editName.backgroundColor = 'yellow'
		}
	}

	if (mX >= mainMenu_exitBtn.left && mX <= mainMenu_exitBtn.left + mainMenu_exitBtn.width &&
		mY >= mainMenu_exitBtn.top && mY <= mainMenu_exitBtn.top + mainMenu_exitBtn.height) {
		mainMenu_exitBtn.backgroundColor = 'rgba(155,0,0,.7)'
		mainMenu_exitBtn.textColor = 'white'
		location.href = '../index.html'
	}
}

function mainMenuKd(e) {
	if (mainMenu_editName.focused) {
		mainMenu_editName.text = inputText.value
	}

	if (e.keyCode == 13 && mainMenu_editName.text.trim() != '') {
		inputText.blur()
		mainMenu_editName.focused = false
		mainMenu_playBtn.backgroundColor = 'rgba(0,125,0,.7)'
		mainMenu_playBtn.textColor = 'black'
	}
}

function mainMenuKu(e) {
	mainMenu_editName.text = inputText.value
	if (e.keyCode == 13 && mainMenu_editName.text.trim() != '') {
		mainMenu_playBtn.backgroundColor = 'rgba(100,255,0,.7)'
		mainMenu_playBtn.textColor = 'black'
		player.name = mainMenu_editName.text
		showingMainMenu = false
	}
}

function pauseMouseMove(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if (mX >= pauseMenu_restartBtn.left && mX <= pauseMenu_restartBtn.left + pauseMenu_restartBtn.width &&
		mY >= pauseMenu_restartBtn.top && mY <= pauseMenu_restartBtn.top + pauseMenu_restartBtn.height) {
		pauseMenu_restartBtn.backgroundColor = 'rgba(255,255,0,.7)'
		pauseMenu_restartBtn.textColor = 'black'
	}
	else {
		pauseMenu_restartBtn.backgroundColor = 'rgba(255,255,255,.1)'
		pauseMenu_restartBtn.textColor = 'yellow'
	}

	if (mX >= pauseMenu_continueBtn.left && mX <= pauseMenu_continueBtn.left + pauseMenu_continueBtn.width &&
		mY >= pauseMenu_continueBtn.top && mY <= pauseMenu_continueBtn.top + pauseMenu_continueBtn.height) {
		pauseMenu_continueBtn.backgroundColor = 'rgba(100,255,0,.7)'
		pauseMenu_continueBtn.textColor = 'black'
	}
	else {
		pauseMenu_continueBtn.backgroundColor = 'rgba(255,255,255,.1)'
		pauseMenu_continueBtn.textColor = 'yellow'
	}

	if (mX >= pauseMenu_exitBtn.left && mX <= pauseMenu_exitBtn.left + pauseMenu_exitBtn.width &&
		mY >= pauseMenu_exitBtn.top && mY <= pauseMenu_exitBtn.top + pauseMenu_exitBtn.height) {
		pauseMenu_exitBtn.backgroundColor = 'rgba(255,0,0,.7)'
		pauseMenu_exitBtn.textColor = 'white'
	}
	else {
		pauseMenu_exitBtn.backgroundColor = 'rgba(255,255,255,.1)'
		pauseMenu_exitBtn.textColor = 'yellow'
	}
}

function pauseMouseDown(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if (mX >= pauseMenu_restartBtn.left && mX <= pauseMenu_restartBtn.left + pauseMenu_restartBtn.width &&
		mY >= pauseMenu_restartBtn.top && mY <= pauseMenu_restartBtn.top + pauseMenu_restartBtn.height) {
		pauseMenu_restartBtn.backgroundColor = 'rgba(155,155,0,.7)'
		pauseMenu_restartBtn.textColor = 'black'
	}

	if (mX >= pauseMenu_continueBtn.left && mX <= pauseMenu_continueBtn.left + pauseMenu_continueBtn.width &&
		mY >= pauseMenu_continueBtn.top && mY <= pauseMenu_continueBtn.top + pauseMenu_continueBtn.height) {
		pauseMenu_continueBtn.backgroundColor = 'rgba(0,155,0,.7)'
		pauseMenu_continueBtn.textColor = 'black'
	}

	if (mX >= pauseMenu_exitBtn.left && mX <= pauseMenu_exitBtn.left + pauseMenu_exitBtn.width &&
		mY >= pauseMenu_exitBtn.top && mY <= pauseMenu_exitBtn.top + pauseMenu_exitBtn.height) {
		pauseMenu_exitBtn.backgroundColor = 'rgba(155,0,0,.7)'
		pauseMenu_exitBtn.textColor = 'white'
	}
}

function pauseMouseUp(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if (mX >= pauseMenu_restartBtn.left && mX <= pauseMenu_restartBtn.left + pauseMenu_restartBtn.width &&
		mY >= pauseMenu_restartBtn.top && mY <= pauseMenu_restartBtn.top + pauseMenu_restartBtn.height) {
		pauseMenu_restartBtn.backgroundColor = 'rgba(255,255,0,.7)'
		pauseMenu_restartBtn.textColor = 'black'
		restarting = true
		paused = false
	}

	if (mX >= pauseMenu_continueBtn.left && mX <= pauseMenu_continueBtn.left + pauseMenu_continueBtn.width &&
		mY >= pauseMenu_continueBtn.top && mY <= pauseMenu_continueBtn.top + pauseMenu_continueBtn.height) {
		pauseMenu_continueBtn.backgroundColor = 'rgba(100,255,0,.7)'
		pauseMenu_continueBtn.textColor = 'black'
		paused = !paused
	}

	if (mX >= pauseMenu_exitBtn.left && mX <= pauseMenu_exitBtn.left + pauseMenu_exitBtn.width &&
		mY >= pauseMenu_exitBtn.top && mY <= pauseMenu_exitBtn.top + pauseMenu_exitBtn.height) {
		pauseMenu_exitBtn.backgroundColor = 'rgba(255,0,0,.7)'
		pauseMenu_exitBtn.textColor = 'white'
		paused = false
		gameOver = true
	}
}

function gameOverMouseMove(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if (mX >= gameOverMenu_restartBtn.left && mX <= gameOverMenu_restartBtn.left + gameOverMenu_restartBtn.width &&
		mY >= gameOverMenu_restartBtn.top && mY <= gameOverMenu_restartBtn.top + gameOverMenu_restartBtn.height) {
		gameOverMenu_restartBtn.backgroundColor = 'rgba(50,205,0,.7)'
		gameOverMenu_restartBtn.textColor = 'black'
	}
	else {
		gameOverMenu_restartBtn.backgroundColor = 'rgba(100,255,0,.7)'
		gameOverMenu_restartBtn.textColor = 'black'
	}

	if (mX >= gameOverMenu_exitBtn.left && mX <= gameOverMenu_exitBtn.left + gameOverMenu_exitBtn.width &&
		mY >= gameOverMenu_exitBtn.top && mY <= gameOverMenu_exitBtn.top + gameOverMenu_exitBtn.height) {
		gameOverMenu_exitBtn.backgroundColor = 'rgba(205,0,0,.7)'
		gameOverMenu_exitBtn.textColor = 'white'
	}
	else {
		gameOverMenu_exitBtn.backgroundColor = 'rgba(255,0,0,.7)'
		gameOverMenu_exitBtn.textColor = 'white'
	}

}

function gameOverMouseDown(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if (mX >= gameOverMenu_restartBtn.left && mX <= gameOverMenu_restartBtn.left + gameOverMenu_restartBtn.width &&
		mY >= gameOverMenu_restartBtn.top && mY <= gameOverMenu_restartBtn.top + gameOverMenu_restartBtn.height) {
		gameOverMenu_restartBtn.backgroundColor = 'rgba(0,155,0,.7)'
		gameOverMenu_restartBtn.textColor = 'black'
	}

	if (mX >= gameOverMenu_exitBtn.left && mX <= gameOverMenu_exitBtn.left + gameOverMenu_exitBtn.width &&
		mY >= gameOverMenu_exitBtn.top && mY <= gameOverMenu_exitBtn.top + gameOverMenu_exitBtn.height) {
		gameOverMenu_exitBtn.backgroundColor = 'rgba(155,0,0,.7)'
		gameOverMenu_exitBtn.textColor = 'white'
	}

}

function gameOverMouseUp(e) {
	var mX = e.clientX * (800 / window.innerWidth)
	var mY = e.clientY * (600 / window.innerHeight)

	if (mX >= gameOverMenu_restartBtn.left && mX <= gameOverMenu_restartBtn.left + gameOverMenu_restartBtn.width &&
		mY >= gameOverMenu_restartBtn.top && mY <= gameOverMenu_restartBtn.top + gameOverMenu_restartBtn.height) {
		gameOverMenu_restartBtn.backgroundColor = 'rgba(50,205,0,.7)'
		gameOverMenu_restartBtn.textColor = 'black'
		restarting = true
	}

	if (mX >= gameOverMenu_exitBtn.left && mX <= gameOverMenu_exitBtn.left + gameOverMenu_exitBtn.width &&
		mY >= gameOverMenu_exitBtn.top && mY <= gameOverMenu_exitBtn.top + gameOverMenu_exitBtn.height) {
		gameOverMenu_exitBtn.backgroundColor = 'rgba(205,0,0,.7)'
		gameOverMenu_exitBtn.textColor = 'white'
		showingMainMenu = true
	}
}

function ts(e) {
	tx = e.touches[e.touches.length - 1].clientX * (800 / window.innerWidth)
	ty = e.touches[e.touches.length - 1].clientY * (600 / window.innerHeight)
	if (ty < 40 && tx > 370 && tx < 430) {
		if (!gameOver)
			paused = true
		document.onmousemove = pauseMouseMove
		document.onmousedown = pauseMouseDown
		document.onmouseup = pauseMouseUp
	}
	else if (ty < 300) {
		if (player.collision.bottom && (!paused)) {
			player.startJump = player.top
			player.jumpping = true
		}
	}
	else if (tx < 400) {
		if (!paused)
			player.action = walkL
	}
	else {
		if (!paused)
			player.action = walkR
	}

}

function tm(e) {
	tx = e.touches[e.touches.length - 1].clientX * (800 / window.innerWidth)
	ty = e.touches[e.touches.length - 1].clientY * (600 / window.innerHeight)
	if (ty < 300) {
		if (player.collision.bottom && (!paused)) {
			player.startJump = player.top
			player.jumpping = true
		}
	}
	else if (tx < 400) {
		if (!paused)
			player.action = walkL
	}
	else {
		if (!paused)
			player.action = walkR
	}
}

function te(e) {
	if (e.touches.length == 0)
		player.action = idle
}

window.onblur = cblur
function cblur() {
	if (paused == false) {
		paused = true
		document.onmousemove = pauseMouseMove
		document.onmousedown = pauseMouseDown
		document.onmouseup = pauseMouseUp
	}
}

window.onload = function () {
	load()
}