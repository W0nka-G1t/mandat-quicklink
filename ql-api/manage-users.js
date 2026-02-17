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
    document.getElementById('error').textContent = 'Accès refusé. Seuls les administrateurs peuvent accéder à cette page.';
    document.getElementById('loader').style.display = 'none';
    return false;
  }
  
  return true;
}

// Logout function
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  window.location.href = 'login.html';
}

// Go back function
function goBack() {
  window.location.href = 'admin-links.html';
}

// Show message
function showMessage(message, type = 'success', duration = 3000) {
  const element = document.getElementById(type);
  element.textContent = message;
  element.style.display = 'block';
  
  setTimeout(() => {
    element.style.display = 'none';
  }, duration);
}

// Update user role
async function updateUserRole(userId, newRole, username) {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await fetch('/user/update-role', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, role: newRole })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      showMessage(`✓ Utilisateur ${username} promu en ${newRole === 'admin' ? 'administrateur' : 'utilisateur'}`, 'success');
      loadAllUsers();
    } else {
      showMessage(`✗ Erreur: ${data.error}`, 'error');
    }
  } catch (err) {
    showMessage(`✗ Erreur: ${err.message}`, 'error');
    console.error('Error updating role:', err);
  }
}

// Delete user
async function deleteUser(userId, username) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${username}?`)) {
    return;
  }

  const token = localStorage.getItem('authToken');
  
  try {
    const response = await fetch('/user/delete', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      showMessage(`✓ Utilisateur ${username} supprimé`, 'success');
      loadAllUsers();
    } else {
      showMessage(`✗ Erreur: ${data.error}`, 'error');
    }
  } catch (err) {
    showMessage(`✗ Erreur: ${err.message}`, 'error');
    console.error('Error deleting user:', err);
  }
}

// Load and display all users
async function loadAllUsers() {
  if (!checkAuth()) return;

  const token = localStorage.getItem('authToken');
  const currentUsername = localStorage.getItem('username');
  const loader = document.getElementById('loader');
  const errorDiv = document.getElementById('error');
  const table = document.getElementById('usersTable');
  const noUsers = document.getElementById('noUsers');
  const usersBody = document.getElementById('usersBody');
  const stats = document.getElementById('stats');

  loader.style.display = 'block';
  errorDiv.style.display = 'none';

  try {
    const response = await fetch('/user/all', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    loader.style.display = 'none';

    if (!response.ok) {
      if (response.status === 403) {
        errorDiv.textContent = 'Accès refusé.';
      } else {
        errorDiv.textContent = `Erreur: ${response.status} ${response.statusText}`;
      }
      errorDiv.style.display = 'block';
      return;
    }

    const data = await response.json();

    if (!data.success || !data.data || data.data.length === 0) {
      noUsers.style.display = 'block';
      table.style.display = 'none';
      return;
    }

    // Calculate stats
    const users = data.data;
    const totalUsers = users.length;
    const adminCount = users.filter(u => u.role === 'admin').length;
    const userCount = users.filter(u => u.role === 'user').length;

    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('adminCount').textContent = adminCount;
    document.getElementById('userCount').textContent = userCount;
    stats.style.display = 'grid';

    // Populate table
    usersBody.innerHTML = '';
    users.forEach(user => {
      const row = document.createElement('tr');
      const createdAt = new Date(user.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      const roleClass = user.role === 'admin' ? 'role-admin' : 'role-user';
      const roleBadge = `<span class="role-badge ${roleClass}">${user.role.toUpperCase()}</span>`;

      let actions = '';
      
      if (user.role === 'admin') {
        actions = `
          <div class="action-buttons">
            <button class="btn-small" onclick="updateUserRole(${user.id}, 'user', '${user.username}')">Rétrograder</button>
            <button class="btn-small danger" onclick="deleteUser(${user.id}, '${user.username}')" ${adminCount <= 1 ? 'disabled title="Impossible: dernier admin"' : ''}>Supprimer</button>
          </div>
        `;
      } else {
        actions = `
          <div class="action-buttons">
            <button class="btn-small" onclick="updateUserRole(${user.id}, 'admin', '${user.username}')">Promouvoir</button>
            <button class="btn-small danger" onclick="deleteUser(${user.id}, '${user.username}')">Supprimer</button>
          </div>
        `;
      }

      row.innerHTML = `
        <td><strong>${user.username}</strong></td>
        <td>${user.email}</td>
        <td>${roleBadge}</td>
        <td>${createdAt}</td>
        <td>${actions}</td>
      `;
      usersBody.appendChild(row);
    });

    table.style.display = 'table';
    noUsers.style.display = 'none';

  } catch (err) {
    loader.style.display = 'none';
    errorDiv.textContent = `Erreur: ${err.message}`;
    errorDiv.style.display = 'block';
    console.error('Error loading users:', err);
  }
}

// Load users when page loads
document.addEventListener('DOMContentLoaded', loadAllUsers);
