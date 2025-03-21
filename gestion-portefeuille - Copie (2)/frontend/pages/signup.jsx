import { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert("Compte créé avec succès !");
    } else {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
