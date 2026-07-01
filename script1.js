// ===== Mobile nav toggle =====
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }

  renderCart();
  updateCartCount();
});

// ===== Cart helpers (localStorage) =====
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart(cart);
  alert(name + " added to cart");
}

function addToCart(product) {
  console.log("Added to cart:", product);

   {
  id: "P1001",
  name: "Ceramic Mug",
   category: "Kitchenware",
   price: 18
   }
   id: "P1002",
  name: "Canvas tote",
   category: "bags",
   price: 13
}
function removeFromCart(name) {
  saveCart(getCart().filter((item) => item.name !== name));
  renderCart();
}

function updateQty(name, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.name === name);
  if (item) item.qty = Math.max(1, parseInt(qty) || 1);
  saveCart(cart);
  renderCart();
}

function updateCartCount() {
  const el = document.querySelector("#cart-count");
  if (!el) return;
  const count = getCart().reduce((sum, i) => sum + i.qty, 0);
  el.textContent = count;
}

// ===== Render cart page =====
function renderCart() {
  const list = document.querySelector("#cart-list");
  if (!list) return;

  const cart = getCart();
  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = "<p>Your cart is empty.</p>";
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    const row = document.createElement("div");
    row.className = "cart__item";
    row.innerHTML = `
      <div class="cart__info">
        <strong>${item.name}</strong><br>
        $${item.price.toFixed(2)} each
      </div>
      <input type="number" class="cart__qty" min="1" value="${item.qty}" aria-label="Quantity for ${item.name}">
      <button class="cart__remove" aria-label="Remove ${item.name}">Remove</button>
    `;
    row.querySelector(".cart__qty").addEventListener("change", (e) =>
      updateQty(item.name, e.target.value)
    );
    row.querySelector(".cart__remove").addEventListener("click", () =>
      removeFromCart(item.name)
    );
    list.appendChild(row);
  });

  const totalEl = document.querySelector("#cart-total");
  if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
}

// ===== Checkout form =====
function handleCheckout(e) {
  e.preventDefault();
  localStorage.removeItem("cart");
  alert("Order placed! Thank you for your purchase.");
  window.location.href = "index.html";
}

// ===== Contact form =====
function handleContact(e) {
  e.preventDefault();
  alert("Thanks for reaching out — we'll get back to you soon.");
  e.target.reset();
}

// ===== Newsletter form =====
function handleNewsletter(e) {
  e.preventDefault();
  alert("You're subscribed!");
  e.target.reset();
}
