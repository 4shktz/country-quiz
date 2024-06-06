document.addEventListener("DOMContentLoaded", function() {
    const optionsBtn = document.getElementById('optionsBtn');
    const backBtn = document.getElementById('backBtn');
    const playBtn = document.getElementById('playBtn');
    const backToMainBtn = document.getElementById('backToMainBtn');
    const mainContainer = document.getElementById('mainContainer');
    const optionsContainer = document.getElementById('optionsContainer');
    const quizContainer = document.getElementById('quizContainer');
    const nextBtn = document.getElementById('nextBtn');
    const questionCounter = document.getElementById('questionCounter');
    const flagImage = document.querySelector('.flag-image');
    const scoreDisplay = document.getElementById('score');

    let score = 0;
    let questionNumber = 1;

    optionsBtn.addEventListener('click', function() {
        mainContainer.style.display = 'none';
        optionsContainer.style.display = 'block';
    });

    backBtn.addEventListener('click', function() {
        optionsContainer.style.display = 'none';
        mainContainer.style.display = 'block';
    });

    playBtn.addEventListener('click', function() {
        mainContainer.style.display = 'none';
        quizContainer.style.display = 'block';
    });

    backToMainBtn.addEventListener('click', function() {
        quizContainer.style.display = 'none';
        mainContainer.style.display = 'block';
    });

    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (!document.querySelector('.quiz-option[disabled]')) {
                const isCorrect = this.dataset.correct === "true";

                quizOptions.forEach(option => {
                    option.disabled = true; 
                    if (option.dataset.correct === "true") {
                        option.classList.add('correct');
                    }
                });

                if (isCorrect) {
                    this.classList.add('correct');
                    score++;
                } else {
                    this.classList.add('incorrect');
                }

                scoreDisplay.textContent = score;
                nextBtn.style.display = 'block'; 
                nextBtn.addEventListener('click', nextQuestion); 
            }
        });
    });

    function nextQuestion() {
        questionNumber++;
        questionCounter.textContent = `${questionNumber}/25`;
        nextBtn.removeEventListener('click', nextQuestion);
        flagImage.src = 'drapeaux/suisse.png';
        nextBtn.style.display = 'none'; 
        
    }
});
