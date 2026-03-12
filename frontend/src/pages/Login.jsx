import { useState } from "react"; 
 
function Login() { 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [result, setResult] = useState(""); 
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
 
    // Example login logic 
    setResult(`Bienvenue ${username}`); 
  }; 
 
  return ( 
    <div> 
      <h1>Connexion</h1> 
 
      <form id="loginForm" className="login" onSubmit={handleSubmit}> 
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
 
      <a href="/register">S'inscrire</a> 
 
      <div id="result">{result}</div> 
    </div> 
  ); 
} 
 
export default Login; 