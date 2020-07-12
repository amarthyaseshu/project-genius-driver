// This js file is for the functionality of quiz box and some animation(Level-1)

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
        question: "16+24",
        optionA: "40",
        optionB: "52",
        ans: "A"

    }, {
        question: "96-64",
        optionA: "36",
        optionB: "32",
        ans: "B"
    }, {
        question: "38+112?",
        optionA: "150",
        optionB: "186",
        ans: "A"
    },
    {
        question: "188-88?",
        optionA: "100",
        optionB: "88",
        ans: "A"
    },
    {
        question: "222-20?",
        optionA: "220",
        optionB: "202",
        ans: "B"
    },
    {
        question: "12+160?",
        optionA: "172",
        optionB: "186",
        ans: "A"
    },
    {
        question: "12+180?",
        optionA: "192",
        optionB: "186",
        ans: "A"
    },
    {
        question: "500-188?",
        optionA: "372",
        optionB: "312",
        ans: "B"
    },
    {
        question: "44+160?",
        optionA: "172",
        optionB: "204",
        ans: "B"
    },
    {
        question: "800-160?",
        optionA: "660",
        optionB: "640",
        ans: "B"
    }

];


const lastQuestion = questions.length - 1;
let presentQuestion = 0;
let count = 0;
const questionTime = 10; // we have 5sec time to answer
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


//based on score go to level2 or end

function getScore() {
    if (score > 6) {
        window.location.href = "index2.html";
    } else {
        window.location.href = "endindex.html";
    }
}