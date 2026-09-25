const search = document.getElementById("searchInput");
const filter = document.getElementById("filterCategory");
const sort = document.getElementById("sortExpenses");

function renderExpenses(){
  let list = [...(JSON.parse(localStorage.getItem("expenses") || "[]"))];

  const q = search.value.toLowerCase();

  if(q)
    list = list.filter(e =>
      `${e.name} ${e.category} ${e.description}`
      .toLowerCase()
      .includes(q)
    );

  if(filter.value !== "All")
    list = list.filter(e => e.category === filter.value);

  if(sort.value === "newest")
    list.sort((a,b) => new Date(b.date) - new Date(a.date));

  if(sort.value === "oldest")
    list.sort((a,b) => new Date(a.date) - new Date(b.date));

  if(sort.value === "high")
    list.sort((a,b) => b.amount - a.amount);

  if(sort.value === "low")
    list.sort((a,b) => a.amount - b.amount);

  const box = document.getElementById("expenseTable");

  box.innerHTML = list.length ? list.map(e => `
    <div class="expense-card">
      <div>
        <h4>${e.name}</h4>
        <span class="tag">${e.category}</span>
        <div class="expense-meta">
          ${e.date}${e.description ? " • " + e.description : ""}
        </div>
      </div>

      <div>
        <span class="amount">${currency(e.amount)}</span>

        <button class="edit-btn" onclick="editExpense(${e.id})">
          Edit
        </button>

        <button class="delete-btn" onclick="removeExpense(${e.id})">
          Delete
        </button>
      </div>
    </div>
  `).join("") : '<div class="empty">No matching expenses found.</div>';
}


function editExpense(id){
  const list = JSON.parse(localStorage.getItem("expenses") || "[]");
  const expense = list.find(e => e.id === id);

  if(!expense) return;

  const newName = prompt("Expense name:", expense.name);
  if(newName === null) return;

  const newAmount = prompt("Amount:", expense.amount);
  if(newAmount === null) return;

  const newDescription = prompt(
    "Description:",
    expense.description || ""
  );

  if(newName.trim() === "" || newAmount.trim() === ""){
    alert("Please enter valid details.");
    return;
  }

  expense.name = newName.trim();
  expense.amount = Number(newAmount);
  expense.description = newDescription || "";

  saveExpenses(list);
  renderExpenses();
}


function removeExpense(id){
  if(!confirm("Delete this expense?")) return;

  const list = JSON.parse(localStorage.getItem("expenses") || "[]")
    .filter(e => e.id !== id);

  saveExpenses(list);
  renderExpenses();
}


search.addEventListener("input", renderExpenses);
filter.addEventListener("change", renderExpenses);
sort.addEventListener("change", renderExpenses);

renderExpenses();