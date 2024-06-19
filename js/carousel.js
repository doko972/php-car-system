"use strict";
window.addEventListener("DOMContentLoaded", (event) => {
    slideInitial();
});

const repeat = false;
const noArrows = false;
const noBullets = false;

const container = document.querySelector('.slider-container');
const slide = document.querySelectorAll('.slider-single');
const slideTotal = slide.length - 1;
let slideCurrent = -1;

function initBullets() {
    if (noBullets) return;

    const bulletContainer = document.createElement('div');
    bulletContainer.classList.add('bullet-container');
    
    slide.forEach((elem, i) => {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.id = `bullet-index-${i}`;
        bullet.addEventListener('click', () => goToIndexSlide(i));
        bulletContainer.appendChild(bullet);
        elem.classList.add('proactivede');
    });
    
    container.appendChild(bulletContainer);
}

function initArrows() {
    if (noArrows) return;

    const leftArrow = document.createElement('a');
    const iLeft = document.createElement('i');
    iLeft.classList.add('fa', 'fa-arrow-left');
    leftArrow.classList.add('slider-left');
    leftArrow.appendChild(iLeft);
    leftArrow.addEventListener('click', slideLeft);

    const rightArrow = document.createElement('a');
    const iRight = document.createElement('i');
    iRight.classList.add('fa', 'fa-arrow-right');
    rightArrow.classList.add('slider-right');
    rightArrow.appendChild(iRight);
    rightArrow.addEventListener('click', slideRight);

    container.appendChild(leftArrow);
    container.appendChild(rightArrow);
}

function slideInitial() {
    initBullets();
    initArrows();
    setTimeout(slideRight, 500);
}

function updateBullet() {
    if (!noBullets) {
        document.querySelector('.bullet-container').querySelectorAll('.bullet').forEach((elem, i) => {
            elem.classList.remove('active');
            if (i === slideCurrent) {
                elem.classList.add('active');
            }
        });
    }
    checkRepeat();
}

function checkRepeat() {
    if (!repeat) {
        const leftArrow = document.querySelector('.slider-left');
        const rightArrow = document.querySelector('.slider-right');

        if (slideCurrent === slide.length - 1) {
            slide[0].classList.add('not-visible');
            slide[slide.length - 1].classList.remove('not-visible');
            if (!noArrows) {
                rightArrow.classList.add('not-visible');
                leftArrow.classList.remove('not-visible');
            }
        } else if (slideCurrent === 0) {
            slide[slide.length - 1].classList.add('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                leftArrow.classList.add('not-visible');
                rightArrow.classList.remove('not-visible');
            }
        } else {
            slide[slide.length - 1].classList.remove('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                leftArrow.classList.remove('not-visible');
                rightArrow.classList.remove('not-visible');
            }
        }
    }
}

function slideRight() {
    slideCurrent = (slideCurrent < slideTotal) ? slideCurrent + 1 : 0;

    const preactiveSlide = (slideCurrent > 0) ? slide[slideCurrent - 1] : slide[slideTotal];
    const activeSlide = slide[slideCurrent];
    const proactiveSlide = (slideCurrent < slideTotal) ? slide[slideCurrent + 1] : slide[0];

    slide.forEach((elem) => {
        elem.classList.remove('preactivede', 'preactive', 'active', 'proactive');
        elem.classList.add('proactivede');
    });

    preactiveSlide.classList.add('preactive');
    activeSlide.classList.add('active');
    proactiveSlide.classList.add('proactive');

    updateBullet();
}

function slideLeft() {
    slideCurrent = (slideCurrent > 0) ? slideCurrent - 1 : slideTotal;

    const proactiveSlide = (slideCurrent < slideTotal) ? slide[slideCurrent + 1] : slide[0];
    const activeSlide = slide[slideCurrent];
    const preactiveSlide = (slideCurrent > 0) ? slide[slideCurrent - 1] : slide[slideTotal];

    slide.forEach((elem) => {
        elem.classList.remove('proactive', 'preactive', 'active', 'proactivede');
        elem.classList.add('proactivede');
    });

    preactiveSlide.classList.add('preactive');
    activeSlide.classList.add('active');
    proactiveSlide.classList.add('proactive');

    updateBullet();
}

function goToIndexSlide(index) {
    while (slideCurrent !== index) {
        if (slideCurrent < index) {
            slideRight();
        } else {
            slideLeft();
        }
    }
}

slideInitial();