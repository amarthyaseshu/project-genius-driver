// This js file is for the functionality of quiz box and some animation(Level-2)

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const optionA = document.getElementById("A");
const optionB = document.getElementById("B");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const carsound = document.getElementById('carsound');


// for moving and stopping the road and city
function roadStop() {
    document.getElementById("road").style.animationPlayState = "paused";
}

function roadStart() {
    document.getElementById("road").style.animationPlayState = "running";
}

function cityStop() {
    document.getElementById("city").style.animationPlayState = "paused";
}

function cityStart() {
    document.getElementById("city").style.animationPlayState = "running";
}


// creating questions
let questions = [{
        question: "65x2?",
        optionA: "130",
        optionB: "150",
        ans: "A"

    }, {
        question: "130x7?",
        optionA: "880",
        optionB: "910",
        ans: "B"
    }, {
        question: "88/4?",
        optionA: "22",
        optionB: "32",
        ans: "A"
    },
    {
        question: "310x9?",
        optionA: "2790",
        optionB: "2770",
        ans: "A"
    },
    {
        question: "110/11?",
        optionA: "11",
        optionB: "10",
        ans: "B"
    },
    {
        question: "180/6?",
        optionA: "30",
        optionB: "34",
        ans: "A"
    },
    {
        question: "7x180?",
        optionA: "1260",
        optionB: "1860",
        ans: "A"
    },
    {
        question: "500x5?",
        optionA: "1500",
        optionB: "2500",
        ans: "B"
    },
    {
        question: "888/8?",
        optionA: "121",
        optionB: "111",
        ans: "B"
    },
    {
        question: "111x111?",
        optionA: "11111",
        optionB: "12321",
        ans: "B"
    }

];


const lastQuestion = questions.length - 1;
let presentQuestion = 0;
let count = 0;
const questionTime = 10; // we have 3sec time to answer
let timer;
let score = 0;


// starting the quiz
start.addEventListener("click", startQuiz);

function startQuiz() {
    start.style.display = "none";
    getQuestion();
    quiz.style.display = "block";
    getProgress();
    getCounter();
    timer = setInterval(getCounter, 1000); //setInterval will call renderCounter every 1 sec
}

// for getting question
function getQuestion() {
    let q = questions[presentQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    optionA.innerHTML = q.optionA;
    optionB.innerHTML = q.optionB;
}


// for the progress 

function getProgress() {
    for (let ques = 0; ques <= lastQuestion; ques++) {
        progress.innerHTML += "<div class='prog' id=" + ques + " ></div>";
    }
}

// for the timer 

function getCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        count++
    } else {
        count = 0;

        wrongAnswer(); //because user exceeded time
        if (presentQuestion < lastQuestion) {
            presentQuestion++;
            getQuestion();
        } else {
            // end the quiz 
            clearInterval(timer);
            getScore();
        }
    }
}

// checkAnwer

function checkOption(user_answer) {
    if (user_answer == questions[presentQuestion].ans) {
        // correct answer

        score++;
        correctAnswer();
    } else {
        //  wrong answer

        wrongAnswer();
    }
    count = 0;
    if (presentQuestion < lastQuestion) {
        presentQuestion++;
        getQuestion();
    } else {
        // end the quiz 
        clearInterval(timer);
        getScore();
    }
}

// for correct answer
function correctAnswer() {
    document.getElementById(presentQuestion).style.backgroundColor = "green";
    roadStart();
    cityStart();
    carsound.play();
}

// for wrong answer

function wrongAnswer() {
    document.getElementById(presentQuestion).style.backgroundColor = "red";
    roadStop();
    cityStop();
    carsound.pause();
}


//based on score go to home or end

function getScore() {
    if (score > 6) {
        window.location.href = "winindex.html";
    } else {
        window.location.href = "endindex.html";
    }
}