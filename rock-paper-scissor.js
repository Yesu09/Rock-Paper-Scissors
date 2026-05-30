const score = JSON.parse(localStorage.getItem('score')) || {
    Wins: 0,
    Loses: 0,
    Ties: 0
};



updateScoreElement();

function pickComputerMove(){
    const randomNumber = Math.random()

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }
    return computerMove;
}

let isAutoPlaying = false;

let intervalId;

function autoPlay() {
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
        },1000)
        isAutoPlaying = true;
        document.querySelector('.auto-play-button').innerHTML = 'Stop Playing';
    }else{
        clearInterval(intervalId);
        if (document.querySelector('.auto-play-button').innerHTML === 'Stop Playing'){
            document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
        }
        isAutoPlaying = false;
    }
    
}

document.querySelector('.js-rock-btn').addEventListener('click',() => {
    playGame('rock')
});

document.querySelector('.js-paper-btn').addEventListener('click',() => {
    playGame('paper')
});

document.querySelector('.js-scissors-btn').addEventListener('click',() => {
    playGame('scissors')
});

document.querySelector('.auto-play-button').addEventListener('click',() => {
    autoPlay();
});

document.querySelector('.js-reset-btn').addEventListener('click',() => {
    showConfirmation();
});





const showConfirmation = () => {
    document.querySelector('.js-warn').innerHTML='<p>Are you sure you want to reset the score </p><button class="js-yes-btn">Yes</button><button class="js-no-btn">No</button>'; 
    document.querySelector('.js-yes-btn').addEventListener('click',() => {
    score.Wins = 0;
    score.Loses = 0;
    score.Ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    hideConfirmation();
    });
    document.querySelector('.js-no-btn').addEventListener('click',() => {
    hideConfirmation();
})
};


const hideConfirmation = () => {
    document.querySelector('.js-warn').innerHTML='';
}






document.body.addEventListener('keydown',(event) => {
    if (event.key === 'a') {
        autoPlay();
    }else if (event.key == 'Backspace') {
        showConfirmation();
    }
});


document.body.addEventListener('keydown',(event) => {
    if (event.key === 'r') {
        playGame('rock')
    }else if (event.key === 'p') {
        playGame('paper')
    }else if (event.key === 's') {
        playGame('scissors')
    };

})



function playGame(playerMove){
    const computerMove = pickComputerMove()

    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
        result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.'
        } else {
            result = 'Tie.';
        }
    } else if (playerMove === 'rock'){
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.'
        } else {
            result = 'You win.';
        }
    }else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.'
        } else {
            result = 'You lose.';
        }
    }

    if (result === 'You win.') {
        score.Wins += 1;
    }else if (result === 'You lose.') {
        score.Loses += 1;
    }else {
        score.Ties += 1
    }

    localStorage.setItem('score',JSON.stringify(score));
    document.querySelector('.js-result').innerHTML = `${result}`;
    document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
    updateScoreElement();            
    
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins}, Loses: ${score.Loses}, Ties: ${score.Ties}`;
}