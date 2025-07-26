"use client";
import { useState } from "react";
import { Shield, Zap, CheckCircle } from "lucide-react";

interface RegisterNodePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function RegisterNodePage({
  onNavigate,
}: RegisterNodePageProps) {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl mb-2">Register Your Node</h1>
        <p className="text-muted-foreground">
          Join the Orange Pages network and start trading
          Taproot Assets
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-lightning-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-lightning-orange" />
          </div>
          <h2 className="text-2xl mb-4">Node Registration</h2>
          <p className="text-muted-foreground mb-8">
            Complete the registration process to start listing
            your Taproot Assets
          </p>

          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-sm mb-2">
                Public Key
              </label>
              <input
                type="text"
                placeholder="03a1b2c3d4e5f6789abcdef..."
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Node Alias
              </label>
              <input
                type="text"
                placeholder="⚡ My Lightning Node"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Description
              </label>
              <textarea
                placeholder="Professional Lightning node operator..."
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              className="px-6 py-3 bg-lightning-orange hover:bg-lightning-orange/90 text-black rounded-lg transition-colors"
              onClick={() => onNavigate("dashboard")}
            >
              Continue to Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}