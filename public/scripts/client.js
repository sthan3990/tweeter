/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function (e) {

  const $tweet = $(`<article class="tweet">Hello world</article>`);
  $("#tweets-container").append($tweet);

  let maxCharacters = 140;

  $("#tweet-text").value = "";

  $("#tweet-text").on('input', function (text) {

    // for example if you delete everything. 
    if (this.textLength === 0) {

      // reset counter
      maxCharacters = 140;

      // reset styling
      $("#tweet-text").first().next().find("output").css("color", "#545149");
    }

    maxCharacters -= this.textLength;

    // change the value of <output> </output> 
    $("#tweet-text").next().find("output").text(maxCharacters);

    if (maxCharacters <= 0) {
      console.log("Less than 0, change formatting")
      // Output pointer to modify CSS
      $("#tweet-text").next().find("output").css("color", "red");
    }
  });

 
 
});


