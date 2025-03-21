import React, { useState, useEffect } from "react";
import { Button } from "../components/button";
import { Card } from "../components/card";

const DashboardPage = () => {
  const [assets] = useState([
    { id: 1, name: 'Pitcoin', symbol: 'PIT', fixed_price: 80000 }, 
    { id: 2, name: 'SonicCoin', symbol: 'SONIC', fixed_price: 5000 }, 
    { id: 3, name: 'Samusium', symbol: 'SMT', fixed_price: 250 },
    { id: 4, name: 'LinkLite', symbol: 'LLT', fixed_price: 180 }, 
    { id: 5, name: 'MarioXRPG', symbol: 'XROG', fixed_price: 1.8 },
    { id: 6, name: 'ZeldaFi', symbol: 'ZFI', fixed_price: 75 }, 
    { id: 7, name: 'DonkeyCoing', symbol: 'DKC', fixed_price: 2.5 }, 
    { id: 8, name: 'KirbyCash', symbol: 'KBC', fixed_price: 12 }, 
    { id: 9, name: 'ClimbChain', symbol: 'CLB', fixed_price: 35 }, 
    { id: 10, name: 'PikachuCash', symbol: 'PCZ', fixed_price: 0.5 }, 
    { id: 11, name: 'VillagerCoin', symbol: 'VCO', fixed_price: 1.2 },
    { id: 12, name: 'LucinaCoin', symbol: 'LUC', fixed_price: 120 },
    { id: 13, name: 'Tinken', symbol: 'TINK', fixed_price: 3.0 }, 
    { id: 14, name: 'InklingCash', symbol: 'INK', fixed_price: 15 }, 
    { id: 15, name: 'MetaKnightCoin', symbol: 'MKC', fixed_price: 2.8 }, 
    { id: 16, name: 'WiiFi', symbol: 'WIFI', fixed_price: 200 }, 
    { id: 17, name: 'BayoCoin', symbol: 'BAYO', fixed_price: 22 }, 
    { id: 18, name: 'XenoBlock', symbol: 'XENO', fixed_price: 5 }, 
    { id: 19, name: 'ShulkCoin', symbol: 'SHULK', fixed_price: 350 },
    { id: 20, name: 'InkLink', symbol: 'INKL', fixed_price: 14 }, 
  ]);


  const generateRandomPrice = (fixedPrice) => fixedPrice * (Math.random() * 0.2 + 0.9);

  const [currentValues, setCurrentValues] = useState(
    assets.map(asset => ({
      ...asset,
      currentPrice: asset.fixed_price,
    }))
  );

  // Données pour l'alerte
  const [alertPrice, setAlertPrice] = useState(null); 
  const [alertCondition, setAlertCondition] = useState(true); 
  const [alertAsset, setAlertAsset] = useState(assets[0]); 
  const [alertMessage, setAlertMessage] = useState(""); 
  const [isAlertTriggered, setIsAlertTriggered] = useState(false);

  const [pendingAlerts, setPendingAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValues(prevValues =>
        prevValues.map(asset => ({
          ...asset,
          currentPrice: generateRandomPrice(asset.fixed_price), 
        }))
      );
    }, 15000); 

    return () => clearInterval(interval); 
  }, []); 

  useEffect(() => {
    pendingAlerts.forEach(alert => {
      const currentPrice = currentValues.find(asset => asset.symbol === alert.asset.symbol)?.currentPrice;

      if (currentPrice) {
        if (
          (alert.condition && currentPrice > alert.price) || 
          (!alert.condition && currentPrice < alert.price) 
        ) {
          setAlertMessage(`Alerte pour ${alert.asset.name}: Le prix a ${alert.condition ? 'dépassé' : 'descendu en dessous'} de ${alert.price}`);
          playAlertSound(); 
          setIsAlertTriggered(true);
          removePendingAlert(alert.id); 
        }
      }
    });
  }, [currentValues, pendingAlerts]); 

  const playAlertSound = () => {
    const audio = new Audio("/OKAY.mp3"); 
    audio.play();
  };

  const closeAlert = () => {
    setIsAlertTriggered(false);
    setAlertMessage("");
  };

  const removePendingAlert = (id) => {
    setPendingAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const defineAlert = () => {

    if (alertPrice == null || alertPrice === "") {
      alert("Veuillez entrer un prix valide pour l'alerte.");
      return;
    }
    setPendingAlerts(prev => [
      ...prev,
      {
        id: Date.now(), 
        asset: alertAsset,
        condition: alertCondition, 
        price: alertPrice,
        message: `Alerte pour ${alertAsset.name} (${alertAsset.symbol}): ${alertCondition ? 'supérieur' : 'inférieur'} à ${alertPrice}`,
      },
    ]);
    setAlertPrice(null);
    setAlertCondition(true);
    setAlertAsset(assets[0]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Alertes du marché</h1>
      </header>

      <main className="flex flex-col items-center mt-6">
        {/* Section pour définir l'alerte */}
        <Card className="w-full max-w-4xl mt-6 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Définir une Alerte de Prix</h2>
          <div>
            <label htmlFor="alertAsset">Choisir un actif :</label>
            <select
              id="alertAsset"
              value={alertAsset.id}
              onChange={(e) => setAlertAsset(assets.find(a => a.id === parseInt(e.target.value)))}
              className="p-2 mb-4 border rounded"
            >
              {assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="alertPrice">Prix de l'alerte :</label>
            <input
              type="number"
              id="alertPrice"
              value={alertPrice || ""}
              onChange={(e) => setAlertPrice(parseFloat(e.target.value))}
              className="p-2 mb-4 border rounded"
              placeholder="Entrez le prix"
            />
          </div>
          <div>
            <label htmlFor="alertCondition">Condition :</label>
            <select
              id="alertCondition"
              value={alertCondition ? 'supérieur' : 'inférieur'}
              onChange={(e) => setAlertCondition(e.target.value === 'supérieur')}
              className="p-2 mb-4 border rounded"
            >
              <option value="supérieur">Supérieur à</option>
              <option value="inférieur">Inférieur à</option>
            </select>
          </div>
          <Button onClick={defineAlert}>Définir l'alerte</Button>
        </Card>

        {isAlertTriggered && (
          <Card className="w-full max-w-4xl mt-6 p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Alerte Déclenchée</h3>
            <p>{alertMessage}</p>
            <div className="flex space-x-4 mt-4">
              <Button onClick={closeAlert}>Fermer</Button>
            </div>
          </Card>
        )}

        {pendingAlerts.length > 0 && (
          <Card className="w-full max-w-4xl mt-6 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Alertes en Attente</h2>
            <div className="space-y-2">
              {pendingAlerts.map((alert) => (
                <div key={alert.id} className="flex justify-between items-center">
                  <span>{alert.message}</span>
                  <Button onClick={() => removePendingAlert(alert.id)}>Supprimer</Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="w-full max-w-4xl mt-6 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Valeur Actuelle des Actifs</h2>
          <div className="space-y-2">
            {currentValues.map((asset) => (
              <div key={asset.id} className="flex justify-between items-center">
                <span className="flex justify-between w-full">
                  <span>{asset.name} ({asset.symbol}):</span>
                  <span className="ml-2 text-right" style={{ minWidth: '100px' }}>${asset.currentPrice.toFixed(2)}</span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;
