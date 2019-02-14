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
    answer: ["Majere", "Stark", "Lannister", "Targaryen", "Martell"],
    correctAnswer: 0
  },
  {
    question: "Who is the Kingslayer",
    answer: ["Gregor Clegane", "Jaime Lannister", "Oberyn Martell", "Theon Greyjoy", "Ramsey Snow"],
    correctAnswer: 1
  },
  {
    question: "What song was played at the infamous Red Wedding?",
    answer: ["The Bear And The Maiden Fair", "Hands Of Gold", "Greensleeves", "The Rains Of Castemere", "Gentle Mother Font Of Mercy"],
    correctAnswer: 3
  },
  {
    question: "What are the name of Daenarys Targaryen's dragons?",
    answer: ["Drogon, Viserys, Rhaegal", "Drogon, Viserion, Rhaegal", "Drogon, Drogo, Rhaegar", "Drogon, Smaug, Tiamat", "Drogon, Paladine, Bahamut"],
    correctAnswer: 1
  },
  {
    question: "At what battle was Tyrion Lannister disfigured?",
    answer: ["The Battle Of Hardhomme", "The Battle Of The Bastards", "The Battle Of Whispering Woods", "The Battle Of Blackwater", "The Battle Of The Trident"],
    correctAnswer: 3
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
  
  const runTimer = () => {
    increment = setInterval(decrement, 1000);
  };
  
  const decrement = () => {
    timeLeft--;
    $("#timer-info").html("Time remaining: " + timeLeft + " seconds");
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
      
    for (var i = 0; i < questions[questionCounter].answer.length; i++) {
      responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="got-display">' + questions[questionCounter].answer[i] + '</div></input><br></label>');
    };
  };
  
  //Function to display the given question
  const displayQ = () => {
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
  const displayStart = () => {
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
    questionCounter = 0;
    correct = 0;
    incorrect = 0;
    missed = 0;
    userAns = [];
    resetTimer();
  };
  
  //Display end page
  const displayEnd = () => {
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
    var correctAnswer = questions[questionCounter].correctAnswer;
    if (userAns[0] == questions[questionCounter].correctAnswer) {
      $("#content").append('<h3>'+"Congratulations! You chose the right answer!" + '</h3>');
      correct++;
      displayTimer();
    }
    else if (userAns[0] === undefined) {
      $("#content").append('<h3>'+"Time's up!" + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].answer[correctAnswer] + '</h3>');
      missed++;
      displayTimer();
    }
    else {
      $("#content").append('<h3>'+"You chose the wrong answer." + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].answer[correctAnswer] + '</h3>');
      incorrect++;
      displayTimer();
    };
  };
  
  //Function to change the question 
  const nextQ = () => {
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
  const firstQ = () => {
    var startContent = $("#content");
    startContent.empty(); 
    displayQ();
  };
  
  //Displays the start page
  displayStart();
  
  });