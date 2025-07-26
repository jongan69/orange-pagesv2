import {
  Zap,
  Shield,
  Globe,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Instant transactions powered by the Lightning Network",
    },
    {
      icon: Shield,
      title: "Taproot Assets",
      description:
        "Trade advanced Bitcoin assets with enhanced privacy",
    },
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Connect with nodes worldwide for seamless trading",
    },
    {
      icon: TrendingUp,
      title: "Reputation System",
      description:
        "Built-in ratings and reviews for trusted transactions",
    },
  ];

  const stats = [
    { label: "Active Nodes", value: "1,247" },
    { label: "Assets Listed", value: "3,891" },
    { label: "Total Volume", value: "₿ 45.7" },
    { label: "Transactions", value: "15,432" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-lightning-orange/20 text-lightning-orange border border-lightning-orange/30 rounded-full">
              <Zap className="w-3 h-3" />
              Lightning Network Powered
            </div>

            <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-lightning-orange to-bitcoin-yellow bg-clip-text text-transparent">
              The Future of
              <br />
              Asset Trading
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Orange Pages is a decentralized marketplace for
              Taproot Assets, connecting Lightning Network nodes
              for instant, secure, and private asset trading.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-6 py-3 bg-lightning-orange hover:bg-lightning-orange/90 text-black rounded-lg text-lg transition-colors flex items-center justify-center gap-2"
                onClick={() => onNavigate("discover")}
              >
                Browse Assets
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="px-6 py-3 border border-bitcoin-yellow/50 text-bitcoin-yellow hover:bg-bitcoin-yellow hover:text-black rounded-lg text-lg transition-colors"
                onClick={() => onNavigate("register")}
              >
                Register as Node
              </button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-lightning-orange rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-bitcoin-yellow rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-electric-blue rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center"
            >
              <div className="text-2xl md:text-3xl text-lightning-orange mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What is Orange Pages Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6">
            What is Orange Pages?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A decentralized marketplace that leverages the
            Lightning Network and Taproot technology to enable
            instant, private, and secure trading of
            Bitcoin-based assets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 group hover:border-lightning-orange/50 transition-colors"
              >
                <div className="w-12 h-12 bg-lightning-orange/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-lightning-orange/30 transition-colors">
                  <Icon className="w-6 h-6 text-lightning-orange" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-lightning-orange to-bitcoin-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black text-xl">1</span>
            </div>
            <h3 className="mb-3">Connect Your Node</h3>
            <p className="text-muted-foreground">
              Register your Lightning Network node and verify
              ownership through cryptographic signatures.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-bitcoin-yellow to-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black text-xl">2</span>
            </div>
            <h3 className="mb-3">List Your Assets</h3>
            <p className="text-muted-foreground">
              Showcase your Taproot Assets with detailed
              descriptions, pricing, and availability.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-lightning-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black text-xl">3</span>
            </div>
            <h3 className="mb-3">Trade Instantly</h3>
            <p className="text-muted-foreground">
              Execute trades with Lightning-fast payments and
              automatic asset transfers.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-r from-lightning-orange/10 to-bitcoin-yellow/10 border border-lightning-orange/30 rounded-lg p-12 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the growing network of Lightning nodes and
            start trading Taproot Assets today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-6 py-3 bg-lightning-orange hover:bg-lightning-orange/90 text-black rounded-lg text-lg transition-colors"
              onClick={() => onNavigate("discover")}
            >
              Explore Marketplace
            </button>
            <button
              className="px-6 py-3 border border-bitcoin-yellow/50 text-bitcoin-yellow hover:bg-bitcoin-yellow hover:text-black rounded-lg text-lg transition-colors"
              onClick={() => onNavigate("register")}
            >
              Register Your Node
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}