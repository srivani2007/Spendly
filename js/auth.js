function getStoredUser(){return JSON.parse(localStorage.getItem("registeredUser") || "null");}
document.getElementById("loginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const user = getStoredUser();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMessage");
  if (!user || user.email !== email || user.password !== password) {
    msg.textContent = "Invalid email or password.";
    msg.className = "message danger";
    return;
  }
  localStorage.setItem("expenseUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
});
document.getElementById("registerForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const user = {
    name: document.getElementById("registerName").value.trim(),
    email: document.getElementById("registerEmail").value.trim(),
    password: document.getElementById("registerPassword").value
  };
  localStorage.setItem("registeredUser", JSON.stringify(user));
  localStorage.setItem("expenseUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
});
