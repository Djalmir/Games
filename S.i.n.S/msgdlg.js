document.head.innerHTML += "<link rel='stylesheet' type='text/css' href='msgdlg.css'>"
document.body.innerHTML += "<div id='dialogoverlay'><div id='dialogbox'><div id='content'><div id='dialogboxhead' onmousedown='moving=true;' onmouseup='moving=false;'></div><div id='dialogboxbody'></div><div id='dialogboxfoot'></div></div></div></div>"
document.getElementById('dialogoverlay').addEventListener('mousemove', move, false)
var moving = false
var legOk, legSim, legNao, legCancel
var tipo

function showmessage(titulo, mensagem, func, legendaOk) {
	tipo = 'msg'
	var winW = window.innerWidth
	var winH = window.innerHeight
	if (legendaOk != null && (legendaOk != '')) {
		legOk = legendaOk
	}
	else {
		legOk = 'Ok'
	}
	var dialogoverlay = document.getElementById('dialogoverlay')
	var dialogbox = document.getElementById('dialogbox')
	dialogoverlay.style.display = "block"
	dialogoverlay.style.height = winH + "px"
	dialogbox.style.left = (winW / 2) - (550 * .5) + "px"
	dialogbox.style.top = "100px"
	dialogbox.style.display = "block"
	document.getElementById('dialogboxhead').innerHTML = titulo
	document.getElementById('dialogboxbody').innerHTML = mensagem
	document.getElementById('dialogboxfoot').innerHTML = "<button id='btOk' onclick='" + func + ";fecha();' class='dialogBtns'>" + legOk + "</button>"
	document.addEventListener('keydown', clickBtns, false)
}

function confirme(titulo, mensagem, s, n, legendaSim, legendaNao) {
	tipo = 'conf'
	if (legendaSim != null && (legendaSim != '')) {
		legSim = legendaSim
	}
	else {
		legSim = 'Sim'
	}
	if (legendaNao != null && (legendaNao != '')) {
		legNao = legendaNao
	}
	else {
		legNao = 'Não'
	}
	var winW = window.innerWidth
	var winH = window.innerHeight
	var dialogoverlay = document.getElementById('dialogoverlay')
	var dialogbox = document.getElementById('dialogbox')
	dialogoverlay.style.display = "block"
	dialogoverlay.style.height = winH + "px"
	dialogbox.style.left = (winW / 2) - (550 * .5) + "px"
	dialogbox.style.top = "100px"
	dialogbox.style.display = "block"
	document.getElementById('dialogboxhead').innerHTML = titulo
	document.getElementById('dialogboxbody').innerHTML = mensagem
	document.getElementById('dialogboxfoot').innerHTML = "<button id='btSim' class='dialogBtns' onclick='" + s + ";fecha();'>" + legSim + "</button><button id='btNao' class='dialogBtns' onclick='" + n + ";fecha();'>" + legNao + "</button>"
	document.addEventListener('keydown', clickBtns, false)
}

function confirmeC(titulo, mensagem, s, n, legendaSim, legendaNao, legendaCancel) {
	tipo = 'confC'
	if (legendaSim != null && (legendaSim != '')) {
		legSim = legendaSim
	}
	else {
		legSim = 'Sim'
	}
	if (legendaNao != null && (legendaNao != '')) {
		legNao = legendaNao
	}
	else {
		legNao = 'Não'
	}
	if (legendaCancel != null && (legendaCancel != '')) {
		legCancel = legendaCancel
	}
	else {
		legCancel = 'Cancelar'
	}
	var winW = window.innerWidth
	var winH = window.innerHeight
	var dialogoverlay = document.getElementById('dialogoverlay')
	var dialogbox = document.getElementById('dialogbox')
	dialogoverlay.style.display = "block"
	dialogoverlay.style.height = winH + "px"
	dialogbox.style.left = (winW / 2) - (550 * .5) + "px"
	dialogbox.style.top = "100px"
	dialogbox.style.display = "block"
	document.getElementById('dialogboxhead').innerHTML = titulo
	document.getElementById('dialogboxbody').innerHTML = mensagem
	document.getElementById('dialogboxfoot').innerHTML = "<button id='btSim' class='dialogBtns' onclick='" + s + ";fecha();'>" + legSim + "</button><button id='btNao' class='dialogBtns' onclick='" + n + ";fecha();'>" + legNao + "</button><button id='btCancel' class='dialogBtns' onclick='fecha();'>" + legCancel + "</button>"
	document.addEventListener('keydown', clickBtns, false)
}

function clickBtns(e) {
	if (tipo == 'msg') {
		if (e.keyCode == 13 || e.keyCode == 27) {
			document.getElementById('btOk').click()
		}
	}
	else if (tipo == 'conf') {
		if (e.keyCode == 13 || e.keyCode == 83) {
			document.getElementById('btSim').click()
		}
		else if (e.keyCode == 27 || e.keyCode == 78) {
			document.getElementById('btNao').click()
		}
	}
	else if (tipo == 'confC') {
		if (e.keyCode == 83 || (e.keyCode == 13)) {
			document.getElementById('btSim').click()
		}
		else if (e.keyCode == 78) {
			document.getElementById('btNao').click()
		}
		else if (e.keyCode == 27 || (e.keyCode == 67)) {
			document.getElementById('btCancel').click()
		}
	}
}

function fecha() {
	document.getElementById('dialogbox').style.display = "none"
	document.getElementById('dialogoverlay').style.display = "none"
	document.removeEventListener("keydown", clickBtns)
}

function move(e) {
	if (moving) {
		var dialogbox = document.getElementById('dialogbox')
		dialogbox.style.margin = "0px"
		var head = document.getElementById('dialogboxhead')
		var xPosition = e.clientX - (dialogbox.offsetWidth / 2)
		var yPosition = e.clientY - (head.offsetHeight / 2)
		var translate3dValue = 'translate3d(' + xPosition + 'px,' + yPosition + 'px, 0)'
		dialogbox.style.transform = translate3dValue
	}
}