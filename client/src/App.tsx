import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Upgrades from "@/pages/upgrades";
import Profile from "@/pages/profile";
import Team from "@/pages/team";
import Invitation from "@/pages/invitation";
import KYC from "@/pages/kyc";
import Language from "@/pages/language";
import About from "@/pages/about";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/upgrades" component={Upgrades} />
      <Route path="/profile" component={Profile} />
      <Route path="/team" component={Team} />
      <Route path="/invitation" component={Invitation} />
      <Route path="/kyc" component={KYC} />
      <Route path="/language" component={Language} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <AuthGuard>
            <Router />
          </AuthGuard>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
