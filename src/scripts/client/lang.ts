const currentLang = localStorage.getItem('lang') || 'en';
document.cookie = `lang=${currentLang};path=/;max-age=31536000`;

document.querySelectorAll<HTMLButtonElement>('.lang-switch button').forEach((btn) => {
    if (btn.dataset['lang'] === currentLang) {
        btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
        const lang = btn.dataset['lang'];
        if (lang && lang !== currentLang) {
            localStorage.setItem('lang', lang);
            document.cookie = `lang=${lang};path=/;max-age=31536000`;
            location.reload();
        }
    });
});
