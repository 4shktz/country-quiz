import countries from './flags';

document.addEventListener("DOMContentLoaded", function() {
    const optionsBtn = document.getElementById('optionsBtn');
    const backBtn = document.getElementById('backBtn');
    const playBtn = document.getElementById('playBtn');
    const backToMainBtn = document.getElementById('backToMainBtn');
    const mainContainer = document.getElementById('mainContainer');
    const optionsContainer = document.getElementById('optionsContainer');
    const quizContainer = document.getElementById('quizContainer');
    const questionCounter = document.getElementById('questionCounter');
    const flagImage = document.querySelector('.flag-image');
    const scoreDisplay = document.getElementById('score');
    const newQuestionContainer = document.getElementById('newQuestionContainer');

    let score = 0;
    let questionNumber = 1;
    let totalQuestions = 25;

    function resetOptions() {
        const quizOptions = document.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            option.disabled = false;
            option.classList.remove('correct', 'incorrect');
        });
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function loadNextFlag() {
        if (questionNumber > totalQuestions) {
            quizContainer.style.display = 'none';
            newQuestionContainer.textContent = 'Bien joué!';
            newQuestionContainer.style.display = 'block';
            return;
        }

        const randomIndex = Math.floor(Math.random() * countries.length);
        const selectedCountry = countries[randomIndex];

        flagImage.src = selectedCountry.url;

        const options = document.querySelectorAll('.quiz-option');
        const correctOptionIndex = Math.floor(Math.random() * options.length);
        const usedIndices = new Set([randomIndex]);

        options.forEach((option, index) => {
            if (index === correctOptionIndex) {
                option.textContent = selectedCountry.name;
                option.dataset.correct = "true";
            } else {
                let randomOptionIndex;
                do {
                    randomOptionIndex = Math.floor(Math.random() * countries.length);
                } while (usedIndices.has(randomOptionIndex));
                usedIndices.add(randomOptionIndex);

                option.textContent = countries[randomOptionIndex].name;
                option.dataset.correct = "false";
            }
        });

        resetOptions();
        questionCounter.textContent = `${questionNumber}/${totalQuestions}`;
        questionNumber++;
    }

    optionsBtn.addEventListener('click', () => {
        mainContainer.style.display = 'none';
        optionsContainer.style.display = 'block';
    });

    backBtn.addEventListener('click', () => {
        optionsContainer.style.display = 'none';
        mainContainer.style.display = 'block';
    });

    playBtn.addEventListener('click', () => {
        mainContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        loadNextFlag();
    });

    backToMainBtn.addEventListener('click', () => {
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
                    } else {
                        option.classList.add('incorrect');
                    }
                });

                if (isCorrect) {
                    this.classList.add('correct');
                    score++;
                } else {
                    this.classList.add('incorrect');
                }

                scoreDisplay.textContent = score;

                setTimeout(() => {
                    loadNextFlag();
                }, 2000); 
            }
        });
    });
});
