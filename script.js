const gameOptionsWrapper = document.querySelectorAll('.option-wrapper');

const loadingGif = document.querySelector('.loading-gif');
const gameChoice = document.querySelector('.game-choice');

const humanChoice = document.querySelector('img.human-choice');
const humanChoiceValue = document.querySelector('.human-choice-value');

const computerChoice = document.querySelector('img.computer-choice');
const computerChoiceValue = document.querySelector('.computer-choice-value');

const gameResult = document.querySelector('.game-result');
const resultText = document.querySelector('.result-text');
const winnerText = document.querySelector('.winner-text');

const humanScore = document.querySelector('.human-score');
const computerScore = document.querySelector('.computer-score');


const tournamentWinner = document.querySelector('.tournament-score');
const btnPlayAgain = document.querySelector('.btn-play-again');

let humScore = 0, compScore = 0, numMatches = 0;

const gameChoices = [
    {
        hand: 'Rock',
        imageSrc: './assets/hand-rock.png'
    },
    {
        hand: 'Paper',
        imageSrc: './assets/hand-paper.png'
    },
    {
        hand: 'Scissor',
        imageSrc: './assets/hand-scissor.png'
    },
    {
        hand: 'Lizard',
        imageSrc: './assets/hand-lizard.png'
    },
    {
        hand: 'Spock',
        imageSrc: './assets/hand-spock.png'
    }
];


function handleOptionsClick(e) {
    let target = e.target;
    if(target.classList.contains('hand-img') || target.classList.contains('hand-caption')) {
        target = target.parentElement;
    }
    if(target.classList.contains('hand')) {
        target.classList.add('current-option');
        gameOptionsWrapper.forEach(gameWrapper => {
            gameWrapper.classList.add('no-pointer-events');
        });

        loadingGif.classList.remove('display-none');
        loadingGif.classList.add('display-block');
        gameChoice.classList.add('display-none');
        gameChoice.classList.remove('display-block');

        gameResult.classList.remove('display-block');
        gameResult.classList.add('display-none');

        const humanChoiceKey = target.getAttribute('data-hand-key');
        const humanChoiceHand = gameChoices[humanChoiceKey].hand;
        const humanChoiceImage = gameChoices[humanChoiceKey].imageSrc;

        const [computerChoiceHand, computerChoiceImage] = setComputerChoice();

        setImageSrc(humanChoiceImage, humanChoiceHand, computerChoiceImage, computerChoiceHand);
    }
    
}

function setComputerChoice() {
    const randomChoiceKey = Math.floor(Math.random() * 5);
    return [gameChoices[randomChoiceKey].hand, gameChoices[randomChoiceKey].imageSrc];
}

function setImageSrc(humanChoiceImage, humanChoiceHand,computerChoiceImage, computerChoiceHand) {
    setTimeout(()=>{
        loadingGif.classList.remove('display-block');
        loadingGif.classList.add('display-none');

        humanChoice.setAttribute('src', humanChoiceImage);
        computerChoice.setAttribute('src', computerChoiceImage);

        humanChoiceValue.innerText = humanChoiceHand;
        computerChoiceValue.innerText = computerChoiceHand;

        gameChoice.classList.remove('display-none');
        gameChoice.classList.add('display-block');

        const [resText, winText] = declareWinner(humanChoiceHand, computerChoiceHand);


        resultText.innerText = resText;
        winnerText.innerText = winText;

        gameResult.classList.add('display-block');
        gameResult.classList.remove('display-none');

        if(winText.includes('Computer')) {
            ++compScore;
        }
        else if(winText.includes('You')) {
            ++humScore;
        }

        computerScore.innerText = compScore;
        humanScore.innerText = humScore;
        numMatches++;
        if(compScore === 3 || humScore === 3) {
            if(compScore === 3) {
                tournamentWinner.innerText = 'Computer is the Winner!';
            }
            else {
                tournamentWinner.innerText  = 'You are the winner!';
            }
            btnPlayAgain.classList.remove('display-none');
            btnPlayAgain.classList.add('display-block');

            gameOptionsWrapper.forEach(gameWrapper => {
                gameWrapper.classList.remove('current-option');
            });
        }
        else {
            gameOptionsWrapper.forEach(gameWrapper => {
                gameWrapper.classList.remove('current-option');
                gameWrapper.classList.remove('no-pointer-events');
            });
        }

        
    }, 3000);
    console.log(gameChoice);
}

function declareWinner(humanChoiceHand, computerChoiceHand) {
    let winText = '', resText = '';
    console.log(humanChoiceHand+computerChoiceHand);  
    switch(humanChoiceHand+computerChoiceHand) {  
               
        case 'RockPaper':
            winText = 'Computer Wins!';
            resText = "Paper Covers Rock";
            break;

        case 'PaperRock':
            winText = 'You Wins!';
            resText = "Paper Covers Rock";
            break;
        
        case 'ScissorRock':
            winText = 'Computer Wins!';
            resText = 'Rock Crushes Scissors';
            break;

        case 'RockScissor':
            winText = 'You Win!';
            resText = 'Rock Crushes Scissors';
            break;

        case 'RockLizard':
            winText = 'You Win!';
            resText = 'Rock Crushes Lizard';
            break;

        case 'LizardRock':
            winText = 'Computer Wins!';
            resText = 'Rock Crushes Lizard';
            break;
        
        case 'RockSpock':
            winText = 'Computer Wins!';
            resText = 'Spock Vaporizes Rock';
            break;

        case 'SpockRock':
            winText = 'You Win!';
            resText = 'Spock Vaporizes Rock';
            break;
        
        case 'PaperScissor':
            winText = 'Computer Wins!';
            resText = 'Scissor Curs Paper';
            break;

        case 'ScissorPaper':
            winText = 'You Win!';
            resText = 'Scissor Curs Paper';
            break;
        
        case 'PaperLizard':
            winText = 'Computer Wins!';
            resText = 'Lizard Eats Paper';
            break;

        case 'LizardPaper':
            winText = 'You Win!'
            resText = 'Lizard Eats Paper';
            break;
        
        case 'PaperSpock':
            winText = 'You Win!';
            resText = 'Paper Disproves Spock';
            break;

        case 'SpockPaper':
            winText = 'Computer Wins!';
            resText = 'Paper Disproves Spock';
            break;
        
        case 'ScissorLizard':
            winText = 'You Win!';
            resText = 'Scissor Decapitates Lizard';
            break;

        case 'LizardScissor':
            winText = 'Computer Wins!';
            resText = 'Scissor Decapitates Lizard';
            break;
        
        case 'ScissorSpock':
            winText = 'Computer Wins!';
            resText = 'Spock Smashes Scissors';
            break;

        case 'SpockScissor':
            winText = 'You Win!';
            resText = 'Spock Smashes Scissors';
            break;
        
        case 'LizardSpock':
            winText = 'You Win!';
            resText = 'Lizard Poisons Spock';
            break;

        case 'SpockLizard':
            winText = 'Computer Wins!';
            resText = 'Lizard Poisons Spock';
            break;
        
        default:
            resText = 'You and compter chose the same!';
            winText = "It's a draw!";
            break;
    }
    return [resText, winText];
    
}

gameOptionsWrapper.forEach(gameWrapper => {
    gameWrapper.addEventListener('click' , handleOptionsClick);
});

btnPlayAgain.addEventListener('click', () => location.reload())