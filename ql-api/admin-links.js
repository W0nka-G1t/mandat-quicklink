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

// Check if user is logged in and is admin
function checkAuth() {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');
  
  if (!token) {
    window.location.href = 'login.html';
    return false;
  }
  
  if (role !== 'admin') {
    document.getElementById('error').style.display = 'block';
    document.getElementById('error').textContent = 'Vous n\'avez pas les permissions pour accéder à cette page. Seuls les administrateurs peuvent voir tous les liens.';
    document.getElementById('loader').style.display = 'none';
    return false;
  }
  
  return true;
}

// Load and display all links
async function loadAllLinks() {
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
    const response = await fetch('/link/all', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    loader.style.display = 'none';

    if (!response.ok) {
      if (response.status === 403) {
        errorDiv.textContent = 'Accès refusé. Vous devez être administrateur pour voir tous les liens.';
      } else {
        errorDiv.textContent = `Erreur: ${response.status} ${response.statusText}`;
      }
      errorDiv.style.display = 'block';
      return;
    }

    const data = await response.json();

    if (!data.success || !data.links || data.links.length === 0) {
      noLinks.style.display = 'block';
      table.style.display = 'none';
      return;
    }

    // Get unique links by originalUrl
    const uniqueLinks = {};
    data.links.forEach(link => {
      if (!uniqueLinks[link.originalUrl]) {
        uniqueLinks[link.originalUrl] = link;
      }
    });

    // Convert back to array and sort
    const uniqueLinksArray = Object.values(uniqueLinks).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Populate table
    linksBody.innerHTML = '';
    uniqueLinksArray.forEach(link => {
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
document.addEventListener('DOMContentLoaded', loadAllLinks);
