/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function (e) {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  // Form submission 
  $( "#newTweets" ).on( "submit", function( event ) {

    // prevent the default form submission behaviour of restarting the page
    event.preventDefault();
    
    // create a date string
    const date = new Date();
    const month = date.getMonth();
    const day  = date.getDate();
    const year = date.getFullYear();
    const dateString = month + "/" + day + "/" + year; 
    dateString.toString();

    // serialize the data 
    let formData = $("form").serialize();

    // send this off (POST)
    $.post( "index.html", { dateString, formData } );

  });


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


  const renderTweets = function (tweets) {

    // loops through tweets
    for (let i = 0; i < tweets.length; i++) {

      let tweet = createTweetElement(tweets[i]);

      $("#tweets-container").append(tweet);
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  const createTweetElement = function (tweet) {

    console.log(tweet);

    let $tweet = `
      <article>
      
      <header class="tweet-header">
        
        <div class="tweet-avatar">

          <img src="${tweet.user.avatars}" >

          ${tweet.user.name};
          
        </div>       
        <p>${tweet.user.handle};</p>      

      </header>

      <div class="tweet-container-body">
      ${tweet.content.text};

      </div>

      <footer>
      ${tweet.created_at};

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

  renderTweets(data);

});


