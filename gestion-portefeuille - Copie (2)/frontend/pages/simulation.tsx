import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrement des composants de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

  const [selectedCoin, setSelectedCoin] = useState(''); 
  const [historicalData, setHistoricalData] = useState([]); 
  const [simulatedData, setSimulatedData] = useState([]); 
  const [isDataGenerated, setIsDataGenerated] = useState(false); 

  const generateRandomPrice = (basePrice) => basePrice * (Math.random() * 0.2 + 0.9);

  const generateData = (coinId) => {
    const selectedAsset = assets.find(asset => asset.id === coinId);
    if (!selectedAsset) return;

    const basePrice = selectedAsset.fixed_price;

    const historical = Array.from({ length: 20 }, (_, index) => generateRandomPrice(basePrice));
    setHistoricalData(historical);

    const simulated = [];
    for (let i = 0; i < 10; i++) {
      const lastValue = historical[historical.length - 1];
      simulated.push(generateRandomPrice(lastValue));
    }
    setSimulatedData(simulated);

    setIsDataGenerated(true);
  };

  const handleCoinChange = (e) => {
    const coinId = parseInt(e.target.value);
    setSelectedCoin(coinId);
    setIsDataGenerated(false); 
    generateData(coinId); 
  };

  const data = {
    labels: [
      ...Array.from({ length: 20 }, (_, index) => `Jour ${index + 1}`), 
      ...Array.from({ length: 10 }, (_, index) => `Jour ${index + 21}`) 
    ],
    datasets: [
      {
        label: 'Historique',
        data: historicalData,
        borderColor: 'blue',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Simulation Monte Carlo',
        data: [...historicalData, ...simulatedData], 
        borderColor: 'red',
        fill: false,
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="container">
      <h1>Simulation d'Investissement</h1>

      <div>
        <label>Choisir un actif :</label>
        <select value={selectedCoin} onChange={handleCoinChange}>
          <option value="">Choisir un coin</option>
          {assets.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      {isDataGenerated && (
        <div>
          <h3>Graphique de Simulation</h3>
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
