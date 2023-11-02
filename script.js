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

// Ship constructor
class ship {
    constructor(name, hull, firepower, accuracy, alignment){
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.alignment = alignment;
    }
    attack(ship) {
        if (Math.random() <= this.accuracy) {
            ship.hull -= this.firepower;
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
        aliens[i] = new ship(`Alien ${i + 1}`, getRandomInt(4) + 3, getRandomInt(3) + 2, getRandomInt(3) * .1 + .6, 'Aliens')
    }
}

// Initialize ships, begin game
const runGame = function() {
    const player = new ship('The USS Assembly', 20, 5, .7, 'Earth');
    createAlienShips(6);

    for (const alien of aliens.slice()) {
        doBattle(player, alien)
        // player loses battle (END)
        if (player.hull <= 0) {
            console.log(`${player.name} is struck down in battle, ultimately allowing the aliens to conquer Earth. Humanity's run ends here.`);
            break;
        }
        // player wins battle
        defeatedAlien = aliens.shift();
        if (aliens[0] === undefined) {
            console.log(`You have defeated all of the aliens. Humanity is saved! 🎉`);
            break;
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
    console.log(`${defeatedAlien.name} defeated! Only ${aliens.length} to go...\nContinue?`);
}

runGame();

// left to do:
// finish promptContinue()
    // html?
// live battle messages