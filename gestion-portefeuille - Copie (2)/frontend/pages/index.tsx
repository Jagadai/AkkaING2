import React from "react";
import { Button } from "../components/button";
import { useRouter } from "next/router";


export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl text-center p-6 bg-white shadow-md rounded-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue sur Gestion de Portefeuille
        </h1>
        <p className="text-gray-600 mb-6">
          Suivez vos investissements en temps réel, analysez vos performances et 
          recevez des alertes sur les mouvements du marché.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <Button className="px-6 py-3 text-lg" onClick={() => router.push("/dashboard")}>
            Tableau de Bord
          </Button>
          <Button className="px-6 py-3 text-lg" onClick={() => router.push("/portfolio")}>
            Mon Portefeuille
          </Button>

          <Button className="px-6 py-3 text-lg" onClick={() => router.push("/market")}>
            Marché Financier
          </Button>
          <Button className="px-6 py-3 text-lg" onClick={() => router.push("/alerts")}>
            Alertes de Marché
          </Button>

          <Button className="px-6 py-3 text-lg" onClick={() => router.push("/simulation")}>
            Simulation d'Investissement
          </Button>
        </div>
      </div>
    </div>
  );
}
