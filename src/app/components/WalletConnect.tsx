"use client";
import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, LogOut, Loader2, AlertCircle } from 'lucide-react';
import { NWCConnectModal } from './NWCConnectModal';

interface WalletConnectProps {
  onClose: () => void;
}

export function WalletConnect({ onClose }: WalletConnectProps) {
  const { isConnected, wallet, connect, disconnect, isLoading, error } = useWallet();
  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const [showNWCModal, setShowNWCModal] = useState(false);

  const handleConnect = async () => {
    await connect();
    if (!error) {
      onClose();
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  if (isConnected) {
    return (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <Wallet className="w-5 h-5 text-green-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-500">Wallet Connected</p>
            <p className="text-xs text-muted-foreground">Alby Lightning Wallet</p>
            {wallet && (
              <div className="mt-1 text-xs text-muted-foreground">
                <p>NWC Wallet Connected</p>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={handleDisconnect}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Connect Wallet</h3>
        <p className="text-xs text-muted-foreground">
          Connect your Alby wallet to access lightning payments and features
        </p>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => setShowNWCModal(true)}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-lightning-orange hover:bg-lightning-orange/90 text-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Wallet className="w-4 h-4" />
          )}
          {isLoading ? 'Connecting...' : 'Connect NWC Wallet'}
        </button>

        <button
          onClick={() => setShowConnectOptions(!showConnectOptions)}
          className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Other connection methods
        </button>

        {showConnectOptions && (
          <div className="space-y-2 pt-2 border-t border-border">
            <button 
              onClick={() => setShowNWCModal(true)}
              className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              Connect via NWC (Nostr Wallet Connect)
            </button>
            <button 
              onClick={() => window.open('https://getalby.com/oauth', '_blank')}
              className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              Connect via OAuth
            </button>
            <button 
              onClick={() => window.open('https://getalby.com/extension', '_blank')}
              className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              Install Alby Extension
            </button>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an Alby wallet?{' '}
          <a
            href="https://getalby.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lightning-orange hover:underline"
          >
            Get one here
          </a>
        </p>
      </div>
      
      {/* NWC Connection Modal */}
      <NWCConnectModal 
        isOpen={showNWCModal} 
        onClose={() => setShowNWCModal(false)} 
      />
    </div>
  );
} 