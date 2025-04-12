// Animations au défilement
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(el => observer.observe(el));
}

// Animation des boutons
function initButtonAnimations() {
    document.querySelectorAll('.btn, .cta-btn, .add-to-cart-btn').forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
}

// Accordéon des détails produit
function initProductAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;

            // Fermer tous les autres éléments
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = '0';
                    item.querySelector('.accordion-header i').className = 'fas fa-chevron-down';
                }
            });

            // Basculer l'élément actuel
            accordionItem.classList.toggle('active');
            const icon = header.querySelector('i');

            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                icon.className = 'fas fa-chevron-up';
            } else {
                accordionContent.style.maxHeight = '0';
                icon.className = 'fas fa-chevron-down';
            }
        });
    });
}

// Galerie d'images produit
function initProductGallery() {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Mettre à jour l'image principale
                mainImage.src = thumbnail.src.replace('-thumb', '');

                // Mettre à jour la miniature active
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });
    }
}

// Sélecteur de quantité
function initQuantitySelector() {
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const input = button.parentElement.querySelector('input');
            let value = parseInt(input.value);

            if (button.classList.contains('minus') && value > 1) {
                value--;
            } else if (button.classList.contains('plus') && value < 10) {
                value++;
            }

            input.value = value;
        });
    });
}

// Filtres produits
function initProductFilters() {
    const priceRange = document.getElementById('priceRange');
    const maxPriceDisplay = document.getElementById('maxPrice');

    if (priceRange && maxPriceDisplay) {
        priceRange.addEventListener('input', () => {
            //maxPriceDisplay.textContent = ${priceRange.value}€;
        });
    }

    // Options de couleur
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
}

// Initialiser toutes les animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initButtonAnimations();
    initProductAccordion();
    initProductGallery();
    initQuantitySelector();
    initProductFilters();
});