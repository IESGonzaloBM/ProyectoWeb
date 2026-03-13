'use strict';

document.addEventListener('DOMContentLoaded', e => {
    const botonTema = document.getElementById('ThemeBottom');

    let currentTheme = localStorage.getItem('Theme');
    if (!currentTheme) currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light';

    if (currentTheme === 'Dark') {
        document.documentElement.classList.add('dark-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
    }

    botonTema.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');

        const isDark = document.documentElement.classList.contains('dark-mode');
        localStorage.setItem('Theme', isDark ? 'Dark' : 'Light');
    });
});
