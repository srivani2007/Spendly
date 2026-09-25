function renderBudget(){
  const b=Number(localStorage.getItem("monthlyBudget")||5000);
  const month=getMonthExpenses().reduce((s,e)=>s+e.amount,0);
  const percent=Math.min((month/b)*100,100);
  document.getElementById("budgetValue").textContent=currency(b);
  document.getElementById("budgetSpent").textContent=currency(month);
  document.getElementById("budgetRemaining").textContent=currency(Math.max(b-month,0));
  document.getElementById("budgetProgress").style.width=percent+"%";
  document.getElementById("budgetProgress").style.background=percent>=100?"#b42318":percent>=80?"#a05a00":"#333";
}
document.getElementById("budgetInput").value=localStorage.getItem("monthlyBudget")||5000;
document.getElementById("saveBudget").addEventListener("click",()=>{
  const value=Number(document.getElementById("budgetInput").value);
  if(value<=0)return;
  localStorage.setItem("monthlyBudget",value);
  document.getElementById("budgetMessage").textContent="Budget updated successfully.";
  document.getElementById("budgetMessage").className="message success";
  renderBudget();
});
renderBudget();
