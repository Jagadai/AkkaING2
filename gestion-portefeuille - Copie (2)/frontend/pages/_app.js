import { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/globals.css"; 

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken) {
      setToken(storedToken);
      setUsername(storedUsername || "");
    }
  }, []);

  const setAuth = (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem("token", newToken);
    localStorage.setItem("username", newUsername);
  };

  return (
    <>
      <Header token={token} setToken={setAuth} />
      <Component {...pageProps} token={token} setToken={setAuth} />
    </>
  );
}

export default MyApp;
