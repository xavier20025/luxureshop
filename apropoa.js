document.addEventListener('DOMContentLoaded', function() {
    console.log('Page À Propos initialisée');

    // 1. Configuration du slider de témoignages
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;

    // Création des points indicateurs
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    // Fonction pour aller à un témoignage spécifique
    function goToTestimonial(index) {
        testimonials[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = index;
        
        testimonials[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Bouton précédent
    prevBtn.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        goToTestimonial(newIndex);
    });

    // Bouton suivant
    nextBtn.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        goToTestimonial(newIndex);
    });

    // Auto-rotation des témoignages
    let slideInterval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        goToTestimonial(newIndex);
    }, 5000);

    // Arrêter l'auto-rotation quand on interagit
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            goToTestimonial(newIndex);
        }, 5000);
    });

    // 2. Animation des membres de l'équipe
    const teamMembers = document.querySelectorAll('.team-member');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    teamMembers.forEach(member => {
        observer.observe(member);
    });

    // 3. Effet de parallaxe pour l'image du fondateur
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
           // aboutImage.style.transform = translateY(${scrollPosition * 0.1}px);
        });
    }
});