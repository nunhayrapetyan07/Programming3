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
let matrix=matrixGenerator(30,35,20,15,5,5)
let side=25

let grassArr=[]
let grassEaterArr=[]
let predatorArr=[]
let dragonArr=[]
let eaterArr=[]

function setup(){
    frameRate(10)
    createCanvas(matrix[0].length*side,matrix.length*side)

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
}

function draw(){
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
}