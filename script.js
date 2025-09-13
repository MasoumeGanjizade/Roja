// Product List 
const products = [
  { id: 1, name: 'Bell Lipstick', price: 290, image: './Lipstick.jpg' },
  { id: 2, name: 'Eyeshadow Palette', price: 400, image: './Eyeshadow Palette.jpg' },
  { id: 3, name: 'Moisturizing Cream', price: 350, image: './soft.jpg' },
  { id: 4, name: 'Volumizing Mascara', price: 320, image: './Volumizing Mascara.jpg'}
];
  const discountButton = document.getElementById('btnOff');
 discountButton.addEventListener('click', () => {
    alert("Our season off is coming soon!");
});

// Load Cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let discountApplied = false; // track if discount button is used

// DOM elements
const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Render Products
const renderProducts = () => {
  productList.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price.toLocaleString('en-US')} Toman</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join('');
};

// Render Cart 
const renderCart = () => {
  cartList.innerHTML = cart.map(item => `
    <li>
      ${item.name} - ${item.price.toLocaleString('en-US')} × ${item.quantity} = ${(item.price*item.quantity).toLocaleString('en-US')} Toman
      <div class="cart-controls">
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <button onclick="removeItem(${item.id})">Remove</button>
      </div>
    </li>
  `).join('');
  
  let total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (discountApplied) {
    total = total * 0.8; // apply discount only if button clicked
  }

  cartTotal.textContent = total.toLocaleString('en-US');
  
  // Save cart
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Cart Functions
const addToCart = id => {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  item ? item.quantity++ : cart.push({ ...product, quantity: 1 });
  renderCart();
};

const changeQuantity = (id, delta) => {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
  renderCart();
};

const removeItem = id => {
  cart = cart.filter(i => i.id !== id);
  renderCart();
};

const checkout = () => {
  let total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (discountApplied) {
    total = total * 0.8;
  }
  alert(`Your total purchase is: ${total.toLocaleString('en-US')} Toman\nThank you for shopping with us!`);
  cart = [];
  discountApplied = false; // reset for next session
  renderCart();
};

// Call functions
window.onload = () => {
  renderProducts();
  renderCart();
};