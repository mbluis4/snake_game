const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
let score = document.getElementById("score");
let lose = document.getElementById("lose");
let scoreVar = 0;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let speedSnake;
let appleIndex = 0;
let timeId;

// create grid and styles

let createGrid = () => {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    //square.textContent = i;
    grid.appendChild(square);
    square.classList.add("square");
    squares.push(square);
  }
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
};
createGrid();

//clearInterval(timeId's), stop movement

//movement
let control = (event) => {
  if (event.key === "ArrowRight") {
    console.log("moving right");
    direction = 1;
  } else if (event.key === "ArrowLeft") {
    console.log("moving left");
    direction = -1;
  } else if (event.key === "ArrowUp") {
    console.log("moving up");
    direction = -width;
  } else if (event.key === "ArrowDown") {
    console.log("moving down");
    direction = +width;
  } else if (event.key === "p") {
    clearInterval(timeId);
    console.log("game stopped");
  }
};

// MOVE
let move = () => {
  //if snake hit the bottom
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    //if snake hit the rigth wall
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    //if snake hit the left wall
    (currentSnake[0] % width === 0 && direction === -1) ||
    //if snake hit the top wall
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    lose.style.display = "inline";
    return clearInterval(timeId);
  }

  // remove last element from our currentSnake array
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  //add new element to the front +1
  currentSnake.unshift(currentSnake[0] + direction);

  //deal with snake head getting the apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove("apple");
    //grow our snake by adding class of snake to it
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    //generate new apple
    generateApples();
    //increase score
    scoreVar++;
    score.textContent = scoreVar;
    //speed up our snake
    speedSnake = speedSnake * 0.9;
    clearInterval(timeId);
    timeId = setInterval(move, speedSnake);
    console.log("apple eaten!");
  }

  squares[currentSnake[0]].classList.add("snake");
};

let generateApples = () => {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
};
//generateApples()

// Start

startBtn.addEventListener("click", () => {
  clearInterval(timeId);
  currentSnake = [2, 1, 0];
  squares.forEach((index) => index.classList.remove("snake", "apple"));
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  direction = 1;
  scoreVar = 0;
  score.textContent = scoreVar;
  speedSnake = 500;
  lose.style.display = "none";
  generateApples();
  timeId = setInterval(move, speedSnake);
});
document.addEventListener("keydown", control);

/* other aproach
//movement
let moveKeys = (event) => {
    clearAllIntervals()
    if(event.key === 'ArrowRight') {
        console.log('moving right')
       
        timeId_R = setInterval(moveRight, speed) 
    } else if(event.key === 'ArrowLeft') {
        console.log('moving left')
       
        timeId_L = setInterval(moveLeft, speed)
    } else if(event.key === 'ArrowUp') {
        console.log('moving up')
        timeId_U = setInterval(moveUp, speed)
    } else if(event.key === 'ArrowDown') {
        console.log('moving down')
        timeId_D = setInterval(moveDown, speed)
    } else if(event.key === 'p') {
       
        console.log('game stopped')
    }
}

// MOVE RIGHT
let moveRight = () => {
    //change direction
    direction = 1
    // remove last element from our currentSnake array
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    //add new element to the front +1
    currentSnake.unshift(currentSnake[0]+direction)
    squares[currentSnake[0]].classList.add("snake")  
}

 // MOVE LEFT
let moveLeft = () => {
    // change direction
    direction = -1
    const head = currentSnake.shift()
    squares[head].classList.remove("snake")
    currentSnake.push(currentSnake[1]+direction)
    squares[currentSnake[2]].classList.add('snake')
}

// MOVE DOWN
let moveDown = () =>  {

    if (direction<0) {
        console.log("going down from left")
        const tail_3 = currentSnake.shift()
        squares[tail_3].classList.remove('snake')
        currentSnake.push(currentSnake[1]+10)
        squares[currentSnake[2]].classList.add('snake')

    } else {
        const tail_2 = currentSnake.pop()
        squares[tail_2].classList.remove('snake')
        currentSnake.unshift(currentSnake[0]+10)
        squares[currentSnake[0]].classList.add('snake')
    }
}

document.addEventListener("keydown", moveKeys )

*/
