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
  $("#prompts").hide();
  $("#prompts2").hide();
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
    let crew1 = new Crew("male",35,"Snitch");
    let crew2 = new Crew("male",25,"Pianist");
    let crew3 = new Crew("female",99,"Witch");
    let crew4 = new Crew("female",17,"Minor");
    let crew5 = new Crew("female",25,"Doctor");
    let whyGod = new SpaceEvents;
    missionEnvoy.crew = [crew1,crew2,crew3,crew4,crew5];
    // let pause = 1;
    for (let p = 0; p <= 20; p++) {
      planetArray[p] = new Planets();
    }

    let timer = setInterval(logM, 1000);
    let timer2 = setInterval(logN, 50);

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
      if (gamedist === 100000) {
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
        alert("astroidBelt");
        missionEnvoy = whyGod.astroidBelt(missionEnvoy);
      }

    }

    function randomSpaceEvents(months) {
      let die1 = Math.floor(Math.random() * 12 + 1);
      if (months % 4 === 0){
        if (die1 === 3 || die1 === 6 || die1 === 9){
          thingsHappen();
        }
      }
    }

    function thingsHappen(){
      let die1 = Math.floor(Math.random() * 10 + 1);
      if (die1 === 1){
        $("p#eventText").html("gravityWell");
        missionEnvoy.fuel = whyGod.gravityWell(missionEnvoy.fuel);
      }
      if (die1 === 2){
        $("p#eventText").html("astroidBelt");
        missionEnvoy = whyGod.astroidBelt(missionEnvoy);
      }
      if (die1 === 3){
        $("p#eventText").html("meteors");
        missionEnvoy = whyGod.meteors(missionEnvoy);
      }
      if (die1 === 4){
        $("p#eventText").html("spacePirates");
        missionEnvoy = whyGod.spacePirates(missionEnvoy);
      }
      if (die1 === 5){

        $("p#eventText").html("spaceVirus");
        whyGod.spaceVirus(missionEnvoy.crew);
      }
      if (die1 === 6){
        $("p#eventText").html("spaceMadness");
        whyGod.spaceMadness(missionEnvoy.crew);
      }
      if (die1 === 7){
        $("p#eventText").html("you find alien!");
        whyGod.alienEncounter(missionEnvoy.crew);
      }
      if (die1 === 8){
        $("p#eventText").html("wormhole");
        missionEnvoy.distance = whyGod.wormhole(missionEnvoy.distance);
      }
      if (die1 === 9){
        whyGod.ghostStation(missionEnvoy);
      }
      if (die1 === 10){
        whyGod.spaceStation(missionEnvoy);
      }
    }

    function planetEvents(){
      let die1 = Math.floor(Math.random() * 20 + 1);
      alert("You have found a " + planetArray[die1].environment() + " planet");
      let choice = prompt("Would you like to explore? y/n?");
      if (choice === "y") {
        if(planetArray[die1].environment() === "Hospitable") {
          if (planetArray[die1].lifeforms === "friendly") {
            alert("You found friendly aliens!");
            missionEnvoy.food += 2000;
            missionEnvoy.fuel += 3000;
            missionEnvoy.materials +=  planetArray[die1].materials;
          } else {
            alert("You find hostile aliens! They attack!");
            let fightReply = prompt("Fight off aliens? y/n");
            if (fightReply === "y" && missionEnvoy.ammo >= 10) {
              alert("Fought off aliens");
              missionEnvoy.ammo -= 10;
              missionEnvoy.food += 3000;
              missionEnvoy.fuel += 3000;
              missionEnvoy.materials +=  planetArray[die1].materials;
            } else {
              alert("Aliens attacked your crew!");
              for (let i = 0; i < missionEnvoy.crew.length; i++) {
                missionEnvoy.crew[i].health -= 30;
              }
            }
          }
          missionEnvoy.fuel -= planetArray[die1].gravity;
          alert("cost to escape planet: " + planetArray[die1].gravity);
        } else {
          missionEnvoy.materials +=  planetArray[die1].materials;
          missionEnvoy.fuel -= planetArray[die1].gravity;
          alert("cost to escape planet: " + planetArray[die1].gravity);
        }
      }
    }

    function gameOverCheck(){
      if (missionEnvoy.hp <= 0 || missionEnvoy.fuel <= 0 || missionEnvoy.crew.length === 0 || missionEnvoy.food <= 0) {
        alert("game over!");
        clearInterval(timer);
        clearInterval(timer2);
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
        alert("You are Oregon Space!");
        clearInterval(timer);
        clearInterval(timer2);
      }
    }
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
