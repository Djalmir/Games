class Arena{
    constructor(w,h){
        const buildingArena=[]
        while (h--){
                buildingArena.push(new Array(w).fill(0))
        }

        this.matrix=buildingArena
    }

    collide(player){
        const [m,p] = [player.matrix,player.pos]
        for (var y = 0; y<m.length; y++){
            for (var x = 0; x<m[y].length; x++){
                if (m[y][x]!==0&&
                    (this.matrix[y+p.y]&&
                    this.matrix[y+p.y][x+p.x])!==0){
                    return true
                }
            }
        }
        return false
    }

    merge(player){
        player.matrix.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if (value!==0){
                    this.matrix[y+player.pos.y][x+player.pos.x]=value
                }
            })
        })
    }

    draw(){
        c.strokeStyle='#141414'
        c.lineWidth=1
        this.matrix.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if (value!==0){
                    c.fillStyle=colors[value]
                    c.strokeRect(x*20,y*20,20,20)
                    c.fillRect(x*20,y*20,20,20)

                }
            })
        })
    }

    sweep(){
        let rowCount=1
        let score=0
        search: for(var y=this.matrix.length-1;y>=0;y--){
            for(var x=0; x<this.matrix[0].length;x++){
                if(this.matrix[y][x]===0){
                    continue search
                }
            }

            sounds.explosion.currentTime=0
            sounds.explosion.play()
            const row = this.matrix.splice(y,1)[0].fill(0)
            this.matrix.unshift(row)            
            ++y
            score+=rowCount*10
            rowCount*=2
        }
        return score
    }

}