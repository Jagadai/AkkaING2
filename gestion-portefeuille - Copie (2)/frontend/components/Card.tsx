import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}
