const form = document.getElementById("newPassForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const newPassword = formData.get("password");
  const confirmPassword = formData.get("password2");

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (newPassword === previousPassword) {
    alert("New password cannot be the same as the previous password");
    return;
  }

  const response = await fetch("/api/sessiosns/update-password", {
    method: "POST",
    body: JSON.stringify({ newPassword }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (result.status === "success") {
    alert("Password updated successfully");
  } else {
    alert("Failed to update password");
  }
});
