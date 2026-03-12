import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 
 
function AdminLinks() { 
  const [links, setLinks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
 
  useEffect(() => { 
    // Example: fetch links from API 
    const fetchLinks = async () => { 
      try { 
        // Replace with your real API 
        const data = [ 
          { 
            code: "abc123", 
            original: "https://example.com", 
            short: "https://short.ly/abc123", 
            clicks: 10, 
            created: "2026-03-10", 
          }, 
        ]; 
 
        setLinks(data); 
        setLoading(false); 
      } catch (err) { 
        setError("Erreur lors du chargement des liens"); 
        setLoading(false); 
      }  
    }; 
 
    fetchLinks(); 
  }, []); 
 
  const handleLogout = () => { 
    // logout logic 
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
            {links.map((link, index) => ( 
              <tr key={index}> 
                <td>{link.code}</td> 
                <td>{link.original}</td> 
                <td>{link.short}</td> 
                <td>{link.clicks}</td> 
                <td>{link.created}</td> 
                <td> 
                  <button>Supprimer</button> 
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