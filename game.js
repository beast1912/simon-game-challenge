const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];


let level = 0;
let started = false;
$(document).keypress(function () {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level 0");
    }
    started = true;
});

//play sound when button pressed or for next sequence
function playSound(name) {

    var myAudio = new Audio("sounds/" + name + ".mp3");
    myAudio.play();
}

function nextSequence() {

    $("#level-title").text("Level " + (level++));

    let randomVariable = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomVariable];

    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

//animating button press
function animatePress(currentColor) {
    var currentColorID = "#" + currentColor;
    $(currentColorID).addClass("pressed");
    setTimeout(() => {
        $(currentColorID).removeClass("pressed");
    }, 100);

}


$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});


//to check wether the sequence is correct or not
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(() => {
                nextSequence();
            }, 650);
            userClickedPattern = [];
        }
    }
    //if the sequence is wrong game over and restart
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");

        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }

}



function startOver() {
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}



