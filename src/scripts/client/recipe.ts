const topBack = document.querySelector('.recipe-header .back');
const stickyBack = document.querySelector('.sticky-back');

if (topBack && stickyBack) {
    new IntersectionObserver(([e]) => stickyBack.classList.toggle('visible', e.intersectionRatio < 1), {
        threshold: 1,
    }).observe(topBack);
}
