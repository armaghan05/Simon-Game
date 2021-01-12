
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var ui = [];

var started = false;
var level = 0;

/* This functions makes sure, the variable started is only set true, when a key is pressed.
  It meanas, if once the key is pressed, it will be seen if started = True.
  And only if it is true (which is not yet as mentioned above), it will set the value
  of started = true.
*/

 $(document).keypress(function() {
  if (!started) { // if started = false, which it is,
    $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
  }
});

$(".btn").click(function() {
  var answer = $(this).attr("id");
  ui.push(answer);   /* From here, UI != 0, because there
                        is an element now inside ui array */
  playSound(answer);
  animatePress(answer);
  checkAnswer(ui.length-1);
});

function checkAnswer(a) {

    if (gamePattern[a] === ui[a]) {
      /* sometimes same colors are shown/pressed one after
      another consecutively. Above, we made sure that the position of last element
      of gamePattern and position of of last element in array UI for array UI are the same,
      we make sure below this as well, that the length of both arrays are also the same;
      hence if in case two yellow numbers were offered by game to be pressed, and user pressed one yellow(previous)
      and then pressed red,  and then randomNumber assignment comes red ass well-- and checkAnswer() will run,
      it will give it as the right answer since the last element in each array were the same. This is wrong.
      it happens because, of course,  Ui array would only be populated, after the userInput( a click),  */
      if (ui.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  ui = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
