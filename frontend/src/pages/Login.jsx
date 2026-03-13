import { useState } from "react";
import { LINK_URL } from "./api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${LINK_URL}/login`, {
        method: "POST",  
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Save user or token
        localStorage.setItem("user", JSON.stringify(data));

        setResult(`Bienvenue ${username}`);

        // redirect to admin page
        navigate("/admin");

      } else {
        setResult(data.message || "Identifiants invalides");
      }

    } catch (error) {
      console.error("Login error:", error);
      setResult("Erreur serveur");
    }
  };

  return (
    <div>
      <h1>Connexion</h1>

      <form className="login" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Se connecter</button>
      </form>

      <a href="/auth/register">S'inscrire</a>

      {result && <div>{result}</div>}
    </div>
  );
}

export default Login;