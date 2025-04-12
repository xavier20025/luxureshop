document.addEventListener('DOMContentLoaded', function() {
    console.log('Page Collections initialisée');

    // 1. Filtrage des collections
    const filterButtons = document.querySelectorAll('.filter-btn');
    const collectionCards = document.querySelectorAll('.collection-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            //console.log(Filtre sélectionné: ${filterValue});

            // Filtrer les collections
            collectionCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    card.classList.add('animate');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    collectionCards.forEach(card => {
        observer.observe(card);
    });

    // 3. Gestion du formulaire newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
              //  console.log(Abonnement newsletter avec l'email: ${email});
                showNewsletterSuccess();
                emailInput.value = '';
            } else {
                showNewsletterError('Veuillez entrer une adresse email valide');
            }
        });
    }

    // 4. Fonction de validation d'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 5. Affichage des messages
    function showNewsletterSuccess() {
        const existingMessage = document.querySelector('.newsletter-message');
        if (existingMessage) existingMessage.remove();
        
        const message = document.createElement('div');
        message.className = 'newsletter-message success';
        message.textContent = 'Merci pour votre abonnement !';
        newsletterForm.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    function showNewsletterError(errorText) {
        const existingMessage = document.querySelector('.newsletter-message');
        if (existingMessage) existingMessage.remove();
        
        const message = document.createElement('div');
        message.className = 'newsletter-message error';
        message.textContent = errorText;
        newsletterForm.insertBefore(message, newsletterForm.firstChild);
    }
});