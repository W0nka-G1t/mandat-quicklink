// Helper function to copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copié dans le presse-papiers!');
  }).catch(err => {
    console.error('Erreur lors de la copie:', err);
  });
}

// Logout function
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  window.location.href = 'login.html';
}

// Check if user is logged in
function checkAuth() {
  const token = localStorage.getItem('authToken');

  if (!token) {
    window.location.href = 'login.html';
    return false;
  }

  return true;
}

// Load and display user's links
async function loadUserLinks() {
  if (!checkAuth()) return;

  const token = localStorage.getItem('authToken');
  const loader = document.getElementById('loader');
  const errorDiv = document.getElementById('error');
  const table = document.getElementById('linksTable');
  const noLinks = document.getElementById('noLinks');
  const linksBody = document.getElementById('linksBody');

  loader.style.display = 'block';
  errorDiv.style.display = 'none';

  try {
    console.log('Fetching /link/my with token:', token ? 'present' : 'missing');
    const response = await fetch('/link/my', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    loader.style.display = 'none';

    if (!response.ok) {
      errorDiv.textContent = `Erreur: ${response.status} - ${data.error || response.statusText}`;
      errorDiv.style.display = 'block';
      return;
    }

    if (!data.success || !data.links || data.links.length === 0) {
      noLinks.style.display = 'block';
      table.style.display = 'none';
      return;
    }

    // Populate table
    linksBody.innerHTML = '';
    data.links.forEach(link => {
      const row = document.createElement('tr');
      const originalUrl = link.originalUrl.length > 50 ? link.originalUrl.substring(0, 50) + '...' : link.originalUrl;
      const shortUrl = `${window.location.origin}/link/${link.shortCode}`;
      const createdAt = new Date(link.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      row.innerHTML = `
        <td><strong>${link.shortCode}</strong></td>
        <td title="${link.originalUrl}">${originalUrl}</td>
        <td>
          <a href="${shortUrl}" class="short-url" target="_blank">${shortUrl}</a>
        </td>
        <td>${link.clicks || 0}</td>
        <td>${createdAt}</td>
        <td>
          <button class="copy-btn" onclick="copyToClipboard('${shortUrl}')">Copier</button>
        </td>
      `;
      linksBody.appendChild(row);
    });

    table.style.display = 'table';
    noLinks.style.display = 'none';

  } catch (err) {
    loader.style.display = 'none';
    errorDiv.textContent = `Erreur: ${err.message}`;
    errorDiv.style.display = 'block';
    console.error('Error loading links:', err);
  }
}

// Load links when page loads
document.addEventListener('DOMContentLoaded', loadUserLinks);