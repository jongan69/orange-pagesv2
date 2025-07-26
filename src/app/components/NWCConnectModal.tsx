"use client";
import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, X, ExternalLink, AlertCircle } from 'lucide-react';

interface NWCConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NWCConnectModal({ isOpen, onClose }: NWCConnectModalProps) {
  const { connect, isLoading, error } = useWallet();
  const [credentials, setCredentials] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleConnect = async () => {
    if (!credentials.trim()) {
      return;
    }
    
    await connect(credentials.trim());
    if (!error) {
      onClose();
      setCredentials('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-lightning-orange" />
              <h2 className="text-lg font-semibold">Connect NWC Wallet</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Connection Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                NWC Connection String
              </label>
              <textarea
                value={credentials}
                onChange={(e) => setCredentials(e.target.value)}
                placeholder="nostr+walletconnect://..."
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none h-20"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleConnect}
              disabled={!credentials.trim() || isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-lightning-orange hover:bg-lightning-orange/90 text-black rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </>
              )}
            </button>
          </div>

          {/* Help Section */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How to get NWC connection string?
            </button>

            {showHelp && (
              <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Supported Wallets:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Alby Wallet</li>
                    <li>• Coinos</li>
                    <li>• Primal</li>
                    <li>• LNWallet.app</li>
                    <li>• Yakihonne</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Steps to get NWC string:</h4>
                  <ol className="space-y-1 ml-4">
                    <li>1. Open your lightning wallet</li>
                    <li>2. Look for &quot;Nostr Wallet Connect&quot; or &quot;NWC&quot; settings</li>
                    <li>3. Generate a new connection string</li>
                    <li>4. Copy the string (starts with nostr+walletconnect://)</li>
                    <li>5. Paste it in the field above</li>
                  </ol>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.open('https://getalby.com', '_blank')}
                    className="flex items-center gap-1 text-lightning-orange hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Get Alby Wallet
                  </button>
                  <button
                    onClick={() => window.open('https://github.com/getAlby/nostr-wallet-connect', '_blank')}
                    className="flex items-center gap-1 text-lightning-orange hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Learn More
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Taproot Assets Info */}
          <div className="bg-bitcoin-yellow/10 border border-bitcoin-yellow/20 rounded-lg p-3">
            <h4 className="font-medium text-bitcoin-yellow mb-1">Taproot Assets Support</h4>
            <p className="text-xs text-muted-foreground">
              NWC connection enables full Taproot Assets functionality including asset transfers, 
              payments, and management through your lightning wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 