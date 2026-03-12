import { useState } from "react"; 
import { Link } from "react-router-dom"; 
 
function Register() { 
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [result, setResult] = useState(""); 
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
 
    // Example registration logic 
    setResult(`Compte créé pour ${username}`); 
  }; 
 
  return ( 
    <div> 
      <h1>Inscription</h1> 
 
      <form id="registerForm" className="register" onSubmit={handleSubmit}> 
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
 
      <Link to="/login">Se connecter</Link> 
 
      <div id="result">{result}</div> 
    </div> 
  ); 
} 
 
export default Register; 