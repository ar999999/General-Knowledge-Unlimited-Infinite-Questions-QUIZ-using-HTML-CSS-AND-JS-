const questionBox = document.getElementById("question");
const answersBox = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = {};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  fetch("https://opentdb.com/api.php?amount=1&type=multiple")
    .then(res => res.json())
    .then(data => {
      const questionData = data.results[0];
      currentQuestion = questionData;

      questionBox.innerHTML = decodeHTML(questionData.question);

      // Combine correct and incorrect answers
      const answers = shuffle([
        questionData.correct_answer,
        ...questionData.incorrect_answers
      ]);

      answersBox.innerHTML = ""; // Clear previous answers

      answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerHTML = decodeHTML(answer);
        btn.addEventListener("click", () => selectAnswer(btn, answer));
        answersBox.appendChild(btn);
      });
    });
}

function selectAnswer(button, selectedAnswer) {
  const isCorrect = selectedAnswer === currentQuestion.correct_answer;

  Array.from(answersBox.children).forEach(btn => {
    const answerText = btn.innerHTML;
    if (decodeHTML(answerText) === currentQuestion.correct_answer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (isCorrect) {
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

nextBtn.addEventListener("click", () => {
  loadQuestion();
});

// Load first question
loadQuestion();
