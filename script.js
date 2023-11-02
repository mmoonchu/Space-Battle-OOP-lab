// make spaceship constructor
    // alignment (win/lose procedure)
// make playerShip
// make 6 alien ships
// create "game":
// 1. array of alien ships
// 2. combat
    // a. hit -> check -> get hit -> check -> ..
    // b. attack || retreat

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
            // if player wins battle
            if (ship.alignment = 'Aliens') {
                aliens.shift();
                if (aliens[0] !== false) {
                    doBattle(player, aliens[0]);
                } else {
                    console.log(`You defeated all of the aliens. Humanity is saved! 🎉`);
                }
            // if player loses battle
            } else {
                console.log(`${player.name} was struck down in battle, and you ended up being no more than a stain on the boot of the Aliens' intergalactic conquest.`);
            }
        }
    }
}
let battleStatus;
const aliens = [];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
const createAlienShips = function(numOfShips) {
    for (let i = 0; i < numOfShips; i++) {
        aliens[i] = new ship(`Alien ${i + 1}`, getRandomInt(4) + 3, getRandomInt(3) + 2, getRandomInt(3) * .1 + .6, 'Aliens')
    }
}

const player = new ship('The USS Assembly', 20, 5, .7, 'Earth');
createAlienShips(6);

const runGame = function() {
    for (const alien of aliens) {
        doBattle(player, alien)
    }
    
}
const doBattle = function(ship1, ship2) {
    battleStatus = 1;
    ship1.attack(ship2);
    if (battleStatus === 1) {
        doBattle(ship2, ship1)
    }
}

runGame();