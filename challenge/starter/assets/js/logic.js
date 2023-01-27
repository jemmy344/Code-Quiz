let time = 70;
let currentQuestion = 0;
let score = 0;
let questions = [
  {
    question: "What is the result of 5 + 3?",
    choices: ["8", "10", "12", "14"],
    correct: "8",
  },
  {
    question: "What is the HTML tag for a line break?",
    choices: ["<break>", "<br>", "<lb>", "<nl>"],
    correct: "<br>",
  },
  {
    question: "What is the square of 2?",
    choices: ["4", "3", "5", "7"],
    correct: "4",
  }
  // more questions
];




//Quiz Timer
function startQuiz() {
  console.log("i am here");
  let intervalId = setInterval(function () {
    time--;
    document.getElementById('time').innerHTML = time;
    if (time === 0) {
      clearInterval(intervalId)
    }
  }, 1000)
  //function for question
  let questionTitle = document.getElementById('question-title')
  questionTitle.innerHTML = questions[currentQuestion].question
  let choices = document.getElementById('choices')
  choices.innerHTML = '';



  for (let index = 0; index < questions[currentQuestion].choices.length; index++) {
    let choice = document.createElement("div");
    choice.classList.add("choice");
    choice.innerText = questions[currentQuestion].choices[index];
    choices.appendChild(choice)

  }
  document.getElementById('questions').classList.remove("hide");
  // display choices

  function checkAnswer() {
    feedback.classList.remove("hide");
    if (this.innerText === questions[currentQuestion]?.correct) {
      score++;
      let feedback = document.getElementById("feedback")
      feedback.innerHTML = "Correct!";
      feedback.style.color = "#DC143C";
      currentQuestion++;

      if (currentQuestion < questions.length) {
        //add the hide class
        feedback.classList.add("hide");
        // there are more questions, update the question and choices
        questionTitle.innerHTML = questions[currentQuestion].question;
        choices.innerHTML = "";
        for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
          let choice = document.createElement("div");
          choice.classList.add("choice");
          choice.innerText = questions[currentQuestion].choices[i];
          choices.appendChild(choice);
        }
        console.log(choices.innerHTML);
  
        let choiceElements = document.querySelectorAll(".choice");
        for (let i = 0; i < choiceElements.length; i++) {
          choiceElements[i].addEventListener("click", checkAnswer);
        }
      } else {
        // no more questions, end the quiz
        endQuiz();
      }

      
    }
    else {
      time -= 10;
      feedback.innerHTML = "Incorrect!";
      feedback.style.color = "#008080";
    }
   
    
  }

  function endQuiz() {
    clearInterval(intervalId);
    document.getElementById("end-screen").classList.remove("hide");
    document.getElementById("final-score").innerHTML = score;
    // add code to handle submitting the score and showing the high scores
  }

  //we need to add an event listener to the choices. but remember the choices are a list of choices not a single element
  let choiceElements = document.querySelectorAll(".choice");
  console.log(choiceElements);
  //we need to add the event listener to the list of choices
  for (let index = 0; index < choiceElements.length; index++) {
    // within the event Listener we need to add a function that check the answer of the selection
    choiceElements[index].addEventListener("click", checkAnswer)

  }


  // document.getElementById('choice').addEventListener("click", () => {
  //   if (choices !== correctChoice) {
  //     document.getElementById('choice').add("wrong");
  //     let message = document.createElement("p");
  //     message.innerText = "WRONG";
  //     message.style.color = "#DC143C";
  //     choices.appendChild(message);
  //     questionsIndex++;
  //   } else {
  //     document.getElementById('choice').add("correct");
  //     let message = document.createElement("p");
  //     message.innerText = "CORRECT";
  //     message.style.color = "#008080";
  //     choices.appendChild(message);
  //     questionsIndex++;
  //   }
  // });

  

}

document.getElementById('start').addEventListener("click", startQuiz);



