const dateInput = document.getElementById("expenseDate");
dateInput.value = new Date().toISOString().split("T")[0];

document.getElementById("expenseForm").addEventListener("submit", e => {
  e.preventDefault();
  const item = {
    id: Date.now(),
    name: document.getElementById("expenseName").value.trim(),
    amount: Number(document.getElementById("amount").value),
    category: document.getElementById("category").value,
    date: dateInput.value,
    description: document.getElementById("description").value.trim()
  };
  const items = JSON.parse(localStorage.getItem("expenses") || "[]");
  items.push(item);
  saveExpenses(items);
  const msg = document.getElementById("expenseMessage");
  msg.textContent = "Expense added successfully.";
  msg.className = "message success";
  e.target.reset();
  dateInput.value = new Date().toISOString().split("T")[0];
});
