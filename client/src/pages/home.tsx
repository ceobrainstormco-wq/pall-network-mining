import { MiningDashboard } from "@/components/mining-dashboard";
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-50 font-sans">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, #06B6D4 0%, transparent 50%), radial-gradient(circle at 75% 75%, #10B981 0%, transparent 50%)"
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <header className="text-center mb-8">
          {/* App Logo/Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          
          {/* App Name */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
            Pall Network
          </h1>
          <p className="text-slate-400 text-lg">Crypto Mining Simulator</p>
        </header>

        {/* Mining Dashboard */}
        <MiningDashboard />

        {/* Footer */}
        <footer className="mt-8 text-center text-slate-500 text-sm">
          <p>&copy; 2024 Pall Network. Mining simulation app.</p>
        </footer>
      </div>
    </div>
  );
}
