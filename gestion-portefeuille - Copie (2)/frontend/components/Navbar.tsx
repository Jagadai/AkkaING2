import React from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-900 cursor-pointer" onClick={() => router.push("/")}>Gestion Portefeuille</h1>
      <div className="space-x-4">
        <Button className="px-4 py-2" onClick={() => router.push("/dashboard")}>Dashboard</Button>
        <Button className="px-4 py-2" onClick={() => router.push("/portfolio")}>Portefeuille</Button>
        <Button className="px-4 py-2" onClick={() => router.push("/market")}>Marché</Button>
        <Button className="px-4 py-2" onClick={() => router.push("/alerts")}>Alertes</Button>
        <Button className="px-4 py-2" onClick={() => router.push("/settings")}>Paramètres</Button>
      </div>
    </nav>
  );
};