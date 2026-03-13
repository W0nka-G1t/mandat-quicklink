import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LINK_URL } from "./api";

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
        const response = await fetch(`${LINK_URL}/users`);

        if (!response.ok) {
          throw new Error("Erreur API");
        }

        const data = await response.json();

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
        console.error(err);
        setError("Erreur lors du chargement des utilisateurs");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const goBack = () => {
    navigate("/auth/admin-links");
  };

  const deleteUser = async (username) => {
    try {
      await fetch(`${LINK_URL}/users/${username}`, {
        method: "DELETE",
      });

      const updatedUsers = users.filter((user) => user.username !== username);
      setUsers(updatedUsers);

      const adminCount = updatedUsers.filter((u) => u.role === "admin").length;
      const userCount = updatedUsers.filter((u) => u.role === "user").length;

      setStats({
        total: updatedUsers.length,
        admins: adminCount,
        users: userCount,
      });

      setSuccess("Utilisateur supprimé");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression");
    }
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
              {users.map((user) => (
                <tr key={user.username}>
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