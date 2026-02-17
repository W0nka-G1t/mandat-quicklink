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
        navHtml += `<div style="margin-bottom: 8px;"><a href="admin-links.html" style="text-decoration: none; color: #007bff; font-weight: bold;">📊 Voir tous les liens</a></div>`;
      } else {
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
