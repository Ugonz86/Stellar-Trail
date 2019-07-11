export class Ship {

  constructor(hp,money){
    this.hp = hp;
    this.fuel = 80000;
    this.fuelcap = 100000;
    this.money = money;
    this.parts = 20;
    this.materials = 0;
    this.ammo = 0;
    this.shield = 1000;
    this.crew = [];
    this.food = 20000;
    this.foodcap = 20000;
    this.speed = 0;
    this.distance = 0;
    this.spaceTime = 0;
  }
}


export class Crew {
    constructor(gender,age,occupation) {
      this.gender = gender;
      this.age = age;
      this.occupation = occupation;
      this.health = 300;
    }
}

export class Planets {
  constructor() {
    this.environment = function(){
      let die1 = Math.floor(Math.random() * 6 + 1);
      if (die1 % 2 === 0) {
        if (die1 === 2) {
          this.lifeforms = "friendly";
          this.trading = "true";
        } else {
          this.lifeforms = "hostile";
          this.trading = "false";
        }
        return "Hospitable";
      } else {
        this.lifeforms = "none";
        this.trading = "false";
        return "Inhospitable";
      }
    };
    this.materials = Math.floor(Math.random() * 10000 + 1);
    this.gravity = Math.floor(Math.random() * 5000 + 1);
  }
}

export class SpaceEvents {
  gravityWell(ship, ynChoice){
    ship.fuel -= 2000;
    return ship;
  }

  astroidBelt(ship, ynChoice){
    if (ynChoice === 1 && ship.shield >= 300) {
      ("Got past threat!");
        ship.shield -= 300;
      }else {
        ("Your ship takes damage!");
        for (let i = 0; i < ship.crew.length; i++) {
          ship.crew[i].health -= 30;
        }
        ship.hp -= 400;
      }
    return ship;
  }

  meteors(ship, ynChoice){
    if (ynChoice === 1 && ship.shield >= 100) {
      ("Got past threat!");
        ship.shield -= 100;
      }else {
        ("Your ship takes damage!");
        for (let i = 0; i < ship.crew.length; i++) {
          ship.crew[i].health -= 30;
        }
        ship.hp -= 200;
      }
    return ship;
  }

  spacePirates(ship, ynChoice){
    if (ynChoice === 1 && ship.ammo >= 40) {
      ("Fought off Space Pirates!");
        ship.ammo -= 40;
      }else {
        ("Space pirates attacked and plundered your ship!");
        for (let i = 0; i < ship.crew.length; i++) {
          ship.crew[i].health -= 30;
        }
        ship.money = ship.money / 2;
        ship.materials = ship.materials / 2;
        ship.food = ship.food / 2;
        ship.hp -= 100;

      }
      return ship;
  }

  spaceVirus(ship, ynChoice){
    let die1 = Math.floor(Math.random() * 4);
      ship.crew[die1].health -= 100;
      return ship;
  }

  spaceMadness(ship, ynChoice){

    for (let i = 1; i < ship.crew.length; i++) {
      ship.crew[i].health -= 40;
    }
    return ship;
  }

  alienEncounter(ship, ynChoice){

    let die1 = Math.floor(Math.random() * 6 + 1);
    if (die1 % 2 === 0) {
      ("alien fucks you up");
      for (let i = 0; i < ship.crew.length; i++) {
        ship.crew[i].health -= 30;
      }
    } else {
      ("alien says hello!");
    }
    return ship;
  }

  wormhole(ship, ynChoice){
    if (ynChoice === 1) {
      ship.distance = Math.floor(Math.random() * 600 + 1);
      ship.distance *= 1000;
      return ship;
    } else {
      return ship;
    }
  }

  spaceStation(ship, ynChoice) {
    ("spaceStation");
    ship.money += ship.materials * 10;
    ship.materials = 0;
    let buyFood = parseInt(prompt("How much food $10/ea"));
    let buyParts = parseInt(prompt("How much Parts $100/ea"));
    let buyFuel = parseInt(prompt("How much fuel $10/ea"));
    let buyAmmo = parseInt(prompt("How much Ammo $50/ea"));
    let total = (buyFood * 10) + (buyParts * 100) + (buyFuel * 10) + (buyAmmo * 50);
    while (total > ship.money || ship.foodcap < ship.food + buyFood || ship.fuelCap < ship.fuel + buyFuel || buyFood === undefined || buyParts === undefined) {
        ("Get serious");
        buyFood = parseInt(prompt("How much food $10/ea"));
        buyParts = parseInt(prompt("How much Parts $100/ea"));
        buyFuel = parseInt(prompt("How much fuel $10/ea"));
        buyAmmo = parseInt(prompt("How much Ammo $50/ea"));
        total = (buyFood * 50) + (buyParts * 100) + (buyFuel * 10) + (buyAmmo * 50);
      }
    let repaircost = 1000 - ship.hp;
    let repairReply = prompt("Repairing will take" + repaircost / 100 + " ship parts, proceed?? y/n");
    if (repairReply === "y") {
      ship.hp = 1000;
      ship.parts -= repaircost / 100;
    }
    let healReply = prompt("Heal crew for $1000? y/n");
    if (healReply === "y") {
      for (let i = 0; i < ship.crew.length; i++) {
        ship.crew[i].health = 300;
      }
    }
    let shieldReply = prompt("Fully recharge Shield for $10,000? y/n");
    if (shieldReply === "y") {
      ship.shield = 1000;
    }
    ship.fuel += buyFuel;
    ship.parts += buyParts;
    ship.food += buyFood;
    ship.ammo += buyAmmo;
    ship.money -= total;
    return ship;
  }


  ghostStation(ship, ynChoice) {
    if (ynChoice === 1) {
    let die1 = Math.floor(Math.random() * 2);
    if (die1 === 1) {
      ship.fuel += 5000;
      console.log(ship.fuel);
    }
    die1 = Math.floor(Math.random() * 2);
    if (die1 === 1) {
      ship.money += 5000;
      console.log(ship.money);
    }
    die1 = Math.floor(Math.random() * 2);
    if (die1 === 1) {
      ship.parts += 5000;
      console.log(ship.parts);
    }
    die1 = Math.floor(Math.random() * 2);
    if (die1 === 1) {
      ship.materials += 5000;
      console.log(ship.materials);
    }
    die1 = Math.floor(Math.random() * 2);
    if (die1 === 1) {
      ship.weapons += 5000;
      console.log(ship.weapons);
    }
    die1 = Math.floor(Math.random() * 2);
    if (die1 === 1) {
      ship.food += 5000;
      console.log(ship.food);
    }
    die1 = Math.floor(Math.random() * 2);
    die1 = 1;
    if (die1 === 1) {
      for (let i = 0; i < ship.crew.length; i++) {
        ship.crew[i].health -= 30;
        (ship.crew[i].health);
      }
    }
  } else {
    ("You left the station alone");
  }
  return ship;
  }
}
