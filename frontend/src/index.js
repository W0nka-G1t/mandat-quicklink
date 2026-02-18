import './index.css'

// Check authentication status and update UI
function initializeNavigation() {
  const token = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  
  console.log('Auth Debug:', { token: !!token, username, role });
  
  const heading = document.querySelector('h1');
  
  if (token && username) {
    if (heading) {
      heading.textContent = `Bonjour ${username}`;
    }
    
    // Add user menu
    const existingNav = document.getElementById('userNav');
    
    if (!existingNav) {
      const userNav = document.createElement('div');
      userNav.id = 'userNav';
      userNav.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #f8f9fa; padding: 10px 15px; border-radius: 4px; border: 1px solid #ddd; z-index: 1000;';
      
      let navHtml = `<div style="margin-bottom: 8px; font-size: 12px;">Connecté en tant que: <strong>${username}</strong></div>`;
      
      console.log('Role check:', role, typeof role, role === 'admin');
      
      if (role === 'admin') {
        navHtml += `<div style="margin-bottom: 8px;"><a href="admin-links.html" style="text-decoration: none; color: #007bff; font-weight: bold;"> Voir tous les liens</a></div>`;
      } else {
        navHtml += `<div style="margin-bottom: 8px;"><a href="user-links.html" style="text-decoration: none; color: #007bff; font-weight: bold;"> Mes liens</a></div>`;
        navHtml += `<div style="margin-bottom: 8px; font-size: 12px; color: #666;">(Rôle: ${role || 'utilisateur'})</div>`;
      }
      
      navHtml += `<a href="#" onclick="logout(); return false;" style="text-decoration: none; color: #dc3545; font-size: 12px;">Déconnexion</a>`;
      
      userNav.innerHTML = navHtml;
      document.body.insertBefore(userNav, document.body.firstChild);
    }
  } else {
    if (heading) {
      heading.textContent = 'Bonjour Utilisateur';
    }
  }
}

// Logout function
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  window.location.href = 'index.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeNavigation);

document.getElementById('linkForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const url = document.querySelector('input[name="url"]').value;
  const resultDiv = document.getElementById('result');
  
  try {
    const token = localStorage.getItem('authToken');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch('/link', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ url })
    });
    
    const data = await response.json();
    
    if (data.success) {
      resultDiv.innerHTML = `
        <div class="success">
          <p>Shortened URL created!</p>
          <p>Short Code: <strong>${data.shortCode}</strong></p>
          <p>Short URL: <a href="${data.shortUrl}" target="_blank">section.click${data.shortUrl}</a></p>
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
if (!localStorage.getItem('authToken')) {
  window.location.href = 'login.html';
}
