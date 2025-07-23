const button = document.getElementById("scrollBtn");
const quizSection = document.querySelector(".quiz-section");
button.addEventListener("click", () => {
  quizSection.scrollIntoView({ behavior: "smooth" });
});

const quizzes = [
  {
    //first quiz
    title: "Ready for Lift off?",
    description: "The journey begins...",
    questions: [
      {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Venus", "Mars", "Jupiter"],
        correct: 2,
      },
      {
        question: "What force keeps planets in orbit?",
        answers: ["Magnetism", "Gravity", "Wind", "Friction"],
        correct: 1,
      },
      {
        question: "Which planet is closest to the Sun?",
        answers: ["Venus", "Mercury", "Earth", "Mars"],
        correct: 1,
      },
      {
        question: "How long does Earth take to orbit the Sun?",
        answers: ["365 days", "24 hours", "1 month", "7 years"],
        correct: 0,
      },
      {
        question: "What galaxy do we live in?",
        answers: ["Andromeda", "Milky Way", "Sombrero", "Whirlpool"],
        correct: 1,
      }
    ]
  },
  {
    //second quiz
    title: "Journey to the Edge of Space…",
    description: "How far can you go?",
    questions: [
      {
        question: "What is the hottest planet in our solar system?",
        answers: ["Mercury", "Venus", "Mars", "Neptune"],
        correct: 1,
      },
      {
        question: "What type of galaxy is the Milky Way?",
        answers: ["Irregular", "Elliptical", "Spiral", "Ring"],
        correct: 2,
      },
      {
        question: "Who was the first person in space?",
        answers: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"],
        correct: 1,
      },
      {
        question: "What do we call the boundary where Earth's atmosphere ends and space begins?",
        answers: [" Kármán Line", "Ozone Layer", "Stratosphere", "Event Horizon"],
        correct: 0,
      },
      {
        question: "What is a light-year a measure of?",
        answers: ["Time", "Speed", "Distance", "Brightness"],
        correct: 2,
      }
    ]
  },
  {
    //third quiz
    title: "Lost in the Stars?",
    description: "Only the brave make it this far.",
    questions: [
      {
        question: "What is the name of the telescope that has captured some of the most detailed images of space?",
        answers: ["Galileo", "Hubble ", "Spitzer", "webb"],
        correct: 1,
      },
      {
        question: "Which planet has the most moons?",
        answers: ["Saturn", "Mercury", "Mars", "Jupiter"],
        correct: 0,
      },
      {
        question: "What are Saturn's rings made of?",
        answers: ["Fire", "Metal", "Ice and rock", "Dust only"],
        correct: 2,
      },
      {
        question: "Which planet has a day longer than its year?",
        answers: ["Venus", "Jupiter", "Mars", "Earth"],
        correct: 0,
      },
      {
        question: "Which planet is known as the Morning Star?",
        answers: ["Venus", "Mars", "Mercury", "Jupiter"],
        correct: 0,
      }
    ]
  }
];

const quizContainer = document.getElementById("quiz-container");
const quizArea = document.getElementById("quiz-area");
const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const quizControls = document.getElementById("quiz-controls");
const prevQuizBtn = document.getElementById("prevQuiz");
const nextQuizBtn = document.getElementById("nextQuiz");

let currentQuizIndex = null;
let currentQuestionIndex = 0;
let score = 0;

function createQuizCards() {
  quizzes.forEach((quiz, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <p class="heading">${quiz.title}</p>
      <p>${quiz.description}</p>
    `;
    card.addEventListener("click", () => {
      startQuiz(index);
      // Scroll to the question container after starting the quiz
      const questionContainer = document.getElementById('question-container'); 
      if (questionContainer) {
        questionContainer.scrollIntoView({ behavior: 'smooth' });
      }
    });
    quizContainer.appendChild(card);
  });
}
function startQuiz(index) {
  currentQuizIndex = index;
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("result-section").style.display = "none";
  quizArea.classList.remove("hidden");
  quizControls.classList.remove("hidden");
  showQuestion();
  updateQuizControls();
  window.scrollTo({ top: quizArea.offsetTop - 50, behavior: "smooth" });
}


function showQuestion() {
  const currentQuiz = quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  
  // Display the question
  questionContainer.textContent = currentQuestion.question;
  
  // Clear previous answers
  answerButtons.innerHTML = "";
  
  // Create answer buttons
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(index));
    answerButtons.appendChild(button);
  });

  // Next button handling (MODIFIED PART)
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
  
  // Always hide Next button initially
  nextButton.classList.add("hidden");
  
  // Only show if NOT last question (will be revealed after answering)
  nextButton.classList.toggle("hidden", isLastQuestion);
}




function selectAnswer(selectedIndex) {
  const currentQuiz = quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const buttons = answerButtons.querySelectorAll("button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === currentQuestion.correct) {
      btn.classList.add("correct");
    } else if (i === selectedIndex) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === currentQuestion.correct) {
    score++;
  }

  nextButton.classList.remove("hidden");
}

function showResults() {
  // Clear question/answer area and show loading animation
  questionContainer.innerHTML = `
    <div class="content" style="margin: 0 auto;">
      <div class="planet">
        <div class="ring"></div>
        <div class="cover-ring"></div>
        <div class="spots">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
      <p>Analyzing cosmic data...</p>
    </div>
  `;
  
  answerButtons.innerHTML = '';
  nextButton.classList.add('hidden');
  
  // After 6 seconds, show results in the same container
  setTimeout(() => {
    const total = quizzes[currentQuizIndex].questions.length;
    let comment = '';
    
    if (score === total) {
      comment = "You're from space, I guess. Are you an alien? 👽";
    } else if (score >= 3) {
      comment = "Not bad, Earthling. You've got potential. 🌍✨";
    } else {
      comment = "You're new here, huh? Welcome to the cosmos! 🚀";
    }
    
    questionContainer.innerHTML = `
      <div class="quiz-results">
        <h3>Mission Report</h3>
        <p><strong>You scored ${score} / ${total}</strong></p>
        <p>${comment}</p>
        <button onclick="location.reload()">Try Another Quiz</button>
      </div>
    `;
    
    // Keep the quiz area visible
    quizArea.classList.remove('hidden');
    
  }, 3000); // 6 second delay
}
//*

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < quizzes[currentQuizIndex].questions.length) {
    showQuestion();
  } else {
    showResults();
  }
  
  updateQuizControls();
});

prevQuizBtn.addEventListener("click", () => {
  if (currentQuizIndex > 0) {
    startQuiz(currentQuizIndex - 1);
  }
});

nextQuizBtn.addEventListener("click", () => {
  if (currentQuizIndex < quizzes.length - 1) {
    startQuiz(currentQuizIndex + 1);
  }
});

function updateQuizControls() {
  prevQuizBtn.disabled = currentQuizIndex === 0;
  nextQuizBtn.disabled = currentQuizIndex === quizzes.length - 1;
}

createQuizCards();