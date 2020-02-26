var screen = document.getElementById('screen')
var frame = document.getElementById('iframe')
//var fullScreenButton = document.getElementById('fullScreenButton')
var showedButton = false
var isFullScreen = false
var currentSrc = 'menu.html'
localStorage.setItem('DJGames-href','menu.html')
frame.src='menu.html'
var opacity = .1
var btSize = 40
var growing = true
var activeTimer = false
var enteringGame = true

function fullScreen(){

    isFullScreen=!isFullScreen

    if(isFullScreen){
        centralizeGame()
    }
    else{
        screen.style=""
        frame.style=""
    }

}

function orientationChanged(){
    centralizeGame()
}

function centralizeGame(){
    if(isFullScreen){
        
        screen.style.position='absolute'
        screen.style.display='inline-block'
        screen.style.left='0%'
        screen.style.marginTop="0%"
        screen.style.width="100%"
        screen.style.height="100%"
        screen.style.backgroundColor='#0a1432'
        screen.style.paddingTop='0'
        if(localStorage.getItem('DJGames-href')!='Tetris/tetris.html'){
            var width = 800
            var height = 600
        }
        else{
            var width = 240
            var height = 400
        }
        var maxWidth = window.innerWidth
        var maxHeight = window.innerHeight
        var ratio = maxWidth / width
        if(height * ratio > maxHeight)
            ratio = maxHeight / height
        frame.style.flex=0
        frame.style.width=width*ratio+'px'
        frame.style.height=height*ratio+'px'
        screen.style.paddingTop=(maxHeight-height*ratio)/2+'px'
    }
}

function loop(){
    if(localStorage.getItem('DJGames-showingMenu')=="true"){
        if(isFullScreen){
            fullScreen()
        }
        else{
            screen.style=""
        }
        //fullScreenButton.style.display='none'
        showedButton=false
        opacity=.1
        btSize=40
        growing=true
        activeTimer=false
        enteringGame=true
    }
    else{
        if(enteringGame){
            fullScreen()
            enteringGame=false
        }
        screen.style.border='none'
        //fullScreenButton.style.display='block'
        if(!showedButton){
            if(btSize<50&&(growing)){
                //fullScreenButton.style.opacity=opacity
                //fullScreenButton.style.width=btSize+'px'
                //fullScreenButton.style.height=btSize+'px'
                opacity+=.028
                btSize+=.4
            }
            else{
                if(!activeTimer){
                    activeTimer=true
                    setTimeout(()=>{growing=false},3000)
                }
                if(!growing){
                    if(btSize>40){
                        //fullScreenButton.style.opacity=opacity
                        //fullScreenButton.style.width=btSize+'px'
                        //fullScreenButton.style.height=btSize+'px'
                        opacity-=.028
                        btSize-=.4
                    }
                    else{
                        showedButton=true
                        //fullScreenButton.style=''
                    }
                }
            }
        }
    }

    if(currentSrc!=localStorage.getItem('DJGames-href')){
        currentSrc=localStorage.getItem('DJGames-href')
        frame.src=localStorage.getItem('DJGames-href')
    }

    setTimeout(loop,10)

}

loop()

window.onresize=centralizeGame
window.onorientationchange=orientationChanged