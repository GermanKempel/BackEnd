const form = document.getElementById("newPassForm");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const password = form[0].value;
  const confirmPassword = form[1].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const response = await fetch("/api/sessions/update-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({ password, token: window.location.pathname.split("/")[4] }),

  });

  const result = await response.json();

  if (result.status === "success") {
    window.location.replace("/login");
  } else {
    alert(result.error);
  }
});
