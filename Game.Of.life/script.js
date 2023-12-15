var socket=io()
let side=25

function setup(){
     createCanvas(30*side,30*side)

    
}

function nkarel(matrix){
    for(let y=0;y<matrix.length;y++){
        for(let x=0;x<matrix[y].length;x++){
            if(matrix[y][x]==1){
                fill("green")      
             }else if (matrix[y][x]==2){
                fill("white")      
             }else if(matrix[y][x]==3){
                 fill ("magenta")
             }else if(matrix[y][x]==4){
                fill ("orange")
            }else if(matrix[y][x]==5){
                fill ("red")
            }
             else{
                 fill("grey")
             }
             rect(x*side,y*side,side,side)
        }
    }
    
}
setInterval(function(){
    socket.on("send matrix",nkarel)
},500)