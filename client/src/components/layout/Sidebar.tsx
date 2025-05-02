
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Wallet, PieChart, PlusCircle, ListChecks } from "lucide-react";

const menuItems = [
  // { path: "/", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
  { path: "/categories", label: "Categorias", icon: <PieChart className="h-5 w-5" /> },
  { path: "/expenses", label: "Despesas", icon: <Wallet className="h-5 w-5" /> },
  { path: "/income", label: "Receitas", icon: <PlusCircle className="h-5 w-5" /> },
  // { path: "/expense-list", label: "Listagem", icon: <ListChecks className="h-5 w-5" /> },
];

export const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col h-screen w-64 bg-white border-r shadow-sm">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-finance-primary">Budget Buddy</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-finance-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-finance-primary flex items-center justify-center text-white">
            U
          </div>
          <div>
            <p className="text-sm font-medium">Usuário</p>
            <p className="text-xs text-gray-500">usuário@exemplo.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
