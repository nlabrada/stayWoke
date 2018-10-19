$(document).ready(function(){
    $("#the-stuff").hide();
})
$("#start-btn").on("click", function(){
    $("#start-btn").remove();
    $("#the-stuff").show();
    game.loadQuestion();
});

$(document).on("click", ".answer-btn", function(e){
    game.answerClicked(e);
});

$(document).on("click", "#reset-btn", function(){
    game.reset();
});


var qs = [
    {
        question: "Aliens don't exist",
        options: ["true", "false","ayy lmao"],
        answer: "false",
        // image: "",
    },
    {
        question: "Bush did 9/11",
        options: ["true", "false","jet fuel can't melt steel beams"],
        answer: "true",
        // image: "",
    },
    {
        question: "The moon landing was real",
        options: ["true", "false","false and true"],
        answer: "false",
        // image: "",
    },
    {
        question: "Ted Cruz is the Zodiac",
        options: ["true", "false","it was his dad"],
        answer: "true",
        // image: "",
    },
    {
        question: "JFK was not killed by the government",
        options: ["true", "false","Jackie did it"],
        answer: "false",
        // image: "",
    },
    {
        question: "Earth is round",
        options: ["true", "false","who cares"],
        answer: "false",
        // image: "",
    }
                                                            
];

var game = {
    qs: qs,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    countdown: function() {
        game.counter--;
        $("#counter").html(game.counter)
        if(game.counter <= 0) {
            console.log("time is up!");
            game.timeUp();
        }
    },
    // whenever the start btn is pressed, this will start time
    // and load the first question
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        $("#the-timer").html("<h4> Timer: <span id='counter'> 30 </span> sec </h4>");
        $("#subwrapper").append("<h5>" + qs[game.currentQuestion].question + "</h5>");
        // for loop that goes through the questions options
        for (var i = 0; i < qs[game.currentQuestion].options.length; i++) {
            $("#subwrapper").append("<button class='answer-btn btn' id='button' data-name='" + qs[game.currentQuestion].options[i] + "'>" + qs[game.currentQuestion].options[i] + "</button>");
        }
    },
    // for the next question
    // start the timer over
    // and give the next question
    nextQuestion: function() {
        $("#subwrapper").empty();
        game.counter = 30;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();     

    },
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $("#subwrapper").html("<h4> You gotta be quicker than that </h4>");
        $("#subwrapper").append("<h5> The correct answer is: " + qs[game.currentQuestion].answer + "</h5>");
        if(game.currentQuestion === qs.length-1){
            setTimeout(game.results, 3*1000);
        } else{
            setTimeout(game.nextQuestion, 3*1000)
        }
    },
    results: function() {
        clearInterval(timer);
        $("#subwrapper").html("FINITO!");
        $("#subwrapper").append("<h4>You got " + game.correct + " right! </h4>");
        $("#subwrapper").append("<h4>Lol, you got " + game.incorrect + " wrong </h4>");
        $("#subwrapper").append("<h4>You didn't answer " + game.unanswered + " questions</h4>");
        $("#subwrapper").append("<button class='btn' id='reset-btn'> Play Again? </button>");
    },

    answerClicked: function (e) {
        clearInterval(timer);
        if($(e.target).attr("data-name") === qs[game.currentQuestion].answer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        } 
    },
    answeredCorrectly: function() {
        console.log("you got it dude!");
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html("<h4> You got it dude! </h4>");

        if(game.currentQuestion === qs.length-1){
            setTimeout(game.results, 3*1000);
        } else{
            setTimeout(game.nextQuestion, 3*1000)
        }

    },
    answeredIncorrectly: function() {
        console.log("smh, you got it wrong!");
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html("<h4> You got it wrong lol </h4>");
        $("#subwrapper").append("<h5> The correct answer is: " + qs[game.currentQuestion].answer + "</h5>");

        if(game.currentQuestion === qs.length-1){
            setTimeout(game.results, 3*1000);
        } else{
            setTimeout(game.nextQuestion, 3*1000)
        }

    },
    reset: function() {
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
}