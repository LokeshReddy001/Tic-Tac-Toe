var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pos = document.getElementById("pos")
var btn = document.getElementById("btn")
btn.style.visibility='hidden'
class circ {
    constructor(x,y){
        ctx.beginPath();
        ctx.arc(75+150*x,75+150*y,40,0,2*Math.PI);
        ctx.stroke();
    }
}

class cross {
    constructor(x,y){
        var cenx=75+150*x;
        var ceny=75+150*y;
        ctx.moveTo(cenx,ceny);
        
        ctx.lineTo(cenx+28.28,ceny-28.28);
        ctx.stroke();
        ctx.moveTo(cenx,ceny);
        ctx.lineTo(cenx+28.28,ceny+28.28);
        ctx.stroke();
        ctx.moveTo(cenx,ceny);
        ctx.lineTo(cenx-28.28,ceny-28.28);
        ctx.stroke();
        ctx.moveTo(cenx,ceny);
        ctx.lineTo(cenx-28.28,ceny+28.28);
        ctx.stroke();
    }
}

class block {
    constructor(x,y,entry){
        this.x=x;
        this.y=y;
        this.fill=false;
        this.entry=entry;
    }
}
// creates a board;
for(let  x=0;x<=2;x+=1){
    for(let y=0;y<=2;y+=1){
        ctx.moveTo(150*x,150*y);
        ctx.lineTo(150*x+150,150*y);
        ctx.moveTo(150*x+150,150*y);
        ctx.lineTo(150*x+150,150*y+150);
        ctx.stroke();
    }
}

ctx.lineWidth=10;
var player1=true;

const blocks=[]

for(let x=0;x<3;x++){
    for(let y=0;y<3;y++){
        blocks[y+3*x]=new block(x,y,"null");
    }
}

var gameover=false;

function wincheck(){ // checks if there is a win
    for(let x=0;x<3;x++){ // row and columns check 
        
        if(blocks[3*x].fill && blocks[3*x+1].fill && blocks[3*x+2].fill){
            var s1=blocks[3*x].entry;
            var s2=blocks[3*x+1].entry;
            var s3=blocks[3*x+2].entry;
            if(s1==s2 && s2==s3){
                return true
            }
        }

        if(blocks[x].fill && blocks[x+3].fill && blocks[x+6].fill){
            var s1=blocks[x].entry;
            var s2=blocks[3+x].entry;
            var s3=blocks[6+x].entry;
            if(s1==s2 && s2==s3){
                return true
            }
        }
    }
    //diagnol check
    if(blocks[0].fill && blocks[4].fill && blocks[8].fill){
        var s1=blocks[0].entry;
        var s2=blocks[4].entry;
        var s3=blocks[8].entry;
        if(s1==s2 && s2==s3){
            return true
        }
    }
    
    if(blocks[2].fill && blocks[4].fill && blocks[6].fill){
        var s1=blocks[2].entry;
        var s2=blocks[4].entry;
        var s3=blocks[6].entry;
        if(s1==s2 && s2==s3){
            return true
        }
    }
    // if no win position return false
    return false;
}


function func(e){
    if(gameover==false){
        var xpos = e.clientX-canvas.offsetLeft;
        var ypos = e.clientY-canvas.offsetTop;
        // document.getElementById("pos").innerHTML += "X: "+ xpos +" Y: "+ ypos;
        var yindex = Math.floor(xpos/150);
        var xindex = Math.floor(ypos/150);
        if(blocks[yindex + 3*xindex].fill){
            alert("Block is already filled");
        }
        else{
            if(player1==false){
                cross1=new cross(yindex,xindex);
                player1=true;
                blocks[yindex + 3*xindex] = new block(xindex,yindex,"cross");
                blocks[yindex + 3*xindex].fill =true;
            }
            else{
                circ1 = new circ(yindex,xindex);
                player1=false;
                blocks[yindex + 3*xindex] = new block(xindex,yindex,"circ");
                blocks[yindex + 3*xindex].fill =true;
            }

            if(wincheck()){
                if(player1){
                    var txt=""
                    txt+="<br>";
                    txt+="Player X win."
                    btn.style.visibility="visible";
                    pos.innerHTML+=txt;
                    
                }
                else{
                    // alert("player1 win");
                    var txt=""
                    txt+="<br>";
                    txt+="Player O win."
                    btn.style.visibility="visible";
                    pos.innerHTML+=txt;
                }
                gameover=true;
                // location.reload()
            }
            else{
                var count=0
                for(let x=0;x<3;x++){
                    for(let y=0;y<3;y++){
                        count+=blocks[y+3*x].fill;
                    }
                }
                if(count==9){
                    var txt=""
                    txt+="<br>";
                    txt+="Draw"
                    btn.style.visibility="visible";
                    pos.innerHTML+=txt;
                    gameover=true;
                }
                
            }
        }
    } 
}

canvas.addEventListener('click', func);
