"use client";
import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { AssetDiscoveryPage } from "./components/AssetDiscoveryPage";
import { NodeProfilePage } from "./components/NodeProfilePage";
import { RegisterNodePage } from "./components/RegisterNodePage";
import { AssetListingDashboard } from "./components/AssetListingDashboard";
import { AssetPurchaseFlow } from "./components/AssetPurchaseFlow";
import { NWCConnectModal } from "./components/NWCConnectModal";

interface PageParams {
  assetId?: string;
  [key: string]: unknown;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageParams, setPageParams] = useState<PageParams>({});
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const navigate = (page: string, params: unknown = {}) => {
    setCurrentPage(page);
    setPageParams(params as PageParams);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage onNavigate={navigate} />;
      case "discover":
        return <AssetDiscoveryPage onNavigate={navigate} />;
      case "profile": 
        return <NodeProfilePage />;
      case "register":
        return <RegisterNodePage onNavigate={navigate} />;
      case "dashboard":
        return <AssetListingDashboard onNavigate={navigate} />;
      case "purchase":
      case "asset-detail":
        return (
          <AssetPurchaseFlow
            onNavigate={navigate}
          />
        );
      case "orders":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-20">
              <h1 className="text-3xl mb-4">Order History</h1>
              <p className="text-muted-foreground mb-8">
                Your Lightning Network transaction history
              </p>
              <div className="bg-accent/50 p-8 rounded-lg">
                <p className="text-muted-foreground">
                  Order history component will be implemented
                  here
                </p>
              </div>
            </div>
          </div>
        );
      case "rate":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-20">
              <h1 className="text-3xl mb-4">Rate & Review</h1>
              <p className="text-muted-foreground mb-8">
                Share your experience with this Lightning node
              </p>
              <div className="bg-accent/50 p-8 rounded-lg">
                <p className="text-muted-foreground">
                  Rating and review component will be
                  implemented here
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navigation
        currentPage={currentPage}
        onNavigate={navigate}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />
      <main className="flex flex-col items-center min-h-screen">
        <div className="w-full max-w-7xl">
          {renderPage()}
        </div>
      </main>
      
      {/* Wallet Connect Modal */}
      <NWCConnectModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
}