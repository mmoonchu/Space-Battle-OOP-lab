// make spaceship constructor
    // alignment (win/lose procedure)
// make playerShip
// make 6 alien ships
// create "game":
// 1. array of alien ships
// 2. combat
// a. hit -> check -> get hit -> check -> ..
// b. attack || retreat

let battleStatus; // state var
let infoLogs = [];
let infoLogsClone = [];
let player;

// Ship constructor
class ship {
    constructor(name, hull, firepower, accuracy){
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    attack(ship) {
        printInfo(`${this.name} takes a shot at ${ship.name}...`);
        if (Math.random() <= this.accuracy) {
            ship.hull -= this.firepower;
            printInfo(`It hits for ${this.firepower} damage!! ${ship.name} has ${ship.hull} hitpoints remaining.`)
        }
        if (ship.hull <= 0) {
            battleStatus = 0;
        }
    }
}

// Creating alien ships (& randomizing their stats)
const aliens = [];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const createAlienShips = function(numOfShips) {
    for (let i = 0; i < numOfShips; i++) {
        aliens[i] = new ship(`Alien ${i + 1}`, getRandomInt(4) + 3, getRandomInt(3) + 2, getRandomInt(3) * .1 + .6)
    }
}

//// UTILITY FUNCTIONS
// Function for adding text to infobox
const printInfo = function(text) {
    infoLogs.push(text);
    updateInfobox();
}
const updateInfobox = function() {
    infoLogs.forEach((log, index) => {
        if (infoLogsClone[index] === undefined) {
            document.querySelector('#infobox').appendChild(document.createElement('p'));
            document.querySelector('#infobox').lastChild.classList.add('info');
            document.querySelector('#infobox').lastChild.innerText = log;
            document.querySelector('#infobox').scrollTop = document.querySelector('#infobox').scrollHeight;
        }
    })
    infoLogsClone = infoLogs.slice();
}
// Special fonts
const changeFont = function(fontType) {
    document.querySelector('#infobox').lastChild.classList.add(fontType);
    document.querySelector('#infobox').scrollTop = document.querySelector('#infobox').scrollHeight;
}
// Toggle hidden
const toggleHidden = function () {
    document.querySelector('#continue').hidden = !document.querySelector('#continue').hidden;
    // console.log(document.querySelector('#continue').hidden);
}
//////////////////////////////////////
// Initialize ships, begin game
const runGame = function() {
    player = new ship('The USS Assembly', 20, 5, .7);
    createAlienShips(6);

    iterateBattle();
}

const iterateBattle = function() {
    if (!document.querySelector('#continue').hidden) {
        toggleHidden();
    }
    doBattle(player, aliens[0]);
    // player loses battle (END)
    if (player.hull <= 0) {
        printInfo(`${player.name} is struck down in battle, ultimately allowing the aliens to conquer Earth. Humanity's run ends here.`);
        changeFont('loseText');
    } else if (aliens[0].hull <= 0) {
        // player wins battle
        defeatedAlien = aliens.shift();
        if (aliens[0] === undefined) {
            printInfo(`You have defeated all of the aliens.`);
            changeFont('winText');
            printInfo(`Humanity is saved! 🎉`);
            changeFont('winText');
        } else {
            promptContinue();
        }
    }
}
// Combat loop
const doBattle = function(ship1, ship2) {
    battleStatus = 1;
    ship1.attack(ship2);
    if (battleStatus === 1) {
        doBattle(ship2, ship1)
    }
}
const promptContinue = function() {
    printInfo(`${defeatedAlien.name} defeated! Only ${aliens.length} to go...\n`);
    changeFont('big');
    toggleHidden();
}
const ceaseGame = function() {
    printInfo(`You turn tail and run. Humanity's days are numbered.`);
    changeFont('red');
    toggleHidden();
}

document.querySelector('#continue-btn').addEventListener('click', iterateBattle)
document.querySelector('#retreat-btn').addEventListener('click', ceaseGame)

runGame();

// left to do:
// finish promptContinue()
// html?
// live battle messages


// while (input.length !== 1) {
//     input = prompt(`Continue? (y/n)`);
// }
// if (input.toLowerCase() === 'n') {
//     console.log(`You turn tail and run. Humanity's days remain numbered.`);
//     this.this.break;
// }

// printInfo(`${ship.name} goes down!💥 `)