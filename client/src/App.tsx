import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import ExpenseList from "./pages/ExpenseList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <FinanceProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* <Route index element={<Dashboard />} /> */}
              <Route path="categories" element={<Categories />} />
              <Route path="expenses" element={<Expenses />} />
              {/* <Route path="income" element={<Income />} />
              <Route path="expense-list" element={<ExpenseList />} />
              <Route path="*" element={<NotFound />} /> */}
            </Route>
          </Routes>
        </FinanceProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
