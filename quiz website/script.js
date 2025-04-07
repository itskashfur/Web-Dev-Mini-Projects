const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    }
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let userAnswers = [];

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const optionsHTML = currentQuestion.options.map(option => `<label><input type="radio" name="answer" value="${option}">${option}</label>`).join('');
    questionContainer.innerHTML = `
        <p>${currentQuestion.question}</p>
        <form>${optionsHTML}</form>
    `;
}

function saveUserAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    userAnswers.push(selectedOption ? selectedOption.value : null);
}

function showResult() {
    const correctAnswers = questions.map(question => question.correctAnswer);
    const score = userAnswers.reduce((acc, answer, index) => acc + (answer === correctAnswers[index]), 0);
    const resultText = `You scored ${score} out of ${questions.length}.`;

    document.getElementById("result-text").innerText = resultText;
}

function nextQuestion() {
    saveUserAnswer();
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
        window.location.href = "result.html";
    }
}

// Event listeners
nextButton.addEventListener("click", nextQuestion);

// Initial load
loadQuestion();
