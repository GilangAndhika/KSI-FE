// Burger menus
document.addEventListener('DOMContentLoaded', function() {
    // open
    const burger = document.querySelectorAll('.navbar-burger');
    const menu = document.querySelectorAll('.navbar-menu');

    if (burger.length && menu.length) {
        for (var i = 0; i < burger.length; i++) {
            burger[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('d-none');
                }
            });
        }
    }

    // close
    const close = document.querySelectorAll('.navbar-close');
    const backdrop = document.querySelectorAll('.navbar-backdrop');

    if (close.length) {
        for (var i = 0; i < close.length; i++) {
            close[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('d-none');
                }
            });
        }
    }

    if (backdrop.length) {
        for (var i = 0; i < backdrop.length; i++) {
            backdrop[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('d-none');
                }
            });
        }
    }
});

////////////////////////////////////////////////////////

const home = document.getElementById('home');
const aboutUs = document.getElementById('abt-us');
const signIn = document.getElementById('sign-in');
const join = document.getElementById('join-in');
const catalog = document.querySelector('.mansory');

home.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

aboutUs.addEventListener('click', () => {
    window.location.href = '/pages/about_us.html';
});

signIn.addEventListener('click', () => {
    window.location.href = '/pages/login.html';
});

join.addEventListener('click', () => {
    window.location.href = '/pages/login.html';
});

catalog.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});