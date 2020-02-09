player = new Object({
    name:'',
    img: new Image(),
    pos:3,
    lastChange: 400,
    speed: 4,
    left: 400,
    top: 500,
    collisionY: 30,
    collisionX:16,
    action: idle,
    jumpping: false,
    startJump: 100,
    jumpForce: 120,
    score: 0,
    collision:new Object({
        left:false,
        right:false,
        top:false,
        bottom:false,
    }),
    detectCollision:function(){
        
        this.collision.left=false
        this.collision.right=false
        this.collision.bottom=false

        if(this.top+this.collisionY+gravity>floorY){
            this.collision.bottom=true
            this.top=floorY-this.collisionY-1
        }
        for(var i = 0; i < boxes.length; i++){

            if(this.left+this.collisionX-5>boxes[i].left-boxes[i].collisionX&&
                this.left-this.collisionX+5<boxes[i].left+boxes[i].collisionX&&
                this.top+this.collisionY<boxes[i].top){

                if(this.top+this.collisionY+gravity>=boxes[i].top-boxes[i].collisionY){
                    this.collision.bottom=true
                    this.top=boxes[i].top-boxes[i].collisionY-this.collisionY-1                   
                }

            }
        }
            
        for(var i = 0; i < boxes.length; i++){
            if(this.left+this.collisionX-4>=boxes[i].left-boxes[i].collisionX&&
                this.left-this.collisionX<boxes[i].left-boxes[i].collisionX&&
                this.top+this.collisionY>boxes[i].top-boxes[i].collisionY&&
                this.top-this.collisionY<boxes[i].top+boxes[i].collisionY){
                    this.collision.right=true
                    
                    if(!boxes[i].collision.player.left&&!boxes[i].collision.top&&
                        boxes[i].collision.bottom&&this.collision.bottom){
                        if(this.action==walkR){
                            boxes[i].collision.player.left=true
                            boxes[i].pushedPosition=boxes[i].left/32
                        }
                    }
            }
            
            if(this.left-this.collisionX+4<=boxes[i].left+boxes[i].collisionX&&
                this.left+this.collisionX>boxes[i].left+boxes[i].collisionX&&
                this.top+this.collisionY>boxes[i].top-boxes[i].collisionY&&
                this.top-this.collisionY<boxes[i].top+boxes[i].collisionY){
                    this.collision.left=true

                    if(!boxes[i].collision.player.right&&!boxes[i].collision.top&&
                        boxes[i].collision.bottom&&this.collision.bottom){
                        if(this.action==walkL){
                            boxes[i].collision.player.right=true
                            boxes[i].pushedPosition=boxes[i].left/32
                        }
                    }
            }
            
        }
        
        
    },
    move: function(){
        
        if(!this.collision.bottom){
            this.top+=gravity
        }

        if (this.action!=idle){
            if (this.action==walkL){
                if(this.left-this.collisionX>0&&(!this.collision.left))
                    this.left-=this.speed
            }
            else if(this.action==walkR){
                if(this.left+this.collisionX<800&&(!this.collision.right))
                    this.left+=this.speed
            }

            if (this.lastChange-this.left>20||this.left-this.lastChange>20){
                if(this.collision.bottom){
                    if(++this.pos>3)
                    this.pos=0
                    this.lastChange=this.left
                }
            }              
            
        }
        else{
            if (!this.jumpping)
                this.pos=3
        }

        if(this.jumpping){
            this.collision.bottom=false
            this.pos=0
            if (this.top>this.startJump-(this.jumpForce/6))
                this.top-=gravity*5
            else if (this.top>this.startJump-(this.jumpForce/4))
                this.top-=gravity*4
            else if (this.top>this.startJump-(this.jumpForce/2))
                this.top-=gravity*3
            else if (this.top>this.startJump-this.jumpForce)
                this.top-=gravity*2
            else
                setTimeout(()=>{this.jumpping=false},50)
        }
    }
})

var canCreate = true
function createNewClaw(){
    if (claws.length<level&&canCreate){
        canCreate=false
        claws.push(new Object({
            id:0,
            left:Math.random()>=.5?800:0,
            top:0,
            speed:level>5?level:5,
            dir:0,
            boxCreated:false,
            move:function(){
                this.left+=this.dir
                if (this.left > 900 || this.left < -100){
                    claws.shift()
                }
            }
        }))
        var existingId=true
        while(existingId){
            claws[claws.length-1].id=1+Math.floor(Math.random()*999)
            existingId=false
            for(var i = 0; i < claws.length-1; i++){
                if(claws[i].id==this.id)
                    existingId=true
            }
        }
        claws[claws.length-1].dir=claws[claws.length-1].left==0?claws[claws.length-1].speed:-claws[claws.length-1].speed
        if(!claws[claws.length-1].boxCreated){
            claws[claws.length-1].boxCreated=true
            createNewBox(claws[claws.length-1].left,claws[claws.length-1].id)            
        }
        setTimeout(()=>canCreate=true,500)
    }
}

function createNewBox(l,clawId) {
    boxes.push(new Object({
        clawId:clawId,
        onClaw:true,
        index:0,
        left:l,
        top:96,
        dropPosition:400,
        pushedPosition:400,
        collisionY:16,
        collisionX:16,
        playedSnd:false,
        collision:new Object({
            left:false,
            right:false,
            bottom:false,
            top:false,
            player:new Object({
                left:false,
                right:false,
                bottom:false
            })
        }),
        detectCollision:function(){
            this.collision.bottom=false
            this.collision.left=false
            this.collision.right=false
            this.collision.top=false

            if(this.top+this.collisionY+gravity>player.top-player.collisionY&&
                this.top+this.collisionY+gravity<player.top+player.collisionY&&
                this.left+this.collisionX>player.left-player.collisionX+4&&
                this.left-this.collisionX<player.left+player.collisionX-4){
                    if(player.jumpping){
                        this.collision.player.bottom=true
                        player.jumpping=false
                    }
                    else
                        gameOver=true
            }
           
            if(this.top+this.collisionY+gravity>floorY){
                this.top=floorY-this.collisionY
                this.collision.bottom=true
                var boxesInLine=0
                for(var i = 0; i < boxes.length; i++){
                    if (boxes[i].top===this.top)
                        boxesInLine++
                }
                if(boxesInLine>=25){
                    breakLine(this.top)
                }
                if(this.top<=128){
                    gameOver=true
                }
            }

            for(var i = 0; i < boxes.length; i++){
                
                if(!this.onClaw){
                    
                    if(boxes[i]!==this){
                        if(this.left+this.collisionX>boxes[i].left-boxes[i].collisionX&&
                            this.left-this.collisionX<boxes[i].left+boxes[i].collisionX&&
                            this.top<boxes[i].top){
                            
                            if(this.top+this.collisionY+gravity>boxes[i].top-boxes[i].collisionY){
                                
                                this.top=boxes[i].top-this.collisionY*2                                
                                this.collision.bottom=true
                                boxes[i].collision.top=true
                                if(this.top<=128&&(boxes[i].collision.bottom)){
                                    gameOver=true
                                    continue
                                }
                                
                            }
                        }  

                        if(this.left+this.collisionX>=boxes[i].left-boxes[i].collisionX&&
                            this.left-this.collisionX<boxes[i].left-boxes[i].collisionX&&
                            this.top+this.collisionY>boxes[i].top-boxes[i].collisionY&&
                            this.top-this.collisionY<boxes[i].top+boxes[i].collisionY){
                                this.collision.right=true
                        }

                        if(this.left-this.collisionX<=boxes[i].left+boxes[i].collisionX&&
                            this.left+this.collisionX>boxes[i].left+boxes[i].collisionX&&
                            this.top+this.collisionY>boxes[i].top-boxes[i].collisionY&&
                            this.top-this.collisionY<boxes[i].top+boxes[i].collisionY){
                                this.collision.left=true
                        }                      
                    }
                }
                
            }
        },
        move:function(){
            if(this.collision.player.bottom){
                this.break()
            }
            else if(this.onClaw){
                for (var i = 0; i < claws.length; i++){
                    if(claws[i].id==this.clawId){
                        this.left=claws[i].left
                        if (claws[i].dir>0){
                            if(this.left>=this.dropPosition){
                                this.onClaw=false
                            }
                                
                        }
                        else{
                            if(this.left<=this.dropPosition){
                                this.onClaw=false
                            }
                                
                        }
                    }
                    if(!this.onClaw)
                        this.left=this.dropPosition 
                }
            }
            else{
                if(!this.collision.bottom){
                    this.top+=gravity
                    this.playedSnd=false
                }
                else{
                    if(!this.playedSnd){
                        if(Math.random()>.5){
                            punch1.currentTime=0
                            punch1.play()
                        }
                        else{
                            punch2.currentTime=0
                            punch2.play()
                        }
                    }
                    this.playedSnd=true
                }
                 
                if(this.collision.player.left&&(this.collision.bottom)){
                    if(!this.collision.right&&(this.pushedPosition<24)){
                        if(this.left<(this.pushedPosition+1)*32)
                            this.left+=player.speed
                        else{
                            this.collision.player.left=false
                            this.left=(this.pushedPosition+1)*32
                        }
                    }
                    
                }
                if(this.collision.player.right&&(this.collision.bottom)){
                    if(!this.collision.left&&(this.pushedPosition>1)){
                        if(this.left>(this.pushedPosition-1)*32)
                            this.left-=player.speed
                        else{
                            this.collision.player.right=false
                            this.left=(this.pushedPosition-1)*32
                        }
                    }
                }

            }
        },
        break: function(){
            boxDestroy(this.left,this.top)
            var destroyingBox = this
            var aux = boxes
            boxes = []
            for (var i = 0; i < aux.length; i++){
                if(aux[i]!==destroyingBox)
                    boxes.push(aux[i])
            }
            player.score+=35
            if(player.score-lastLevelChange>=levelChanger){
                lastLevelChange+=levelChanger
                level++
            }
        }
    }))
    boxes[boxes.length-1].index=boxes.length-1
    boxes[boxes.length-1].dropPosition=(.5+Math.floor(Math.random()*25))*32
    boxes[boxes.length-1].pushedPosition=boxes[boxes.length-1].dropPosition
}

function breakLine(t){
    var aux = boxes
    boxes=[]
    for(var i = 0; i < aux.length; i++){
        if(aux[i].top!==t)
            boxes.push(aux[i])
        else{
            boxDestroy(aux[i].left,aux[i].top)
        }

    }
    explosion.currentTime=0
    explosion.play()
    player.score+=250
    if(player.score-lastLevelChange>=levelChanger){
        lastLevelChange+=levelChanger
        level++
    }

}

function boxDestroy(l,t){
    for(var i = 0; i < 2; i++){
        for(var p = 0; p < 2; p++){
            particles.push(new Object({
                imgPositionX : 0,
                imgPositionY : 0,
                left : 0,
                top : 0,
                dirX : 0,
                dirY : 0,
                move : function(){
                    this.left+=this.dirX
                    if(this.dirY>0){
                        this.top-=gravity
                        this.dirY-=gravity

                    }
                    else
                        this.top+=gravity
                    if(this.top>=620){
                        var aux = particles
                        particles = []
                        for(var x = 0; x < aux.length; x++){
                            if (aux[x].top<620)
                                particles.push(aux[x])
                        }
                    }                        
                }
            }))
            particles[particles.length-1].imgPositionX=p
            particles[particles.length-1].imgPositionY=i
            particles[particles.length-1].left = l-16+p*16
            particles[particles.length-1].top = t-16+i*16
            particles[particles.length-1].dirX = p==0?-(1+Math.random()*3):1+Math.random()*3
            particles[particles.length-1].dirY = 16+Math.random()*100
        }
    }
    explosion2.currentTime=0
    explosion2.play()
}

class Button{
    constructor(left,top,width,height,backgroundColor,font,text,textColor){
        this.left=left
        this.top=top
        this.width=width
        this.height=height
        this.backgroundColor=backgroundColor
        this.font=font
        this.text=text
        this.textColor=textColor
    }
    draw(){
        c.fillStyle=this.backgroundColor
        c.fillRect(this.left,this.top,this.width,this.height)
        c.fillStyle=this.textColor
        c.font = this.font
        c.fillText(this.text,this.left+this.width/2,this.top+this.height/1.75)    
    }
}

class Edit{
    constructor(left,top,width,height,backgroundColor,font,text,placeholder,textColor){
        this.left=left
        this.top=top
        this.width=width
        this.height=height
        this.backgroundColor=backgroundColor
        this.font=font
        this.text=text
        this.placeholder=placeholder
        this.textColor=textColor
        this.focused=false
    }
    draw(){
        c.fillStyle=this.backgroundColor
        c.fillRect(this.left,this.top,this.width,this.height)
        c.fillStyle=this.textColor
        c.font = this.font
        if(this.text.trim()!='')
            c.fillText(this.text,this.left+this.width/2,this.top+this.height/1.75)
        else if(!this.focused){
            c.fillText(this.placeholder,this.left+this.width/2,this.top+this.height/1.75)
        }
    }
}

var mainMenu_editName = new Edit(280,300,240,50,'rgba(100,100,100,.3)','20px Quantico','','Digite seu nome','yellow')
var mainMenu_playBtn = new Button(300,370,200,50,'rgba(100,255,0,.7)','20px Quantico','Jogar','black')
var mainMenu_exitBtn = new Button(320,430,160,40,'rgba(255,0,0,.7)','18px Quantico','Sair','white')

var pauseMenu_restartBtn = new Button(201,339,130,60,'rgba(255,255,255,.1)','20px Quantico','Reiniciar','yellow')
var pauseMenu_continueBtn = new Button(331,339,138,60,'rgba(255,255,255,.1)','20px Quantico','Continuar','yellow')
var pauseMenu_exitBtn = new Button(469,339,130,60,'rgba(255,255,255,.1)','20px Quantico','Finalizar','yellow')

var gameOverMenu_restartBtn = new Button(300,370,200,50,'rgba(100,255,0,.7)','20px Quantico','Reiniciar','black')
var gameOverMenu_exitBtn = new Button(320,430,160,40,'rgba(255,0,0,.7)','20px Quantico','Sair','white')