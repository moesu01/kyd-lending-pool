import { StarIcon } from "../imports/svg-t6i4s";
import kydLogo from "../imports/kyd_logo_1.svg";

const Logo = () => {
  return (
    <div className="h-[50px] w-[88px] relative">
      <img 
        alt="KYD Logo" 
        className="block max-w-none size-full" 
        src={kydLogo} 
      />
    </div>
  );
}

function ApyCallOut() {
  return (
    <div className="box-border flex gap-2 items-center justify-start px-4 py-2 relative rounded-[8px] shrink-0">
      {/* Border and shadow overlay */}
      <div
        aria-hidden="true"
        className="absolute  bg-white/0  border border-[#444444] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] backdrop-blur-0"
      />
      {/* Star Icon */}
      <div className="relative shrink-0 w-[18px] h-[18px]">
        <div className="absolute">
          <StarIcon 
            fill="rgba(255,255,255,.1)"
            stroke="rgba(255,255,255,.6)"
            strokeWidth={1.5}
          />
        </div>
      </div>
      {/* APR Text */}
      <div className="flex flex-col font-geist-mono items-center justify-center text-[16px] text-[#cccccc] whitespace-nowrap z-1">
        <p className="whitespace-pre">12% APR</p>
      </div>
    </div>
  );
}

function HeadlineAndSubCopy() {
  return (
    <div className="flex flex-col gap-3 lg:gap-4 items-center text-center w-full">
      <div className="capitalize flex flex-col font-inter font-regular text-[#ffffff] text-[32px] md:text-[48px] text-center tracking-[-3%] lg:tracking-[-3%]">
        <p className="leading-[1.1] text-shadow-[0px_0px_20px_rgba(255,255,255,0.5)]">
          Institutional yield <br />from live events
        </p>
      </div>
      <div className="flex flex-col font-inter text-[16px] md:text-[20px] text-[#cccccc] text-center">
        <p className="leading-[1.4] text-shadow-[0px_0px_10px_rgba(255,255,255,0.25)]">
          Back live events with your liquidity
          <br aria-hidden="true" />
          and unlock real, stable yield.
        </p>
      </div>
    </div>
  );
}

function Cta({
  onNavigateToDashboard,
}: {
  onNavigateToDashboard: () => void;
}) {
  return (
    <button
      className="
        bg-gradient-to-b from-white/100 to-[#cfcfcf]
        box-border
        border-1 border-white/100
        flex
        gap-3
        items-center
        justify-center
        px-6
        py-4
        relative
        rounded-[16px]
        shadow-[0px_1px_22.1px_0px_rgba(211,242,39,0.48),0px_1px_3px_0px_rgba(0,0,0,0.08),0px_4px_40px_0px_rgba(0,89,7,0.48)]
        shrink-0
        cursor-pointer
        hover:shadow-[0px_2px_30px_0px_rgba(211,242,39,0.6),0px_2px_5px_0px_rgba(0,0,0,0.12)]
        transition-all
        duration-300
        hover:scale-105
      "
      onClick={onNavigateToDashboard}
    >
      <div
        className="
          flex flex-col
          justify-center
          items-center
          font-inter
          font-regular
          text-black/80
          text-[18px]
          tracking-[-1%]
          text-center
          text-nowrap
          leading-[0]
          relative
          shrink-0
          [text-shadow:rgba(0,89,7,0.48)_0px_4px_40px,rgba(0,0,0,0.08)_0px_1px_3px,rgba(211,242,39,0.48)_0px_1px_22.1px]
        "
      >
        <p className="leading-[1.2] whitespace-pre">Start Earning</p>
      </div>
    </button>
  );
}

export function HeadlineSection({
  onNavigateToDashboard,
}: {
  onNavigateToDashboard: () => void;
}) {
  return (
    <div className="relative h-screen w-full">
      
      {/* Fixed overlay div with transparent background and white border */}
      <div 
        className="fixed inset-0 bg-transparent border-[0px] border-white z-50 pointer-events-none"
        data-name="overlay-layer"
      />
      
      {/* Tree background */}
      {/* <div 
        className="absolute inset-0 z-10 "
        style={{
          backgroundImage: 'url(/imports/tree.svg)',
          backgroundSize: '43%',
          backgroundRepeat: 'no-repeat',
          // Centered on X, Y is 120% plus 40px offset (example: adjust as needed)
          backgroundPosition: 'center center',
        }}
      /> */}
      
      {/* Main content container */}
      {/* Vertical flexbox container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        {/* Empty white div above - auto height */}
        {/* <div className="w-[120px] lg:w-[160px]  flex-1 bg-white"></div> */}
        
        {/* Main content container */}
        <div
          className={`
            relative flex flex-col gap-8 lg:gap-12 items-center justify-center
            px-8 md:px-16 py-24 lg:py-[42px]
            rounded-[44px] lg:rounded-[88px]
            overflow-visible z-[80]
            before:content-[''] before:absolute before:top-0 before:-left-2 before:-right-2
            before:rounded-full before:-bottom-0 standalone:before:-top-16
            before:bg-radial before:from-background/100 before:from-40% before:to-transparent before:to-80%
            before:blur-md before:backdrop-blur-sm before:saturate-225 before:backdrop-contrast-100
          `}
        >
          <div className="w-[60px] h-[40px] flex items-center justify-center invert">
            <Logo />
          </div>
          <div className="flex flex-col gap-8 items-center justify-start relative shrink-0">
            <ApyCallOut />
            <HeadlineAndSubCopy />
          </div>
          <Cta onNavigateToDashboard={onNavigateToDashboard} />
        </div>
        
        {/* Empty white div below with scroll text - auto height */}
        {/* <div className="w-[120px] lg:w-[160px] flex-1 bg-white flex items-center justify-center">
          <p className="text-gray-600 text-center text-md leading-[1.2]">↓ <br/>lending pool <br/>options</p>
        </div> */}
      </div>
    </div>
  );
}