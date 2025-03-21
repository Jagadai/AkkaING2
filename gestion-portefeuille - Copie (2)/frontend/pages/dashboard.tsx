import React, { useState, useEffect } from "react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { useRouter } from "next/router";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const router = useRouter();

  const generateRandomPrice = (fixedPrice) => fixedPrice * (Math.random() * 0.2 + 0.9);
  
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


  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 20 }, (_, index) => index + 1), 
    datasets: [
      {
        label: `Valeur Totale des ${assets[0].name} du Portefeuille`,
        data: Array.from({ length: 20 }, () => generateRandomPrice(50000) * 5),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  const generateInitialQuantities = () => {
    return assets.map(asset => ({
      ...asset,
      quantity: Math.floor(Math.random() * 10) + 1, 
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolio(prevPortfolio => {
        const updatedPortfolio = prevPortfolio.map(asset => ({
          ...asset,
          price: generateRandomPrice(asset.fixed_price), 
        }));

        const totalValue = updatedPortfolio.reduce((sum, asset) => {
          return sum + asset.price * asset.quantity;
        }, 0);

        setTotalValue(totalValue);
        return updatedPortfolio;
      });
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = generateRandomPrice(selectedAsset.fixed_price);
      setChartData(prevData => {
        const newData = [...prevData.datasets[0].data.slice(1), newPrice * portfolio.find(asset => asset.id === selectedAsset.id)?.quantity || 1];
        return {
          ...prevData,
          datasets: [{
            ...prevData.datasets[0],
            data: newData, 
          }],
        };
      });
    }, 10000);

    return () => clearInterval(interval); 
  }, [selectedAsset, portfolio]); 

  const handleAddAsset = (id) => {
    const asset = assets.find(a => a.id === id);
    if (asset) {
      setPortfolio(prevPortfolio => {
        const existingAsset = prevPortfolio.find(a => a.id === id);
        if (existingAsset) {
          return prevPortfolio.map(a =>
            a.id === id ? { ...a, quantity: a.quantity + 1 } : a 
          );
        } else {
          return [...prevPortfolio, { ...asset, quantity: 1 }]; 
        }
      });
    }
  };

  useEffect(() => {
    setPortfolio(generateInitialQuantities()); 
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Tableau de Bord</h1>
        <Button onClick={() => router.push("/settings")}>
          Paramètres
        </Button>
      </header>

      <main className="flex flex-col items-center mt-6">
        <Card className="w-full max-w-4xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Graphiques en Temps Réel</h2>
          
          <select
            value={selectedAsset.id}
            onChange={(e) => {
              const asset = assets.find(a => a.id === parseInt(e.target.value));
              if (asset) {
                setSelectedAsset(asset); 
                setChartData({
                  labels: Array.from({ length: 20 }, (_, index) => index + 1),
                  datasets: [{
                    label: `Valeur Totale du ${asset.name}`,
                    data: Array.from({ length: 20 }, () => generateRandomPrice(asset.fixed_price) * 5),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                  }],
                });
              }
            }}
            className="mb-4"
          >
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name} ({asset.symbol})
              </option>
            ))}
          </select>

          <div className="flex justify-center">
            <Line data={chartData} height={100} width={250} /> 
          </div>
        </Card>

        <Card className="w-full max-w-4xl mt-6 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Portefeuille</h2>
          <p className="text-lg font-medium">Valeur Totale: ${totalValue.toFixed(2)}</p> 

          <div className="flex flex-col space-y-2">
            {portfolio.map((asset, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{asset.quantity} {asset.symbol}</span>
                <Button onClick={() => handleAddAsset(asset.id)}>Ajouter</Button>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;
