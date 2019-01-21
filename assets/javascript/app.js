$(document).ready(function(){  //wait for page to load before running Javascript.

  var questionSet = null;
  var index = 0;
  var score = 0;
  var timer = 0;

//hide game score and questions on start.
$(".check-mark").hide();
$(".x-mark").hide();
$(".answerChoice").hide();

//calling gameStart function.
gameStart();

//establishing a timer with start and stop functions.
function startTimer(){
    var sec = 10;
    $(".timer").text("<h2>");
    $(".timer").show();
    $(".timer").text(sec);

    timer = setInterval(function(){
        sec --;
        $(".timer").text(sec);
            if(sec === -1){
                $(".timer").fadeOut('fast');
                stopTimer();
                clearCurrentGame();
                gameStart(); 
            }
    }, 1000);
    //console.log(secs);
}
    function stopTimer(){
        clearInterval(timer);
        $(".timer").hide();
    }

    //function to set questions and answers to page.
    function questionsAppearOnPage(qAndA){
        //add question to question div.
        $(".question").html("<h3>" + questionSet[qAndA].question + "</h3>");
        //append text from questions and answers array.
        $("#buttonA").text(questionSet[qAndA].possibleAnswers[0]).show();
        $("#buttonB").text(questionSet[qAndA].possibleAnswers[1]).show();
        $("#buttonC").text(questionSet[qAndA].possibleAnswers[2]).show();
        $("#buttonD").text(questionSet[qAndA].possibleAnswers[3]).show();
        alert(questionSet);
    }

        //set parameters for a correct player choice. including show correct answer graphic.
    function correctAnswer(){
        index;
        score ++;
        $(".check-mark").show().delay(200).fadeOut();
        setTimeout(function(){
        }, 500);
        console.log("Correct! Your score is: " + score);
    }

         //set parameters for an incorrect player choice. including show incorrect answer graphic.
    function wrongAnswer(){
        index;
        $(".x-mark").show().delay(200).fadeout();
        console.log("Incorrect")
    }

        //gamestart function.
    function gameStart(){
        
        $(".question").append('<button class="level-button" id="rivers">River Trivia</button>');
        $(".question").append('<button class="level-button" id="trees">Tree Trivia</button>');
        $(".question").append('<button class="level-button" id="rocks">Rock Trivia</button>');
        $(".level-button").on('click', function(){
            var level = $(this).attr('id');
            if (level === 'rivers'){
                questionSet = riverQuestions;
                questionsAppearOnPage(index);
                startTimer();
            }
            else if (level === 'trees'){
                questionSet = treeQuestions;
                questionsAppearOnPage(index);
                startTimer();
            }
            else if (level === 'rocks'){
                questionSet = rockQuestions;
                questionsAppearOnPage(index);
                startTimer();
            }
        });
    }
    
    //when player selects one if the choice buttons A,B,C,D.
    function showAnswer(){
        $(".answerChoice").on('click', function(){
            answersAppear();
        });
    }

    //answers appended to buttons.
    function answersAppear(){
        $(".question").text('');
        $("#buttonA").text('');
        $("#buttonB").text('');
        $("#buttonC").text('');
        $("#buttonD").text('');
    }

    function setUpNewGame() {
        index = 0;
        score = 0;
        $(".answerChoice").hide();
        gameStart();
    }

    function clearCurrentGame(){
        alert("Game Over! You scored: " + score + "/15!");
        alert("Good Game!");
        $(".question").empty();
        $(".answerChoice").hide();
        index = 0;
        score = 0;
        gameStart();
    }

    //answer-choice click event.
    $(".answerChoice").on('click', function(){
        //translate player selection/button id to a game selection value.
        if(this.id === "buttonA"){var answerSelected = "a";}
        else if(this.id === "buttonB"){answerSelected = "b";}
        else if(this.id === "buttonC"){answerSelected = "c";}
        else if(this.id === "buttonD"){answerSelected = "d";}

        // if answer selected coresponds to the array value 
        if(answerSelected === "a" && questionSet[index].flags[0] === true){ correctAnswer();}
        else if(answerSelected === "a"){wrongAnswer();}
        if(answerSelected === "b" && questionSet[index].flags[1] === true){ correctAnswer();}
        else if(answerSelected === "b"){wrongAnswer();}
        if(answerSelected === "c" && questionSet[index].flags[2] === true){ correctAnswer();}
        else if(answerSelected === "c"){wrongAnswer();}
        if(answerSelected === "d" && questionSet[index].flags[3] === true){ correctAnswer();}
        else if(answerSelected === "d"){wrongAnswer();}

        answersAppear();
        index++;

        if(index < questionSet.length){questionsAppearOnPage(index);}
        else{
            stopTimer();
            alert("Game Over! You scored: " + score + "/15!");
            setUpNewGame();
        }
    });    
});