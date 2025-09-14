import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import GiftBoxPage from "./pages/GiftBoxPage";
import BirthdayCakePage from "./pages/BirthdayCakePage";

const queryClient = new QueryClient();

type PageType = "landing" | "giftbox" | "cake";

const App = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("landing");
  const [userName, setUserName] = useState("");

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setCurrentPage("giftbox");
  };

  const handleNextStep = () => {
    setCurrentPage("cake");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen overflow-hidden">
          <AnimatePresence mode="wait">
            {currentPage === "landing" && (
              <LandingPage key="landing" onNameSubmit={handleNameSubmit} />
            )}
            {currentPage === "giftbox" && (
              <GiftBoxPage key="giftbox" onNextStep={handleNextStep} />
            )}
            {currentPage === "cake" && (
              <BirthdayCakePage key="cake" />
            )}
          </AnimatePresence>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
