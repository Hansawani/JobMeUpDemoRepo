const questions = [
  {
    question: "Analogies: Complete the analogy: Dog is to puppy as cat is to _",
    options: ["A.kitten", "B.cub", "C.calf", "D.foal"],
    answer: "A",
  },
  {
    question:
      "Sentence Completion: Fill in the blank to complete the sentence: 'The ____ of the novel left readers eagerly awaiting the sequel'",
    options: ["A.climax", "B.conclusion", "C.prologue", "D.epilogue"],
    answer: "B",
  },
  {
    question:
      "Critical Reasoning: Which of the following statements weakens the argument the most? 'All cats are mammals. Mittens is a cat. Therefore, Mittens is a mammal.'",
    options: [
      "A.Some mammals are not cats.",
      "B.Mittens is a Siamese cat.",
      "C.Dogs are also mammals.",
      "D.Birds are not mammals.",
    ],
    answer: "C",
  },
  {
    question: "Analogical Reasoning: If CLOUD is to RAIN, then SUN is to:",
    options: ["A.Day", "B.Night", "C.Warmth", "D.Shine"],
    answer: "A",
  },
  {
    question:
      "Logical Deduction: If all flowers are plants and some plants are trees, then it must be true that:",
    options: [
      "A.Some flowers are trees",
      "B.All trees are plants",
      "C.Some trees are flowers",
      "D.All flowers are trees",
    ],
    answer: "B",
  },
  {
    question:
      " Find the two words that best complete the following sentence: Though the movie received _______ reviews, the audience seemed to _______ it",
    options: [
      "A.mixed, enjoy",
      "B.positive, hate",
      "C.negative, love",
      "D.neutral, dislike",
    ],
    answer: "A",
  },
  {
    question:
      "Identify the relationship between the following pair of words: MILE : DISTANCE",
    options: [
      "A.weight : pound",
      "B.height : inch",
      "C. degree : temperature",
      "D.volume : gallon",
    ],
    answer: "C",
  },
];
let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById("question-container");

function createQuestion(question, index) {
  quizContainer.innerHTML = `
          <div class="question">
              <p>${question.question}</p>
              <ul class="options">
                  ${question.options
                    .map(
                      (option) =>
                        `<li><button type="button" data-answer="${option.toLowerCase()}">${option}</button></li>`
                    )
                    .join("")}
              </ul>
          </div>
      `;

  const options = quizContainer.querySelectorAll(".options button");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedAnswer = option.getAttribute("data-answer");
      if (selectedAnswer === question.answer.toLowerCase()) {
        score += 1; // Increase score by 1 for each correct answer
      }
      nextQuestion();
    });
  });

  updateProgressBar();
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
  } else {
    showScore();
  }
}

function updateProgressBar() {
  if (currentQuestionIndex >= 0) {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progress").style.width = progress + "%";
  }
}

function showScore() {
  const perscore = (score / questions.length) * 100;
  const normalized_score = ((perscore - 0) * (10 - 1)) / (100 - 0) + 1;
  document.getElementById("score-container").textContent =
    "Your score: " + parseFloat(normalized_score.toFixed(2));
}

document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("start-btn").style.display = "none";
  createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
});

document.getElementById("aptitudeTestForm").addEventListener("submit", (e) => {
  e.preventDefault();
  nextQuestion();
});
