var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userChosenPattern=[];
var level=0;
var gameStarted=false;





function nextSequence(){
var randomNumber=Math.floor(Math.random()*4);
var randomChosenColour=buttonColors[randomNumber];
gamePattern.push(randomChosenColour);
$(".btn."+randomChosenColour).fadeOut().fadeIn();
console.log("sounds/"+randomChosenColour+".mp3");
var audio=new Audio('sounds/'+randomChosenColour+'.mp3');
audio.play();
level=level+1;
$("#level-title").text("Level "+level);

}




$(".btn").on("click",function (){
    var userChosenColour=$(this).attr("id");
    userChosenPattern.push(userChosenColour);
    console.log(userChosenPattern);
    var audio=new Audio('sounds/'+userChosenColour+'.mp3');
    audio.play();
    $("#"+userChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColour).removeClass("pressed");
    },"100")


    var answer=checkAnswer();
   

})



$(document).on("keypress",function (){
    if(gameStarted==false){
    $("#level-title").text("Level "+level);
    setTimeout(nextSequence,"500");
    gameStarted=true;
    }
})




function checkAnswer(){
if(userChosenPattern[userChosenPattern.length-1]!=gamePattern[userChosenPattern.length-1]){
    gamePattern=[];
    level=0;
    userChosenPattern=[];
    gameStarted=false;
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over! Please press any key to start again.");
    return false;
}
if(JSON.stringify(userChosenPattern)==JSON.stringify(gamePattern)){
    userChosenPattern=[];
    setTimeout(nextSequence,"500");
    
}
return true;


}