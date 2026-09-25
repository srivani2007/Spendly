const totalA = expenses.reduce((s,e)=>s+e.amount,0);
const avg = expenses.length ? totalA/expenses.length : 0;
const highest = expenses.length ? Math.max(...expenses.map(e=>e.amount)) : 0;
document.getElementById("analyticsTotal").textContent = currency(totalA);
document.getElementById("averageExpense").textContent = currency(avg);
document.getElementById("highestExpense").textContent = currency(highest);

const totalsA={};
expenses.forEach(e=>totalsA[e.category]=(totalsA[e.category]||0)+e.amount);
const maxA=Math.max(...Object.values(totalsA),1);
document.getElementById("categoryChart").innerHTML=Object.keys(totalsA).length
? Object.entries(totalsA).sort((a,b)=>b[1]-a[1]).map(([cat,val])=>`
<div class="category-item"><div class="category-line"><span>${cat}</span><strong>${currency(val)}</strong></div><div class="bar"><span style="width:${val/maxA*100}%"></span></div></div>`).join("")
: '<div class="empty">No analytics available yet.</div>';

const topCat=Object.entries(totalsA).sort((a,b)=>b[1]-a[1])[0];
document.getElementById("insights").innerHTML = topCat
? `<p>📌 Your highest spending category is <strong>${topCat[0]}</strong> with ${currency(topCat[1])}.</p>
<p>🧾 You have recorded <strong>${expenses.length}</strong> transactions.</p>
<p>💡 Keep tracking regularly to understand your spending patterns.</p>`
: '<div class="empty">Add a few expenses to generate insights.</div>';
