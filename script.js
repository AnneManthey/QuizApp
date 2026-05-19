let currentQuestion = 0;
let rightQuestions = 0;
const audioSuccess = new Audio('assets/audio/success.wav');
const audioFail = new Audio('assets/audio/fail.wav');

let questions = [
    {
        "question": "What is the name of Kaladin's Honorspren?",
        "answer_1": "Sylphrena",
        "answer_2": "Pattern",
        "answer_3": "Ivory",
        "answer_4": "Snuggles",
        "right_answer": 1
    },
    {
        "question": "Which Knight Radiant Order does Shallan Davar belong to?",
        "answer_1": "Windrunners",
        "answer_2": "Lightweavers",
        "answer_3": "Truthwatchers",
        "answer_4": "Elsecallers",
        "right_answer": 2
    },
    {
        "question": "What is the name of Dalinar Kholin's Shardblade?",
        "answer_1": "Firestorm",
        "answer_2": "Sunraiser",
        "answer_3": "Oathbringer",
        "answer_4": "Mayalaran",
        "right_answer": 3
    },
    {
        "question": "Which of the following is NOT one of the Three Realms of the Cosmere?",
        "answer_1": "Physical Realm",
        "answer_2": "Cognitive Realm",
        "answer_3": "Spiritual Realm",
        "answer_4": "Astral Realm",
        "right_answer": 4
    },
    {
        "question": "What is the true name of the Herald known as the Madman, who arrives at the gates of Kholinar at the end of 'The Way of Kings'?",
        "answer_1": "Taln",
        "answer_2": "Nale",
        "answer_3": "Ishar",
        "answer_4": "Jezrien",
        "right_answer": 1
    },
]

function init() {
    document.getElementById("all-questions").innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];
    if (gameIsOver()) {                    // displays endscreen when questions are finished
        showEndscreen();
    }
    else {                                // displays question & answers and updates progress bar
        updateProgressBar();                                                                                                
        updateToNextQuestion(); 
    }
}

function gameIsOver(){                    // Returns true or false; if true, condition in `showQuestion` is met and executed.
    return currentQuestion >= questions.length;
}

function showEndscreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display:none';
    document.getElementById("all-questions-endscreen").innerHTML = questions.length;
    document.getElementById("right-questions-endscreen").innerHTML = rightQuestions;
    document.getElementById("header-image").src = `./assets/img/victory.png`;
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);                                        // Result in % (rounded)
    document.getElementById("progress-bar").innerHTML = `${percent} %`;         // Number in the progress bar
    document.getElementById("progress-bar").style = `width: ${percent}%`;       // Changes width of progress bar to show progress
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById("questiontext").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];

}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);                               // Accesses the last character of the string
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');  // parentNode accesses parent container
        audioSuccess.play();
        rightQuestions++;
    }
    else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audioFail.play();
    }
    document.getElementById('next-button').disabled = false;
}

// function rightAnswerSelected(selectedQuestionNumber){
//     return selectedQuestionNumber == question['right_answer'];
// }

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    currentQuestion = 0;
    rightQuestions = 0;
    document.getElementById("header-image").src = `./assets/img/quiz.png`;
    document.getElementById('questionBody').style = '';             // Shows questionbody
    document.getElementById('endScreen').style = 'display:none';    // Hides endscreen
    init();
}