const { use } = require("react");

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const resultDiv = document.getElementById('result');
  
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      resultDiv.innerHTML = `<div class="success">Registration successful! You can now <a href="login.html">log in</a>.</div>`;
      document.querySelector('input[name="username"]').value = '';
      document.querySelector('input[name="password"]').value = '';
    } else {
      resultDiv.innerHTML = `<div class="error">Error: ${data.error}</div>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<div class="error">Error: ${err.message}</div>`;
  }
}); 
if user.name === "admin" && user.password === "admin123" {
    // Redirect to the dashboard or home page
    window.location.href = "dashboard.html";
} else {
    // Show an error message
    document.getElementById('result').innerHTML = `<div class="error">Invalid username or password</div>`;
}   