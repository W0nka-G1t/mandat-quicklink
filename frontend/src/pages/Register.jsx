import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LINK_URL } from "./api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${LINK_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`Compte créé pour ${username}`);

        // redirect to login after registration
        setTimeout(() => {
          navigate("/auth/login");
        }, 1500);

      } else {
        setResult(data.message || "Erreur lors de l'inscription");
      }

    } catch (error) {
      console.error("Register error:", error);
      setResult("Erreur serveur");
    }
  };

  return (
    <div>
      <h1>Inscription</h1>

      <form className="register" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Adresse email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <button type="submit">S'inscrire</button>
      </form>

      <Link to="/auth/login">Se connecter</Link>

      {result && <div>{result}</div>}
    </div>
  );
}

export default Register;