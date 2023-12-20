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
matrix = matrixGenerator(30,35,20,15,5,5)
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

 /////

 function createObject(matrix){
    for(let y=0;y<matrix.length;y++){
        for(let x=0;x<matrix[y].length;x++){
            if(matrix[y][x]==1){
                let grass=new Grass(x,y) 
                grassArr.push(grass)         
             }else if(matrix[y][x]==2){
                let grEat=new GrassEater(x,y)
                grassEaterArr.push(grEat) 
             }else if(matrix[y][x]==3){
                 let pred=new Predator(x,y)
                 predatorArr.push(pred)
             }else if(matrix[y][x]==4){
                let dragon=new Dragon(x,y)
                dragonArr.push(dragon)
            }else if(matrix[y][x]==5){
                let eater=new Eater(x,y)
                eaterArr.push(eater)
            }
        }
    }
    io.sockets.emit("send matrix",matrix)

 }
 function game(){
    for(let i in grassArr){
        grassArr[i].mul()
    }
    for(let i in grassEaterArr){
        grassEaterArr[i].eat()
    }
    for(let i in predatorArr){
        predatorArr[i].eat()
    }
    for(let i in dragonArr){
        dragonArr[i].eat()
    }
    for(let i in eaterArr){
        eaterArr[i].eat()
    }
    io.sockets.emit("send matrix",matrix)

 }
 setInterval(game,500)

 ///Add buttons
 function AddGrass(){
     for(let i=0;i<7;i++){
        var x = Math.floor(Math.random() * matrix.length)
        var y = Math.floor(Math.random() * matrix.length)

        if(matrix[y][x]==0){
            matrix[y][x]=1
            let grass=new Grass(x,y)
            grassArr.push(grass)
        }
     } 
     io.sockets.emit("send matrix",matrix)
    }

    function AddGrassEater(){
        for(let i=0;i<7;i++){
           var x = Math.floor(Math.random() * matrix.length)
           var y = Math.floor(Math.random() * matrix.length)
   
           if(matrix[y][x]==0){
               matrix[y][x]=2
               let grassEater=new GrassEater(x,y)
               grassEaterArr.push(grassEater)
           }
        } 
        io.sockets.emit("send matrix",matrix)
       }

       function AddPredator(){
        for(let i=0;i<7;i++){
           var x = Math.floor(Math.random() * matrix.length)
           var y = Math.floor(Math.random() * matrix.length)
   
           if(matrix[y][x]==0){
               matrix[y][x]=3
               let predator=new Predator(x,y)
               predatorArr.push(predator)
           }
        } 
        io.sockets.emit("send matrix",matrix)
       }

       function AddDragon(){
        for(let i=0;i<7;i++){
           var x = Math.floor(Math.random() * matrix.length)
           var y = Math.floor(Math.random() * matrix.length)
   
           if(matrix[y][x]==0){
               matrix[y][x]=4
               let dragon=new Dragon(x,y)
               dragonArr.push(dragon)
           }
        } 
        io.sockets.emit("send matrix",matrix)
       }

       function AddEater(){
        for(let i=0;i<7;i++){
           var x = Math.floor(Math.random() * matrix.length)
           var y = Math.floor(Math.random() * matrix.length)
   
           if(matrix[y][x]==0){
               matrix[y][x]=5
               let eater=new Eater(x,y)
               eaterArr.push(eater)
           }
        } 
        io.sockets.emit("send matrix",matrix)
       }


 ////statistika
 var statistics={
     
 }
 setInterval(function(){
     statistics.grass=grassArr.length
     statistics.grassEater=grassEaterArr.length
     statistics.predator=predatorArr.length
     statistics.eater=eaterArr.length
     statistics.dragon=dragonArr.length


     fs.writeFile("statistics.json", JSON.stringify(statistics) ,function(){
         console.log("game of life statistics");
    })
},1000)

 io.on("connection",function(socket){
     createObject(matrix)
     socket.on("addGrass",AddGrass)
     socket.on("addGrassEater",AddGrassEater)
     socket.on("addPredator",AddPredator)
     socket.on("addDragon",AddDragon)
     socket.on("addEater",AddEater)
 })
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