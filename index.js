// function move(e) {
// 	mouseSeeker.style.top = (e.touches ? e.touches[e.touches.length - 1].clientY : e.clientY) + window.scrollY + 'px'
// 	mouseSeeker.style.left = (e.touches ? e.touches[e.touches.length - 1].clientX : e.clientX) + window.scrollX + 'px'
// 	e.preventDefault()
// }
// document.onmousemove = move
// document.ontouchmove = move

let canvas = document.querySelector('#canvas')
let c = canvas.getContext('2d')

let cWidth = document.body.offsetWidth
let cHeight = document.body.offsetHeight
function setCanvasSizes() {
	canvas.width = document.body.offsetWidth
	canvas.height = document.body.offsetHeight
	cWidth = document.body.offsetWidth
	cHeight = document.body.offsetHeight
}
setCanvasSizes()
window.addEventListener('resize', setCanvasSizes)

let mousePos = {x: 0, y: 0}

function mouseMove(e) {
	mousePos = {
		x: (e.touches ? e.touches[e.touches.length - 1].clientX : e.clientX) + window.scrollX,
		y: (e.touches ? e.touches[e.touches.length - 1].clientY : e.clientY) + window.scrollY
	}
}
document.onmousemove = mouseMove
document.ontouchmove = mouseMove

// #0099ff, #77ff77, #ff3344
let cValues = ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff']

let r = 'ff', g = '33', b = '44'

let switchingColors = {
	from: 'red',
	to: 'green'
}

let counter = 0
let arcRadius = 150
let arcRadiusAction = 'grow'
let breathCounter = 0
function rgb() {

	let grd = c.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, arcRadius-50)
	grd.addColorStop(0, `#${ r }${ g }${ b }`)
	grd.addColorStop(1, `#${ r }${ g }${ b }00`)

	c.fillStyle = grd
	// c.fillStyle = `#${ r }${ g }${ b }`
	c.beginPath()
	c.arc(mousePos.x, mousePos.y, arcRadius, 0, 2 * Math.PI, true)
	c.closePath()
	c.fill()

	if (breathCounter++ >= 3) {
		switch (arcRadiusAction) {
			case ('grow'):
				arcRadius++
				if (arcRadius >= 180)
					arcRadiusAction = 'shrink'
				break
			case ('shrink'):
				arcRadius--
				if (arcRadius <= 150)
					arcRadiusAction = 'grow'
				break
		}
		breathCounter=0
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
	let interfaceElements = [document.querySelector('header'), ...Array.from(document.querySelectorAll('.container')), document.querySelector('footer')]
	showingInterface = !showingInterface
	if (showingInterface) {
		hideInterfaceBtSpan.innerText = 'Hide Interface'
		hideInterfaceBt.style.position = ''
		hideInterfaceBt.style.right = ''
		hideInterfaceBt.style.bottom = ''
		hideInterfaceBtDiv.appendChild(hideInterfaceBt)
		// document.body.removeChild(hideInterfaceBt)
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
		hideInterfaceBt.style.position = 'fixed'
		hideInterfaceBt.style.right = '8px'
		hideInterfaceBt.style.bottom = '8px'
		hideInterfaceBt.style.zIndex = '50'
		document.body.appendChild(hideInterfaceBt)
		// document.querySelector('footer').removeChild(hideInterfaceBt)
		eyeImg.style.opacity = '1'
	}
}




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