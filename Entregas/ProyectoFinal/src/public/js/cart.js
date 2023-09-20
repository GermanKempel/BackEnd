const deleteButton = document.getElementById("delete");
const buyButton = document.getElementById("buy");


deleteButton.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.preventDefault();

    const cartId = window.location.pathname.split("/")[2];
    const productId = e.target.closest(".product").dataset.productId;

    console.log("Removing product", productId, cartId);

    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });

    const data = await response.json();

    console.log(data, response);

    if (response.ok) {
      alert("Producto eliminado")
      window.location.reload()
      console.log("Product removed from cart successfully", data.result);
    } else {
      console.error("Error removing product from cart", data.message);
    }
  }
});



buyButton.addEventListener("click", async (e) => {
  if (e.target.classList.contains("buy-btn")) {
    e.preventDefault();

    const cartId = window.location.pathname.split("/")[2];
    console.log(cartId);

    const response = await fetch(`/api/carts/${cartId}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {

      alert("Gracias por su compra, se le ha enviado un mail con su ticket")

      const sendMailTicketResponse = await fetch(`/api/sessions/send-mail-ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ ticket: data.ticket }),
      });

      const sendMailTicketData = await sendMailTicketResponse.json();

      if (sendMailTicketResponse.ok) {
        console.log("Mail ticket sent successfully", sendMailTicketData.message);
      } else {
        console.error("Error sending mail ticket", sendMailTicketData.message);
      }

      window.location.replace(`/products`);
      console.log("Cart purchased successfully", data.ticket, data.cart);
    } else {
      console.error("Error purchasing cart", data.message);
    }
  }
});