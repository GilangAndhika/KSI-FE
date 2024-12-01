const regisButton =document.getElementById('register');
const loginButton =document.getElementById('login');
const container = document.getElementById('container');
const backButton = document.getElementById('back-btn');

regisButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});