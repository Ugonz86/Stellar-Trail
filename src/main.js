// import {  } from './../src/Stellar-Trail.js';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

$(document).ready(function() {
  $("#gameSelector").hide();
  $("#envoy").hide();
  $("#colonize").hide();
  $("#resultScreen").hide();
  });

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

  $("#goBack1").click(function() {
    $("#envoy").hide();
    $("#gameSelector").show();
  });

  $("#goBack2").click(function() {
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
