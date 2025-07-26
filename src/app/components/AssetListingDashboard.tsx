import {
  Plus,
  Package,
  Zap,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface AssetListingDashboardProps {
  onNavigate: (page: string, params?: unknown) => void;
}

export function AssetListingDashboard({
  onNavigate, // eslint-disable-line @typescript-eslint/no-unused-vars      
}: AssetListingDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Asset Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your Taproot Assets and track performance
          </p>
        </div>
        <button className="mt-4 sm:mt-0 px-4 py-2 bg-lightning-orange hover:bg-lightning-orange/90 text-black rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          List New Asset
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Assets
              </p>
              <p className="text-2xl">8</p>
              <p className="text-xs text-green-400">6 active</p>
            </div>
            <Package className="w-8 h-8 text-lightning-orange" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Orders
              </p>
              <p className="text-2xl">142</p>
              <p className="text-xs text-green-400">
                +23 this week
              </p>
            </div>
            <Zap className="w-8 h-8 text-lightning-orange" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Volume
              </p>
              <p className="text-2xl">2.34 BTC</p>
              <p className="text-xs text-green-400">
                +0.45 this week
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-lightning-orange" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Avg Rating
              </p>
              <p className="text-2xl">4.8</p>
              <p className="text-xs text-muted-foreground">
                from 142 reviews
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-lightning-orange" />
          </div>
        </div>
      </div>

      {/* Assets List */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl mb-4">My Assets</h2>
        <p className="text-muted-foreground">
          Your asset listings and management tools will be
          displayed here.
        </p>
      </div>
    </div>
  );
}