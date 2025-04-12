document.addEventListener('DOMContentLoaded', function() {
    console.log('Page Contact initialisée');

    // 1. Validation du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Tentative d\'envoi du formulaire de contact');
            
            if (validateContactForm()) {
                simulateFormSubmission();
            }
        });

        // Validation en temps réel
        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    // 2. Fonction de validation de champ
    function validateField(field) {
        const errorElement = field.nextElementSibling;
        
        // Supprimer les anciens messages d'erreur
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
        
        // Validation basique
        if (field.required && !field.value.trim()) {
            showError(field, 'Ce champ est obligatoire');
            return false;
        }
        
        // Validation spécifique par type
        if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
            showError(field, 'Veuillez entrer une adresse email valide');
            return false;
        }
        
        if (field.id === 'phone' && field.value && !/^[0-9 +-]{10,}$/.test(field.value)) {
            showError(field, 'Veuillez entrer un numéro de téléphone valide');
            return false;
        }
        
        return true;
    }

    // 3. Fonction de validation complète du formulaire
    function validateContactForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // 4. Affichage des erreurs
    function showError(field, message) {
        let errorElement = field.nextElementSibling;
        
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            field.insertAdjacentElement('afterend', errorElement);
        }
        
        errorElement.textContent = message;
        field.focus();
    }

    // 5. Simulation d'envoi du formulaire
    function simulateFormSubmission() {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Désactiver le bouton pendant l'envoi
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.style.opacity = '0.7';
        
        console.log('Simulation d\'envoi du formulaire');
        
        // Simuler un délai d'envoi
        setTimeout(() => {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
            
            // Afficher un message de succès
            showFormMessage('Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.', 'success');
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            console.log('Formulaire soumis avec succès (simulation)');
        }, 2000);
    }

    // 6. Affichage des messages de statut
    function showFormMessage(message, type) {
        // Supprimer les anciens messages
        const oldMessage = document.querySelector('.form-message');
        if (oldMessage) oldMessage.remove();
        
        // Créer le nouveau message
        const messageElement = document.createElement('div');
       // messageElement.className = form-message ${type};
        messageElement.textContent = message;
        
        // Styles selon le type
        if (type === 'success') {
            messageElement.style.backgroundColor = 'rgba(39, 174, 96, 0.1)';
            messageElement.style.color = 'var(--success-color)';
        } else {
            messageElement.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
            messageElement.style.color = 'var(--error-color)';
        }
        
        messageElement.style.padding = '15px';
        messageElement.style.borderRadius = 'var(--border-radius)';
        messageElement.style.marginTop = '20px';
        messageElement.style.textAlign = 'center';
        
        // Ajouter avant le formulaire
        contactForm.insertBefore(messageElement, contactForm.firstChild);
        
        // Faire défiler jusqu'au message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    // 7. Gestion de la FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Basculer l'item actuel
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // 8. Animation des éléments
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-card, .contact-form, .faq-item').forEach(el => {
        observer.observe(el);
    });
});