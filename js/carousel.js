let currentIndex = 0;

export function initCarousel() {
    console.log("Карусель инициализирована!");

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            moveCarousel(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            moveCarousel(1);
        });
    }

    initModal();

    updateCarousel();
}

function initModal() {
    const modal = document.getElementById('carousel-modal');
    const closeBtn = document.querySelector('.close-btn');
    const gridContainer = document.getElementById('imageGrid');

    if (!modal || !gridContainer || !closeBtn) return;

    gridContainer.addEventListener('click', (event) => {
        const clickedImg = event.target.closest('.grid-img');
        if (!clickedImg) return;

        const visibleCarouselImages = Array.from(document.querySelectorAll('.carousel-img'));

        const targetSrc = clickedImg.getAttribute('src');
        const targetIndex = visibleCarouselImages.findIndex(img => img.getAttribute('src') === targetSrc);

        if (targetIndex !== -1) {
            currentIndex = targetIndex;
            updateCarousel();
            modal.classList.add('open');
        }
    });

    closeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        modal.classList.remove('open');
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('open');
        }
    });
}

function updateCarousel() {
    const visibleImages = Array.from(document.querySelectorAll('.carousel-img'));

    document.querySelectorAll('.carousel-img').forEach(img => {
        img.classList.remove('active', 'prev', 'next');
    });

    if (visibleImages.length === 0) return;

    if (currentIndex >= visibleImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = visibleImages.length - 1;

    visibleImages[currentIndex].classList.add('active');

    if (visibleImages.length === 1) return;

    const prevIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    const nextIndex = (currentIndex + 1) % visibleImages.length;

    if (prevIndex === nextIndex) {
        visibleImages[nextIndex].classList.add('next');
    } else {
        visibleImages[prevIndex].classList.add('prev');
        visibleImages[nextIndex].classList.add('next');
    }
}

function moveCarousel(direction) {
    currentIndex += direction;
    updateCarousel();
}



