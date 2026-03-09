'use strict';

document.addEventListener('DOMContentLoaded', e => {
    const botonTema = document.getElementById('ThemeBottom');

    botonTema.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('Theme', document.documentElement.classList.contains('dark-mode') ? 'Dark' : 'Light');
    });

    if (localStorage.getItem('Theme') === 'Dark') document.documentElement.classList.add('dark-mode');
});
