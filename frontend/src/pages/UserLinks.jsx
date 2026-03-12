import { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
 
function UserLinks() { 
  const navigate = useNavigate(); 
 
  const [links, setLinks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
 
  useEffect(() => { 
    const fetchLinks = async () => { 
      try { 
        // Example data (replace later with your API) 
        const data = [ 
          { 
            code: "xyz123", 
            original: "https://google.com", 
            short: "https://short.ly/xyz123", 
            clicks: 5, 
            created: "2026-03-11", 
          }, 
        ]; 
 
        setLinks(data); 
        setLoading(false); 
      } catch (err) { 
        setError("Erreur lors du chargement de vos liens"); 
        setLoading(false); 
      } 
    }; 
 
    fetchLinks(); 
  }, []); 
 
  const handleLogout = () => { 
    alert("Déconnecté"); 
    navigate("/login"); 
  }; 
 
  const deleteLink = (code) => { 
    setLinks(links.filter((link) => link.code !== code)); 
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
            {links.map((link, index) => ( 
              <tr key={index}> 
                <td>{link.code}</td> 
                <td>{link.original}</td> 
                <td>{link.short}</td> 
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