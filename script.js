// make spaceship constructor
    // alignment (win/lose procedure)
// make playerShip
// make 6 alien ships
// create "game":
// 1. array of alien ships
// 2. combat
// a. hit -> check -> get hit -> check -> ..
// b. attack || retreat

let playerShipPics = ['https://cdna.artstation.com/p/assets/images/images/037/562/062/original/josh-bruce-barrager.gif?1620708792'];
let alienShipPics = ['https://cdna.artstation.com/p/assets/images/images/037/561/420/original/josh-bruce-betterdays.gif?1620706714', 'https://cdnb.artstation.com/p/assets/images/images/037/561/421/original/josh-bruce-default.gif?1620706720', 'https://cdnb.artstation.com/p/assets/images/images/037/562/075/original/josh-bruce-terminator.gif?1620708808', 'https://cdna.artstation.com/p/assets/images/images/037/562/068/original/josh-bruce-reaper.gif?1620708800', 'https://cdnb.artstation.com/p/assets/images/images/037/561/423/original/josh-bruce-galaxy.gif?1620706729', 'https://starquestgame.com/assets/img/ships/player/pstyles.gif', 'https://starquestgame.com/assets/img/ships/player/storm.gif', 'https://starquestgame.com/assets/img/ships/player/marauder.gif', 'https://starquestgame.com/assets/img/ships/player/fat-cat.gif'];
const maxShips = alienShipPics.length; // later: implement prompt for desired # of enemy spaceships

let battleStatus; // state var
let infoLogs = [];
let infoLogsClone = [];
let player;
let logDelay = 900;

// Ship constructor
class ship {
    constructor(name, hull, firepower, accuracy, shipPic){
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.shipPic = shipPic;
    }
    attack(ship) {
        printInfo(`${this.name} takes a shot at ${ship.name}...`);
        setTimeout(() => {
            if (Math.random() <= this.accuracy) {
                ship.hull -= this.firepower;
                printInfo(`It hits for ${this.firepower} damage!! ${ship.name} has ${ship.hull} hitpoints remaining.`);
                changeFont('hitText');
            } else {
                printInfo(`It misses!`);
                changeFont('missText');
            }
            if (ship.hull <= 0) {
                endBattle();
            } else {
                doBattle(ship, this);
            }
        }, logDelay);
    }
}

// Creating alien ships (& randomizing their stats)
const aliens = [];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const createAlienShips = function(numOfShips) {
    if (numOfShips <= maxShips) {
        for (let i = 0; i < numOfShips; i++) {
            aliens[i] = new ship(`Alien ${i + 1}`, getRandomInt(4) + 3, getRandomInt(3) + 2, getRandomInt(3) * .1 + .6, alienShipPics[i])
        }
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
const toggleHidden = function() {
    document.querySelector('#continue').hidden = !document.querySelector('#continue').hidden;
    // console.log(document.querySelector('#continue').hidden);
}
//////////////////////////////////////
// Initialize ships, begin game
const runGame = function() {
    player = new ship('The USS Assembly', 20, 5, .7, playerShipPics[0]);
    createAlienShips(6);

    iterateBattle();
}

const iterateBattle = function() {
    if (!document.querySelector('#continue').hidden) {
        toggleHidden();
    }
    document.querySelector('#alienShipPic').setAttribute('src', `${aliens[0].shipPic}`);
    doBattle(player, aliens[0]);
}
const endBattle = function() {
    // player loses battle (END)
    if (player.hull <= 0) {
        printInfo(`${player.name} is struck down in battle, ultimately allowing the aliens to conquer Earth. Humanity's run ends here.`);
        changeFont('loseText');
    } else {
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
    setTimeout(() => {
        ship1.attack(ship2);
    }, 2 * logDelay);
}
const promptContinue = function() {
    printInfo(`${defeatedAlien.name} defeated! Only ${aliens.length} to go...\n`);
    changeFont('battleWinText');
    setTimeout(toggleHidden, 1000);
}
const ceaseGame = function() {
    printInfo(`You turn tail and run. Humanity's days are numbered.`);
    changeFont('loseText');
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