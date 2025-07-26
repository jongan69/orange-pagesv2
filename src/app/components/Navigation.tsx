"use client";
import { useState } from "react";
import {
  Zap,
  Search,
  User,
  Settings,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useWallet } from "../contexts/WalletContext";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenWalletModal: () => void;
}

export function Navigation({
  currentPage,
  onNavigate,
  onOpenWalletModal,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const { isConnected } = useWallet();

  const navItems = [
    { id: "home", label: "Home", icon: null },
    { id: "discover", label: "Discover", icon: Search },
    { id: "dashboard", label: "Dashboard", icon: Settings },
    { id: "orders", label: "Orders", icon: null },
  ];



  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate("home")}
          >
            <div className="w-8 h-8 bg-lightning-orange rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl text-white">
              Orange Pages
            </span>
            <span className="px-2 py-1 bg-bitcoin-yellow/20 text-bitcoin-yellow border border-bitcoin-yellow/30 rounded text-xs">
              Beta
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${currentPage === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onNavigate("register")}
              className="px-3 py-2 border border-lightning-orange/50 text-lightning-orange hover:bg-lightning-orange hover:text-black rounded-lg text-sm transition-colors"
            >
              Register Node
            </button>
            <button
              onClick={onOpenWalletModal}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isConnected 
                  ? "text-green-500 hover:text-green-400" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left ${currentPage === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-border mt-2 space-y-2">
                <button
                  className="w-full px-3 py-2 border border-lightning-orange/50 text-lightning-orange hover:bg-lightning-orange hover:text-black rounded-lg text-sm transition-colors"
                  onClick={() => {
                    onNavigate("register");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Register Node
                </button>
                <button
                  className="w-full px-3 py-2 border border-border text-foreground hover:bg-accent rounded-lg text-sm transition-colors"
                  onClick={() => {
                    onOpenWalletModal();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}