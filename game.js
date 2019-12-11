//STEP 2:
let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
     //get a random colour
    let randomChosenColour = buttonColours[randomNumber];
    //add the random colour to gamePattern
    gamePattern.push(randomChosenColour);
    // STEP 3
    // flash animation on the buttons
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    //play audio according to the colour
    playSound(randomChosenColour);
    //increase level on every sequence
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
}

// STEP 4
//user chosen colour
$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");   
    userClickedPattern.push(userChosenColour);  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
});

//STEP 5
//function to play the correct sound
function playSound(name) {  
    let audio = new Audio("sounds/" + name +  ".mp3");
    audio.play();
};

//STEP 6
function animatePress(currentColour) {
    //add pressed class to the clicked button
    $("#" + currentColour).addClass("pressed");
    //remove class after delay
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

//STEP 7
//starting the game
$(document).keyup(function() {
    if (!gamePattern.length) {
        nextSequence();
        $("h1").text("Level " + level);
    }
})

//STEP 8
function checkAnswer () {
    
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            //STEP 9
            //game over
            let audioWrong = new Audio("sounds/wrong.mp3");
            audioWrong.play();
            //add game-over class to the clicked button
            $("body").addClass("game-over");
            //remove class after delay
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
            $("h1").text("Game Over, Press Any Key to Restart");
            return;
        }
    }

    if (gamePattern.length === userClickedPattern.length) {
        setTimeout(nextSequence, 500);
    }
    
}

//STEP 10
function startOver () {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
};