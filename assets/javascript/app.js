var qs = [
    {
        question: "Aliens don't exist",
        options: ["true", "false","ayy lmao"],
        answer: "false",
        image: "./assets/images/aliens-lol.gif",
    },
    {
        question: "Bush did 9/11",
        options: ["true", "false","jet fuel can't melt steel beams"],
        answer: "true",
        image: "./assets/images/george.jpg",
    },
    {
        question: "The moon landing was real",
        options: ["true", "false","false and true"],
        answer: "false",
        image: "./assets/images/moon-landing.gif",
    },
    {
        question: "Ted Cruz is the Zodiac",
        options: ["true", "false","it was his dad"],
        answer: "true",
        image: "./assets/images/cruz.gif",
    },
    {
        question: "JFK was not killed by the government",
        options: ["true", "false","Jackie did it"],
        answer: "false",
        image: "./assets/images/jfk.gif",
    },
    {
        question: "Earth is round",
        options: ["true", "false","who cares"],
        answer: "false",
        image: "./assets/images/wtf-its-flat.jpg",
    }
                                                            
];

var timer;
var countStart = 30;

var game = {
    qs: qs,
    currentQuestion: 0,
    counter: countStart,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    // this is our countdown
    countdown: function() {
        game.counter--;
        $("#showCounter").text(game.counter)
        if(game.counter === 0) {
            console.log("time is up!");
            game.timeUp();
        }
    },
    // whenever the start btn is pressed, this will start time
    // and load the first question
    loadQuestion: function() {

        timer = setInterval(game.countdown, 1000);
        $("#quizDiv").html("<h2>" + qs[game.currentQuestion].question + "</h2>");

        // for loop that goes through the questions options
        for (var i = 0; i < qs[game.currentQuestion].options.length; i++) {
            $("#quizDiv").append("<button class='answer-btn btn' data-name='" + qs[game.currentQuestion].options[i] + "'>" + qs[game.currentQuestion].options[i] + "</button>");
        }
    },

    // for the next question start the timer over
    // and give the next question
    nextQuestion: function() {
        game.counter = countStart;
        $("#showCounter").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();     

    },

    timeUp: function () {

        clearInterval(timer);

        $("#showCounter").html(game.counter);

        game.unanswered++;

        $("#quizDiv").html("<h4> You gotta be quicker than that </h4>");
        $("#quizDiv").append("<h5> The correct answer is: " + qs[game.currentQuestion].answer + "</h5>");
        $("#quizDiv").append("<img src='" + qs[this.currentQuestion].image + "'/>");

        if(game.currentQuestion === qs.length - 1){
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    results: function() {
        clearInterval(timer);

        $("#quizDiv").html("<h3>FINITO!</h2>");

        $("#showCounter").html(game.counter);

        $("#quizDiv").append("<h3>Correct: " + game.correct + "</h3>");
        $("#quizDiv").append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $("#quizDiv").append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $("#quizDiv").append("<br><button id='reset-btn' class='btn'> Play Again? </button>");
    },

    answerClicked: function (e) {
        clearInterval(timer);

        if($(e.target).attr("data-name") === qs[game.currentQuestion].answer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        } 
    },
    // when they get something right
    answeredCorrectly: function() {
        game.correct++;
        clearInterval(timer);

        $("#quizDiv").html("<h2> You got it dude! </h2>");
        $("#quizDiv").append("<img src='" + qs[this.currentQuestion].image + "'/>");

        // check if this is the last q
        if(game.currentQuestion === qs.length-1){
            setTimeout(game.results, 3 * 1000);
        } else{
            setTimeout(game.nextQuestion, 3 * 1000)
        }

    },
    // when they get something wrong
    answeredIncorrectly: function() {
        game.incorrect++;
        clearInterval(timer);

        $("#quizDiv").html("<h2> You got it wrong lol </h2>");
        $("#quizDiv").append("<h3> The correct answer is: " + qs[game.currentQuestion].answer + "</h3>");
        $("#quizDiv").append("<img src='" + qs[this.currentQuestion].image + "'/>");

        // check if this is the last q
        if(game.currentQuestion === qs.length-1){
            setTimeout(game.results, 3 * 1000);
        } else{
            setTimeout(game.nextQuestion, 3 * 1000)
        }
    },
    reset: function() {
        game.currentQuestion = 0;
        game.counter = 30;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }

}

$(document).on("click", "#reset-btn", function() {
    game.reset();
});

$(document).on("click", ".answer-btn", function(e) {
    game.answerClicked(e);
});

$(document).on("click", "#start", function() {
    $("#sub-container").prepend("<h2 class='center-align'> Time: <span id = 'showCounter'> 30 </span></h2>");
    game.loadQuestion();
});

