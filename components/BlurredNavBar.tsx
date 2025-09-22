// components/BlurredNavBar.tsx
import { useState, useRef, useEffect } from "react";
import {
  imgLogo,
  imgWallet,
  imgVector,
} from "../imports/svg-w4ktt";
// @ts-ignore
import HandCoinsIcon from "../imports/HandCoins.svg";
// @ts-ignore
import StackIcon from "../imports/Stack.svg";

const Logo = ({ onClick }: { onClick?: () => void }) => (
  <div 
    className={`relative shrink-0 size-[60px] ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
    onClick={onClick}
  >
    <img
      className="w-full h-full object-contain"
      src={imgLogo}
      alt="KYD Logo"
    />
  </div>
);

const NavButton = ({ 
  icon, 
  label, 
  onClick, 
  className = '',
  isActive = false
}: {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}) => {
  const baseClasses = "flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors";
  
  let variantClasses;
  if (isActive) {
    variantClasses = "bg-white/20 text-white hover:bg-white/30 shadow-md backdrop-blur-sm";
  } else {
    variantClasses = "text-white/90 hover:bg-white/10";
  }
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
    >
      <img 
        src={icon} 
        alt="" 
        className="w-6 h-6 brightness-0 invert"
      />
      <span className="font-inter text-base font-medium">{label}</span>
    </div>
  );
};

const ConnectWallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleDisconnect = () => {
    setIsOpen(false);
    console.log("Disconnect wallet clicked");
  };
  const handleEdit = () => {
    setIsOpen(false);
    console.log("Edit wallet clicked");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="
          flex
          items-center
          gap-2
          px-3
          py-2.5
          rounded-lg
          cursor-pointer
          bg-white/20
          backdrop-blur-sm
          hover:bg-white/30
          transition-all
          text-white
        "
        onClick={handleToggle}
      >
        <img src={imgWallet} alt="" className="w-5 h-5 brightness-0 invert" />
        <span className="font-inter text-base font-medium">Wallet</span>
        <img
          className={`w-2.5 h-2.5 transition-transform duration-200 brightness-0 invert ${isOpen ? 'rotate-180' : ''}`}
          src={imgVector}
          alt="Dropdown arrow"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50 overflow-hidden">
          <div
            className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
            onClick={handleEdit}
          >
            <span className="font-inter text-sm text-gray-800">Edit</span>
          </div>
          <div
            className="flex items-center px-4 py-3 cursor-pointer hover:bg-red-50 transition-colors text-red-600"
            onClick={handleDisconnect}
          >
            <span className="font-inter text-sm">Disconnect Wallet</span>
          </div>
        </div>
      )}
    </div>
  );
};

const MobileMenu = ({ isOpen, onClose, onNavigateToStaking, onNavigateToLending, currentPage }: { isOpen: boolean; onClose: () => void; onNavigateToStaking?: () => void; onNavigateToLending?: () => void; currentPage?: 'lend' | 'stake' }) => {
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[60] sm:hidden overflow-hidden transition-all duration-400 ease-out ${isOpen ? 'h-[300px]' : 'h-0'}`}>
      {/* Mobile menu content with same gradient blur as navbar */}
      <div
        className="
          relative
          h-full
          before:content-['']
          before:absolute
          before:top-0
          before:-left-2
          before:-right-2
          before:rounded-t-2xl
          before:-bottom-2
          before:bg-gradient-to-t
          before:from-background/100
          before:via-background/90
          before:to-transparent
          before:blur-md
          before:backdrop-blur-sm
          before:saturate-125         
          before:backdrop-brightness-80
          before:backdrop-contrast-120
          before:backdrop-saturate-200
        "
      >
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 p-6 space-y-2">
            <NavButton
              icon={HandCoinsIcon}
              label="Lend"
              className="w-full justify-start"
              onClick={onNavigateToLending}
              isActive={currentPage === 'lend'}
            />
            <NavButton
              icon={StackIcon}
              label="Stake"
              className="w-full justify-start"
              onClick={onNavigateToStaking}
              isActive={currentPage === 'stake'}
            />
            <div className="pt-1">
              <div className="relative">
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2.5
                    rounded-lg
                    cursor-pointer
                    bg-white/10
                    backdrop-blur-sm
                    hover:bg-white/30
                    transition-all
                    text-white
                  "
                  onClick={() => console.log("Wallet clicked")}
                >
                  <img src={imgWallet} alt="" className="w-5 h-5 brightness-0 invert" />
                  <span className="font-inter text-base font-medium">Wallet</span>
                  <img
                    className="w-2.5 h-2.5 transition-transform duration-200 brightness-0 invert"
                    src={imgVector}
                    alt="Dropdown arrow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BlurredNavBarProps {
  onNavigateToLanding?: () => void;
  onNavigateToStaking?: () => void;
  onNavigateToLending?: () => void;
  currentPage?: 'lend' | 'stake';
  className?: string;
}

export const BlurredNavBar = ({ onNavigateToLanding, onNavigateToStaking, onNavigateToLending, currentPage, className }: BlurredNavBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleMobileMenuClose = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Main Navbar with Blur Effect */}
      <nav
        className={`
          fixed 
          bottom-0 
          standalone:bottom-10 
          left-0 
          right-0 
          z-[70] 
          before:content-[''] 
          before:absolute 
          before:top-0 
          before:-left-2 
          before:-right-2 
          before:rounded-full 
          before:-bottom-12 
          standalone:before:-bottom-16 
          before:bg-gradient-to-t 
          before:from-background/100 
          before:via-background/90 
          before:to-transparent 
          before:blur-md 
          before:backdrop-blur-sm 
          before:saturate-125
          before:backdrop-contrast-120
          before:backdrop-saturate-300
          ${className || ''}
        `}
      >
        {/* Navbar Content */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 mx-auto max-w-3xl">
          <Logo onClick={onNavigateToLanding} />
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-8">
            <NavButton
              icon={HandCoinsIcon}
              label="Lend"
              onClick={onNavigateToLending}
              isActive={currentPage === 'lend'}
            />
            <NavButton
              icon={StackIcon}
              label="Stake"
              onClick={onNavigateToStaking}
              isActive={currentPage === 'stake'}
            />
            <ConnectWallet />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="sm:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6 text-white transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={handleMobileMenuClose} 
        onNavigateToStaking={onNavigateToStaking} 
        onNavigateToLending={onNavigateToLending} 
        currentPage={currentPage} 
      />
    </>
  );
};