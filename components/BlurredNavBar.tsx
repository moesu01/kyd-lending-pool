// components/BlurredNavBar.tsx
import { useState, useRef, useEffect } from "react";
import {
  imgWallet,
  imgVector,
} from "../imports/svg-w4ktt";
import kydLogo from "../imports/kyd_logo_1.svg";
// @ts-ignore
import HandCoinsIcon from "../imports/HandCoins.svg";
// @ts-ignore
import StackIcon from "../imports/Stack.svg";

// Custom hook to handle viewport height for mobile browsers
const useViewportHeight = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial height
    setViewportHeight();

    // Recalculate on resize
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);
};

const Logo = ({ onClick, className }: { onClick?: () => void; className?: string }) => (
  <div 
    className={`relative shrink-0 h-[auot] w-[60px] invert ${onClick ? 'cursor-pointer hover:scale-95 transition-opacity' : ''} ${className || ''}`}
    onClick={onClick}
  >
    <img
      className="block max-w-none size-full"
      src={kydLogo}
      alt="KYD Logo"
    />
  </div>
);

const NavButton = ({ 
  icon, 
  label, 
  onClick, 
  className = '',
  isActive = false,
  additionalClassName = ''
}: {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  additionalClassName?: string;
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
      className={`${baseClasses} ${variantClasses} ${className} ${additionalClassName}`}
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

const ConnectWallet = ({ className }: { className?: string } = {}) => {
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
    <div className={`relative ${className || ''}`} ref={dropdownRef}>
      <div
        className="
          flex
          items-center
          gap-2
          px-3
          py-2.5
          rounded-lg
          cursor-pointer
          bg-white/0
          border-1
          border-white/20
          backdrop-blur-sm
          hover:bg-white/30
          transition-all
          text-white
        "
        onClick={handleToggle}
      >
        <img src={imgWallet} alt="" className="w-5 h-5 brightness-0 invert" />
        <span className="font-inter text-base font-regular">Wallet</span>
        <img
          className={`w-2.5 h-2.5 transition-transform duration-200 brightness-0 invert ${isOpen ? 'rotate-180' : ''}`}
          src={imgVector}
          alt="Dropdown arrow"
        />
      </div>

      {isOpen && (
        <div className="absolute bottom-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50 overflow-hidden">
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

const MobileMenu = ({ isOpen, onNavigateToStaking, onNavigateToLending, currentPage, className, navButtonClassName, contentClassName, overlayClassName }: { isOpen: boolean; onNavigateToStaking?: () => void; onNavigateToLending?: () => void; currentPage?: 'lend' | 'stake'; className?: string; navButtonClassName?: string; contentClassName?: string; overlayClassName?: string }) => {
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const walletDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target as Node)) {
        setIsWalletDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleWalletToggle = () => setIsWalletDropdownOpen(!isWalletDropdownOpen);
  const handleDisconnect = () => {
    setIsWalletDropdownOpen(false);
    console.log("Disconnect wallet clicked");
  };
  const handleEdit = () => {
    setIsWalletDropdownOpen(false);
    console.log("Edit wallet clicked");
  };

  return (
    <div 
      className={`fixed bottom-0 standalone:bottom-10 left-0 right-0 z-[60] sm:hidden overflow-hidden transition-all duration-200 ease-out ${isOpen ? 'h-[310px]' : 'h-0'} ${className || ''}`}
      style={{
        bottom: 'env(safe-area-inset-bottom, 0px)',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0px)'
      }}
    >
      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 bg-black/0 z-[-1] transition-opacity duration-150 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${overlayClassName || ''}`} />
      {/* Mobile menu content with same gradient blur as navbar */}
      <div
        className={`
          relative
          h-full
          before:content-['']
          before:absolute
          before:top-0
          before:-left-2
          before:-right-2
          before:rounded-t-2xl
          before:-bottom-12
          standalone:before:-bottom-16
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
          ${contentClassName || ''}
        `}
      >
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 p-6 space-y-2">
            <NavButton
              icon={HandCoinsIcon}
              label="Lend"
              className="w-full justify-start"
              additionalClassName={navButtonClassName}
              onClick={onNavigateToLending}
              isActive={currentPage === 'lend'}
            />
            <NavButton
              icon={StackIcon}
              label="Stake"
              className="w-full justify-start"
              additionalClassName={navButtonClassName}
              onClick={onNavigateToStaking}
              isActive={currentPage === 'stake'}
            />
            <div className="pt-1">
              <div className="relative" ref={walletDropdownRef}>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2.5
                    rounded-lg
                    cursor-pointer
                         bg-white/0
          border-1
          border-white/20
                    hover:bg-white/30
                    transition-all
                    text-white
                  "
                  onClick={handleWalletToggle}
                >
                  <img src={imgWallet} alt="" className="w-5 h-5 brightness-0 invert" />
                  <span className="font-inter text-base font-medium">Wallet</span>
                  <img
                    className={`w-2.5 h-2.5 transition-transform duration-200 brightness-0 invert ${isWalletDropdownOpen ? 'rotate-180' : ''}`}
                    src={imgVector}
                    alt="Dropdown arrow"
                  />
                </div>

                {/* Mobile Wallet Dropdown */}
                {isWalletDropdownOpen && (
                  <div className="absolute w-full top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-[80] overflow-hidden">
                    <div className="flex">
                      <div
                        className="flex-1 flex items-center justify-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-r border-gray-100"
                        onClick={handleEdit}
                      >
                        <span className="font-inter text-sm text-gray-800">Edit</span>
                      </div>
                      <div
                        className="flex-1 flex items-center justify-center px-4 py-3 cursor-pointer hover:bg-red-50 transition-colors text-red-600"
                        onClick={handleDisconnect}
                      >
                        <span className="font-inter text-sm">Disconnect</span>
                      </div>
                    </div>
                  </div>
                )}
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
  variant?: 'default' | 'dashboard';
  navClassName?: string;
  logoClassName?: string;
  navButtonClassName?: string;
  connectWalletClassName?: string;
  mobileMenuClassName?: string;
  mobileMenuButtonClassName?: string;
  mobileMenuContentClassName?: string;
  mobileMenuOverlayClassName?: string;
}

export const BlurredNavBar = ({ 
  onNavigateToLanding, 
  onNavigateToStaking, 
  onNavigateToLending, 
  currentPage, 
  className,
  variant = 'default',
  navClassName,
  logoClassName,
  navButtonClassName,
  connectWalletClassName,
  mobileMenuClassName,
  mobileMenuButtonClassName,
  mobileMenuContentClassName,
  mobileMenuOverlayClassName
}: BlurredNavBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Use the viewport height hook to handle mobile browser address bar resizing
  useViewportHeight();

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
          ${variant === 'dashboard' ? 'before:rounded-2xl before:-bottom-2' : ''}
          ${navClassName || ''}
          ${className || ''}
        `}
        style={{
          bottom: 'env(safe-area-inset-bottom, 0px)',
          paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0px)'
        }}
      >
        {/* Navbar Content */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 mx-auto max-w-3xl">
          <Logo onClick={onNavigateToLanding} className={logoClassName} />
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-8">
            <NavButton
              icon={HandCoinsIcon}
              label="Lend"
              onClick={onNavigateToLending}
              isActive={currentPage === 'lend'}
              additionalClassName={navButtonClassName}
            />
            <NavButton
              icon={StackIcon}
              label="Stake"
              onClick={onNavigateToStaking}
              isActive={currentPage === 'stake'}
              additionalClassName={navButtonClassName}
            />
            <ConnectWallet className={connectWalletClassName} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className={`sm:hidden p-2 hover:bg-white/10 rounded-lg transition-colors ${mobileMenuButtonClassName || ''}`}
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
        onNavigateToStaking={onNavigateToStaking} 
        onNavigateToLending={onNavigateToLending} 
        currentPage={currentPage}
        className={mobileMenuClassName}
        navButtonClassName={navButtonClassName}
        contentClassName={mobileMenuContentClassName}
        overlayClassName={mobileMenuOverlayClassName}
      />
    </>
  );
};