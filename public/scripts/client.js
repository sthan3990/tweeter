/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function (e) {

  // Form submission POST
  $("#form-new-tweets").on("submit", function (event) {

    // prevent the default form submission behaviour of restarting the page
    event.preventDefault();
    
    // check if tweet content is >= 140 
    if($("#tweet-text").val().Length > 140) {
      alert("Too Long");
    }
    else {
       // serialize the form data 
    let formData = $('form').serialize();

    //get the action-url of the form
    let actionurl = event.currentTarget.action;

    // send this off (POST)
    $.post(actionurl, formData);
    
    $("#tweet-text").val("");

    $("#tweet-text").next().find("output").text("140");

    loadTweets();

    resetTweetArea();
    }
  });
  
  const resetTweetArea = function () {
   
    // clear text area
    $("#tweet-text").val.empty();

    $("#tweet-text").next().find("output").text.empty();

    // reset styling
    $("#tweet-text").first().next().find("output").css("color", "#545149");
  }


  const loadTweets = function () {

    $.ajax('/tweets', {
      method: 'GET',
      dataType: 'json',

      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.error(error);
      },
    });
  };


  $("#tweet-text").on('input', function (text) {
    
    let maxCharacters = 140;

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
      // Output pointer to modify CSS
      $("#tweet-text").next().find("output").css("color", "red");
    }
    else{
      $("#tweet-text").first().next().find("output").css("color", "#545149");
    }
  });

  const renderTweets = function (tweets) {

    $("#tweets-container").empty();

    if(tweets){
       // loops through tweets
      for (let i = 0; i < tweets.length; i++) {
        let tweet = createTweetElement(tweets[i]);
        $("#tweets-container").append(tweet);
      }
    }
   
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }


  const createTweetElement = function (tweet) {

    let $tweet = `
      <article>
      
      <header class="tweet-header">
        
        <div class="tweet-avatar">

          <img src="${tweet.user.avatars}" >

          ${tweet.user.name}
          
        </div>       
        <p>${tweet.user.handle}</p>      

      </header>

      <div class="tweet-container-body">
      ${tweet.content.text}

      </div>

      <footer>

      <abbr class="timeago">Created ${tweet.created_at} ago</abbr>

      <div class="tweet-social-icons">
        <i class="fas fa-share-alt"></i>
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-retweet"></i>
      </div>
      
      </footer>
    
      </article>
        
    `;
    return $tweet;
  }
  renderTweets();

});

