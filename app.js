  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
  import { 
    getDatabase,
    onChildAdded,
    ref,
   } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDbzbz3LNdXvTu6E8YExVvPSY3f0uCr6S8",
    authDomain: "quiz-app-10085.firebaseapp.com",
    projectId: "quiz-app-10085",
    storageBucket: "quiz-app-10085.appspot.com",
    messagingSenderId: "90134425241",
    appId: "1:90134425241:web:b8811b8cdc4d3547a41208",
    measurementId: "G-G9BSHQSYCC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();

// QUESTION ----------------------------------------------------------------------------------------

var questions =[

]

window.getData = function(){
    const getTask = ref(database, `quiz/`)
    onChildAdded(getTask,function(data){
        questions.push(data.val())
    })
}
getData();
console.log(questions)

// QUESTION ----------------------------------------------------------------------------------------

const start_btn = document.querySelector(".start_quiz");
const quiz_box = document.querySelector(".quiz-box");
const que_text = quiz_box.querySelector(".que_text");
const options_box = quiz_box.querySelector(".options");
const next_btn = document.querySelector(".next-btn")
const total_q = document.querySelector(".quiz-footer .total_que");
const count_que = document.querySelector(".quiz-footer .count_que");
const result_box = document.querySelector(".result-box");

const total_que_r = document.querySelector(".total-que span");
const right_ans_r = document.querySelector(".right-ans span");
const wrong_ans_r = document.querySelector(".wrong-ans span");
const percentage = document.querySelector(".percentage span");

const again_quiz = document.querySelector(".result-footer .again-quiz");
const exit = document.querySelector(".result-footer .exit");

const mark_wrong = `<i class="fa fa-times"></i>`;
const mark_check = `<i class="fa fa-check"></i>`;

start_btn.onclick =()=>{
    quiz_box.classList.remove("inactive");
    start_btn.classList.add("inactive")
}

total_q.innerText = 6;
total_que_r.innerText = questions.length;

var que_index = 0;
var right_answers = 0;
var wrong_answers = 0;
count_que.innerText = que_index+1;
// ShowQuestion(que_index);

setTimeout(function(){
    ShowQuestion(que_index);
},2000);

function ShowQuestion(q_index){
    que_text.innerText = questions[q_index].num+". "+ questions[q_index].question;

var option_statement = "";
for(var i=0; i<questions[q_index].options.length; i++){
    option_statement += `
    <div class="option">${questions[que_index].options[i]}</div>`;
}

options_box.innerHTML = option_statement;

var AllOptions = options_box.querySelectorAll(".option");
    for(var j=0; j<AllOptions.length; j++){
        AllOptions[j].setAttribute("onclick","UserAnswer(this)");
    }
    next_btn.classList.add("inactive");
}

next_btn.onclick=()=>{
    que_index++;
    if(questions.length>que_index){
        count_que.innerText = que_index+1;
        ShowQuestion(que_index);
    }else {
        console.log("Quesations Completed");
        quiz_box.classList.add("inactive");
        result_box.classList.remove("inactive");
        right_ans_r.innerText = right_answers;
        wrong_ans_r.innerText = wrong_answers;
        percentage.innerText = ((right_answers*100)/questions.length).toFixed(2)+"%";
    }

    if(questions.length-1==que_index){
        next_btn.innerText = "Finish";
    }
}

window.UserAnswer = function (answer){
    let userAns = answer.innerText;
    let correctAns =  questions[que_index].answer;
    var AllOptions2 = options_box.querySelectorAll(".option");

    next_btn.classList.remove("inactive");
    if(userAns == correctAns){
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",mark_check);
        right_answers++;
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend",mark_wrong);
        wrong_answers++;

        for(var i=0; i<AllOptions2.length; i++){
            if(AllOptions2[i].innerText==correctAns){
                AllOptions2[i].classList.add("correct");
                AllOptions2[i].insertAdjacentHTML("beforeend",mark_check);

            }
        }
    }

    for(var j=0; j<AllOptions2.length; j++){
        AllOptions2[j].classList.add("disabled");
    }
}

again_quiz.onclick=()=>{
    quiz_box.classList.remove("inactive");
    result_box.classList.add("inactive");

    reset()
}


    exit.onclick=()=>{
    start_btn.classList.remove("inactive");
    result_box.classList.add("inactive");

    reset()
}

function reset(){
    que_index = 0;
    right_answers = 0;
    wrong_answers = 0;
    next_btn.innerText = "Next Question";
    count_que.innerText = que_index+1;
    ShowQuestion(que_index);
}

