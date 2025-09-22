import { useState, useEffect } from 'react';
import { FloatingImageGrid } from './components/FloatingImageGrid';
// import { NavBar } from './components/NavBar';
// import { DashboardNavBar } from './components/DashboardNavBar';
import { BlurredNavBar } from './components/BlurredNavBar';
import { TopBlurSection } from './components/TopBlurSection';
import { HeadlineSection } from './components/HeadlineSection';
import { LendingPoolOptions2 } from './components/LendingPoolOptions2';
import DashboardPage from './DashboardPage';
import BackgroundEffectsTestPage from './BackgroundEffectsTestPage';
import { StakingPage } from './StakingPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'backgroundTest' | 'staking'>('landing');
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768; // Tailwind's md breakpoint
      setIsMobile(mobile);
    };

    // Check on initial load
    checkIsMobile();

    // Optional: Listen for resize events if you want dynamic switching
    // window.addEventListener('resize', checkIsMobile);
    // return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Simple page navigation with scroll reset
  const handlePageTransition = (newPage: 'landing' | 'dashboard' | 'backgroundTest' | 'staking') => {
    // If we're already on the target page, just reset scroll
    if (currentPage === newPage) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    
    // Instant page change and scroll reset
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToDashboard = () => {
    handlePageTransition('dashboard');
  };

  const navigateToLanding = () => {
    handlePageTransition('landing');
  };

  const navigateToStaking = () => {
    handlePageTransition('staking');
  };


  // Render current page
  const renderCurrentPage = () => {

    if (currentPage === 'dashboard') {
      return (
        <DashboardPage 
          onNavigateToLanding={navigateToLanding} 
          onNavigateToStaking={navigateToStaking} 
          onNavigateToLending={navigateToDashboard} 
        />
      );
    }

    if (currentPage === 'staking') {
      return (
        <StakingPage 
          onNavigateToLanding={navigateToLanding} 
          onNavigateToLending={navigateToDashboard} 
          onNavigateToStaking={navigateToStaking} 
        />
      );
    }

    if (currentPage === 'backgroundTest') {
      return (
        <BackgroundEffectsTestPage onNavigateToLanding={navigateToLanding} />
      );
    }

    // Landing page
    return (
      <div className="relative w-full min-h-screen overflow-x-hidden bg-white">
          {/* Three.js Floating Image Grid Background - Only render when device type is determined */}
          {isMobile !== null && (
            <>
              {/* Mobile Version */}
              {isMobile && (
                <FloatingImageGrid
                  opacity={0.6}
                  imageScale={0.8}
                  gridCellSize={70}
                  driftEnabled={true}
                  driftIntensity={3}
                  hoverScale={1}
                  hoverDistance={0.35}
                  ambientLightColor="#ffffff"
                  ambientLightIntensity={2.0}
                  directionalLightIntensity={0}
                />
              )}
              
              {/* Desktop Version */}
              {!isMobile && (
                <FloatingImageGrid
                  opacity={0.6}
                  imageScale={0.8}
                  gridCellSize={70}
                  driftEnabled={true}
                  driftIntensity={.5}
                  hoverScale={1.5}
                  hoverDistance={0.35}
                  ambientLightColor="#ffffff"
                  ambientLightIntensity={2.0}
                  directionalLightIntensity={0}
                />
              )}
            </>
          )}
          
          {/* Navigation */}
          {/* <NavBar onNavigateToDashboard={navigateToDashboard} /> */}
          {/* <DashboardNavBar 
            onNavigateToLanding={navigateToLanding} 
            onNavigateToStaking={navigateToStaking} 
            onNavigateToLending={navigateToDashboard} 
            currentPage="lend"
            className="
              backdrop-blur-sm
              border
              bg-white/80
              border-white/10
              backdrop-invert-0
              backdrop-brightness-200
              backdrop-contrast-100
              backdrop-saturate-200
            "
          /> */}
          
          {/* Top Blur Section */}
          <TopBlurSection />
          
          {/* Main content sections - natural document flow */}
          <div className="relative z-20">
            {/* First Section: Headline */}
            <HeadlineSection onNavigateToDashboard={navigateToDashboard} />
            
            {/* Second Section: Lending Pool Options */}
            <LendingPoolOptions2 onNavigateToDashboard={navigateToDashboard} />
          </div>
          <BlurredNavBar
            onNavigateToLanding={navigateToLanding}
            onNavigateToStaking={navigateToStaking}
            onNavigateToLending={navigateToDashboard}
            mobileMenuOverlayClassName="bg-black/0 backdrop-blur-sm"
          />
      </div>
    );
  };

  return renderCurrentPage();
}