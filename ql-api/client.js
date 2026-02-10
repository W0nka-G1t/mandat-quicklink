document.getElementById('linkForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const url = document.querySelector('input[name="url"]').value;
  const resultDiv = document.getElementById('result');
  
  try {
    const response = await fetch('/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    
    const data = await response.json();
    
    if (data.success) {
      resultDiv.innerHTML = `
        <div class="success">
          <p>Shortened URL created!</p>
          <p>Short Code: <strong>${data.shortCode}</strong></p>
          <p>Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p>
          <p>Original URL: ${data.originalUrl}</p>
        </div>
      `;
      document.querySelector('input[name="url"]').value = '';
    } else {
      resultDiv.innerHTML = `<div class="error">Error: ${data.error}</div>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<div class="error">Error: ${err.message}</div>`;
  }
});
