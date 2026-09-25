const currentUser = JSON.parse(localStorage.getItem("expenseUser") || "null");
if (!currentUser) window.location.href = "index.html";

const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
const budget = Number(localStorage.getItem("monthlyBudget") || 5000);

document.querySelectorAll(".sidebar nav a").forEach(link => {
  const page = document.body.dataset.page;
  if (link.dataset.page === page) link.classList.add("active");
});

const name = currentUser?.name || "Student";
document.getElementById("topUserName").textContent = name;
document.getElementById("greeting").textContent = `Welcome back, ${name} 👋`;
document.getElementById("pageTitle").textContent =
  document.title.split("|")[0].trim();

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("expenseUser");
  window.location.href = "index.html";
});

function saveExpenses(items) {
  localStorage.setItem("expenses", JSON.stringify(items));
}

function currency(value) {
  return "₹" + Number(value).toLocaleString("en-IN", {maximumFractionDigits: 2});
}

function getMonthExpenses() {
  const now = new Date();
  return expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
}
