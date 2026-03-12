import { useState } from "react"; 
import logo from "../assets/images/logo-orif.jpg"; 
 
function Home() { 
  const [url, setUrl] = useState(""); 
  const [result, setResult] = useState(""); 
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setResult(`URL raccourcie pour: ${url}`); 
  }; 
 
  return ( 
    <div> 
      <img src={logo} alt="Logo ORIF" className="logo" /> 
 
      <h1>Bonjour Utilisateur</h1> 
 
      <form id="linkForm" className="link" onSubmit={handleSubmit}> 
        <input 
          type="text" 
          placeholder="Entrez l'URL à raccourcir" 
          name="url" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          required 
        /> 
        <button type="submit">raccourcir</button> 
      </form> 
 
      <a href="/login">Se connecter</a> 
 
      <div id="result">{result}</div> 
    </div> 
  ); 
} 
