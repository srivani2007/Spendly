const u=JSON.parse(localStorage.getItem("expenseUser")||"{}");
document.getElementById("profileName").value=u.name||"";
document.getElementById("profileEmail").value=u.email||"";
document.getElementById("profileForm").addEventListener("submit",e=>{
  e.preventDefault();
  const updated={...u,name:document.getElementById("profileName").value.trim(),email:document.getElementById("profileEmail").value.trim()};
  localStorage.setItem("registeredUser",JSON.stringify(updated));
  localStorage.setItem("expenseUser",JSON.stringify(updated));
  document.getElementById("topUserName").textContent=updated.name;
  document.getElementById("greeting").textContent=`Welcome back, ${updated.name} 👋`;
  document.getElementById("profileMessage").textContent="Profile saved successfully.";
  document.getElementById("profileMessage").className="message success";
});
