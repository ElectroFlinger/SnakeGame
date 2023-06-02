// Game Constants & variables
let inputDir = {x: 0, y: 0};//initialising a javascript object -- this is done because at t = 0 , we want our snake to be still
const foodSound = new Audio('food.mp3');
const gaveOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3'); // here let our variable name is music and our audio file is also music this create problem 
                                        // so use cont for these things
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13 , y:15}
]
food = {x: 6 , y:7};

// game loop for doing same thing over and over
// setInterval() --> this method can help for doing things repetately in java script

// but if you are operating with animation use window.requestAnimationFrame(main);


// Game Functions
function main(ctime){
    window.requestAnimationFrame(main); // this will create a game loop 
    // console.log(ctime);
    if(((ctime-lastPaintTime)/1000) < (1/speed)){
        return ;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollied(snake){
    // if you bump into yourself
    for(let i = 1 ; i<snakeArr.length ; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If your bumbed into the wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
}


function gameEngine(){
    // Part 1: Updating the snake array and food
    if(isCollied(snakeArr)){
        gaveOverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y:0};
        alert("Game Over.");
        snakeArr = [{x:13 , y: 15}];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score = "+score;
    }

    // If you have eaten the food , increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score = "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x:Math.round(a+(b-a) * Math.random()) , y:Math.round(a + (b-a)* Math.random())}; // generate random number from a to b
    }

    // Moving the snake
    for (let i = snakeArr.length-2 ; i >= 0 ; i--){
        const element = snakeArr[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });


    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
// Main Logic Starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1}; // Start the game
    moveSound.play();

    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

});
