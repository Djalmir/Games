class Player{
    constructor(arena){
        this.name=edNome.text
        this.arena=arena
        this.matrix=null
        this.pos={x:0,y:0}
        this.dropCounter=0
        this.dropSlow=1000
        this.dropFast=50
        this.dropSpeed=1000
        this.lastSpeedChange=0
        this.score=0
        this.color='#f00'
        this.move=0
        this.moveCounter=0
        this.moveSpeed=150
        this.shadowBlur=10
        this.growingShadow=true
        this.shadowCounter=0
    }

    newPiece(){
        const pieces = 'IJLOSTZ'
        const piece = pieces[Math.random()*pieces.length|0]
        if (piece==='I'){
            this.matrix=[
                [0,0,1,0],
                [0,0,1,0],
                [0,0,1,0],
                [0,0,1,0]
            ]
        }
        else if(piece==='J'){
            this.matrix=[
                [0,2,0],
                [0,2,0],
                [2,2,0]
            ]
        }
        else if(piece==='L'){
            this.matrix=[
                [0,3,0],
                [0,3,0],
                [0,3,3]
            ]
        }
        else if(piece==='O'){
            this.matrix=[
                [4,4],
                [4,4]
            ]
        }
        else if(piece==='S'){
            this.matrix=[
                [0,5,5],
                [5,5,0],
                [0,0,0]
            ]
        }
        else if(piece==='T'){
            this.matrix=[
                [0,6,0],
                [6,6,6],
                [0,0,0]
            ]
        }
        else if(piece==='Z'){
            this.matrix=[
                [7,7,0],
                [0,7,7],
                [0,0,0]
            ]
        }
        this.pos={x:Math.ceil(this.arena.matrix[0].length/2-this.matrix[0].length/2),y:0}
    }

    draw(){
        c.strokeStyle='#141414'
        c.lineWidth=1
        this.matrix.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if(value!==0){
                    c.fillStyle=colors[value]
                    if(highGraphics){
                        c.shadowColor=colors[value]
                        c.shadowBlur=this.shadowBlur
                    }
                    c.strokeRect(this.pos.x*20+x*20,this.pos.y*20+y*20,20,20)
                    c.fillRect(this.pos.x*20+x*20,this.pos.y*20+y*20,20,20)
                    if(highGraphics)
                        c.shadowBlur=null
                }
            })
        })
    }

    rotate(dir){
        if(!gamePaused){
            sounds.turn.currentTime=0
            sounds.turn.play()
            const pos=this.pos.x
            let offset = 1

            for(var i=0;i<this.matrix.length;i++){
                for(var p=0; p<i; p++){
                    [this.matrix[p][i],this.matrix[i][p]]=[this.matrix[i][p],this.matrix[p][i]]
                }
            }

            if(dir>0){
                this.matrix.forEach(row => row.reverse())
            }
            else{
                this.matrix.reverse()
            }

            while (this.arena.collide(this)){
                this.pos.x += offset
                offset= -(offset + (offset>0?1:-1))
                if (offset>this.matrix[0].length){
                    this.rotate(-dir)
                    this.pos.x = pos
                    return
                }
            }
        }
    }

    update(deltaTime){
        if(highGraphics){
            this.shadowCounter+=deltaTime
            if(this.shadowCounter>=20){
                if (this.shadowBlur<30&&this.growingShadow)
                    this.shadowBlur++
                else{
                    this.shadowBlur--
                    if(this.shadowBlur<=10)
                        this.growingShadow=true
                    else
                        this.growingShadow=false        
                }
                this.shadowCounter=0
            }
        }

        this.moveCounter+=deltaTime
        if(this.move!=0){
            if(this.moveCounter>=this.moveSpeed){
                this.pos.x+=this.move
                if(arena.collide(this)){
                    this.pos.x-=this.move
                }
                this.moveCounter=0
            }
        }

        if(this.score-this.lastSpeedChange>=100){
            this.lastSpeedChange+=100
            if(this.dropSlow>150){
                this.dropSlow-=50
                if(this.dropSpeed!=this.dropFast)
                    this.dropSpeed=this.dropSlow
            }
        }
        this.dropCounter+=deltaTime
        if (this.dropCounter>=this.dropSpeed){
            this.pos.y++
            this.dropCounter=0
        }
        if(arena.collide(this)){
            this.pos.y--
            arena.merge(this)
            const score = arena.sweep()
            if(score){
                this.score+=score
            }
            else{
                sounds.merge.currentTime=0
                sounds.merge.play()
            }
            this.newPiece()
            this.dropSpeed=this.dropSlow
            if(arena.collide(this)){
                isGameOver=true
            }
        }
    }

}