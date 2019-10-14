//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum  = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn= document.querySelector('#guess-btn'),
       message = document.querySelector('.message');

//Assign Min and Max Num

minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', (e) => {
  if(e.target.classList.contains('play-again') ){
    window.location.reload();
  }
})

// Handle Submit
let handleSubmit = () => {
  let guess = parseInt(guessInput.value)
  console.log(guess)

  //Validate 
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }else {
    message.textContent = '';
  }
  
  //Check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`)
  } else {
    //Wrong Number
    guessesLeft -=1;

    if (guessesLeft === 0) {
      //Game over - lost
      gameOver(false, `Game over, YOU LOSE! the correct number was ${winningNum} `)
    } else {
      //Game continues-- answer wrong

      //Change border color
      guessInput.style.borderColor = 'red';

      //Clear input
      guessInput.value = ''

      //tell user its wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
    }
  }
} 

//Set message
let setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
}

const gameOver = (won, msg) => {
  let color;
  won === true? color = 'green' : color = 'red'
  //Disable input, border color
  guessInput.disabled = true; 
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  //Play again
  guessBtn.value ='Play Again';
  guessBtn.classList.add('play-again')
}

function getRandomNum(min, max) {
  const num = Math.floor(Math.random() * (max-min + 1) + min)
  return num;
}
//Listen to guess
guessBtn.addEventListener('click', handleSubmit);


