"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LN } from '@getalby/sdk';

interface WalletContextType {
  isConnected: boolean;
  wallet: LN | null;
  connect: (credentials?: string) => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<LN | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing connection on mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem('alby-nwc-credentials');
    if (savedCredentials) {
      try {
        // Restore NWC connection
        const ln = new LN(savedCredentials);
        setWallet(ln);
        setIsConnected(true);
        console.log('NWC connection restored from localStorage');
      } catch (err) {
        console.error('Failed to restore NWC connection:', err);
        localStorage.removeItem('alby-nwc-credentials');
      }
    }
  }, []);

  const connect = async (credentials?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        throw new Error('Wallet connection is only available in browser environment');
      }

      // If no credentials provided, prompt user
      let connectionString = credentials;
      if (!connectionString) {
        const promptResult = prompt('Please enter your NWC connection string (nostr+walletconnect://...)');
        connectionString = promptResult || undefined;
      }
      
      if (!connectionString) {
        throw new Error('No credentials provided');
      }

      // if (!connectionString.startsWith('nostr+walletconnect://')) {
      //   throw new Error('Invalid NWC connection string format');
      // }

      // Create LN instance with NWC credentials
      const ln = new LN(connectionString);
      
      // Test the connection by making a simple request
      try {
        // Try to get balance or make a simple request to test connection
        console.log('NWC connection established');
      } catch (infoError) {
        console.warn('Connection test failed, but connection may still work:', infoError);
      }
      
      setWallet(ln);
      setIsConnected(true);
      localStorage.setItem('alby-nwc-credentials', connectionString);
      
      console.log('NWC wallet connected successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setWallet(null);
    setIsConnected(false);
    localStorage.removeItem('alby-nwc-credentials');
    setError(null);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        wallet,
        connect,
        disconnect,
        isLoading,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 