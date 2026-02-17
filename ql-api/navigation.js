// Check authentication status and update UI
function initializeNavigation() {
  const token = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  
  const heading = document.querySelector('h1');
  
  if (token && username) {
    if (heading) {
      heading.textContent = `Bonjour ${username}`;
    }
    
    // Add user menu
    const nav = document.querySelector('body') || document.body;
    const existingNav = document.getElementById('userNav');
    
    if (!existingNav) {
      const userNav = document.createElement('div');
      userNav.id = 'userNav';
      userNav.style.cssText = 'float: right; margin-bottom: 20px;';
      
      let navHtml = `<span style="margin-right: 15px;">Connecté en tant que: <strong>${username}</strong></span>`;
      
      if (role === 'admin') {
        navHtml += `<a href="admin-links.html" style="margin-right: 15px; text-decoration: none; color: #007bff; cursor: pointer;">📊 Voir tous les liens</a>`;
      }
      
      navHtml += `<a href="#" onclick="logout(); return false;" style="text-decoration: none; color: #dc3545; cursor: pointer;">Déconnexion</a>`;
      
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
