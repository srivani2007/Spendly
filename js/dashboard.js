const total = expenses.reduce((sum,e)=>sum+e.amount,0);
const monthTotal = getMonthExpenses().reduce((sum,e)=>sum+e.amount,0);
document.getElementById("totalSpent").textContent = currency(total);
document.getElementById("monthSpent").textContent = currency(monthTotal);
document.getElementById("remainingBudget").textContent = currency(Math.max(budget-monthTotal,0));
document.getElementById("transactionCount").textContent = expenses.length;

const recent = [...expenses].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);
document.getElementById("recentExpenses").innerHTML = recent.length ? recent.map(e=>`
<div class="expense-row"><div><strong>${e.name}</strong><div class="expense-meta">${e.category} • ${e.date}</div></div><strong>${currency(e.amount)}</strong></div>`).join("") : '<div class="empty">No expenses yet. Add your first expense.</div>';

const totals = {};
expenses.forEach(e=>totals[e.category]=(totals[e.category]||0)+e.amount);
const max = Math.max(...Object.values(totals),1);
document.getElementById("categorySummary").innerHTML = Object.keys(totals).length ? Object.entries(totals).map(([cat,val])=>`
<div class="category-item"><div class="category-line"><span>${cat}</span><strong>${currency(val)}</strong></div><div class="bar"><span style="width:${(val/max)*100}%"></span></div></div>`).join("") : '<div class="empty">Add expenses to see category insights.</div>';
