import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LINK_URL } from "./api";

function AdminLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${LINK_URL}/links`);

        if (!response.ok) {
          throw new Error("Erreur API");
        }

        const data = await response.json();

        setLinks(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des liens");
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleDelete = async (code) => {
    try {
      await fetch(`${LINK_URL}/${code}`, {
        method: "DELETE",
      });

      setLinks((prev) => prev.filter((link) => link.code !== code));
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  const handleLogout = () => {
    alert("Déconnecté");
  };

  return (
    <div>
      <div className="header">
        <h1>Admin - Tous les liens raccourcis</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            to="/manage-users"
            style={{
              padding: "8px 16px",
              backgroundColor: "#17a2b8",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            👥 Gérer les utilisateurs
          </Link>

          <button onClick={handleLogout} className="btn back">
            Déconnexion
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {loading && <div className="loader">Chargement des liens...</div>}

      {!loading && links.length > 0 && (
        <table id="linksTable">
          <thead>
            <tr>
              <th>Code court</th>
              <th>URL original</th>
              <th>URL raccourci</th>
              <th>Clics</th>
              <th>Créé le</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {links.map((link) => (
              <tr key={link.code}>
                <td>{link.code}</td>
                <td>{link.original}</td>
                <td>{link.short}</td>
                <td>{link.clicks}</td>
                <td>{link.created}</td>
                <td>
                  <button onClick={() => handleDelete(link.code)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && links.length === 0 && (
        <div className="no-links">Aucun lien trouvé</div>
      )}
    </div>
  );
}

export default AdminLinks;