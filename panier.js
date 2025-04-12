class Cart {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        this.initCart();
    }

    initCart() {
        this.updateCartCount();
        this.loadCartItems();
    }

    addToCart(product, quantity = 1, options = {}) {
        const existingItem = this.cartItems.find(item => 
            item.id === product.id && 
            JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                ...product,
                quantity,
                options
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showAddToCartAnimation();
    }

    removeFromCart(itemId) {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
        this.loadCartItems();
    }

    updateQuantity(itemId, newQuantity) {
        const item = this.cartItems.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.loadCartItems();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    getCartTotal() {
        return this.cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    updateCartCount() {
        const count = this.cartItems.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }

    loadCartItems() {
        if (document.querySelector('.summary-items')) {
            this.renderCartItems();
        }
    }

    renderCartItems() {
        const container = document.querySelector('.summary-items');
        if (!container) return;

        container.innerHTML = '';

        if (this.cartItems.length === 0) {
            container.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
            return;
        }

        this.cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'summary-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    ${item.options.color ? <p>Couleur: ${item.options.color}</p> : ''}
                    ${item.options.size ? <p>Taille: ${item.options.size}</p> : ''}
                    <p>Quantité: ${item.quantity}</p>
                </div>
                <div class="item-price">${(item.price * item.quantity).toFixed(2)}€</div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(itemElement);
        });

        // Update totals
       // document.querySelector('.subtotal').textContent = ${this.getCartTotal().toFixed(2)}€;
       // document.querySelector('.total-amount').textContent = ${this.getCartTotal().toFixed(2)}€;

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                this.removeFromCart(e.currentTarget.dataset.id);
            });
        });
    }

    showAddToCartAnimation() {
        const animation = document.createElement('div');
        animation.className = 'add-to-cart-animation';
        animation.innerHTML = '<i class="fas fa-check"></i> Article ajouté au panier';
        document.body.appendChild(animation);

        setTimeout(() => {
            animation.classList.add('show');
        }, 10);

        setTimeout(() => {
            animation.classList.remove('show');
            setTimeout(() => {
                animation.remove();
            }, 300);
        }, 3000);
    }

    clearCart() {
        this.cartItems = [];
        this.saveCart();
        this.updateCartCount();
        this.loadCartItems();
    }
}

// Initialize cart
const cart = new Cart();

// Export for use in other files
export default cart;