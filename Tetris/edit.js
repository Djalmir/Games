class Edit{
    constructor(id,text,placeholder,l,t,w,h,cornerRadius){
        this.id=id
        this.text=text
        this.placeholder=placeholder
        this.left=l
        this.top=t
        this.width=w
        this.height=h
        this.cornerRadius=cornerRadius
        this.bgColor=['#343434','#050505']
        this.hover=false
        this.focused=false

        this.input = document.createElement('input')
        this.input.type='text'
        this.input.id=id
        this.input.style.position='absolute'
        this.input.style.backgroundColor='#000'
        this.input.style.border='none'
        this.input.style.color='#000'
        this.input.style.top='-1000px'
        this.input.autocomplete="off"
        this.input.addEventListener('keyup',()=>{this.change()})
        document.body.appendChild(this.input)

        document.addEventListener('mousemove',(e)=>{
            if(showingMenu){
                const rect=canvas.getBoundingClientRect()
                const mX=(e.clientX-rect.left)*(canvas.width/rect.width)
                const mY=(e.clientY-rect.top)*(canvas.height/rect.height)
                if(mX>=this.left&&(mY>=this.top)&&
                (mX<=this.left+this.width)&&(mY<=this.top+this.height))
                    this.hover=true
                else
                    this.hover=false
            }
        })

        document.addEventListener('click',(e)=>{
            this.focused=false
            if(showingMenu){
                document.getElementById(this.id).blur()
                const rect=canvas.getBoundingClientRect()
                const mX=(e.clientX-rect.left)*(canvas.width/rect.width)
                const mY=(e.clientY-rect.top)*(canvas.height/rect.height)
                if(mX>=this.left&&(mY>=this.top)&&
                (mX<=this.left+this.width)&&(mY<=this.top+this.height)){
                    this.focused=true
                    document.getElementById(this.id).focus()
                }
                else{
                    this.focused=false
                }
            }
        })

        var tX,tY
        document.addEventListener('touchstart',(e)=>{
            this.focused=false
            if(showingMenu){
                document.getElementById(this.id).blur()
                const rect=canvas.getBoundingClientRect()
                tX=(e.touches[0].clientX-rect.left)*(canvas.width/rect.width)
                tY=(e.touches[0].clientY-rect.top)*(canvas.height/rect.height)
            }
        })

        document.addEventListener('touchend',(e)=>{
            if(showingMenu){
                if(tX>=this.left&&(tY>=this.top)&&
                (tX<=this.left+this.width)&&(tY<=this.top+this.height)){
                    this.focused=true
                    document.getElementById(this.id).focus()
                }
                else{
                    this.focused=false
                }
            }
        })
    }

    draw(){
        c.lineWidth=this.height
        if(this.cornerRadius){
            c.lineJoin='round'
            c.lineWidth=this.cornerRadius/2
            c.strokeStyle=this.focused||this.hover?this.bgColor[1]:this.bgColor[0]
            c.strokeRect(this.left+(this.cornerRadius/2),this.top+(this.cornerRadius/2),this.width-(this.cornerRadius),this.height-(this.cornerRadius))
            c.fillStyle=this.focused||this.hover?this.bgColor[1]:this.bgColor[0]
            c.fillRect(this.left+(this.cornerRadius/2),this.top+(this.cornerRadius/2),this.width-(this.cornerRadius),this.height-(this.cornerRadius))
        }
        else{
            c.lineJoin='miter'
            c.lineWidth=1
            c.fillStyle=this.focused||this.hover?this.bgColor[1]:this.bgColor[0]
            c.fillRect(this.left,this.top,this.width,this.height)
        }            
        
        if(this.text!==null&&(this.text!==undefined)&&(this.text.trim()!=='')){
            c.fillStyle="white"
            c.fillText(this.text,this.left+(this.width/2),this.top+(this.height/1.5))
        }
        else if (this.placeholder!==null&&(this.placeholder!==undefined)&&(this.placeholder.trim()!=='')){
            c.fillStyle="rgb(180,180,180)"
            c.fillText(this.placeholder,this.left+(this.width/2),this.top+(this.height/1.5))
        }
    }

    change(){
        const input=document.getElementById(this.id)
        this.text=input.value
    }
}