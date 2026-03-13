import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LINK_URL } from "./api";

function UserLinks() {
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${LINK_URL}/user-links`);

        if (!response.ok) {
          throw new Error("Erreur API");
        }

        const data = await response.json();

        setLinks(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de vos liens");
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const deleteLink = async (code) => {
    try {
      await fetch(`${LINK_URL}/${code}`, {
        method: "DELETE",
      });

      setLinks((prev) => prev.filter((link) => link.code !== code));
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Mes liens raccourcis</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            to="/"
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            Accueil
          </Link>

          <button onClick={handleLogout} className="logout-btn">
            Déconnexion
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {loading && <div className="loader">Chargement de vos liens...</div>}

      {!loading && links.length === 0 && (
        <div className="no-links">
          Vous n'avez créé aucun lien pour le moment
        </div>
      )}

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
                <td>
                  <a href={link.short} target="_blank" rel="noreferrer">
                    {link.short}
                  </a>
                </td>
                <td>{link.clicks}</td>
                <td>{link.created}</td>
                <td>
                  <button onClick={() => deleteLink(link.code)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserLinks;