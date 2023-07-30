var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClicked = [];
var level=0;
var started = false;


$(document).keypress(function (e) { 
    if(!started){
         $("#level-title").html("you are in level "+level);
         nextSequence();
         started=true;
        }
        
    });
    

$(".btn").click(function() {
    var userColour = $(this).attr("id");
    console.log(userColour)
    userClicked.push(userColour);
    playSound(userColour);
    animatePress(userColour);
    checkAnswer(userClicked.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClicked[currentLevel]){
        console.log("success");
        if (userClicked.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function() { $("body").removeClass("game-over"); }, 200);
     $("#level-title").html("GAME OVER DEAR Press any key to start again");
     startover();
    }
}

function nextSequence() {
    level=level+1
    $("#level-title").html("you are in level "+level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randomColour = buttonColours[randomnumber];
    gamePattern.push(randomColour);
    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);
}




function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() { $("#"+currentColour).removeClass("pressed"); }, 100);
}
function playSound(name) {
    var ad = new Audio("sounds/" + name + ".mp3");
    ad.play();
}

function startover(){
    level=0;
    started=false;
    gamePattern=[];
}
