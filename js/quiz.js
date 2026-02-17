// Quiz Module
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

document.addEventListener('DOMContentLoaded', function() {
    loadQuiz();
    setupQuizButtons();
    loadQuizStats();
});

async function loadQuiz() {
    try {
        const response = await fetch('data/quiz.json');
        quizQuestions = await response.json();
    } catch (error) {
        console.error('Error loading quiz:', error);
    }
}

function setupQuizButtons() {
    const startBtn = document.getElementById('startQuiz');
    const retakeBtn = document.getElementById('retakeQuiz');
    const backBtn = document.getElementById('backToQuizIntro');
    
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
    
    if (retakeBtn) {
        retakeBtn.addEventListener('click', startQuiz);
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', backToQuizIntro);
    }
}

function loadQuizStats() {
    const bestScore = localStorage.getItem('f1-quiz-best-score') || 0;
    const quizzesTaken = localStorage.getItem('f1-quiz-taken') || 0;
    
    const bestScoreEl = document.getElementById('bestScore');
    const quizzesTakenEl = document.getElementById('quizzesTaken');
    
    if (bestScoreEl) bestScoreEl.textContent = bestScore;
    if (quizzesTakenEl) quizzesTakenEl.textContent = quizzesTaken;
}

function startQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    
    // Select random 10 questions
    selectedQuestions = shuffleArray([...quizQuestions]).slice(0, 10);
    
    // Show quiz interface
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizActive').style.display = 'block';
    
    // Update total questions
    document.getElementById('totalQuestions').textContent = selectedQuestions.length;
    
    // Show first question
    showQuestion();
}

function backToQuizIntro() {
    // Hide results and show quiz intro
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizStart').style.display = 'block';
}

function showQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Display answers
    const answersGrid = document.getElementById('answersGrid');
    answersGrid.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.className = 'answer-btn';
        answerBtn.textContent = answer;
        answerBtn.addEventListener('click', () => selectAnswer(index));
        answersGrid.appendChild(answerBtn);
    });
}

function selectAnswer(selectedIndex) {
    const question = selectedQuestions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    // Disable all buttons
    answerButtons.forEach(btn => btn.disabled = true);
    
    // Show correct/incorrect
    answerButtons.forEach((btn, index) => {
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            btn.classList.add('incorrect');
        }
    });
    
    // Update score
    if (selectedIndex === question.correct) {
        score++;
    }
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    // Hide quiz, show results
    document.getElementById('quizActive').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    // Display score
    document.getElementById('finalScore').textContent = score;
    
    // Get message based on score
    const percentage = (score / selectedQuestions.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = 'Perfect! You are a true F1 expert! 🏆';
    } else if (percentage >= 80) {
        message = 'Excellent! You know your F1! 🏁';
    } else if (percentage >= 60) {
        message = 'Good job! Keep learning about F1! 👍';
    } else if (percentage >= 40) {
        message = 'Not bad! Watch more races to improve! 📺';
    } else {
        message = 'Keep learning! F1 is fascinating! 📚';
    }
    
    document.getElementById('scoreMessage').textContent = message;
    
    // Save statistics
    saveQuizStats(score);
}

function saveQuizStats(score) {
    // Update best score
    const currentBest = parseInt(localStorage.getItem('f1-quiz-best-score') || 0);
    if (score > currentBest) {
        localStorage.setItem('f1-quiz-best-score', score);
    }
    
    // Update quizzes taken
    const quizzesTaken = parseInt(localStorage.getItem('f1-quiz-taken') || 0);
    localStorage.setItem('f1-quiz-taken', quizzesTaken + 1);
    
    // Reload stats display
    loadQuizStats();
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
