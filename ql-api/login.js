document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const resultDiv = document.getElementById('result');

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = "index.html";
    } else {
      resultDiv.innerHTML = `<div style="color:red;">Invalid username or password</div>`;
    }

  } catch (err) {
    resultDiv.innerHTML = `<div style="color:red;">Error: ${err.message}</div>`;
  }
});
