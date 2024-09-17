const quizData = [
    {
        question: "Which of the following is a client-side language?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "What does CSS stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correct: "b",
    },
    {
        question: "Which planet is known as the Red Planet?",
        a: "Earth",
        b: "Venus",
        c: "Mars",
        d: "Jupiter",
        correct: "c",
    },
    {
        question: "Who developed the theory of relativity?",
        a: "Isaac Newton",
        b: "Albert Einstein",
        c: "Galileo Galilei",
        d: "Nikola Tesla",
        correct: "b",
    },
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
        correct: "c",
    },
    {
        question: "What is the smallest prime number?",
        a: "0",
        b: "1",
        c: "2",
        d: "3",
        correct: "c",
    },
    {
        question: "Which ocean is the largest?",
        a: "Atlantic Ocean",
        b: "Indian Ocean",
        c: "Arctic Ocean",
        d: "Pacific Ocean",
        correct: "d",
    },
    {
        question: "Which element has the chemical symbol O?",
        a: "Oxygen",
        b: "Gold",
        c: "Osmium",
        d: "Oganesson",
        correct: "a",
    }
];

let index = 0;
let correct = 0, incorrect = 0;
let selectedAnswers = [];

const questionBox = document.getElementById("questionBox");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");
const allInputs = document.querySelectorAll("input[type='radio']");

const loadQuestion = () => {
    if (index === quizData.length) {
        return showReview();
    }

    const currentQuestion = quizData[index];
    resetForm();
    questionBox.innerHTML = `<h2>${index + 1}. ${currentQuestion.question}</h2>`;
    allInputs[0].nextElementSibling.innerText = currentQuestion.a;
    allInputs[1].nextElementSibling.innerText = currentQuestion.b;
    allInputs[2].nextElementSibling.innerText = currentQuestion.c;
    allInputs[3].nextElementSibling.innerText = currentQuestion.d;
};

document.querySelectorAll("input[name='answer']").forEach(input => {
    input.addEventListener('change', () => {
        nextButton.disabled = false;
    });
});

nextButton.addEventListener("click", function() {
    const selected = getSelectedAnswer();
    if (selected !== undefined) {
        selectedAnswers.push(selected);
        index++;
        loadQuestion();

        // Show Submit button on last question
        if (index === quizData.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        }
    }
});

submitButton.addEventListener("click", function() {
    showReview();
});

const getSelectedAnswer = () => {
    let answer;
    allInputs.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
};

const resetForm = () => {
    allInputs.forEach(input => {
        input.checked = false;
    });
    nextButton.disabled = true;
};

const showReview = () => {
    let reviewHtml = `<h3>Your Score: ${correct} / ${quizData.length}</h3>`;
    quizData.forEach((q, i) => {
        const answer = selectedAnswers[i];
        reviewHtml += `<h4>Q${i + 1}: ${q.question}</h4>`;
        reviewHtml += `<p>Correct Answer: ${q[q.correct]}</p>`;
        reviewHtml += `<p>Your Answer: <strong style="color:${answer === q.correct ? 'green' : 'red'}">${q[answer]}</strong></p>`;
    });

    document.querySelector(".quiz-box").innerHTML = reviewHtml;
};

// Load the first question initially
loadQuestion();
