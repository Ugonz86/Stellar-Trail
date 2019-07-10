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
  });

  $("#game2").click(function() {
    $("#gameSelector").hide();
    $("#colonize").show();
  });

  $("#goHome").click(function() {
    $("#envoy").hide();
    $("#home").show();
  });

  $("#goHome2").click(function() {
    $("#colonize").hide();
    $("#home").show();
  });

  // $("#goStation").click(function() {
  //   $("#colonize").hide();
  //
  // });

  $("#goHome").click(function() {
    $("#spaceStation").hide();
    $("#home").show();
  });

  $("#exit").click(function() {
    $("#spaceStation").hide();
    $("#envoy").show();
  });

  $("#restart").click(function() {
    // resetFields();
  });


  $(function(){
    let missionEnvoy = new Ship(1000,1000000);
    let spacemonths = 0;
    let spaceyears = 0;
    let planetArray = [];
    let crew1 = new Crew("male",35,"Snitch");
    let crew2 = new Crew("male",25,"Pianist");
    let crew3 = new Crew("female",99,"Witch");
    let crew4 = new Crew("female",17,"Minor");
    let whyGod = new SpaceEvents;
    missionEnvoy.crew = [crew1,crew2,crew3,crew4];
    let pause = 1;


    for (let p = 0; p <= 20; p++) {
      planetArray[p] = new Planets();
      }

    $("#d0").click(function(){
      if (pause === 1) {
        pause = 2;
      } else {
        pause = 1;
      }
      if (pause === 2) {
        clearInterval(timer);
        clearInterval(timer2);
      } else {
        timer = setInterval(logM, 700);
        timer2 = setInterval(logN, 50);
      }
    });



    let timer = setInterval(logM, 1000);

          function logM() {
         missionEnvoy.spaceTime += 1;
         spacemonths += 1;
         $("#a0").html(spacemonths);
        $("#b0").html(spaceyears);
         if (spacemonths >= 12) {
           spacemonths = 0;
           spaceyears += 1;
         }
         randomSpaceEvents(missionEnvoy.spaceTime);
       }

       let timer2 = setInterval(logN, 50);

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
           $("#e0").append("crew" + i + "health: " + missionEnvoy.crew[i].health);
         }

          spaceHappenings(missionEnvoy.distance);
          deathCheck();
          gameOverCheck();
          winCheck();
          }


    function spaceHappenings(gamedist) {
      if (gamedist === 1000) {
        $("#spaceStation").show();
        whyGod.spaceStation(missionEnvoy);
      }
      if (gamedist === 120000) {
        whyGod.spaceStation(missionEnvoy);
        $("#spaceStation").show();
      }
      if (gamedist === 240000) {
        whyGod.spaceStation(missionEnvoy);
        $("#spaceStation").show();
      }
      if (gamedist === 360000) {
        whyGod.spaceStation(missionEnvoy);
        $("#spaceStation").show();
      }
      if (gamedist === 600000) {
        whyGod.spaceStation(missionEnvoy);
        $("#spaceStation").show();
      }

      if (gamedist % 30000 === 0) {
        planetEvents();
      }

      if (gamedist % 70000 === 0) {
        ("astroidBelt");
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
            ("gravityWell");
        missionEnvoy.fuel = whyGod.gravityWell(missionEnvoy.fuel);
      }
      if (die1 === 2){
            ("astroidBelt");
        missionEnvoy = whyGod.astroidBelt(missionEnvoy);
      }
      if (die1 === 3){
            ("meteors");
        missionEnvoy = whyGod.meteors(missionEnvoy);
      }
      if (die1 === 4){
            ("spacePirates");
        missionEnvoy = whyGod.spacePirates(missionEnvoy);
      }
      if (die1 === 5){

                ("spaceVirus");
        whyGod.spaceVirus(missionEnvoy.crew);
      }
      if (die1 === 6){
            ("spaceMadness");
        whyGod.spaceMadness(missionEnvoy.crew);
      }
      if (die1 === 7){
            ("you find alien!");
        whyGod.alienEncounter(missionEnvoy.crew);
      }
      if (die1 === 8){
            ("wormhole");
        missionEnvoy.distance = whyGod.wormhole(missionEnvoy.distance);
      }
      if (die1 === 9){
        whyGod.ghostStation(missionEnvoy);
      }
      if (die1 === 10){
        whyGod.spaceStation(missionEnvoy);
        $("#spaceStation").show();

      }
    }

    function planetEvents(){
      let die1 = Math.floor(Math.random() * 20 + 1);
      ("You have found a " + planetArray[die1].environment() + " planet");
      let choice = ("Would you like to explore? y/n?");
      if (choice === "y") {
        if(planetArray[die1].environment() === "Hospitable") {
          if (planetArray[die1].lifeforms === "friendly") {
            ("You found friendly aliens!");
            missionEnvoy.food += 2000;
            missionEnvoy.fuel += 3000;
            missionEnvoy.materials +=  planetArray[die1].materials;
          } else {
            ("You find hostile aliens! They attack!");
            let fightReply = ("Fight off aliens? y/n");
            if (fightReply === "y" && missionEnvoy.ammo >= 10) {
              ("Fought off aliens");
              missionEnvoy.ammo -= 10;
              missionEnvoy.food += 3000;
              missionEnvoy.fuel += 3000;
              missionEnvoy.materials +=  planetArray[die1].materials;
            } else {
              ("Aliens attacked your crew!");
              for (let i = 0; i < missionEnvoy.crew.length; i++) {
                missionEnvoy.crew[i].health -= 30;
              }
            }
          }
          missionEnvoy.fuel -= planetArray[die1].gravity;
          ("cost to escape planet: " + planetArray[die1].gravity);
        } else {
          missionEnvoy.materials +=  planetArray[die1].materials;
          missionEnvoy.fuel -= planetArray[die1].gravity;
          ("cost to escape planet: " + planetArray[die1].gravity);
        }
      }
    }

    function gameOverCheck(){
      if (missionEnvoy.hp <= 0 || missionEnvoy.fuel <= 0 || missionEnvoy.crew.length === 0 || missionEnvoy.food <= 0) {
        ("game over!");
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
          ("You are Oregon Space!");
          clearInterval(timer);
          clearInterval(timer2);
        }
      }

    // function shop(ship){
    //   let buyFood = parseInt(("How much food"));
    //   let buyParts = parseInt(("How much Parts"));
    //   let buyFuel = parseInt(("How much fuel"));
    //
    //   let total = (buyFood * 50) + (buyParts * 100) + (buyFuel * 10);
    //   ship.fuel += buyFuel;
    //   ship.parts += buyParts;
    //   ship.food += buyFood;
    //   ship.money -= total;
    //   return ship;
    // }
  });
});
