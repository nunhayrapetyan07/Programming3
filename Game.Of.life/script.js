var socket=io()
let side=25

function setup(){
     createCanvas(30*side,30*side)

    
    }
    socket.on("Spring", function (data) {
        weath = data;
    })
socket.on("Summer", function (data) {
    weath = data;
})
socket.on("Autumn", function (data) {
    weath = data;
})
socket.on("Winter", function (data) {
    weath = data;
})
 var weath = "spring";

function nkarel(matrix){
    for(let y=0;y<matrix.length;y++){
        for(let x=0;x<matrix[y].length;x++){
            if (matrix[y][x] == 1) {
                if (weath = "spring") {
                    fill("darkgreen");
                }
                else if (weath == "summer") {
                    fill("#79a83b");
                }
                else if (weath == "autumn") {
                    fill("#ff8453");
                }
                if (weath == "winter") {
                    fill("#ffffff");
                }
            }
            else if(matrix[y][x]==1){
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

    socket.on("send matrix",nkarel)

    


function AddGrass(){
    socket.emit("addGrass")
}
function AddGrassEater(){
   socket.emit("addGrassEater")
}
function AddPredator(){
   socket.emit("addPredator")
}
function AddDragon(){
   socket.emit("addDragon")
}
function AddEater(){
   socket.emit("addEater")
}

function Spring() {
    socket.emit("spring");
}
function Summer() {
    socket.emit("summer");
}
function Autumn() {
    socket.emit("autumn");
}

function Winter() {
    socket.emit("winter");
}