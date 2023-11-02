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
            ship.lose();
        }
    }
}
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
