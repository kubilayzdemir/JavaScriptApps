// create question prototype
function Question(text,choices,answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

// question prototype
// check answer
Question.prototype.checkAnswer = function(reply){
    return this.answer === reply;
}

// create quiz constructor
function Quiz(questions){
    this.questions = questions
    this.score = 0;
    this.questionIndex = 0;
}

// quiz prototype

// get question 
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

// quiz isFinish ?
Quiz.prototype.isFinis = function(){
    return questions.length === this.questionIndex;
}

//quiz guess
Quiz.prototype.guess = function(reply){
    var question = this.getQuestion();
    if (question.checkAnswer(reply)) {
        this.score++;
    }
    this.questionIndex++;
}

// question 1
var q1 = new Question(`what's the best programing language`,['php','c#','javascript','python'],'javascript');
// question 2
var q2 = new Question(`what's the most popular programing language`,['php','c#','javascript','python'],'javascript');
// question 3 
var q3 = new Question(`what's the best programing language`,['php','c#','javascript','python'],'javascript');

var questions = [q1,q2,q3]

// start quiz 
var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion(){
    if (quiz.isFinis()) {
        showScore();
    }else{
        var question = quiz.getQuestion();
        var choices = question.choices; 
        document.querySelector('#question').textContent = question.text;

        for (var i = 0; i < choices.length; i++) {
           var element = document.querySelector('.choice'+i);
           element.innerHTML = choices[i]

           guess('btn'+i,choices[i])
            
        }
        showProgress();
    }
}

function guess(id,guess) {
    var btn = document.getElementById(id);
    btn.onclick = function() {
        quiz.guess(guess);
        loadQuestion();
    }
}

function showScore() {
    var html = `<h2>Score : ${quiz.score}</h2>`
    document.querySelector('.card-body').innerHTML = html
}

function showProgress(){
    var totalquestion = quiz.questions.length;
    var questionNumber= quiz.questionIndex;
    document.querySelector('#progress').innerHTML = `${questionNumber+1}/${totalquestion}`
}