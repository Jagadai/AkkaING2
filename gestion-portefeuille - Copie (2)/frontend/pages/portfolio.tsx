import { useState } from 'react';

const PortfolioPage = () => {

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
  const [selectedAsset, setSelectedAsset] = useState(null); 
  const [quantity, setQuantity] = useState(1); 

  const handleAddAsset = () => {
    if (selectedAsset) {
      console.log(`Selected Asset ID: ${selectedAsset}`); 
      const assetToAdd = assets.find(asset => asset.id === selectedAsset);

      console.log('Asset to add:', assetToAdd);  

      if (assetToAdd) {
        const existingAsset = portfolio.find(asset => asset.id === selectedAsset);

        if (existingAsset) {
          const updatedPortfolio = portfolio.map(asset =>
            asset.id === selectedAsset
              ? { ...asset, quantity: asset.quantity + quantity } 
              : asset
          );
          console.log('Updated Portfolio:', updatedPortfolio);  
          setPortfolio(updatedPortfolio);
        } else {
          const newAsset = { ...assetToAdd, quantity };
          console.log('New Asset to add to Portfolio:', newAsset);  
          setPortfolio([...portfolio, newAsset]);
        }
      }
    }
  };

  return (
    <div>
      <h1>Mon Portefeuille</h1>
      <ul>
        {portfolio.map(asset => (
          <li key={asset.symbol}>
            {asset.name} - {asset.symbol} x {asset.quantity}
          </li>
        ))}
      </ul>

      <h2>Ajouter un Actif</h2>
      <select 
        onChange={(e) => setSelectedAsset(Number(e.target.value))} 
        value={selectedAsset || ''} 
      >
        <option value={''}>Sélectionner un actif</option>
        {assets.map(asset => (
          <option key={asset.symbol} value={asset.id}>  
            {asset.name} ({asset.symbol})
          </option>
        ))}
      </select>

      <input 
        type="number" 
        value={quantity} 
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}  
      />

      <button onClick={handleAddAsset}>Ajouter</button>
    </div>
  );
};

export default PortfolioPage;
