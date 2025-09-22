import { useState } from 'react';
import { FloatingImageGrid } from './components/FloatingImageGrid';
// import { NavBar } from './components/NavBar';
import { DashboardNavBar } from './components/DashboardNavBar';
import { BlurredNavBar } from './components/BlurredNavBar';
import { TopBlurSection } from './components/TopBlurSection';
import { HeadlineSection } from './components/HeadlineSection';
import { LendingPoolOptions2 } from './components/LendingPoolOptions2';
import DashboardPage from './DashboardPage';
import BackgroundEffectsTestPage from './BackgroundEffectsTestPage';
import { StakingPage } from './StakingPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'backgroundTest' | 'staking'>('landing');

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
  };

  const navigateToStaking = () => {
    setCurrentPage('staking');
  };


  if (currentPage === 'dashboard') {
    return <DashboardPage onNavigateToLanding={navigateToLanding} onNavigateToStaking={navigateToStaking} onNavigateToLending={navigateToDashboard} />;
  }

  if (currentPage === 'staking') {
    return <StakingPage onNavigateToLanding={navigateToLanding} onNavigateToLending={navigateToDashboard} onNavigateToStaking={navigateToStaking} />;
  }

  if (currentPage === 'backgroundTest') {
    return <BackgroundEffectsTestPage onNavigateToLanding={navigateToLanding} />;
  }

  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden  ">
      {/* Three.js Floating Image Grid Background */}
      <FloatingImageGrid
        opacity={1}
        imageScale={.8}
        gridCellSize={70}
        driftEnabled={true}
        driftIntensity={3}
        hoverScale={2}
        hoverDistance={0.35}
        ambientLightColor="#ffffff"
        ambientLightIntensity={2.0}
        directionalLightIntensity={0}
      />
      
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
        currentPage="lend"
      />
    </div>
  );
}