document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const resultDiv = document.getElementById('result');

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      // ✅ Successful login → redirect to index.html
      window.location.href = "index.html";
      // OR if you want a hard reload:
      // window.location.replace("index.html");
    } else {
      resultDiv.innerHTML = `<div class="error">Invalid username or password</div>`;
    }

  } catch (err) {
    resultDiv.innerHTML = `<div class="error">Error: ${err.message}</div>`;
  }
});
