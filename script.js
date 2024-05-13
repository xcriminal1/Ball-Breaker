const ball = document.querySelector('.ball');
const gameContainer = document.querySelector('.game-container');
let gameInterval;
const numberOfBalls = 8; // Number of balls to generate constantly
let isGameOver = false;
let restartButton; // Declare the restart button outside the functions

let ballPosition = 50; // Initial position of the ball (in percentage from the left)

// Function to move the ball
function moveBall(distance) {
  ballPosition += distance;
  if (ballPosition < 0) ballPosition = 0;
  if (ballPosition > 100) ballPosition = 100;
  ball.style.left = ballPosition + '%';
}

// Function to handle keyboard input
function handleKeyPress(event) {
  const key = event.key;
  if (key === 'ArrowLeft') {
    moveBall(-5); // Move the ball 5% to the left
  } else if (key === 'ArrowRight') {
    moveBall(5); // Move the ball 5% to the right
  }
}

// Function to generate an obstacle (ball)
function generateObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = Math.random() * 90 + 5 + '%'; // Random horizontal position (5% to 95%)
  gameContainer.appendChild(obstacle);

  const obstacleInterval = setInterval(() => {
    const obstacleBottom = obstacle.offsetTop + obstacle.offsetHeight;
    const containerHeight = gameContainer.offsetHeight;
    if (obstacleBottom >= containerHeight) {
      obstacle.remove();
      clearInterval(obstacleInterval);
    }
    // Check for collision with the ball
    if (isColliding(obstacle)) {
      clearInterval(gameInterval);
      gameOver();
    }
  }, 10); // Adjust this value to control the falling speed of balls
}

// Function to check collision between the ball and an obstacle (ball)
function isColliding(obstacle) {
  const ballRect = ball.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  return (
    ballRect.left < obstacleRect.right &&
    ballRect.right > obstacleRect.left &&
    ballRect.top < obstacleRect.bottom &&
    ballRect.bottom > obstacleRect.top
  );
}

// Function to handle the game over state
function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval);
  
    const gameOverMsg = document.createElement('div');
    gameOverMsg.innerText = 'Game Over';
    gameOverMsg.classList.add('game-over');
    gameContainer.appendChild(gameOverMsg);
  
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart Game';
    restartButton.classList.add('restart-button');
    restartButton.addEventListener('click', restartGame);
    gameContainer.appendChild(restartButton);


    if (!restartButton) { // Check if the restart button doesn't exist
        restartButton = document.createElement('button');
        restartButton.innerText = 'Restart Game';
        restartButton.classList.add('restart-button');
        restartButton.addEventListener('click', restartGame);
        gameContainer.appendChild(restartButton);
      }
  }
  
  
  // Function to restart the game
  function restartGame() {
    isGameOver = false;
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach((obstacle) => obstacle.remove());
    const gameOverMsg = document.querySelector('.game-over');
    const restartButton = document.querySelector('.restart-button');
    if (gameOverMsg) gameOverMsg.remove();
    if (restartButton) restartButton.remove(); // Remove the "Restart Game" button
    ballPosition = 50;
    ball.style.left = '50%';
    startGame();
  }

// Main game loop
function gameLoop() {
  for (let i = 0; i < numberOfBalls; i++) {
    generateObstacle();
  }
}

// Start the game
function startGame() {
    if (!isGameOver) {
      gameInterval = setInterval(gameLoop, 2000); // Ball generation interval set to 2 seconds
    }
  }
  

// Event listener to handle keyboard input
window.addEventListener('keydown', handleKeyPress);

// Start the game when the page loads
startGame();
