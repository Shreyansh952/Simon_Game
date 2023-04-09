var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;

var started = false;


$(document).keypress(function(){
    if(!started){
        $("#level-title").removeClass("font-fix").text("Level " + level);
        setTimeout(() => {
            nextSequence();
        }, 300);
        started = true;
    }
     
})

    $(".btn").click(function(){
        if(started){
            var userChosenColor = $(this).attr("id");
            userPattern.push(userChosenColor);
         
            playSound(userChosenColor);
            animatePress(userChosenColor);
        
            checkPattern(userPattern.length-1);
        }
        
    });


    



function nextSequence(){
    level++;
    userPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(80).fadeIn(80);
    playSound(randomChosenColor);
    
}


function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(button){
    $("#"+ button).addClass("pressed");
    setTimeout(() => {
        $("#" + button).removeClass("pressed")
    }, 100);
}

function checkPattern(currentLevel){
    if((userPattern[currentLevel]===gamePattern[currentLevel])&&(userPattern.length===gamePattern.length)){
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }else if((userPattern[currentLevel]!==gamePattern[currentLevel])){
        $("#level-title").addClass("font-fix").text("Game Over, Press any key to restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 800);
       startOver();
    }
}

function startOver(){
 gamePattern = [];  level = 0;
 started = false;
 clickTrigger = false;
}