"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  SortAsc,
  Zap,
  Star,
  TrendingUp,
  Eye,
} from "lucide-react";

interface AssetDiscoveryPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function AssetDiscoveryPage({
  onNavigate,
}: AssetDiscoveryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("trending");

  // Mock data for assets
  const assets = [
    {
      id: "1",
      name: "Stablecoin USD",
      symbol: "SUSD",
      type: "Stablecoin",
      price: "1.00",
      priceUnit: "USD",
      node: "LightningNode_Alpha",
      nodeAlias: "⚡ Alpha Node",
      rating: 4.8,
      trades: 156,
      available: "1,000,000",
      trending: true,
      verified: true,
    },
    {
      id: "2",
      name: "Bitcoin Art Token",
      symbol: "BART",
      type: "NFT",
      price: "0.001",
      priceUnit: "BTC",
      node: "ArtistNode_Pro",
      nodeAlias: "🎨 Artist Pro",
      rating: 4.9,
      trades: 89,
      available: "50",
      trending: false,
      verified: true,
    },
    {
      id: "3",
      name: "Gaming Credits",
      symbol: "GAME",
      type: "Utility",
      price: "0.00025",
      priceUnit: "BTC",
      node: "GameNode_Central",
      nodeAlias: "🎮 Game Central",
      rating: 4.6,
      trades: 234,
      available: "500,000",
      trending: true,
      verified: false,
    },
    {
      id: "4",
      name: "Energy Token",
      symbol: "ENRG",
      type: "Commodity",
      price: "0.0005",
      priceUnit: "BTC",
      node: "EnergyNode_Grid",
      nodeAlias: "⚡ Energy Grid",
      rating: 4.7,
      trades: 127,
      available: "75,000",
      trending: false,
      verified: true,
    },
    {
      id: "5",
      name: "Loyalty Points",
      symbol: "LOYAL",
      type: "Utility",
      price: "0.0001",
      priceUnit: "BTC",
      node: "RetailNode_Chain",
      nodeAlias: "🛍️ Retail Chain",
      rating: 4.5,
      trades: 445,
      available: "2,000,000",
      trending: true,
      verified: true,
    },
    {
      id: "6",
      name: "Music Rights",
      symbol: "MUSIC",
      type: "NFT",
      price: "0.002",
      priceUnit: "BTC",
      node: "MusicNode_Label",
      nodeAlias: "🎵 Music Label",
      rating: 4.8,
      trades: 67,
      available: "25",
      trending: false,
      verified: true,
    },
  ];

  const assetTypes = [
    "all",
    "Stablecoin",
    "NFT",
    "Utility",
    "Commodity",
  ];

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      asset.symbol
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      asset.nodeAlias
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "all" || asset.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Stablecoin":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "NFT":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Utility":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Commodity":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Discover Assets</h1>
        <p className="text-muted-foreground">
          Explore Taproot Assets available on the Lightning
          Network
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              placeholder="Search assets, symbols, or nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value)
                }
                className="w-full sm:w-48 px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
              >
                {assetTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
              >
                <option value="trending">Trending</option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="rating">Highest Rated</option>
                <option value="trades">Most Traded</option>
              </select>
              <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{filteredAssets.length} assets found</span>
          <span>•</span>
          <span>
            {assets.filter((a) => a.trending).length} trending
          </span>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-card border border-border rounded-lg p-6 group hover:border-lightning-orange/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-lightning-orange/10"
            onClick={() =>
              onNavigate("asset-detail", { assetId: asset.id })
            }
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-lightning-orange to-bitcoin-yellow rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">
                    {asset.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm">{asset.name}</h3>
                    {asset.verified && (
                      <div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        title="Verified"
                      />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {asset.symbol}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {asset.trending && (
                  <span className="px-2 py-1 bg-lightning-orange/20 text-lightning-orange border border-lightning-orange/30 rounded text-xs flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </span>
                )}
                <span
                  className={`px-2 py-1 border rounded text-xs ${getTypeColor(asset.type)}`}
                >
                  {asset.type}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-xl text-lightning-orange">
                  {asset.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {asset.priceUnit}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {parseInt(asset.available).toLocaleString()}{" "}
                available
              </p>
            </div>

            {/* Node Info */}
            <div className="mb-4 p-3 bg-accent/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">{asset.nodeAlias}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {asset.node.slice(0, 12)}...
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-bitcoin-yellow fill-current" />
                  <span className="text-sm">
                    {asset.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>{asset.trades} trades</span>
              </div>
              <button
                className="px-3 py-1 bg-lightning-orange hover:bg-lightning-orange/90 text-black rounded text-xs transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("purchase", { assetId: asset.id });
                }}
              >
                <Eye className="w-3 h-3" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredAssets.length > 0 && (
        <div className="text-center mt-12">
          <button className="px-6 py-3 border border-border text-foreground hover:bg-accent rounded-lg transition-colors">
            Load More Assets
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg mb-2">No assets found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button
            className="px-4 py-2 border border-border text-foreground hover:bg-accent rounded-lg transition-colors"
            onClick={() => {
              setSearchQuery("");
              setSelectedType("all");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}