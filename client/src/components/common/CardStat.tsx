
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface CardStatProps {
  title: string;
  value: number | string;
  change?: number;
  type?: "default" | "income" | "expense";
  formatValue?: (value: number | string) => string;
}

const CardStat: React.FC<CardStatProps> = ({
  title,
  value,
  change,
  type = "default",
  formatValue = (val) => 
    typeof val === "number" 
      ? val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 
      : val.toString(),
}) => {
  const bgColor = {
    default: "bg-white",
    income: "bg-white border-l-4 border-finance-income",
    expense: "bg-white border-l-4 border-finance-expense",
  };

  const changeColor = change && change > 0 ? "text-finance-income" : "text-finance-expense";

  return (
    <div className={`finance-card ${bgColor[type]} h-full`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2">
        <p className="text-2xl font-bold">{formatValue(value)}</p>
        {change !== undefined && (
          <div className={`flex items-center mt-1 text-xs ${changeColor}`}>
            {change > 0 ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            <span>{Math.abs(change).toFixed(1)}% em relação ao mês anterior</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardStat;
