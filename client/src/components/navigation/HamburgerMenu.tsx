import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home,
  Wallet,
  User, 
  Users, 
  Gift, 
  Shield, 
  Globe, 
  Info, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}

function MenuItem({ icon, label, href, onClick, danger = false }: MenuItemProps) {
  const className = `menu-item-interactive w-full flex items-center px-4 py-3 text-left rounded-lg mx-2 mb-1 ${
    danger 
      ? 'text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30' 
      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-cyan-400/30'
  } border border-transparent`;

  if (href) {
    return (
      <Link href={href}>
        <button className={className} data-testid={`menu-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          <span className="icon-interactive mr-3">{icon}</span>
          {label}
        </button>
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={className}
      data-testid={`menu-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <span className="icon-interactive mr-3">{icon}</span>
      {label}
    </button>
  );
}

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleSignOut = async () => {
    closeMenu();
    await logout();
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          onClick={toggleMenu}
          variant="outline"
          size="sm"
          className="btn-interactive bg-slate-800/80 backdrop-blur-md border-slate-600 text-slate-300 hover:bg-slate-700/80 hover:text-white hover:border-cyan-400/50"
          data-testid="hamburger-menu-button"
        >
          <div className={`hamburger-rotate ${isOpen ? 'open' : ''}`}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </div>
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}

      {/* Menu Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-lg border-l border-slate-700/50 shadow-2xl transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl overflow-hidden mr-3 border border-cyan-400/30 logo-interactive">
              <img 
                src="/pall-logo-new.png" 
                alt="Pall Network" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Pall Network</h3>
              <p className="text-xs text-slate-400">Menu</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-4">
          <MenuItem
            icon={<Home className="w-5 h-5" />}
            label="Home"
            href="/"
          />
          <MenuItem
            icon={<Wallet className="w-5 h-5" />}
            label="Wallet"
            href="/wallet"
          />
          <MenuItem
            icon={<User className="w-5 h-5" />}
            label="Profile"
            href="/profile"
          />
          <MenuItem
            icon={<Users className="w-5 h-5" />}
            label="Your Team"
            href="/team"
          />
          <MenuItem
            icon={<Gift className="w-5 h-5" />}
            label="Invitation Code"
            href="/invitation"
          />
          <MenuItem
            icon={<Shield className="w-5 h-5" />}
            label="KYC Verification"
            href="/kyc"
          />
          <MenuItem
            icon={<Globe className="w-5 h-5" />}
            label="Language"
            href="/language"
          />
          <MenuItem
            icon={<Info className="w-5 h-5" />}
            label="About"
            href="/about"
          />
          
          {/* Divider */}
          <div className="my-4 border-t border-slate-700/50" />
          
          <MenuItem
            icon={<LogOut className="w-5 h-5" />}
            label="Sign Out"
            onClick={handleSignOut}
            danger
          />
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6 text-center">
          <p className="text-xs text-slate-500">
            Pall Network v1.0
          </p>
        </div>
      </div>
    </>
  );
}