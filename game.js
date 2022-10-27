var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Step 7
// Start the game
$(document).keypress(function(event){
    if(!started){
        $("#level-title").text("Level " + level);
        setTimeout(function(){
            nextSequence();
        }, 500);
        started = true;
    }
});

// Step 4
// Adding Event Liseners
$(".btn").click(function (event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    console.log("User Clicked Pattern: " + userClickedPattern);
    console.log("Game Pattern: " + gamePattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// Step 8
// Check user's answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success!");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong!");
// Step 9
// Handle wrong answer
        $("body").addClass("game-over");
        
        playSound("wrong");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over! Press any key to restart.");

// Restart the game
        startOver();
    }
}

function nextSequence(){
// Clear userClickedPattern for every new level
    userClickedPattern = [];
// Increase level everytime nextSequence is called
    level++;
// Print level
    $("#level-title").text("Level " + level);
// Step 2
// Generating a random number and selecting a random color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
// Step 3
// selecting id having same name as randomChosenColor
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


// Step 5
// Adding Sounds to buttons
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Step 6
// Adding animations to user clicks
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");  //  Select element with id of button which is pressed and add the class.

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);                                    //  Wait for 100 milliseconds before removing the class
}

// Step 10
// Restart the game
function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}