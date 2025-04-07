function getAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  
  function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
    const tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";
    entries.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.terms}</td>
      `;
      tbody.appendChild(row);
    });
  }
  
  document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;
  
    const age = getAge(dob);
    if (age < 18 || age > 55) {
      alert("Age must be between 18 and 55.");
      return;
    }
  
    const entry = { name, email, password, dob, terms };
    const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
    entries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(entries));
  
    loadEntries();
    this.reset();
  });
  
  // Load data when the page loads
  window.onload = loadEntries;
  
