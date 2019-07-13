
var gamePath = [];
var userPath = [];
var buttonColor = ["green", "red", "yellow", "blue"];

var gameLevel = 0;

var started = false;

$(document).keydown(function(e){
    if(!started){
        $("#level-title").text("level: " + gameLevel);
        started = true;
        nextSequence();
    }
})

$(".btn").click(function(e){
    var userChosenColor = e.target.classList[1];
    userPath.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer();  
})

function checkAnswer(){
    var index = userPath.length - 1;
    if(userPath[index] == gamePath[index]){
        console.log("success");
        if(index == gameLevel - 1){
            setTimeout(nextSequence,1000);
        }
    }
    else{
        console.log("fail");

        if(gameLevel == 0){
            $("#level-title").text("Press any key to start first!");
        }else{
            $("#level-title").text("Game over! Press any key to start over!");
        }

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        startOver();
    }
}

function nextSequence(){
    userPath = [];

    gameLevel ++;
    $("#level-title").text("level: " + gameLevel);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePath.push(randomChosenColor);

    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function startOver(){
    gamePath = [];
    gameLevel = 0;
    started = false;
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color){
    $("." + color).addClass("pressed");
    setTimeout(function(){
        $("." + color).removeClass("pressed");
    },100);
}