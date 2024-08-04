// function move(e) {
// 	mouseSeeker.style.top = (e.touches ? e.touches[e.touches.length - 1].clientY : e.clientY) + window.scrollY + 'px'
// 	mouseSeeker.style.left = (e.touches ? e.touches[e.touches.length - 1].clientX : e.clientX) + window.scrollX + 'px'
// 	e.preventDefault()
// }
// document.onmousemove = move
// document.ontouchmove = move

let bgCanvas = document.querySelector('#bgCanvas')
let c = bgCanvas.getContext('2d')

let cWidth = document.body.offsetWidth
let cHeight = document.body.offsetHeight
function setBgCanvasSizes() {
	bgCanvas.width = document.body.offsetWidth
	bgCanvas.height = document.body.offsetHeight
	cWidth = document.body.offsetWidth
	cHeight = document.body.offsetHeight
}
setBgCanvasSizes()
window.addEventListener('resize', setBgCanvasSizes)

let mousePos = { x: undefined, y: undefined }

function mouseMove(e) {
	mousePos = {
		x: (e.touches ? e.touches[e.touches.length - 1].clientX : e.clientX) + window.scrollX,
		y: (e.touches ? e.touches[e.touches.length - 1].clientY : e.clientY) + window.scrollY
	}
}
document.onmousemove = mouseMove
document.ontouchmove = mouseMove

function clearMousePos() {
	mousePos = {
		x: undefined,
		y: undefined
	}
}
document.onmouseout = clearMousePos
document.ontouchend = clearMousePos

// #0099ff, #77ff77, #ff3344
let cValues = ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff']

let r = 'ff', g = '33', b = '44'

let switchingColors = {
	from: 'red',
	to: 'green'
}

let counter = 0
let arcRadius = 160
let arcRadiusAction = 'grow'
let breathCounter = 0
function rgb() {

	if (mousePos.x) {
		let grd = c.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, arcRadius - 50)
		grd.addColorStop(0, `#${r}${g}${b}`)
		grd.addColorStop(1, `#${r}${g}${b}00`)

		c.fillStyle = grd
		// c.fillStyle = `#${ r }${ g }${ b }`
		c.beginPath()
		c.arc(mousePos.x, mousePos.y, arcRadius, 0, 2 * Math.PI, true)
		c.closePath()
		c.fill()
	}

	if (breathCounter++ >= 2) {
		switch (arcRadiusAction) {
			case ('grow'):
				arcRadius++
				if (arcRadius >= 180)
					arcRadiusAction = 'shrink'
				break
			case ('shrink'):
				arcRadius--
				if (arcRadius <= 160)
					arcRadiusAction = 'grow'
				break
		}
		breathCounter = 0
	}

	if (counter >= 9) {
		c.fillStyle = `#00000010`
		c.fillRect(0, 0, cWidth, cHeight)
	}

	if (counter++ >= 9) {
		if (switchingColors.from == 'red' && switchingColors.to == 'green') {
			if (r == '77' && g == 'ff' && b == '77') {
				switchingColors = {
					from: 'green',
					to: 'blue'
				}
			}
			else {
				if (r != '77')
					r = cValues[cValues.indexOf(r) - 1]
				if (g != 'ff')
					g = cValues[cValues.indexOf(g) + 1]
				if (b != '77')
					b = cValues[cValues.indexOf(b) + 1]
			}
		}
		else if (switchingColors.from == 'green' && switchingColors.to == 'blue') {
			if (r == '00' && g == '99' && b == 'ff') {
				switchingColors = {
					from: 'blue',
					to: 'red'
				}
			}
			else {
				if (r != '00')
					r = cValues[cValues.indexOf(r) - 1]
				if (g != '99')
					g = cValues[cValues.indexOf(g) - 1]
				if (b != 'ff')
					b = cValues[cValues.indexOf(b) + 1]
			}
		}
		else if (switchingColors.from == 'blue' && switchingColors.to == 'red') {
			if (r == 'ff' && g == '33' && b == '44') {
				switchingColors = {
					from: 'red',
					to: 'green'
				}
			}
			else {
				if (r != 'ff')
					r = cValues[cValues.indexOf(r) + 1]
				if (g != '33')
					g = cValues[cValues.indexOf(g) - 1]
				if (b != '44')
					b = cValues[cValues.indexOf(b) - 1]
			}
		}
		counter = 0
	}

	requestAnimationFrame(rgb)
}

rgb()

let showingInterface = true
function showHideInterface() {
	let interfaceElements = Array.from(document.querySelectorAll('.container'))
	showingInterface = !showingInterface
	if (showingInterface) {
		hideInterfaceBtSpan.innerText = 'Hide Interface'
		// hideInterfaceBt.style.position = ''
		// hideInterfaceBt.style.right = ''
		// hideInterfaceBt.style.bottom = ''
		// hideInterfaceBtDiv.appendChild(hideInterfaceBt)
		interfaceElements.map(el => {
			el.style.display = ''
		})
		window.scrollTo(0, document.body.scrollHeight)
		eyeImg.style.opacity = '.5'
	}
	else {
		interfaceElements.map(el => {
			el.style.display = 'none'
		})
		hideInterfaceBtSpan.innerText = 'Show Interface'
		// hideInterfaceBt.style.position = 'fixed'
		// hideInterfaceBt.style.right = '8px'
		// hideInterfaceBt.style.bottom = '8px'
		// hideInterfaceBt.style.zIndex = '50'
		// document.body.appendChild(hideInterfaceBt)
		eyeImg.style.opacity = '1'
	}
	setBgCanvasSizes()
}



const headerCanvas = document.querySelector('#headerCanvas')
let headerC = headerCanvas.getContext('2d')

headerCanvas.width = 2000
headerCanvas.height = 400

const showText = "Razion Games"

let particleArray = []

const mouse = {
	x: undefined,
	y: undefined,
	radius: headerCanvas.width / 10
}

function setAdjusts() {
	screenAdjustX = headerCanvas.width / headerCanvas.offsetWidth
	screenAdjustY = headerCanvas.height / headerCanvas.offsetHeight
	mouse.radius = headerCanvas.width / 10
}
setAdjusts()

window.addEventListener('resize', setAdjusts)

function mousemove(e) {
	let bounds = headerCanvas.getBoundingClientRect()
	if (e.touches) {
		mouse.x = (e.touches[e.touches.length - 1].clientX - bounds.x) * screenAdjustX
		mouse.y = (e.touches[e.touches.length - 1].clientY - bounds.y) * screenAdjustY
	}
	else {
		mouse.x = (e.x - bounds.x) * screenAdjustX
		mouse.y = (e.y - bounds.y) * screenAdjustY
	}
	mouse.radius = headerCanvas.width / 10
}

window.addEventListener('mousemove', mousemove)
window.addEventListener('touchmove', mousemove)

window.addEventListener('mouseout', () => {
	mouse.x = undefined
	mouse.y = undefined
})
window.addEventListener('touchend', () => {
	mouse.x = undefined
	mouse.y = undefined
})

var textCoordinates

const chars = ['ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ']
const colors = ['#ccc', '#ddd', '#eee', '#fff']

class Particle {
	constructor(x, y) {
		this.x = x * 1.6
		this.y = y * 2.5
		this.size = 1 * headerCanvas.width / 100
		if (this.size < 1)
			this.size = 1
		this.baseX = this.x
		this.baseY = this.y
		this.density = (Math.random() * 100) + 25
		// this.char = chars[Math.floor(Math.random() * chars.length)]
		this.initialColor = '#fff'
		this.color = this.initialColor
		this.colorOnMove = colors[Math.floor(Math.random() * colors.length)]
		// setInterval(() => {
		// 	this.char = chars[Math.floor(Math.random() * chars.length)]
		// }, 100 + Math.floor(Math.random() * 2500))
	}

	draw() {
		// headerC.fillStyle = this.color
		// headerC.font = `bold ${ this.size }px Play`
		// headerC.fillText(this.char, this.x, this.y)

		// headerC.beginPath()
		// headerC.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
		// headerC.closePath()
		// headerC.fill()
		headerCanvas.style.background = `linear-gradient(to right, #101010, #${r}${g}${b}25 25% 75%,#101010)`
		headerC.fillStyle = `#${r}${g}${b}`
		headerC.fillRect(this.x, this.y, this.size / 2.2, this.size)
	}

	update() {
		let dx = mouse.x - this.x
		let dy = mouse.y - this.y
		let distance = Math.sqrt(dx * dx + dy * dy)

		let forceDirectionX = dx / distance
		let forceDirectionY = dy / distance

		let maxDistance = mouse.radius
		let force = (maxDistance - distance) / maxDistance
		let directionX = forceDirectionX * force * this.density
		let directionY = forceDirectionY * force * this.density

		if (distance < mouse.radius) {
			this.x -= directionX
			this.y -= directionY
			this.color = this.colorOnMove
			if (this.size < 2 * headerCanvas.width / 100)
				this.size++
		}
		else {
			this.color = this.initialColor
			if (this.size > 1 * headerCanvas.width / 100)
				this.size--
			if (this.size < 1)
				this.size = 1
			if (this.x !== this.baseX) {
				let dx = this.x - this.baseX
				this.x -= dx / 10
			}
			if (this.y !== this.baseY) {
				let dy = this.y - this.baseY
				this.y -= dy / 10
			}
		}
	}
}

function init() {
	headerC.fillStyle = '#fff'
	headerC.font = 'bold 16px sans-serif'
	headerC.textAlign = 'center'
	headerC.fillText(showText, headerCanvas.width / 30, headerCanvas.height / 25)
	// let img = new Image()
	// img.src = 'dj.png'
	// img.addEventListener('load', () => {
	// 	headerC.drawImage(img, 0, 0, 100, 100)

	textCoordinates = headerC.getImageData(0, 0, headerCanvas.width, headerCanvas.height)

	particleArray = []
	// for (let i = 0; i < 1000; i++) {
	// 	let x = Math.random() * innerWidth
	// 	let y = Math.random() * innerHeight
	// 	particleArray.push(new Particle(x, y))
	// }
	for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
		for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
			if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 130) {
				let positionX = x
				let positionY = y
				particleArray.push(new Particle(positionX * 10 - headerCanvas.width / 50, positionY * 10 - headerCanvas.height / 50))
			}
		}
	}
}

init()

function animate() {
	headerC.clearRect(0, 0, headerCanvas.width, headerCanvas.height)
	let opacityValue = 1
	for (let a = 0; a < particleArray.length; a++) {
		particleArray[a].draw()
		particleArray[a].update()
		// for (let b = a; b < particleArray.length; b++) {
		// 	let dx = particleArray[a].x - particleArray[b].x
		// 	let dy = particleArray[a].y - particleArray[b].y
		// 	let distance = Math.sqrt(dx * dx + dy * dy)
		// 	opacityValue = 1 - (distance/50)
		// 	headerC.strokeStyle = `rgba(255,0,0,${opacityValue})`
		// 	if (distance < 50) {
		// 		headerC.lineWidth = 2
		// 		headerC.beginPath()
		// 		headerC.moveTo(particleArray[a].x, particleArray[a].y)
		// 		headerC.lineTo(particleArray[b].x, particleArray[b].y)
		// 		headerC.stroke()
		// 	}
		// }
	}
	requestAnimationFrame(animate)
}
animate()
// })




// var screen = document.getElementById('screen')
// var frame = document.getElementById('iframe')
// //var fullScreenButton = document.getElementById('fullScreenButton')
// var showedButton = false
// var isFullScreen = false
// var currentSrc = 'menu.html'
// localStorage.setItem('DJGames-href', 'menu.html')
// frame.src = 'menu.html'
// var opacity = .1
// var btSize = 40
// var growing = true
// var activeTimer = false
// var enteringGame = true

// function fullScreen() {

// 	isFullScreen = !isFullScreen

// 	if (isFullScreen) {
// 		centralizeGame()
// 	}
// 	else {
// 		screen.style = ""
// 		frame.style = ""
// 	}

// }

// function orientationChanged() {
// 	centralizeGame()
// }

// function centralizeGame() {
// 	if (isFullScreen) {

// 		screen.style.position = 'absolute'
// 		screen.style.display = 'inline-block'
// 		screen.style.left = '0%'
// 		screen.style.marginTop = "0%"
// 		screen.style.width = "100%"
// 		screen.style.height = "100%"
// 		screen.style.backgroundColor = '#0a1432'
// 		screen.style.paddingTop = '0'
// 		if (localStorage.getItem('DJGames-href') != 'Tetris/tetris.html') {
// 			var width = 1920
// 			var height = 1080
// 		}
// 		else {
// 			var width = 240
// 			var height = 400
// 		}
// 		var maxWidth = window.innerWidth
// 		var maxHeight = window.innerHeight
// 		var ratio = maxWidth / width
// 		if (height * ratio > maxHeight)
// 			ratio = maxHeight / height
// 		frame.style.flex = 0
// 		frame.style.width = width * ratio + 'px'
// 		frame.style.height = height * ratio + 'px'
// 		screen.style.paddingTop = (maxHeight - height * ratio) / 2 + 'px'
// 	}
// }

// function loop() {
// 	if (localStorage.getItem('DJGames-showingMenu') == "true") {
// 		if (isFullScreen) {
// 			fullScreen()
// 		}
// 		else {
// 			screen.style = ""
// 		}
// 		//fullScreenButton.style.display='none'
// 		showedButton = false
// 		opacity = .1
// 		btSize = 40
// 		growing = true
// 		activeTimer = false
// 		enteringGame = true
// 	}
// 	else {
// 		if (enteringGame) {
// 			fullScreen()
// 			enteringGame = false
// 		}
// 		screen.style.border = 'none'
// 		fullScreenButton.style.display = 'block'
// 		if (!showedButton) {
// 			if (btSize < 50 && (growing)) {
// 				fullScreenButton.style.opacity = opacity
// 				fullScreenButton.style.width = btSize + 'px'
// 				fullScreenButton.style.height = btSize + 'px'
// 				opacity += .028
// 				btSize += .4
// 			}
// 			else {
// 				if (!activeTimer) {
// 					activeTimer = true
// 					setTimeout(() => {growing = false}, 3000)
// 				}
// 				if (!growing) {
// 					if (btSize > 40) {
// 						fullScreenButton.style.opacity = opacity
// 						fullScreenButton.style.width = btSize + 'px'
// 						fullScreenButton.style.height = btSize + 'px'
// 						opacity -= .028
// 						btSize -= .4
// 					}
// 					else {
// 						showedButton = true
// 						fullScreenButton.style = ''
// 					}
// 				}
// 			}
// 		}
// 	}

// 	if (currentSrc != localStorage.getItem('DJGames-href')) {
// 		currentSrc = localStorage.getItem('DJGames-href')
// 		frame.src = localStorage.getItem('DJGames-href')
// 	}

// 	setTimeout(loop, 10)

// }

// loop()

// window.onresize = centralizeGame
// window.onorientationchange = orientationChanged

fetch('https://api.razion.app.br/auth/access', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		app: location.host,
		browser: navigator.userAgent,
		language: navigator.language,
		// geolocation: geolocation
	})
})