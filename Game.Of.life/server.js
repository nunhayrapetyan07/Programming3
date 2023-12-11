var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/',function (req,res){
    res.redirect('index.html')
});
server.listen(3000,()=>{
    console.log('connected');
});
function matrixGenerator(matrixSize,grassCount,grassEaterCount,predatorCount,dragonCount,eaterCount){
    let matrix=[]

    for(let i=0;i<matrixSize;i++){
        matrix.push([])
        for(let j=0;j<matrixSize;j++){
            matrix[i].push(0)
        }
    }
    for(let i=0;i<grassCount;i++){
        let x=Math.floor(Math.random()*matrixSize)
        let y=Math.floor(Math.random()*matrixSize)

        if(matrix[y][x]==0){
            matrix[y][x]=1
        }
    }
    for(let i=0;i<grassEaterCount;i++){
        let x=Math.floor(Math.random()*matrixSize)
        let y=Math.floor(Math.random()*matrixSize)

        if(matrix[y][x]==0){
            matrix[y][x]=2
        }
    }
    for(let i=0;i<predatorCount;i++){
        let x=Math.floor(Math.random()*matrixSize)
        let y=Math.floor(Math.random()*matrixSize)

        if(matrix[y][x]==0){
            matrix[y][x]=3
        }
    }
    for(let i=0;i<dragonCount;i++){
        let x=Math.floor(Math.random()*matrixSize)
        let y=Math.floor(Math.random()*matrixSize)

        if(matrix[y][x]==0){
            matrix[y][x]=4
        }
    }
    for(let i=0;i<eaterCount;i++){
        let x=Math.floor(Math.random()*matrixSize)
        let y=Math.floor(Math.random()*matrixSize)

        if(matrix[y][x]==0){
            matrix[y][x]=5
        }
    }

    return matrix
}
let matrix = matrixGenerator(30,35,20,15,5,5)
io.sockets.emit("send matrix",matrix)

////character arrays
grassArr=[]
 grassEaterArr=[]
 predatorArr=[]
 dragonArr=[]
 eaterArr=[]
 
 /////modules
 let Grass = require("./grass")
 let GrassEater = require("./grassEater")
 let Predator = require("./predator")
 let Eater = require("./eater")
 let Dragon = require("./dragon")
 