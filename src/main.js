import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Ship,Crew,Planets,SpaceEvents} from "./backend.js";

$(document).ready(function() {
  $("#gameSelector").hide();
  $("#envoy").hide();
  $("#colonize").hide();
  $("#Screen").hide();
  $("#spaceStation").hide();
  $("#eventAction").hide();
  $("#eventAction2").hide();
  // $("#gameEvent").hide();
  // $("#gameEvent2").hide();


  $("#start").click(function() {
    $("#home").hide();
    $("#gameSelector").show();
  });

  $("#game1").click(function() {
    $("#gameSelector").hide();
    $("#envoy").show();
    let missionEnvoy = new Ship(500,1000000);
    let spacemonths = 0;
    let spaceyears = 0;
    let planetArray = [];
    let numOfCrew = 5;
    let pause = 1;
    let whyGod = new SpaceEvents;
    let happenings = "";
    for (let c = 0; c < numOfCrew; c++) {
      missionEnvoy.crew[c] = new Crew();
    }

    for (let p = 0; p <= 20; p++) {
      planetArray[p] = new Planets();
    }

    let timer = [];
    timer[0] = setInterval(logM, 1000);
    timer[1] = setInterval(logN, 50);

    function logM() {
      missionEnvoy.spaceTime += 1;
      spacemonths += 1;
      $("#months").html("Months: " + spacemonths);
      $("#years").html("Years: " + spaceyears);
      if (spacemonths >= 12) {
        spacemonths = 0;
        spaceyears += 1;
      }
      randomSpaceEvents(missionEnvoy.spaceTime);
    }



    function logN() {
      missionEnvoy.distance += 50;
      missionEnvoy.fuel -= 20;
      missionEnvoy.food -= 5;
      // let die1 = Math.floor(Math.random() * 4);
      // missionEnvoy.crew[die1].health -= 1;
      $("#shipHp").html("<progress id='shipHp' value=" + Math.floor(missionEnvoy.hp / 10) + " max='100'></progress>");
      $("#fuel").html("<progress id='fuel' value=" + Math.floor(missionEnvoy.fuel * 100 / missionEnvoy.fuelcap) + " max='100'></progress>");
      $("#food").html("<progress id='food' value=" + Math.floor(missionEnvoy.food * 100 / missionEnvoy.foodcap) + " max='100'></progress>");
      $("#shield").html("<progress id='shield' value=" + Math.floor(missionEnvoy.shield / 10) + " max='100'></progress>");
      $("#money").html("ship money: " + missionEnvoy.money);
      $("#shipWeapons").html("ship ammo: " + missionEnvoy.ammo);
      $("#travelDistance").html("Distance: " + missionEnvoy.distance);
      $("#distanceTraveled").html("<progress id='distanceTraveled' value=" + Math.floor(missionEnvoy.distance * 100 / 600000) + " max='100'></progress>");
      $("#shipOre").html("ship materials: " + missionEnvoy.materials);
      $("#shipParts").html("ship parts: " + missionEnvoy.parts);
      for (let i = 0; i < missionEnvoy.crew.length; i++) {
        $("#health" + i).html("<progress id='health' value=" + Math.floor(missionEnvoy.crew[i].health / 3) + " max='100'></progress>");
      }
      spaceHappenings(missionEnvoy.distance);
      deathCheck();
      gameOverCheck();
      winCheck();
    }

    function spaceHappenings(gamedist) {
      if (gamedist === 10000) {
        whyGod.spaceStation(missionEnvoy);
      }
      if (gamedist === 120000) {
        whyGod.spaceStation(missionEnvoy);
      }
      if (gamedist === 240000) {
        whyGod.spaceStation(missionEnvoy);
      }
      if (gamedist === 360000) {
        whyGod.spaceStation(missionEnvoy);
      }
      if (gamedist === 600000) {
        whyGod.spaceStation(missionEnvoy);
      }

      if (gamedist % 30000 === 0) {
        planetEvents();
      }

      if (gamedist % 70000 === 0) {
        $("p#eventText").html("astroidBelt");
        missionEnvoy = whyGod.astroidBelt(missionEnvoy);
      }

    }

    function randomSpaceEvents(months) {
      let die1 = Math.floor(Math.random() * 12 + 1);
      if (months % 2 === 0){
        if (die1 === 3 || die1 === 6 || die1 === 9){
          happenings = thingsHappen();
        }
      }
    }

    function thingsHappen(){
      let die1 = Math.floor(Math.random() * 10 + 1);
      let watHappun = "";
      $("#eventAction").show();
      if (die1 === 1){
        $("p#eventText").html("You encounter a Gravity well! You will loose fuel to escape its pull!");
        watHappun = 'gravityWell';
        // missionEnvoy = whyGod[watHappun](missionEnvoy);
      }
      if (die1 === 2){
        $("p#eventText").html("You encounter an astroid belt! Use shields to break through?");
        watHappun = 'astroidBelt';
        // missionEnvoy = whyGod[watHappun](missionEnvoy);
      }
      if (die1 === 3){
        $("p#eventText").html("Meteors are headed towards your ship! Use shields?");
        watHappun = 'meteors';
        // missionEnvoy = whyGod[watHappun](missionEnvoy);
      }
      if (die1 === 4){
        $("p#eventText").html("Space pirates board your ship and are ready for some booty! Fight off the Pirates?");
        watHappun = 'spacePirates';
        // missionEnvoy = whyGod[watHappun](missionEnvoy);
      }
      if (die1 === 5){
        $("p#eventText").html("A crew member catches a space virus, its highly contagious!");
        watHappun = 'spaceVirus';
        // missionEnvoy = whyGod[watHappun](missionEnvoy);
      }
      if (die1 === 6){
        $("p#eventText").html("A crew member caught space madness and attacks the others!");
        watHappun = 'spaceMadness';
        // missionEnvoy = whyGod[watHappun](missionEnvoy);
      }
      if (die1 === 7){
        $("p#eventText").html("You encounter aliens!");
        watHappun = 'alienEncounter';
        // missionEnvoy = whyGod[watHappun](missionEnvoy);
      }
      if (die1 === 8){
        $("p#eventText").html("A Wormhole is detected, enter? y/n?");
        watHappun = 'wormhole';
        // missionEnvoy = whyGod[watHappun](missionEnvoy);
      }
      if (die1 === 9){
        $("p#eventText").html("You find a Ghost Station drifting alone, explore? y/n?");
        watHappun = 'ghostStation';
        // missionEnvoy = whyGod[watHappun](missionEnvoy);
      }
      if (die1 === 10){
        $("p#eventText").html("Space Station, enter and refit?");
        watHappun = 'spaceStation';
        // missionEnvoy = whyGod[watHappun](missionEnvoy);
      }
      pauseFunction();
      return watHappun;
    }

    function planetEvents(){
      let die1 = Math.floor(Math.random() * 20 + 1);
      $("p#eventText").html("You have found a " + planetArray[die1].environment() + " planet");
      let choice = ("Would you like to explore? y/n?");
      if (choice === "y") {
        if(planetArray[die1].environment() === "Hospitable") {
          if (planetArray[die1].lifeforms === "friendly") {
            $("p#eventText").html("You found friendly aliens!");
            missionEnvoy.food += 2000;
            missionEnvoy.fuel += 3000;
            missionEnvoy.materials +=  planetArray[die1].materials;
          } else {
            $("p#eventText").html("You find hostile aliens! They attack!");
            let fightReply = ("Fight off aliens? y/n");
            if (fightReply === "y" && missionEnvoy.ammo >= 10) {
              $("p#eventText").html("Fought off aliens");
              missionEnvoy.ammo -= 10;
              missionEnvoy.food += 3000;
              missionEnvoy.fuel += 3000;
              missionEnvoy.materials +=  planetArray[die1].materials;
            } else {
              $("p#eventText").html("Aliens attacked your crew!");
              for (let i = 0; i < missionEnvoy.crew.length; i++) {
                missionEnvoy.crew[i].health -= 30;
              }
            }
          }
          missionEnvoy.fuel -= planetArray[die1].gravity;
          $("p#eventText").html("cost to escape planet: " + planetArray[die1].gravity);
        } else {
          missionEnvoy.materials +=  planetArray[die1].materials;
          missionEnvoy.fuel -= planetArray[die1].gravity;
          $("p#eventText").html("cost to escape planet: " + planetArray[die1].gravity);
        }
      }
    }

    function gameOverCheck(){
      if (missionEnvoy.hp <= 0 || missionEnvoy.fuel <= 0 || missionEnvoy.crew.length === 0 || missionEnvoy.food <= 0) {
        $("p#eventText").html("game over!");
          pauseFunction();
      }
    }

    function deathCheck(){
      for (let i = 0; i < missionEnvoy.crew.length; i++) {
        if (missionEnvoy.crew[i].health <= 0) {
          missionEnvoy.crew.splice(i,1);
        }
      }
    }

    function winCheck(){
      if (missionEnvoy.distance >= 600000) {
        $("p#eventText").html("You are Oregon Space!");
        pauseFunction();
      }
    }


    function pauseFunction() {
      pause = 2;
      clearInterval(timer[0]);
      clearInterval(timer[1]);
    }
    function startStop() {
      if (pause === 1) {
        pause = 2;
      } else {
        pause = 1;
      }
      if (pause === 2) {
        clearInterval(timer[0]);
        clearInterval(timer[1]);
      } else {
        timer[0] = setInterval(logM, 700);
        timer[1] = setInterval(logN, 50);
      }
    }

    // function yesNo() {
    //   pauseFunction();
    //   $("#eventYes").click(function(){
    //     startStop();
    //     $("#eventAction").hide();
    //   });
    //   $("#eventNo").click(function(){
    //     startStop();
    //     $("#eventAction").hide();
    //   });
    // }
let ynChoice = 0;
    $("#eventYes").click(function(){
      startStop();
      ynChoice = 1;
      missionEnvoy = whyGod[happenings](missionEnvoy, ynChoice);
      $("#eventAction").hide();
    });
    $("#eventNo").click(function(){
      startStop();
      ynChoice = 2;
      missionEnvoy = whyGod[happenings](missionEnvoy, ynChoice);
      $("#eventAction").hide();
    });
  });


  $("#game2").click(function() {
    $("#gameSelector").hide();
    $("#colonize").show();
  });

  $("#gameMenu").click(function() {
    $("#envoy").hide();
    $("#gameSelector").show();
  });

  $("#gameMenu2").click(function() {
    $("#colonize").hide();
    $("#gameSelector").show();
  });

  $("#playAgain").click(function() {
    $("#resultScreen").hide();
    $("#gameSelector").show();
  });

  $("#goHome").click(function() {
    $("#resultScreen").hide();
    $("#home").show();
  });






















});
