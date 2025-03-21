import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = ({ token, setToken }) => {
  const router = useRouter();
  const [username, setUsername] = useState(""); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username") || "";
      setUsername(storedUsername);
    }
  }, [token]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
    setToken(null);
    setUsername("");
    router.push("/login");
  };

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#222",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <h1 
        onClick={() => router.push("/")}
        style={{
          margin: 0,
          cursor: "pointer",
          textDecoration: "none",
          transition: "color 0.3s",
          color: "#fff"
        }}
      >
        Smash STOCKS
      </h1>

      <nav>
        {token ? (
          <>
            <span style={{ marginRight: "20px", color: "#ddd" }}>
              Connecté en tant que <span style={{ color: "#fff" }}>{username}</span>
            </span>
            <button 
              onClick={handleLogout} 
              style={{
                padding: "8px 15px",
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "10px"
              }}>
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => router.push("/login")} 
              style={{
                padding: "8px 15px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                marginRight: "10px"
              }}>
              Se connecter
            </button>
            <button 
              onClick={() => router.push("/signup")} 
              style={{
                padding: "8px 15px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}>
              Créer un compte
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
