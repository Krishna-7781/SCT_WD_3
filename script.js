const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const playerNameInput = document.getElementById("player-name");
const playerDisplay = document.getElementById("player-display");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");

const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const resultPlayer = document.getElementById("result-player");
const highScoreElement = document.getElementById("high-score");

const progressFill = document.getElementById("progress-fill");
const questionCounter = document.getElementById("question-counter");

const timeLeftElement = document.getElementById("time-left");
const finalMessage = document.getElementById("final-message");

const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory = "html";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {

        categoryButtons.forEach((btn) =>
            btn.classList.remove("selected")
        );

        button.classList.add("selected");
        selectedCategory = button.dataset.category;
    });
});

const quizData = {

    html: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            answer: 0
        },
        {
            question: "Which tag creates a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            answer: 1
        },
        {
            question: "Which tag is used for images?",
            options: ["<img>", "<image>", "<pic>", "<src>"],
            answer: 0
        },
        {
            question: "Which HTML tag is used for the largest heading?",
            options: ["<h6>", "<heading>", "<h1>", "<head>"],
            answer: 2
        },
        {
            question: "Which tag creates a paragraph?",
            options: ["<text>", "<para>", "<p>", "<paragraph>"],
            answer: 2
        },
        {
            question: "Which tag contains metadata?",
            options: ["<body>", "<head>", "<footer>", "<main>"],
            answer: 1
        },
        {
            question: "HTML files usually have which extension?",
            options: [".html", ".ht", ".web", ".page"],
            answer: 0
        },
        {
            question: "Which tag creates a line break?",
            options: ["<lb>", "<break>", "<br>", "<newline>"],
            answer: 2
        },
        {
            question: "Which tag creates a table?",
            options: ["<table>", "<tab>", "<grid>", "<tbl>"],
            answer: 0
        },
        {
            question: "Which attribute specifies an image source?",
            options: ["href", "src", "link", "path"],
            answer: 1
        }
    ],

    css: [
        {
            question: "What does CSS stand for?",
            options: [
                "Creative Style Sheets",
                "Computer Style Sheets",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
            ],
            answer: 2
        },
        {
            question: "Which property changes text color?",
            options: ["font-color", "text-color", "color", "foreground"],
            answer: 2
        },
        {
            question: "Which property changes background color?",
            options: ["background-color", "bgcolor", "background", "color"],
            answer: 0
        },
        {
            question: "Which property controls font size?",
            options: ["font-size", "text-size", "size", "font-style"],
            answer: 0
        },
        {
            question: "Which property creates inner spacing?",
            options: ["margin", "padding", "gap", "space"],
            answer: 1
        },
        {
            question: "Which property creates rounded corners?",
            options: ["radius", "curve", "border-radius", "round"],
            answer: 2
        },
        {
            question: "Which display value enables Flexbox?",
            options: ["block", "grid", "flex", "inline"],
            answer: 2
        },
        {
            question: "Which property adds shadow to text?",
            options: ["shadow", "box-shadow", "font-shadow", "text-shadow"],
            answer: 3
        },
        {
            question: "Which symbol targets a class?",
            options: [".", "#", "*", "$"],
            answer: 0
        },
        {
            question: "Which symbol targets an ID?",
            options: [".", "#", "&", "*"],
            answer: 1
        }
    ],

    javascript: [
        {
            question: "Which keyword declares a variable?",
            options: ["var", "let", "const", "All of these"],
            answer: 3
        },
        {
            question: "Which method prints in console?",
            options: [
                "console.print()",
                "console.log()",
                "print()",
                "log()"
            ],
            answer: 1
        },
        {
            question: "JavaScript was originally developed by?",
            options: ["Google", "Microsoft", "Netscape", "Oracle"],
            answer: 2
        },
        {
            question: "Which operator checks strict equality?",
            options: ["==", "=", "!=", "==="],
            answer: 3
        },
        {
            question: "Which function displays a popup message?",
            options: ["alert()", "popup()", "message()", "notify()"],
            answer: 0
        },
        {
            question: "Which method converts JSON string into object?",
            options: [
                "JSON.parse()",
                "JSON.stringify()",
                "JSON.convert()",
                "JSON.object()"
            ],
            answer: 0
        },
        {
            question: "Which loop runs at least once?",
            options: ["for", "while", "foreach", "do...while"],
            answer: 3
        },
        {
            question: "Which keyword creates a function?",
            options: ["method", "func", "function", "define"],
            answer: 2
        },
        {
            question: "Which event occurs when a button is pressed?",
            options: ["hover", "submit", "click", "change"],
            answer: 2
        },
        {
            question: "Which method adds an item to the end of an array?",
            options: ["pop()", "shift()", "push()", "unshift()"],
            answer: 2
        }
    ]
};

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {

    const playerName = playerNameInput.value.trim();

    if (playerName === "") {
        alert("Please enter your name.");
        return;
    }

    currentQuestionIndex = 0;
    score = 0;

    scoreElement.textContent = score;
    playerDisplay.textContent = playerName;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    loadQuestion();
}

function loadQuestion() {

    resetState();

    const currentQuestion =
        quizData[selectedCategory][currentQuestionIndex];

    questionElement.textContent =
        currentQuestion.question;

    questionCounter.textContent =
        `Question ${currentQuestionIndex + 1} / ${quizData[selectedCategory].length}`;

    progressFill.style.width =
        `${((currentQuestionIndex + 1) / quizData[selectedCategory].length) * 100}%`;

    currentQuestion.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.classList.add("option-btn");

        button.textContent = option;

        button.addEventListener("click", () =>
            selectAnswer(index)
        );

        optionsContainer.appendChild(button);
    });

    startTimer();
}

function selectAnswer(selectedIndex) {

    clearInterval(timer);

    const currentQuestion =
        quizData[selectedCategory][currentQuestionIndex];

    const buttons =
        document.querySelectorAll(".option-btn");

    buttons.forEach((button, index) => {

        button.classList.add("disabled");

        if (index === currentQuestion.answer) {
            button.classList.add("correct");
        }

        if (
            index === selectedIndex &&
            selectedIndex !== currentQuestion.answer
        ) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === currentQuestion.answer) {

        score++;

        scoreElement.textContent = score;
    }

    nextBtn.classList.remove("hidden");
}

function nextQuestion() {

    currentQuestionIndex++;

    if (
        currentQuestionIndex <
        quizData[selectedCategory].length
    ) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {

    clearInterval(timer);

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    const playerName =
        playerNameInput.value.trim();

    resultPlayer.textContent = playerName;

    finalScoreElement.textContent =
        `${score} / ${quizData[selectedCategory].length}`;

    let highScore =
        localStorage.getItem("quizArenaHighScore") || 0;

    if (score > highScore) {

        highScore = score;

        localStorage.setItem(
            "quizArenaHighScore",
            highScore
        );
    }

    highScoreElement.textContent = highScore;

    if (score >= 8) {
        finalMessage.textContent =
            "🏆 Outstanding Performance!";
    } else if (score >= 5) {
        finalMessage.textContent =
            "🔥 Good Job!";
    } else {
        finalMessage.textContent =
            "💡 Keep Practicing!";
    }
}

function restartQuiz() {

    resultScreen.classList.remove("active");
    startScreen.classList.add("active");

    playerNameInput.value = "";

    clearInterval(timer);
}

function resetState() {

    nextBtn.classList.add("hidden");

    optionsContainer.innerHTML = "";
}

function startTimer() {

    clearInterval(timer);

    timeLeft = 15;

    timeLeftElement.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timeLeftElement.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            const buttons =
                document.querySelectorAll(".option-btn");

            const currentQuestion =
                quizData[selectedCategory][currentQuestionIndex];

            buttons.forEach((button, index) => {

                button.classList.add("disabled");

                if (index === currentQuestion.answer) {
                    button.classList.add("correct");
                }
            });

            nextBtn.classList.remove("hidden");
        }

    }, 1000);
}