$(document).ready(function() {

  var queries = 0;
  var transitionTimeout = 2000;
  var rightAnswers = 0;
  var wrongAnswers = 0;
  var passedAnswers = 0;
  var playerAnswers = [];

  var questions = [
  {
    question: "Which of these is NOT a Noble Westerosi House?",
    answer: ["Lannister", "Stark", "Majere", "Targaryen", "Martell"],
    correctAnswer: 2
  },
  {
    question: "Who is the Kingslayer",
    answer: ["Jaime Lannister", "Gregor Clegane", "Oberyn Martell", "Theon Greyjoy", "Ramsey Snow"],
    correctAnswer: 0
  },
  {
    question: "What song was played at the infamous Red Wedding?",
    answer: ["The Bear And The Maiden Fair", "The Rains Of Castemere", "Greensleeves", "Hands Of Gold", "Gentle Mother Font Of Mercy"],
    correctAnswer: 1
  },
  {
    question: "What are the name of Daenarys Targaryen's dragons?",
    answer: ["Drogon, Viserys, Rhaegal", "Drogon, Viserion, Rhaegal", "Drogon, Drogo, Rhaegar", "Drogon, Smaug, Tiamat", "Drogon, Paladine, Bahamut"],
    correctAnswer: 1
  },
  {
    question: "At what battle was Tyrion Lannister disfigured?",
    answer: ["The Battle Of Hardhomme", "The Battle Of The Bastards", "The Battle Of Whispering Woods", "The Battle Of The Trident", "The Battle Of Blackwater"],
    correctAnswer: 4
  },
  {
    question: "What is the name of Jon Snow's direwolf?",
    answer: ["Ghost", "Nymeria", "Summer", "Shaggydog", "Grey Wind"],
    correctAnswer: 0
  },
  {
    question: "Who was Margaery Tyrell's first husband?",
    answer: ["Joffery Lannister", "Tommen Lannister", "Loras Tyrell", "Petyr Baelish", "Renly Baratheon"],
    correctAnswer: 4
  },
  {
    question: "Where was Daenarys Targaryen born?",
    answer: ["Valyria", "King's Landing", "Dragonstone", "Dorne", "Vaes Dothrak"],
    correctAnswer: 2
  },
  {
    question: "What is the name of Arya Stark's sword?",
    answer: ["Ice", "Longclaw", "Oathkeeper", "Needle", "Widow's Wail"],
    correctAnswer: 3
  },
  {
    question: "What is Jon Snow's birthname?",
    answer: ["Aegon Targaryen", "Benjen Stark", "Jorah Mormont", "Howland Reed", "Jon Arryn"],
    correctAnswer: 0
  }];
  
  const submitAnswers = () => {
    $("#submit").on("click", function(x) {
      x.preventDefault();
      playerAnswers.length = 0;
      var playerSelection = $("#answers input:radio[name=optionsRadios]:checked").val();
      playerAnswers.push(playerSelection);
      console.log(playerAnswers);
      updateQuestion();
    });
  };
    
  var remainingTime = 10;
  var setTime;
  
  const timer = () => {
    setTime = setInterval(countdown, 1000);
  };
  
  const countdown = () => {
    remainingTime--;
    $("#timer-info").html("Time remaining: " + remainingTime + " seconds");
    if (remainingTime === 0) {
      stopTimer();
      playerAnswers.length = 0;		
      var playerSelection = $("#answers input:radio[name=optionsRadios]:checked").val();
      playerAnswers.push(playerSelection);
      console.log(playerAnswers);
      updateQuestion();
    };
  };
  
  const resetTimer = () => {
    remainingTime = 10;
    $("#timer-info").html("Time remaining: " + remainingTime + " seconds");
  };
  
  const displayTimer = () => {
    $("#timer-info").html("Results");
  };
  
  const stopTimer = () => {
    clearInterval(setTime);
  };
  
  const optionGenerator = () => {
    var responseOptions = $("#answers");
    responseOptions.empty();
      
    for (var i = 0; i < questions[queries].answer.length; i++) {
      responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="got-display">' + questions[queries].answer[i] + '</div></input><br></label>');
    };
  };
  
  const displayQuestions = () => {
    refreshQuestion();
    resetTimer();
    $(".questions").html(questions[queries].question);
    optionGenerator();
    $("#submit-div").append('<button type="submit" class="btn btn-default" id="submit">' + "Submit" + '</button>');
    timer()
    submitAnswers();
  };
  
  const gameStart = () => {
    $("#content").append('<a href="#" class="btn btn-primary btn-lg" id="start-button">' + "Start" + '</a>');
    $("#start-button").on("click", function(event) {
      event.preventDefault();
      initialQuestion();
      resetTimer();
    });
  };
  
  const resetGame = () => {
    queries = 0;
    rightAnswers = 0;
    wrongAnswers = 0;
    passedAnswers = 0;
    playerAnswers = [];
    resetTimer();
  };
  
  const endPage = () => {
    refreshQuestion();
    $("#content").append('<h2>' + "Correct answers: " + rightAnswers + '</h2><br><h2>' + "Incorrect answers: " + wrongAnswers + '</h2><br><h2>' + "Skipped questions: " + passedAnswers + '</h2><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
    $("#restart-button").on("click", function(event) {
      event.preventDefault();
      resetGame();
      refreshQuestion();
      gameStart();
    });
  };
  
  const refreshQuestion = () => {
    var questionDiv = $(".questions");
    questionDiv.empty();
    var answersDiv = $("#answers");
    answersDiv.empty();
    var submitDiv = $("#submit-div");
    submitDiv.empty();
    var contentDiv = $("#content");
    contentDiv.empty();
    stopTimer();
  };
  
  const checkQuestion = () => {
    refreshQuestion();
    var correctAnswer = questions[queries].correctAnswer;
    if (playerAnswers[0] == questions[queries].correctAnswer) {
      $("#content").append('<h2>'+"Congratulations! You chose the right answer!" + '</h2>');
      rightAnswers++;
      displayTimer();
    }
    else if (playerAnswers[0] === undefined) {
      $("#content").append('<h2>'+"Time's up!" + '</h2><br><br><h2>' + "The correct answer was: " + questions[queries].answer[correctAnswer] + '</h2>');
      passedAnswers++;
      displayTimer();
    }
    else {
      $("#content").append('<h2>'+"You chose the wrong answer." + '</h2><br><br><h2>' + "The correct answer was: " + questions[queries].answer[correctAnswer] + '</h2>');
      wrongAnswers++;
      displayTimer();
    };
  };
  
  const updateQuestion = () => {
    checkQuestion();
    queries++;
    if (queries === questions.length) {
      setTimeout(endPage, transitionTimeout);
    } 
    else {
      setTimeout(displayQuestions, transitionTimeout);
    };
  };
  
  const initialQuestion = () => {
    var startContent = $("#content");
    startContent.empty(); 
    displayQuestions();
  };
  
  gameStart();
  
  });