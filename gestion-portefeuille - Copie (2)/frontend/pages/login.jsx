import { useState } from "react";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://127.0.0.1:8080/auth/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);

        if (typeof setToken === "function") { 
          setToken(data.token, username);
        } else {
          console.error("setToken n'est pas une fonction !");
        }
      } else {
        alert("Identifiants incorrects");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur de connexion au serveur.");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nom d'utilisateur" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
