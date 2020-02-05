class Btn{
    constructor(func,text,l,t,w,h,cornerRadius,type){
        this.text=text
        if(type)
            this.type=type
        else
            this.type=0
        switch(this.type){
            case 0:
                this.bgColor='rgb(0,130,0)'
                break
        }
        if(cornerRadius!==undefined&&(cornerRadius!==null))
            this.cornerRadius=cornerRadius
        else
            this.cornerRadius=0
        if(l)
            this.left=l
        else
            this.left=0
        
        if(t)
            this.top=t
        else
            this.top=0
        
        if(w)
            this.width=w
        else
            this.width=100

        if(h)
            this.height=h
        else
            this.height=80

        document.addEventListener('mousemove',(e)=>{
            if(showingMenu){
                const rect=canvas.getBoundingClientRect()
                const mX=(e.clientX-rect.left)*(canvas.width/rect.width)
                const mY=(e.clientY-rect.top)*(canvas.height/rect.height)
                if(mX>=this.left&&(mY>=this.top)&&
                (mX+this.cornerRadius/4<=this.left+this.width)&&(mY+this.cornerRadius/4<=this.top+this.height)){
                    this.bgColor='rgb(0,70,0)'
                    
                }
                else
                    this.bgColor='rgb(0,130,0)'
            }
            
        })

        var tX,tY
        document.addEventListener('touchstart',(e)=>{
            if(showingMenu){
                const rect=canvas.getBoundingClientRect()
                tX=(e.touches[0].clientX-rect.left)*(canvas.width/rect.width)
                tY=(e.touches[0].clientY-rect.top)*(canvas.height/rect.height)
                if(tX>=this.left&&(tY>=this.top)&&
                (tX<=this.left+this.width)&&(tY<=this.top+this.height))
                    this.bgColor='rgb(0,70,0)'
            }
        })

        document.addEventListener('touchend',(e)=>{
            if(showingMenu){
                if(tX>=this.left&&(tY>=this.top)&&
                (tX<=this.left+this.width)&&(tY<=this.top+this.height)){
                    this.bgColor='rgb(0,130,0)'
                    func()
                }
            }
        })

        document.addEventListener('click',(e)=>{
            if(showingMenu){
                const rect=canvas.getBoundingClientRect()
                const mX=(e.clientX-rect.left)*(canvas.width/rect.width)
                const mY=(e.clientY-rect.top)*(canvas.height/rect.height)
                if(mX>=this.left&&(mY>=this.top)&&
                (mX<=this.left+this.width)&&(mY<=this.top+this.height))
                    func()
            }
            
        })
    }

    draw(){
        c.lineWidth=this.height
        if(this.cornerRadius){
            c.lineJoin='round'
            c.lineWidth=this.cornerRadius/2
            c.strokeStyle=this.bgColor
            c.strokeRect(this.left+(this.cornerRadius/2),this.top+(this.cornerRadius/2),this.width-(this.cornerRadius),this.height-(this.cornerRadius))
            c.fillStyle=this.bgColor
            c.fillRect(this.left+(this.cornerRadius/2),this.top+(this.cornerRadius/2),this.width-(this.cornerRadius),this.height-(this.cornerRadius))
        }
        else{
            c.lineJoin='miter'
            c.lineWidth=1
            c.fillStyle=this.bgColor
            c.fillRect(this.left,this.top,this.width,this.height)
        }            
        c.fillStyle="white"
        c.fillText(this.text,this.left+(this.width/2),this.top+(this.height/1.5))
    }
    
}