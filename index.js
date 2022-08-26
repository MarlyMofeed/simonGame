var  buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level= 0;
var startedTogggle = true;


$(document).keypress(function ()
{
    if(startedTogggle)
    {
    nextSequence();
    startedTogggle= false;
    }
});


$(".btn").click(function ()
{
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//Function for choosing random colors

function nextSequence()
{
    userClickedPattern=[];
    level++;

    // we can add inside text the string and a variable
    $("#level-title").text("level " + level);

    var randomNumber= Math.floor(Math.random() * 4);
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//function for playing sound

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}

//function to show the pessed button effect
function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    
    //when using setTimeOut you just write it then the function afterwards without using $ in the beg
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}
//function for checking answer
function checkAnswer(currentLevel)
{
    var success=true;
    /*if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over,press any key to restart");
        startOver();

    }
    }*/
    for(var i=0;i<userClickedPattern.length;i++)
    {
        if(gamePattern[i]!==userClickedPattern[i])
        {
            success=false;
        }
    }
    if(userClickedPattern.length===gamePattern.length)
    {
        if(success)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function()
            {
                $("body").removeClass("game-over");
            },200);
            $("#level-title").text("Game Over,press any key to restart");
            startOver();
        }
    }

}
//function starting the game
function startOver()
{
    level=0;
    gamePattern = [];
    userClickedPattern=[];
    startedTogggle = true;
}
