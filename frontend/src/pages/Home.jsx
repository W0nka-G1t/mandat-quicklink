import { useState } from "react";
import logo from "../assets/images/logo-orif.jpg";
import { LINK_URL } from "./api";

function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${LINK_URL}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (data.success) {
        setResult(`URL raccourcie : ${data.short}`);
      } else {
        setResult(data.message || "Erreur lors du raccourcissement");
      }

    } catch (error) {
      console.error("Erreur:", error);
      setResult("Erreur serveur");
    }
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

        <button type="submit">Raccourcir</button>
      </form>

      <a href="auth/login">Se connecter</a>

      <div id="result">{result}</div>
    </div>
  );
}

export default Home;