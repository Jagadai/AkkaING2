import React, { useState } from "react";
import { Card } from "../components/card";
import { Input } from "../components/input";
import { Button } from "../components/button";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    username: "",
    email: "",
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveSettings = () => {
    console.log("Paramètres sauvegardés:", settings);
    alert("Paramètres sauvegardés avec succès!");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
      
      <Card className="w-full max-w-3xl p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Informations du Compte</h2>
        <div className="space-y-4">
          <Input 
            name="username" 
            placeholder="Nom d'utilisateur" 
            value={settings.username} 
            onChange={handleChange} 
          />
          <Input 
            name="email" 
            type="email" 
            placeholder="Email" 
            value={settings.email} 
            onChange={handleChange} 
          />
        </div>
      </Card>
      
      <Card className="w-full max-w-3xl p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Préférences</h2>
        <div className="flex items-center space-x-4">
          <input 
            type="checkbox" 
            name="darkMode" 
            checked={settings.darkMode} 
            onChange={handleChange} 
            className="w-5 h-5"
          />
          <label className="text-gray-700">Mode sombre</label>
        </div>
      </Card>
      
      <Button className="w-full max-w-3xl" onClick={saveSettings}>Sauvegarder</Button>
    </div>
  );
}
