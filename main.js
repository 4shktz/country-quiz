document.addEventListener("DOMContentLoaded", function() {
    const optionsBtn = document.getElementById('optionsBtn');
    const backBtn = document.getElementById('backBtn');
    const playBtn = document.getElementById('playBtn');
    const backToMainBtn = document.getElementById('backToMainBtn');
    const mainContainer = document.getElementById('mainContainer');
    const optionsContainer = document.getElementById('optionsContainer');
    const quizContainer = document.getElementById('quizContainer');

    optionsBtn.addEventListener('click', function() {
        mainContainer.style.display = 'none';
        optionsContainer.style.display = 'block';
    });

    backBtn.addEventListener('click', function() {
        optionsContainer.style.display = 'none';
        mainContainer.style.display = 'block';
    });
})