$(document).ready(function() {
  //Creating variable to track the question & "slide" numbers
  var queries = 0;
  
  // timeout 
  var transitionTimeout = 2000;
  
  //Creating score variables
  var rightAnswers = 0;
  var wrongAnswers = 0;
  var passedAnswers = 0;
  
  //Creating array of user's answers
  var playerAnswers = [];
  
  //Creating an array of objects with the questions, answer options, and correct answer
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
  
  //Function to submit answers
  const submitAnswers = () => {
    $("#submit").on("click", function(x) {
      x.preventDefault();
      playerAnswers.length = 0;
        
      //Record user answer to question
      var userSelection = $("#answers input:radio[name=optionsRadios]:checked").val();
      playerAnswers.push(userSelection);
      console.log(playerAnswers);
      nextQ();
    });
  };
    
  //Creating question timer variables & functions
  var timeLeft = 8;
  var increment;
  
  const runTimer = () => {
    increment = setInterval(decrement, 1000);
  };
  
  const decrement = () => {
    timeLeft--;
    $("#timer-info").html("Time remaining: " + timeLeft + " seconds");
    if (timeLeft === 0) {
      stopTimer();
      playerAnswers.length = 0;		
      //Record user answer to question
      var userSelection = $("#answers input:radio[name=optionsRadios]:checked").val();
      playerAnswers.push(userSelection);
      console.log(playerAnswers);
      nextQ();
    };
  };
  
  const resetTimer = () => {
    timeLeft = 8;
    $("#timer-info").html("Time remaining: " + timeLeft + " seconds");
  };
  
  const displayTimer = () => {
    $("#timer-info").html("Answer Review");
  };
  
  const stopTimer = () => {
    clearInterval(increment);
  };
  
  //Function to display the given response options
  const createRadios = () => {
    var responseOptions = $("#answers");
    //Empty array for user answer
    responseOptions.empty();
      
    for (var i = 0; i < questions[queries].answer.length; i++) {
      responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="got-display">' + questions[queries].answer[i] + '</div></input><br></label>');
    };
  };
  
  //Function to display the given question
  const displayQ = () => {
    clearQ();
    resetTimer();
    $(".questions").html(questions[queries].question);
    //Calling the function to display the response options
    createRadios();
    //Creating submit button
    $("#submit-div").append('<button type="submit" class="btn btn-default" id="submit">' + "Submit" + '</button>');
    runTimer()
    submitAnswers();
  };
  
  //Display start page
  const gameStart = () => {
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
  const reset = () => {
    queries = 0;
    rightAnswers = 0;
    wrongAnswers = 0;
    passedAnswers = 0;
    playerAnswers = [];
    resetTimer();
  };
  
  //Display end page
  const displayEnd = () => {
    clearQ();
    $("#content").append('<h3>' + "Correct answers: " + rightAnswers + '</h3><br><h3>' + "Incorrect answers: " + wrongAnswers + '</h3><br><h3>' + "Skipped questions: " + passedAnswers + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
    //Restart game
    $("#restart-button").on("click", function(event) {
      event.preventDefault();
      //Displays the first question
      reset();
      clearQ();
      gameStart();
    });
  };
  
  //Function to clear the question
  const clearQ = () => {
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
  const checkQ = () => {
    clearQ();
    var correctAnswer = questions[queries].correctAnswer;
    if (playerAnswers[0] == questions[queries].correctAnswer) {
      $("#content").append('<h3>'+"Congratulations! You chose the right answer!" + '</h3>');
      rightAnswers++;
      displayTimer();
    }
    else if (playerAnswers[0] === undefined) {
      $("#content").append('<h3>'+"Time's up!" + '</h3><br><br><h3>' + "The correct answer was: " + questions[queries].answer[correctAnswer] + '</h3>');
      passedAnswers++;
      displayTimer();
    }
    else {
      $("#content").append('<h3>'+"You chose the wrong answer." + '</h3><br><br><h3>' + "The correct answer was: " + questions[queries].answer[correctAnswer] + '</h3>');
      wrongAnswers++;
      displayTimer();
    };
  };
  
  //Function to change the question 
  const nextQ = () => {
    checkQ();
    //Incrementing the count by 1
    queries++;
    //If the count is the same as the length of the question array, the counts reset to 0
    if (queries === questions.length) {
      setTimeout(displayEnd, transitionTimeout);
    } 
    else {
      setTimeout(displayQ, transitionTimeout);
    };
  };
  
  //Function to call the first question
  const firstQ = () => {
    var startContent = $("#content");
    startContent.empty(); 
    displayQ();
  };
  
  //Displays the start page
  gameStart();
  
  });