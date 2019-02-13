$(document).ready(function() {
  //Creating variable to track the question & "slide" numbers
  var questionCounter = 0;
  
  // timeout 
  var ansTimeout = 2000;
  
  //Creating score variables
  var correct = 0;
  var incorrect = 0;
  var missed = 0;
  
  //Creating array of user's answers
  var userAns = [];
  
  //Creating an array of objects with the questions, answer options, and correct answer
  var questions = [
  {
    question: "Which of these is NOT a Noble Westerosi House?",
    choices: ["Majere", "Stark", "Lannister", "Targaryen", "Martell"],
    choicesAnswer: 0
  },
  {
    question: "Who is the Kingslayer",
    choices: ["Gregor Clegane", "Jaime Lannister", "Oberyn Martell", "Theon Greyjoy", "Ramsey Snow"],
    choicesAnswer: 1
  },
  {
    question: "What song was played at the infamous Red Wedding?",
    choices: ["The Bear And The Maiden Fair", "Hands Of Gold", "Greensleeves", "The Rains Of Castemere", "Gentle Mother Font Of Mercy"],
    choicesAnswer: 3
  },
  {
    question: "Which of these is  NOT one of Daenarys Targaryen's dragons?",
    choices: ["Drogon, Viserys, Rhaegal", "Drogon, Viserion, Rhaegal", "Drogon, Drogo, Rhaegar", "Drogon, Smaug, Tiamat", "Drogon, Paladine, Bahamut"],
    choicesAnswer: 1
  },
  {
    question: "At what battle was Tyrion Lannister disfigured?",
    choices: ["The Battle Of Hardhomme", "The Battle Of The Bastards", "The Battle Of Whispering Woods", "The Battle Of Blackwater", "The Battle Of The Trident"],
    choicesAnswer: 3
  },
  {
    question: "What is the name of Jon Snow's direwolf?",
    choices: ["Ghost", "Nymeria", "Summer", "Shaggydog", "Grey Wind"],
    choicesAnswer: 0
  }];
  
  //Function to submit answers
  function submitAnswers() {
    $("#submit").on("click", function(e) {
      e.preventDefault();
      userAns.length = 0;
        
      //Record user answer to question
      var userSelection = $("#answers input:radio[name=optionsRadios]:checked").val();
      userAns.push(userSelection);
      console.log(userAns);
      nextQ();
    });
  };
    
  //Creating question timer variables & functions
  var timeLeft = 8;
  var increment;
  
  function runTimer() {
    increment = setInterval(decrement, 1000);
  };
  
  function decrement() {
    timeLeft--;
    $("#time-left").html("Time remaining: " + timeLeft + " seconds");
    if (timeLeft === 0) {
      stopTimer();
      userAns.length = 0;		
      //Record user answer to question
      var userSelection = $("#answers input:radio[name=optionsRadios]:checked").val();
      userAns.push(userSelection);
      console.log(userAns);
      nextQ();
    };
  };
  
  function resetTimer() {
    timeLeft = 8;
    $("#time-left").html("Time remaining: " + timeLeft + " seconds");
  };
  
  function displayTimer() {
    $("#time-left").html("Answer Review");
  };
  
  function stopTimer() {
    clearInterval(increment);
  };
  
  //Function to display the given response options
  function createRadios() {
    var responseOptions = $("#answers");
    //Empty array for user answer
    responseOptions.empty();
      
    for (var i = 0; i < questions[questionCounter].choices.length; i++) {
      responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="twd-opt">' + questions[questionCounter].choices[i] + '</div></input><br></label>');
    };
  };
  
  //Function to display the given question
  function displayQ() {
    clearQ();
    resetTimer();
    $(".questions").html(questions[questionCounter].question);
    //Calling the function to display the response options
    createRadios();
    //Creating submit button
    $("#submit-div").append('<button type="submit" class="btn btn-default" id="submit">' + "Submit" + '</button>');
    runTimer()
    submitAnswers();
  };
  
  //Display start page
  function displayStart() {
    $("#content").append('<a href="#" class="btn btn-primary btn-lg" id="start-button">' + "Start" + '</a>');
    //Start game
    $("#start-button").on("click", function(event) {
      event.preventDefault();
      //Displays the first question
      firstQ();
      resetTimer();
    });
  };
  
  //Reset for end of game
  function reset() {
    questionCounter = 0;
    correct = 0;
    incorrect = 0;
    missed = 0;
    userAns = [];
    resetTimer();
  };
  
  //Display end page
  function displayEnd() {
    clearQ();
    $("#content").append('<h3>' + "Correct answers: " + correct + '</h3><br><h3>' + "Incorrect answers: " + incorrect + '</h3><br><h3>' + "Skipped questions: " + missed + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
    //Restart game
    $("#restart-button").on("click", function(event) {
      event.preventDefault();
      //Displays the first question
      reset();
      clearQ();
      displayStart();
    });
  };
  
  //Function to clear the question
  function clearQ() {
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
  
  //Showing whether answer was right/wrong
  function checkQ() {
    clearQ();
    var correctAnswer = questions[questionCounter].choicesAnswer;
    if (userAns[0] == questions[questionCounter].choicesAnswer) {
      $("#content").append('<h3>'+"Congratulations! You chose the right answer!" + '</h3>');
      correct++;
      displayTimer();
    }
    else if (userAns[0] === undefined) {
      $("#content").append('<h3>'+"Time's up!" + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
      missed++;
      displayTimer();
    }
    else {
      $("#content").append('<h3>'+"You chose the wrong answer." + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
      incorrect++;
      displayTimer();
    };
  };
  
  //Function to change the question 
  function nextQ() {
    checkQ();
    //Incrementing the count by 1
    questionCounter++;
    //If the count is the same as the length of the question array, the counts reset to 0
    if (questionCounter === questions.length) {
      setTimeout(displayEnd, ansTimeout);
    } 
    else {
      setTimeout(displayQ, ansTimeout);
    };
  };
  
  //Function to call the first question
  function firstQ() {
    var startContent = $("#content");
    startContent.empty(); 
    displayQ();
  };
  
  //Displays the start page
  displayStart();
  
  });