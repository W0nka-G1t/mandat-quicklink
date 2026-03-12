import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
 
function ManageUsers() { 
  const navigate = useNavigate(); 
 
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
 
  const [stats, setStats] = useState({ 
    total: 0, 
    admins: 0, 
    users: 0, 
  }); 
 
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
 
  useEffect(() => { 
    const fetchUsers = async () => { 
      try { 
        // Example data (replace with API later) 
        const data = [ 
          { 
            username: "admin", 
            email: "admin@test.com", 
            role: "admin", 
            created: "2026-03-10", 
          }, 
          { 
            username: "user1", 
            email: "user@test.com", 
            role: "user", 
            created: "2026-03-09", 
          }, 
        ]; 
 
        setUsers(data); 
 
        const adminCount = data.filter((u) => u.role === "admin").length; 
        const userCount = data.filter((u) => u.role === "user").length; 
 
        setStats({ 
          total: data.length, 
          admins: adminCount, 
          users: userCount, 
        }); 
 
        setLoading(false); 
      } catch (err) { 
        setError("Erreur lors du chargement des utilisateurs"); 
        setLoading(false); 
      } 
    }; 
 
    fetchUsers(); 
  }, []); 
 
  const handleLogout = () => { 
    alert("Déconnecté"); 
    navigate("/login"); 
  }; 
 
  const goBack = () => { 
    navigate("/admin-links"); 
  }; 
 
  const deleteUser = (username) => { 
    setUsers(users.filter((user) => user.username !== username)); 
    setSuccess("Utilisateur supprimé"); 
  }; 
 
  return ( 
    <div> 
      <div className="header"> 
        <h1>Gestion des utilisateurs</h1> 
 
        <div className="header-buttons"> 
          <button onClick={goBack} className="btn btn-back"> 
            ← Retour 
          </button> 
 
          <button onClick={handleLogout} className="btn btn-logout"> 
            Déconnexion 
          </button> 
        </div> 
      </div> 
 
      <div className="container"> 
        {success && <div className="success">{success}</div>} 
        {error && <div className="error">{error}</div>} 
 
        {!loading && ( 
          <div className="stats"> 
            <div className="stat-card"> 
              <div className="stat-number">{stats.total}</div> 
              <div className="stat-label">Utilisateurs totaux</div> 
            </div> 
 
            <div className="stat-card"> 
              <div className="stat-number">{stats.admins}</div> 
              <div className="stat-label">Administrateurs</div> 
            </div> 
 
            <div className="stat-card"> 
              <div className="stat-number">{stats.users}</div> 
              <div className="stat-label">Utilisateurs normaux</div> 
            </div> 
          </div> 
        )} 
 
        {loading && <div className="loader">Chargement des utilisateurs...</div>} 
 
        {!loading && users.length === 0 && ( 
          <div className="no-users">Aucun utilisateur trouvé</div> 
        )} 
 
        {!loading && users.length > 0 && ( 
          <table id="usersTable"> 
            <thead> 
              <tr> 
                <th>Nom d'utilisateur</th> 
                <th>Email</th> 
                <th>Rôle</th> 
                <th>Date de création</th> 
                <th>Actions</th> 
              </tr> 
            </thead> 
 
            <tbody> 
              {users.map((user, index) => ( 
                <tr key={index}> 
                  <td>{user.username}</td> 
                  <td>{user.email}</td> 
                  <td>{user.role}</td> 
                  <td>{user.created}</td> 
                  <td> 
                    <button onClick={() => deleteUser(user.username)}> 
                      Supprimer 
                    </button> 
                  </td> 
                </tr> 
              ))} 
            </tbody> 
          </table> 
        )} 
      </div> 
    </div> 
  ); 
} 
 
export default ManageUsers; 