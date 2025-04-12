document.addEventListener('DOMContentLoaded', function() {
    console.log('Page Collection détail initialisée');

    // 1. Récupération de l'ID de collection depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const collectionId = urlParams.get('id');
    
    if (collectionId) {
       // console.log(Chargement des données pour la collection ID: ${collectionId});
        // Ici vous feriez normalement un appel API pour récupérer les données
        loadCollectionData(collectionId);
    }

    // 2. Simulation de chargement des données
    function loadCollectionData(id) {
        // En réalité, vous feriez un fetch() vers votre API
       // console.log(Simulation de chargement pour la collection ${id});
        
        // Simuler un délai de chargement
        setTimeout(() => {
            updateCollectionView(getMockData(id));
        }, 500);
    }

    // 3. Données mockées pour la démo
    function getMockData(id) {
        const collections = {
            'art': {
                title: "Art Ancien",
                description: "Cette collection rassemble des pièces exceptionnelles datant du XIVe au XVIIe siècle...",
                items: [
                    { id: 101, name: "Portrait de Noble Vénitien", price: 24500, image: "images/art-item1.jpg" },
                    { id: 102, name: "Sculpture en Bois Polychrome", price: 18750, image: "images/art-item2.jpg" }
                ]
            },
            'instruments': {
                title: "Instruments Rares",
                description: "Collection d'instruments de musique historiques...",
                items: [
                    { id: 201, name: "Pianoforte XVIIIe", price: 32500, image: "images/instrument-item1.jpg" }
                ]
            },
            'bijoux': {
                title: "Bijoux Historiques",
                description: "Joyaux et parures ayant appartenu à des figures historiques...",
                items: [
                    { id: 301, name: "Collier Renaissance", price: 42000, image: "images/bijou-item1.jpg" }
                ]
            }
        };

        return collections[id] || collections['art'];
    }

    // 4. Mise à jour de la vue avec les données
    function updateCollectionView(data) {
        document.querySelector('.hero-content h1').textContent = data.title;
        document.querySelector('.collection-description h2').textContent = data.title;
        document.querySelector('.collection-description p').textContent = data.description;
        
        const itemsGrid = document.querySelector('.items-grid');
        itemsGrid.innerHTML = '';
        
        data.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'collection-item animate-on-scroll';
            itemElement.innerHTML = `
                <a href="product-detail.html?id=${item.id}" class="item-link">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p class="item-price">${item.price.toLocaleString('fr-FR')}€</p>
                        <p class="item-period">Pièce unique</p>
                    </div>
                </a>
            `;
            itemsGrid.appendChild(itemElement);
        });
        
        // Initialiser les animations pour les nouveaux éléments
        initAnimations();
    }

    // 5. Animations au scroll
    function initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // 6. Gestion du clic sur les autres collections
    document.querySelectorAll('.collection-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const collectionId = this.parentElement.dataset.collection;
          //  console.log(Navigation vers la collection: ${collectionId});
           // window.location.href = collection-${collectionId}.html;
        });
    });
});