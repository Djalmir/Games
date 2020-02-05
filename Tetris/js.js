const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

let arena
let player
const colors=[null,'#e5ff00','#ff7300','#3030ff','#48ff00','#c90000','#7f00b9','#0099ff']
const keys = [65,37,68,39,83,40,74,86,75,32]
const sounds=new Sounds
sounds.explosion.volume=.5;
let lastTime=0
var isGameOver=true
var gamePaused=false
var highGraphics = screen.width>800?1:0

var record = localStorage.getItem('DJ-Tetris-record')?parseInt(localStorage.getItem('DJ-Tetris-record')):0
var recordOwner = localStorage.getItem('DJ-Tetris-recordOwner')?localStorage.getItem('DJ-Tetris-recordOwner'):''

var showingMenu=false

let opacity=1
let growingOpacity=false

