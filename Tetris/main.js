function setCanvasSizes() {
	let bodyWidth = window.innerWidth
	let bodyHeight = window.innerHeight
	console.log(bodyWidth, bodyHeight)
	if (bodyWidth > bodyHeight) {
		canvas.style.height = bodyHeight + 'px'
		canvas.style.width = 'auto'
	}
	else {
		canvas.style.width = bodyWidth + 'px'
		canvas.style.height = 'auto'
	}
}
setCanvasSizes()
window.addEventListener('resize', setCanvasSizes)

function opening() {
	if (screen.width < 1025) {
		//setOrientation()
		gamePaused = false
	}

	function one() {
		c.fillStyle = "#141414"
		c.fillRect(0, 0, canvas.width, canvas.height)

		c.strokeStyle = "lime"
		c.font = '50px bauhaus'
		c.lineWidth = 1
		c.textAlign = 'center'
		c.strokeText('TETRIS', 120, 200)

		c.fillStyle = "rgb(20,20,20," + opacity + ")"
		c.fillRect(0, 0, canvas.width, canvas.height)
		if (opacity > 0 && (!growingOpacity)) {
			opacity -= .015
			requestAnimationFrame(one)
		}
		else if (!growingOpacity) {
			setTimeout(() => {growingOpacity = true; one()}, 1500)
		}
		else {
			opacity += .015
			if (opacity >= 1) {
				growingOpacity = false
				c.fillStyle = "#141414"
				c.fillRect(0, 0, canvas.width, canvas.height)
				setTimeout(two, 500)
			}
			else
				requestAnimationFrame(one)
		}
	}

	function two() {
		c.fillStyle = "#141414"
		c.fillRect(0, 0, canvas.width, canvas.height)

		c.strokeStyle = "gold"
		c.font = '20px bauhaus'
		c.lineWidth = 1
		c.textAlign = 'center'
		c.strokeText('Criado por', 120, 160)
		c.strokeStyle = "lime"
		c.font = '30px bauhaus'
		c.strokeText('Djalmir', 120, 200)
		c.strokeText('Miodutzki', 120, 235)

		c.fillStyle = "rgb(20,20,20," + opacity + ")"
		c.fillRect(0, 0, canvas.width, canvas.height)
		if (opacity > 0 && (!growingOpacity)) {
			opacity -= .015
			requestAnimationFrame(two)
		}
		else if (!growingOpacity) {
			setTimeout(() => {growingOpacity = true; two()}, 1500)
		}
		else {
			opacity += .015
			if (opacity >= 1) {
				c.fillStyle = "#141414"
				c.fillRect(0, 0, canvas.width, canvas.height)
				setTimeout(() => {
					growingOpacity = false
					menu()
				}, 500)
			}
			else
				requestAnimationFrame(two)
		}
	}

	one()
}

function menu() {
	showingMenu = true
	c.fillStyle = "#141414"
	c.fillRect(0, 0, canvas.width, canvas.height)

	c.strokeStyle = "lime"
	c.font = '50px bauhaus'
	c.lineWidth = 2
	c.textAlign = 'center'
	c.strokeText('TETRIS', 120, 50)

	c.strokeStyle = "#005000"
	c.beginPath()
	c.moveTo(0, 60)
	c.lineTo(240, 60)
	c.stroke()
	c.closePath()

	if (record) {
		c.strokeStyle = 'gold'
		c.font = '20px bauhaus'
		c.lineWidth = 1.5
		c.strokeText('Recorde', 120, 100)
		c.lineWidth = 1

		c.font = '28px bauhaus'
		c.fillStyle = '#abc'
		c.fillText(recordOwner, 120, 135)

		c.font = '30px bauhaus'
		c.fillStyle = 'lime'
		c.fillText(record + ' pontos', 120, 170)
	}

	c.font = '30px bauhaus'
	btJogar.draw()
	btSair.draw()

	c.font = "15px bauhaus"
	edNome.draw()

	c.fillStyle = "rgb(20,20,20," + opacity + ")"
	c.fillRect(0, 0, canvas.width, canvas.height)
	if (opacity > 0 && (!growingOpacity)) {
		opacity -= .015
	}

	if (isGameOver)
		requestAnimationFrame(menu)
	else {
		showingMenu = false
		newGame()
	}
}

function newGame() {
	arena = new Arena(12, 20)
	player = new Player(arena)
	player.score = 0
	player.newPiece()
	update()
}

function update(time = 0) {
	const deltaTime = time - lastTime
	lastTime = time

	if (!isGameOver)
		player.update(deltaTime)

	draw()

	if (!isGameOver) {
		if (!gamePaused)
			requestAnimationFrame(update)
		else
			pause()
	}
	else {
		opacity = 1
		gameOver()
	}
}

function draw() {
	c.fillStyle = '#141414'
	c.fillRect(0, 0, canvas.width, canvas.height)

	arena.draw()
	player.draw()
	c.fillStyle = 'rgba(255,255,255,.5)'
	c.font = '20px bauhaus'
	c.fillText(player.score, 22, 20)
}

function pause() {
	draw()
	c.fillStyle = 'rgba(0,0,0,.5)'
	c.fillRect(0, 0, canvas.width, canvas.height)

	c.strokeStyle = '#cde'
	c.font = "30px bauhaus"
	c.lineWidth = 1
	c.textAlign = 'center'
	c.strokeText('Jogo', 120, 150)
	c.strokeText('Pausado', 120, 180)

	if (gamePaused)
		requestAnimationFrame(pause)
	else {
		update()
	}
}

function gameOver() {
	c.fillStyle = "#141414"
	c.fillRect(0, 0, canvas.width, canvas.height)

	c.strokeStyle = "red"
	c.font = '50px bauhaus'
	c.lineWidth = 2
	c.textAlign = 'center'
	c.strokeText('GAME', 85, 80)
	c.strokeText('OVER', 155, 130)

	if (player.score === 0) {
		c.font = '20px bauhaus'
		c.lineWidth = .8
		c.fillStyle = 'red'
		c.fillText('Você', 80, 200)
		c.fillText('não', 100, 220)
		c.fillText('fez', 120, 240)
		c.fillText('pontos!', 160, 260)
		c.fillText('=(', 120, 300)
	}
	else if (player.score > record) {
		c.font = '25px bauhaus'
		c.strokeStyle = "gold"
		c.lineWidth = 1
		c.strokeText('Novo', 120, 200)
		c.strokeText('Recorde!', 120, 220)
		c.strokeStyle = "lime"
		c.strokeText(player.score, 120, 270)
		c.strokeText('pontos!', 120, 290)
		localStorage.setItem('DJ-Tetris-record', player.score)
		localStorage.setItem('DJ-Tetris-recordOwner', player.name)
	}
	else {
		c.lineWidth = 1
		c.font = '25px bauhaus'
		c.lineWidth = 1
		c.strokeStyle = "gold"
		c.strokeText(player.score, 120, 270)
		c.strokeText('pontos!', 120, 290)
	}

	c.fillStyle = "rgb(20,20,20," + opacity + ")"
	c.fillRect(0, 0, canvas.width, canvas.height)
	if (opacity > 0 && (!growingOpacity)) {
		opacity -= .015
		requestAnimationFrame(gameOver)
	}
	else if (!growingOpacity) {
		setTimeout(() => {
			growingOpacity = true
			gameOver()
		}, 1500)
	}
	else {
		opacity += .015
		if (opacity >= 1) {
			c.fillStyle = "#141414"
			c.fillRect(0, 0, canvas.width, canvas.height)
			growingOpacity = false

			record = localStorage.getItem('DJ-Tetris-record') ? parseInt(localStorage.getItem('DJ-Tetris-record')) : 0
			recordOwner = localStorage.getItem('DJ-Tetris-recordOwner') ? localStorage.getItem('DJ-Tetris-recordOwner') : ''

			menu()
		}
		else
			requestAnimationFrame(gameOver)
	}
}

document.onkeydown = (e) => {
	if (!isGameOver) {
		switch (e.keyCode) {
			case keys[0]:
			case keys[1]:
				player.move = -1
				break
			case keys[2]:
			case keys[3]:
				player.move = 1
				break
			case keys[4]:
			case keys[5]:
				player.dropSpeed = player.dropFast
				break
			case keys[6]:
			case keys[7]:
				player.rotate(-1)
				break
			case keys[8]:
			case keys[9]:
				player.rotate(1)
				break
			case 27:
				gamePaused = !gamePaused
				break
		}
	}
}

document.onkeyup = (e) => {
	if (!isGameOver) {
		switch (e.keyCode) {
			case keys[0]:
			case keys[1]:
			case keys[2]:
			case keys[3]:
				player.move = 0
				break
			case keys[4]:
			case keys[5]:
				player.dropSpeed = player.dropSlow
				break
		}
	}
}

// const btLeft=document.getElementById('btLeft')
// btLeft.ontouchstart=()=>{
//     if(!isGameOver)
//         player.move=-1
//     btLeft.style.backgroundColor='rgba(157, 255, 0, 0.129)'
// }
// btLeft.ontouchend=()=>{
//     if(!isGameOver)
//         player.move=0
//     btLeft.style.backgroundColor='rgba(157, 255, 0, 0.329)'
// }

// const btRight=document.getElementById('btRight')
// btRight.ontouchstart=()=>{
//     if(!isGameOver)
//         player.move=1
//     btRight.style.backgroundColor='rgba(157, 255, 0, 0.129)'
// }
// btRight.ontouchend=()=>{
//     if(!isGameOver)
//         player.move=0
//     btRight.style.backgroundColor='rgba(157, 255, 0, 0.329)'
// }

// const btDown=document.getElementById('btDown')
// btDown.ontouchstart=()=>{
//     if(!isGameOver)
//         player.dropSpeed=player.dropFast
//     btDown.style.backgroundColor='rgba(157, 255, 0, 0.129)'
// }
// btDown.ontouchend=()=>{
//     if(!isGameOver)
//         player.dropSpeed=player.dropSlow
//     btDown.style.backgroundColor='rgba(157, 255, 0, 0.329)'
// }

canvas.ontouchstart = (e) => {
	tx = e.touches[e.touches.length - 1].clientX * (240 / window.innerWidth)
	ty = e.touches[e.touches.length - 1].clientY * (400 / window.innerHeight)
	if (!isGameOver && !gamePaused) {
		if (tx < 120 && ty < 200) {
			player.rotate(-1)
		}
		else if (tx > 120 && ty < 200) {
			player.rotate(+1)
		}
		else if (tx < 80 && ty > 200) {
			player.move = -1
		}
		else if (tx < 160 && ty > 200) {
			player.dropSpeed = player.dropFast
		}
		else {
			player.move = 1
		}
	}
	else if (gamePaused)
		gamePaused = false
}

canvas.ontouchend = () => {
	player.move = 0
	player.dropSpeed = player.dropSlow
}

// const btRotLeft=document.getElementById('btRotLeft')
// btRotLeft.ontouchstart=()=>{
//     if(!isGameOver)
//         player.rotate(-1)
//     btRotLeft.style.backgroundColor='rgba(157, 255, 0, 0.129)'
// }
// btRotLeft.ontouchend=()=>{
//     btRotLeft.style.backgroundColor='rgba(157, 255, 0, 0.329)'
// }

// const btRotRight=document.getElementById('btRotRight')
// btRotRight.ontouchstart=()=>{
//     if(!isGameOver)
//         player.rotate(1)
//     btRotRight.style.backgroundColor='rgba(157, 255, 0, 0.129)'
// }
// btRotRight.ontouchend=()=>{
//     btRotRight.style.backgroundColor='rgba(157, 255, 0, 0.329)'
// }

document.oncontextmenu = () => {
	return false
}

// window.addEventListener('orientationchange',setOrientation)
// function setOrientation(){
//     gamePaused=true
//     document.querySelector('#leftControls').style.height='16vh'
//     document.querySelector('#rightControls').style.height='16vh'

//     if(screen.orientation.angle!==0){        
//         canvas.style.maxWidth='45%'

//         if(screen.width>=1025){
//             canvas.style.height='98vh'
//             document.querySelector('#leftControls').style.display='none'
//             document.querySelector('#rightControls').style.display='none'
//         }
//         else{
//             canvas.style.height='96vh'
//             document.querySelector('#leftControls').style.display='block'
//             document.querySelector('#leftControls').style.bottom='50px'
//             document.querySelector('#rightControls').style.display='block'
//             document.querySelector('#rightControls').style.bottom='50px'
//         }
//     }
//     else{
//         if(screen.width>=1025){
//             canvas.style.height='98vh'
//             document.querySelector('#leftControls').style.display='none'
//             document.querySelector('#rightControls').style.display='none'
//         }
//         else{
//             canvas.style.height="80vh"
//             canvas.style.maxWidth=null

//             document.querySelector('#leftControls').style.display='block'
//             document.querySelector('#leftControls').style.bottom='8px'
//             document.querySelector('#rightControls').style.display='block'
//             document.querySelector('#rightControls').style.bottom='8px'
//         }
//     }
// }

document.body.onblur = () => {
	gamePaused = true
}

const btJogar = new Btn(() => {
	isGameOver = false
}, 'Jogar', 60, 270, 120, 60, 20)

const btSair = new Btn(() => {
	location.href = '../index.html'
}, 'Sair', 70, 330, 100, 50, 20)

const edNome = new Edit('edNome', player ? player.name : '', 'Digite seu nome', 20, 220, 200, 50, 20)

opening()