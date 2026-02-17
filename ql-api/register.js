document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const resultDiv = document.getElementById('result');

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      resultDiv.innerHTML = `<div style="color:green;">Registration successful! <a href="login.html">Login here</a></div>`;
      document.getElementById('registerForm').reset();
    } else {
      resultDiv.innerHTML = `<div style="color:red;">${data.error}</div>`;
    }

  } catch (err) {
    resultDiv.innerHTML = `<div style="color:red;">Error: ${err.message}</div>`;
  }
});
