import React from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <aside className="w-64 h-screen bg-white shadow-md p-6 flex flex-col space-y-4 fixed left-0 top-0">
      <h1 className="text-xl font-bold text-gray-900 mb-6 cursor-pointer" onClick={() => router.push("/")}>Gestion Portefeuille</h1>
      <Button className="w-full" onClick={() => router.push("/dashboard")}>Dashboard</Button>
      <Button className="w-full" onClick={() => router.push("/portfolio")}>Portefeuille</Button>
      <Button className="w-full" onClick={() => router.push("/market")}>Marché</Button>
      <Button className="w-full" onClick={() => router.push("/alerts")}>Alertes</Button>
      <Button className="w-full" onClick={() => router.push("/settings")}>Paramètres</Button>
    </aside>
  );
};