document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.visit-cards');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    const cards = document.querySelectorAll('.visit-card');

    const enquiryBtn = document.querySelector(".enquiry-button");
    const headerBtn = document.querySelector(".header-button");

    let isDragging = false;
    let startPos = 0;
    let scrollLeft = 0;

    // Mouse dragging functionality
    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        slider.classList.add('dragging');
        startPos = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startPos);
        slider.scrollLeft = scrollLeft - walk;
        updateButtons();
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mouseleave', () => {
        isDragging = false;
        slider.classList.remove('dragging');
    });

    // Navigation buttons
    prevButton.addEventListener('click', () => {
        slider.scrollBy({
            left: -slider.offsetWidth,
            behavior: 'smooth'
        });
        updateButtons();
    });

    nextButton.addEventListener('click', () => {
        slider.scrollBy({
            left: slider.offsetWidth,
            behavior: 'smooth'
        });
        updateButtons();
    });

    // Update button states
    function updateButtons() {
        const isAtStart = slider.scrollLeft === 0;
        const isAtEnd = slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth;

        prevButton.disabled = isAtStart;
        nextButton.disabled = isAtEnd;
    }

    // Initial button state
    updateButtons();

    // Update buttons on scroll
    slider.addEventListener('scroll', updateButtons);

    // Update on window resize
    window.addEventListener('resize', updateButtons);

    enquiryBtn.addEventListener("click", (e) => {
        e.preventDefault();
        enquiryBtn.classList.toggle("active");
    });

    headerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        headerBtn.classList.toggle("active");
    });
});
