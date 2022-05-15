var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
//var randomChosenColor;
var started=false;
var level=0;

$(document).keydown(function () {
    
    if(!started)
    {
       $("#level-title").text("Level "+level);
       nextSequence();
       started=true;
    } 
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]) {
        if(gamePattern.length==userClickedPattern.length)
        {
            setTimeout(function(){nextSequence()}, 1000);
        }
    }
    else{
        console.log("Fail");
        playSound("wrong");
        // var audioWrong= new Audio("sounds/wrong.mp3");
        // audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            
        }, 200);
        
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);


    var randomNumber= Math.floor(Math.random()*4);
    console.log(randomNumber);
    var randomChosenColor=buttonColors[randomNumber];
    console.log(randomChosenColor);
    
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    
    console.log($("#"+randomChosenColor));
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    //$("#"+randomChosenColor).on("onload", function (event) {playSound(randomChosenColor);});
    playSound(randomChosenColor);
    
    
    // $("#"+randomChosenColor).on("click", function (event) {
    //     var audio= new Audio("sounds/"+randomChosenColor+".mp3");
    //     audio.play();
    // });
}
//nextSequence();

//$("#someElement").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)


$(".btn").on("click", function (event) {
    var userChosenColor= event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    //return userChosenColor;
    console.log(userClickedPattern);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

//console.log(userClickedPattern);


function playSound(name) {
    
        var audio= new Audio("sounds/"+name+".mp3");
        audio.play();
    
    
}

function animatePress(currentColor) {
    
        $("#"+currentColor).addClass("pressed");
    
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    } , 100);
}

function startOver() {
    level=0;
    gamePattern=[];
    started= false;
    
}