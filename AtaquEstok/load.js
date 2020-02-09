var canvas = document.getElementById('gameScreen')
var c = canvas.getContext('2d')
c.textAlign='center'

var bg
var player
const walkL = 0
const walkR = 2
const idle = 1
const gravity = 6
const floorY = 579
var claw = new Image()
var claws = []
var box = new Image()
var boxes = []
var particles = []
var startingBoxes = 50
var levelChanger = 500
var level = 1
var lastLevelChange = 0
var paused = false
var gameOver = false
var showingGameOverBackground=false
var newRecord = false
var restarting = false
var explosion, explosion2, punch1, punch2
var musicPlayer = new Audio()
var music1,music2,music3

var loadingImages = []
var loadingSounds = []

function load() {
    var loadedResources=0
    function doneLoading(){
        if(++loadedResources>=loadingImages.length+loadingSounds.length){
            for(var i = 0; i < loadingImages.length; i++){
                loadingImages[i].removeEventListener('load',doneLoading)
            }
            for(var i = 0; i < loadingSounds.length; i++){
                loadingSounds[i].removeEventListener('loadeddata',doneLoading)
            }
            c.clearRect(0,0,800,600)
            openning1()
        }
        else{
            c.clearRect(0,0,800,600)
            c.strokeStyle="rgb(180,180,180)"
            c.strokeRect(350,580,100,10)
            c.fillStyle="gold"
            c.fillRect(350,581,loadedResources*(100/(loadingImages.length+loadingSounds.length)),8)
            c.fillStyle='white'
            c.fillText('Carregando...',400,500)
            c.fillText(Math.floor(loadedResources*(100/(loadingImages.length+loadingSounds.length)))+'%',400,570)
        }
    }

    player.img.addEventListener('load',doneLoading)
    loadingImages.push(player.img)
    
    claw.addEventListener('load',doneLoading)
    loadingImages.push(claw)
    box.addEventListener('load',doneLoading)
    loadingImages.push(box)

    bg = new Image()
    bg.addEventListener('load',doneLoading)
    loadingImages.push(bg)

    explosion = new Audio()
    explosion.addEventListener('loadeddata',doneLoading)
    loadingSounds.push(explosion)

    explosion2 = new Audio()
    explosion2.addEventListener('loadeddata',doneLoading)
    loadingSounds.push(explosion2)

    punch1 = new Audio()
    punch1.addEventListener('loadeddata',doneLoading)
    loadingSounds.push(punch1)

    punch2 = new Audio()
    punch2.addEventListener('loadeddata',doneLoading)
    loadingSounds.push(punch2)

    music1 = new Audio()
    music1.addEventListener('loadeddata',doneLoading)
    loadingSounds.push(music1)
    music1.volume = .5

    music2 = new Audio()
    music2.addEventListener('loadeddata',doneLoading)
    loadingSounds.push(music2)
    music2.volume = .5

    music3 = new Audio()
    music3.addEventListener('loadeddata',doneLoading)
    loadingSounds.push(music3)
    music3.volume = .5

    explosion.src = 'snds/explosion.wav'
    explosion2.src = 'snds/explosion2.wav'
    punch1.src = 'snds/punch-1.wav'
    punch2.src = 'snds/punch-2.wav'
    music1.src = 'musics/music1.ogg'
    music2.src = 'musics/music2.ogg'
    music3.src = 'musics/music3.ogg'
    
    player.img.src = 'imgs/player/player.png'
    bg.src = 'imgs/scenario/bg.png'
    claw.src = 'imgs/objects/claw.png'
    box.src = 'imgs/objects/box.png'   
}
