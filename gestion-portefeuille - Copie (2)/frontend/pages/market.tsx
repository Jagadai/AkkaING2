import React, { useState, useEffect } from "react";
import { Card } from "../components/card";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardPage = () => {
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


  const [currentValues, setCurrentValues] = useState(
    assets.map(asset => ({
      ...asset,
      currentPrice: asset.fixed_price,
    }))
  );

  // Données du graphique
  const [chartData, setChartData] = useState(null); 

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

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim().length > 0) {
      const asset = assets.find(a => a.name.toLowerCase() === searchQuery.toLowerCase());
      if (asset) {
        const randomPrices = Array.from({ length: 30 }, () => generateRandomPrice(asset.fixed_price)); 
        setChartData({
          labels: Array.from({ length: 30 }, (_, index) => index + 1),
          datasets: [{
            label: `Prix du ${asset.name}`,
            data: randomPrices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          }],
        });
      } else {
        setChartData(null);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Marché financier</h1>
      </header>


        {<p className="text-red-500"></p>}

      <main className="flex flex-col items-center mt-6">
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher un actif..."
          className="p-2 mb-4 border rounded"
          onChange={(e) => handleSearch(e.target.value)} 
        />
        
        {chartData && (
          <Card className="w-full max-w-4xl p-6 shadow-lg mt-6">
            <h2 className="text-xl font-semibold mb-4">Cours du {chartData.name}</h2>
            <div className="flex justify-center">
              <Line data={chartData} height={100} width={250} /> 
            </div>
          </Card>
        )}
=
        <Card className="w-full max-w-4xl mt-6 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Valeur Actuelle des Actifs</h2>
          <div className="space-y-2">
            {currentValues.map(asset => (
              <div key={asset.id} className="flex justify-between items-center">
                <span className="flex justify-between w-full">
                  <span>{asset.name} ({asset.symbol}):</span>
                  <span className="ml-2 text-right" style={{ minWidth: '100px' }}>
                    ${asset.currentPrice.toFixed(2)}
                  </span>
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
