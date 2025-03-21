export const getAssets = async () => {
  const response = await fetch('http://localhost:8080/api/assets'); 
  const data = await response.json();
  return data;  
};

export const addAssetToPortfolio = async (assetId: string, quantity: number) => {
  const response = await fetch('http://localhost:8080/api/portfolio/addAsset', {  
    method: 'POST',
    body: JSON.stringify({ assetId, quantity }),
    headers: {
      'Content-Type': 'application/json',
    },
  });



  const data = await response.json();
  return data;  
};
