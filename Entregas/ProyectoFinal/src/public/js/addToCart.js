const comprar = document.getElementById("product-list");

comprar.addEventListener("click", async (e) => {
  if (e.target.classList.contains("purchase-button")) {
    e.preventDefault();

    const cartId = document.getElementById("cart-data").getAttribute("data-cart-id");
    const productId = e.target.closest(".product").dataset.productId;

    console.log(cartId);

    const quantityInput = e.target.closest(".product").querySelector('.quantity-input');
    const quantity = quantityInput.value;

    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        quantity

      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Producto añadido al carrito")
      console.log("Product added to cart successfully", data.result);
    } else {
      console.error("Error adding product to cart", data.message);
    }
  }
});

comprar.addEventListener("click", async (e) => {
  if (e.target.classList.contains("finalizar-compra-button")) {
    e.preventDefault();

    const cartId = document.getElementById("cart-data").getAttribute("data-cart-id");

    const response = await fetch(`/api/carts/${cartId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(),
    });

    const data = await response.json();

    if (data.status === 'success') {
      window.location.replace(`/carts/${cartId}`);
    } else {
      alert(data.error)
    }
  }
});

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const response = await fetch("/api/sessions/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  });
  if (response.ok) {
    alert("Logout successful");
    window.location.replace('/');
  } else {
    alert(response.error);
  }
});