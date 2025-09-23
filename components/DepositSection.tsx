import { useState, useRef, useEffect } from "react";
import {
  img,
  imgUsdc,
  imgUsdCoinUsdcLogo1,
  imgVector,
  imgKydToken,
} from "../imports/svg-p8nzy";

// Artist images are referenced directly from public folder

interface CommitmentOption {
  years: number;
  multiplier: number;
  label: string;
}

const COMMITMENT_OPTIONS: CommitmentOption[] = [
  { years: 2, multiplier: 1, label: "1x $KYD" },
  { years: 3, multiplier: 1.5, label: "1.5x $KYD" },
  { years: 4, multiplier: 3, label: "3x $KYD" },
];

// Configuration - easily adjustable for future changes
const CONFIG = {
  APR: 0.1, // 10% annual percentage rate
  MAX_DEPOSIT: 4000000, // 4M USDC max
  KYD_CONVERSION_RATE: 20, // USDC to KYD conversion rate (deposit ÷ 20)
} as const;

// Supported coins configuration
interface CoinOption {
  symbol: string;
  name: string;
  icon: string;
  maxAmount: string;
}

const COIN_OPTIONS: CoinOption[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: imgUsdCoinUsdcLogo1,
    maxAmount: "4M USDC MAX",
  },
  {
    symbol: "USDT",
    name: "Tether",
    icon: img,
    maxAmount: "4M USDT MAX",
  },
];

interface TetherIconProps {
  isSelected?: boolean;
}

function TetherIcon({ isSelected = false }: TetherIconProps) {
  return (
    <div
      className={`relative shrink-0 size-9 rounded-full transition-all duration-300 ${isSelected ? "size-11 border-3 border-blue-200 shadow-md" : ""}`}
      data-name="tether"
    >
      <div className="absolute contents inset-0">
        <img className="block max-w-none size-full" src={img} />
      </div>
    </div>
  );
}

interface UsdcIconProps {
  isSelected?: boolean;
}

function UsdcIcon({ isSelected = false }: UsdcIconProps) {
  return (
    <div
      className={`relative shrink-0 size-9 rounded-full transition-all duration-300 ${isSelected ? "size-11 border-3 border-blue-200 shadow-md" : ""}`}
      data-name="usdc"
    >
      <img
        className="block max-w-none size-full"
        src={imgUsdc}
      />
    </div>
  );
}

interface SelectedCoinProps {
  selectedCoin: CoinOption;
}

function SelectedCoin({ selectedCoin }: SelectedCoinProps) {
  return (
    <div
      className="content-normal flex gap-2.5 items-center justify-start relative shrink-0 min-h-[44px]"
      data-name="selected coin"
    >
      <TetherIcon isSelected={selectedCoin.symbol === "USDT"} />
      <UsdcIcon isSelected={selectedCoin.symbol === "USDC"} />
    </div>
  );
}

interface DepositHeaderProps {
  selectedCoin: CoinOption;
}

function DepositHeader({ selectedCoin }: DepositHeaderProps) {
  return (
    <header className="relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pb-0 pt-6 px-6 relative w-full">
          <h1 className="font-inter font-semibold text-[#333333] text-[32px] text-nowrap tracking-[-3%] leading-[1.2]">
            Deposit
          </h1>
          <SelectedCoin selectedCoin={selectedCoin} />
        </div>
      </div>
    </header>
  );
}

interface CoinSelectProps {
  selectedCoin: CoinOption;
  onCoinChange: (coin: CoinOption) => void;
}

function CoinSelect({
  selectedCoin,
  onCoinChange,
}: CoinSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (coin: CoinOption) => {
    onCoinChange(coin);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="bg-white box-border flex gap-2 md:gap-3 items-center justify-center px-2 md:px-3 py-2 md:py-2.5 relative rounded-[10px] shrink-0 cursor-pointer hover:shadow-[0px_3px_8px_0px_rgba(0,0,0,0.08)] transition-all min-w-0"
        data-name="coin select"
        onClick={handleToggle}
      >
        <div
          aria-hidden="true"
          className="absolute border border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)]"
        />
        <div className="flex gap-1 md:gap-1.5 items-center justify-start relative shrink-0 min-w-0">
          <div className="relative shrink-0 size-5 md:size-6 flex items-center justify-center">
            {selectedCoin.symbol === "USDT" ? (
              <div className="scale-[0.67]">
                <TetherIcon />
              </div>
            ) : (
              <div className="scale-[0.67]">
                <UsdcIcon />
              </div>
            )}
          </div>
          <div className="flex flex-col font-inter justify-center leading-[0] relative shrink-0 text-[#1a202c] text-sm md:text-base text-nowrap tracking-[0.2px]">
            <p className="leading-[1.2] whitespace-pre">
              {selectedCoin.symbol}
            </p>
          </div>
        </div>

        <div className="h-[5px] md:h-[6.175px] relative shrink-0 w-2 md:w-2.5">
          <img
            className={`block max-w-none size-full transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            src={imgVector}
            alt="Dropdown arrow"
          />
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-[#e2e2e2] rounded-[12px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] z-50 overflow-hidden w-full min-w-[120px]">
          {COIN_OPTIONS.map((coin) => (
            <div
              key={coin.symbol}
              className="flex gap-2 md:gap-1.5 items-center px-4 md:px-3 py-4 md:py-2.5 cursor-pointer hover:bg-gray-50 transition-colors min-h-[56px] md:min-h-[48px]"
              onClick={() => handleOptionSelect(coin)}
            >
              <div className="relative shrink-0 size-6 md:size-6 flex items-center justify-center">
                {coin.symbol === "USDT" ? (
                  <div className="scale-[0.8] md:scale-[0.67]">
                    <TetherIcon isSelected={false} />
                  </div>
                ) : (
                  <div className="scale-[0.8] md:scale-[0.67]">
                    <UsdcIcon isSelected={false} />
                  </div>
                )}
              </div>
              <div className="flex flex-col font-inter justify-center leading-[0] relative shrink-0 text-[#1a202c] text-base md:text-base text-nowrap tracking-[0.2px]">
                <p className="leading-[1.2] whitespace-pre font-medium">
                  {coin.symbol}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface CoinSelectMaxProps {
  selectedCoin: CoinOption;
  onCoinChange: (coin: CoinOption) => void;
}

function CoinSelectMax({
  selectedCoin,
  onCoinChange,
}: CoinSelectMaxProps) {
  return (
    <div
      className="flex flex-col gap-1.5 md:gap-2.5 items-end justify-start relative shrink-0 min-w-0"
      data-name="coin select & max"
    >
      <CoinSelect
        selectedCoin={selectedCoin}
        onCoinChange={onCoinChange}
      />
      <div className="flex flex-col font-geist-mono font-regular justify-center leading-[0] tracking-[3%] relative shrink-0 mt-2 text-[#aaaaaa] text-xs md:text-sm text-nowrap">
        <p>
          {selectedCoin.maxAmount}
        </p>
      </div>
    </div>
  );
}

interface DepositInputProps {
  amount: string;
  onAmountChange: (value: string) => void;
  selectedCoin: CoinOption;
  onCoinChange: (coin: CoinOption) => void;
}

function DepositInputAndCoinSelect({
  amount,
  onAmountChange,
  selectedCoin,
  onCoinChange,
}: DepositInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const coinSelectRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Remove commas and non-numeric characters except decimal point
    const value = e.target.value.replace(/[^0-9.]/g, "");
    const numValue = parseFloat(value) || 0;

    if (numValue <= CONFIG.MAX_DEPOSIT) {
      onAmountChange(value);
    }
  };

  // Handle container click to focus input (excluding dropdown area)
  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    // Don't focus input if clicking on the coin select dropdown
    if (
      coinSelectRef.current &&
      coinSelectRef.current.contains(e.target as Node)
    ) {
      return;
    }

    // Focus the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Format the display value with commas for thousands separators
  const formatWithCommas = (value: string) => {
    if (!value || value === "0") return "";
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";
    return numValue.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      useGrouping: true,
    });
  };

  const displayValue = formatWithCommas(amount);
  const placeholderClass = !displayValue
    ? "text-[rgba(51,51,51,0.56)]"
    : "text-[#333333]";

  return (
    <div
      className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] border-[1px] border-[#e8e8e8] rounded-[16px] shrink-0 w-full cursor-text"
      data-name="deposit input and coin select"
      onClick={handleContainerClick}
    >

      <div className="flex items-center w-full h-full">
        <div className="flex items-center justify-between p-4 md:p-6 w-full">
          <input
            ref={inputRef}
            type="tel"
            inputMode="decimal"
            pattern="[0-9]*"
            value={displayValue}
            onChange={handleInputChange}
            placeholder="Amount"
            className={`font-inter font-bold text-2xl md:text-3xl lg:text-4xl bg-transparent border-0 outline-0 ${placeholderClass} flex-1 min-w-0 mr-3 md:mr-4`}
          />
          <div ref={coinSelectRef}>
            <CoinSelectMax
              selectedCoin={selectedCoin}
              onCoinChange={onCoinChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CommitmentButtonProps {
  option: CommitmentOption;
  isSelected: boolean;
  onClick: () => void;
}

function CommitmentButton({
  option,
  isSelected,
  onClick,
}: CommitmentButtonProps) {
  const baseClasses = [
    "box-border",
    "border-0",
    "flex",
    "flex-row md:flex-col",
    "gap-2",
    "items-center md:items-start",
    "justify-between md:justify-center",
    "px-4",
    "relative",
    "rounded-[16px]",
    "cursor-pointer",
    "transition-all",
    "duration-200",
    "min-h-[60px] md:min-h-[80px]",
    "flex-1",
  ].join(" ");

  const activeClasses = [
    "bg-[#ffffff]",
    "text-black",
    "border",
    "border-[1px]",
    "border-[#aaaaaa]",
    "shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
    // "hover:bg-[#c9ee1f]",
    // "hover:border-[#aaaaaa]",
    "transition-all",
    "duration-150",
  ].join(" ");

  const inactiveClasses = [
    "bg-[rgba(255,255,255,.25)]",
    "border",
    "border-[1px]",
    "border-[#e8e8e8]",
    "text-[#888888]",
    "hover:bg-[rgba(255,255,255,.5)]",
    "hover:text-[rgba(51,51,51,1)]",
    "hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
    "transition-all",
    "duration-150",

  ].join(" ");

  return (
    <div
      className={`${baseClasses} ${isSelected ? activeClasses : inactiveClasses}`}
      onClick={onClick}
      data-name={`${option.years} years`}
    >
   

      <div className="flex flex-row md:flex-col font-geist-mono justify-center leading-[0] relative shrink-0 text-base md:text-base text-nowrap tracking-[-0.48px]">
        <p className={`leading-[1.2] whitespace-pre  ${isSelected ? 'font-regular text-[#333333]' : 'text-[#888888]'}`}>
          {option.years} Years
        </p>
      </div>
      <div className="flex flex-col font-inter justify-center leading-[0] relative shrink-0 text-lg md:text-xl text-nowrap">
        <p className={`leading-[1.2] whitespace-pre ${isSelected ? 'font-bold' : 'font-medium'}`}>
          {option.label}
        </p>
      </div>
    </div>
  );
}

interface CommitmentOptionsProps {
  selectedOption: CommitmentOption | null;
  onOptionSelect: (option: CommitmentOption) => void;
}

function CommitmentOptionsRow({
  selectedOption,
  onOptionSelect,
}: CommitmentOptionsProps) {
  return (
    <div
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full"
      data-name="options"
    >
      {COMMITMENT_OPTIONS.map((option) => (
        <CommitmentButton
          key={option.years}
          option={option}
          isSelected={selectedOption?.years === option.years}
          onClick={() => onOptionSelect(option)}
        />
      ))}
    </div>
  );
}

interface ExpectedYieldProps {
  depositAmount: number;
  selectedOption: CommitmentOption | null;
  selectedCoin: CoinOption;
}

function ExpectedYield({
  depositAmount,
  selectedOption,
  selectedCoin,
}: ExpectedYieldProps) {
  const hasValidData = depositAmount > 0 && selectedOption;

  // Calculate KYD yield based on deposit amount with commitment multiplier
  const baseKyd = hasValidData
    ? depositAmount / CONFIG.KYD_CONVERSION_RATE
    : 0;
  const expectedKyd = hasValidData
    ? Math.floor(baseKyd * selectedOption.multiplier)
    : 0;

  // Calculate total USDC yield over commitment period using simple interest
  // Formula: P * r * t = total yield over t years
  const totalYield = hasValidData
    ? Math.floor(depositAmount * CONFIG.APR * selectedOption.years)
    : 0;

  const kydDisplay = hasValidData
    ? expectedKyd.toLocaleString()
    : "–––";
  const yieldDisplay = hasValidData
    ? totalYield.toLocaleString()
    : "–––";

  return (
    <div
      className="bg-transparent rounded-[16px] w-full border border-[#e8e8e8]"
      data-name="Expected yield"
    >
      <div className="relative">
        <div className="grid grid-cols-2 gap-4 divide-x divide-[#e8e8e8] md:gap-6">
          {/* Expected KYD */}
          <div className="flex flex-col gap-3 md:gap-3 p-4 md:p-6">
            <div className="font-geist-mono text-[#444444] text-sm md:text-base tracking-[-3%]">
              <p className="leading-[1.2]">
                <span className="block md:inline">Expected </span>
                <span className="block md:inline">$KYD</span>
              </p>
            </div>
            <div className="flex gap-2 md:gap-2.5 items-center">
              <div className="size-5 md:size-7">
                <img className="size-full" src={imgKydToken} />
              </div>
              <div
                className={`font-inter font-medium text-lg md:text-2xl lg:text-[25px] ${hasValidData ? "text-[#333333]" : "text-[rgba(51,51,51,0.6)]"}`}
              >
                <p className="leading-[1.2]">{kydDisplay}</p>
              </div>
            </div>
          </div>

          {/* Estimated Yield */}
          <div className="flex flex-col gap-3 md:gap-3 p-4 md:p-6">
            <div className="font-geist-mono text-[#444444] text-sm md:text-base tracking-[-3%] text-right md:text-right">
              <p className="leading-[1.2]">Estimated total yield</p>
            </div>
            <div className="flex gap-2 md:gap-2.5 items-center justify-end md:justify-end">
              <div
                className={`font-inter font-medium text-lg md:text-2xl lg:text-[25px] ${hasValidData ? "text-[#333333]" : "text-[rgba(51,51,51,0.6)]"}`}
              >
                <p className="leading-[1.2]">{yieldDisplay}</p>
              </div>
              <div className="size-5 md:size-7">
                <img className="size-full" src={selectedCoin.icon} alt={selectedCoin.name} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        {/* <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-[#dddddd] transform -translate-x-1/2" /> */}
      </div>
    </div>
  );
}

// External link icon SVG
const ExternalLinkIcon = () => (
  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L1 9" stroke="#4f81c9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ArtistReward {
  id: string;
  artistName: string;
  artistImage: string; // placeholder for now
  eventName: string;
  date: string;
  amount: string; // KYD amount
}

const DUMMY_ARTIST_REWARDS: ArtistReward[] = [
  {
    id: "1",
    artistName: "Taylor Swift",
    artistImage: "/placeholder-artist.jpg",
    eventName: "The Eras Tour",
    date: "May 4 '25",
    amount: "+34 $KYD"
  },
  {
    id: "2",
    artistName: "Drake",
    artistImage: "/placeholder-artist.jpg",
    eventName: "It's All A Blur Tour",
    date: "May 3 '25",
    amount: "+28 $KYD"
  },
  {
    id: "3",
    artistName: "Billie Eilish",
    artistImage: "/placeholder-artist.jpg",
    eventName: "Coachella 2025",
    date: "May 2 '25",
    amount: "+42 $KYD"
  },
  {
    id: "4",
    artistName: "The Weeknd",
    artistImage: "/placeholder-artist.jpg",
    eventName: "After Hours Til Dawn Tour",
    date: "May 1 '25",
    amount: "+31 $KYD"
  },
  {
    id: "5",
    artistName: "Ariana Grande",
    artistImage: "/placeholder-artist.jpg",
    eventName: "Sweetener World Tour",
    date: "Apr 30 '25",
    amount: "+39 $KYD"
  },
  {
    id: "6",
    artistName: "Post Malone",
    artistImage: "/placeholder-artist.jpg",
    eventName: "Twelve Carat Tour",
    date: "Apr 29 '25",
    amount: "+25 $KYD"
  },
  {
    id: "7",
    artistName: "Olivia Rodrigo",
    artistImage: "/placeholder-artist.jpg",
    eventName: "GUTS World Tour",
    date: "Apr 28 '25",
    amount: "+47 $KYD"
  },
  {
    id: "8",
    artistName: "Bad Bunny",
    artistImage: "/placeholder-artist.jpg",
    eventName: "El Último Tour Del Mundo",
    date: "Apr 27 '25",
    amount: "+33 $KYD"
  }
];

interface ArtistRewardRowProps {
  reward: ArtistReward;
  isLast?: boolean;
}

function ArtistRewardRow({ reward, isLast = false }: ArtistRewardRowProps) {
  const handleTxClick = () => {
    console.log(`Opening reward transaction for ${reward.artistName}`);
    // In a real app, this would open the transaction in a block explorer
  };

  // Helper function to get the correct image filename for each artist
  
  const getArtistImageSrc = (artistName: string) => {
    const imageMap: { [key: string]: string } = {
      'Taylor Swift': '/kyd-lending-pool/assets/taylor swift.png',
      'Drake': '/kyd-lending-pool/assets/drake.png',
      'Billie Eilish': '/kyd-lending-pool/assets/billie.png',
      'The Weeknd': '/kyd-lending-pool/assets/weeknd.png',
      'Ariana Grande': '/kyd-lending-pool/assets/ariana grande.png',
      'Post Malone': '/kyd-lending-pool/assets/post malone.png',
      'Olivia Rodrigo': '/kyd-lending-pool/assets/olivia rodrigo.png',
      'Bad Bunny': '/kyd-lending-pool/assets/bad bunny.png'
    };
    
    const imageSrc = imageMap[artistName] || '/kyd-lending-pool/assets/placeholder.png';
    console.log(`Loading image for ${artistName}: ${imageSrc}`);
    return imageSrc;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-0 py-4 relative shrink-0 w-full">
      <div aria-hidden="true" className={`absolute border-[#dddddd] inset-0 pointer-events-none ${isLast ? '' : 'border-b'}`} />
      
      {/* Mobile Layout - Split container */}
      <div className="flex md:hidden items-start justify-between w-full gap-4">
        {/* Left Side: Artist Image, Name, Event */}
        <div className="flex gap-2 items-center justify-start relative shrink-0 flex-1">
          <div className="size-12 rounded-full overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src={getArtistImageSrc(reward.artistName)} 
              alt={reward.artistName}
              onError={(e) => {
                // Fallback to placeholder if image doesn't exist
                console.log(`Failed to load image for ${reward.artistName}:`, e.currentTarget.src);
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-gray-300 rounded-full"></div>';
              }}
              onLoad={() => {
                console.log(`Successfully loaded image for ${reward.artistName}`);
              }}
            />
          </div>
          <div className="flex flex-col font-inter justify-center leading-[0] relative shrink-0 text-[#444444] font-regular text-sm text-nowrap">
            <p className="leading-[1.4] whitespace-pre">
              <span className="text-[18px] font-regular display-block">{reward.artistName}</span><br/>
              <span className="display-block text-[14px] font-regular text-[#666666]">{reward.eventName}</span>
            </p>
          </div>
        </div>
        
        {/* Right Side: Amount (top) + Date + Tx Link (bottom) */}
        <div className="flex flex-col gap-1 items-end justify-center relative shrink-0">
          {/* Top Line: KYD Reward Amount */}
          <div className="bg-green-100/20 border border-green-700/20 px-2 py-1 rounded-full">
            <div className="flex flex-col font-geist-mono justify-center leading-[0] relative shrink-0 text-green-700 font-regular text-sm text-nowrap">
              <p className="leading-[1.2] whitespace-pre">{reward.amount}</p>
            </div>
          </div>
          
          {/* Bottom Line: Date + Tx Link */}
          <div className="flex gap-2.5 items-center justify-start relative shrink-0">
            <div className="flex flex-col font-inter justify-center leading-[0] relative shrink-0 text-[#888888] font-regular text-[12px] text-nowrap">
              <p className="leading-[1.2] whitespace-pre">{reward.date}</p>
            </div>
            <div className="flex flex-col font-inter justify-center leading-[0] relative shrink-0 text-[#4f81c9] text-sm text-nowrap">
              <p className="leading-[1.2] underline whitespace-pre">Tx</p>
            </div>
            <div className="h-2.5 relative shrink-0 w-1.5">
              <ExternalLinkIcon />
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Layout - Single line */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Artist Image */}
        <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-[100px]">
          <div className="size-12 rounded-full overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src={getArtistImageSrc(reward.artistName)} 
              alt={reward.artistName}
              onError={(e) => {
                // Fallback to placeholder if image doesn't exist
                console.log(`Failed to load image for ${reward.artistName}:`, e.currentTarget.src);
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-gray-300 rounded-full"></div>';
              }}
              onLoad={() => {
                console.log(`Successfully loaded image for ${reward.artistName}`);
              }}
            />
          </div>
        </div>
        
        {/* Artist Name and Event */}
        <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-[180px]">
          <div className="flex flex-col font-inter justify-center relative shrink-0 text-[#444444] font-regular text-nowrap">
            <p className="leading-[1.25] whitespace-pre">
            <span className="text-[17px] font-regular display-block">{reward.artistName}</span><br/>
            <span className="display-block text-[14px] font-regular text-[#888888]">{reward.eventName}</span>
            </p>
          </div>
        </div>
        
        {/* Spacer */}
        <div className="flex gap-2.5 items-center justify-start shrink-0 w-[100px]" />
        
        {/* Amount */}
        <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-[100px]">
          <div className="bg-green-100/20 border border-green-700/20 px-2 py-1.5 rounded-full">
            <div className="flex flex-col font-geist-mono justify-center leading-[0] relative shrink-0 text-green-700 font-regular text-sm text-nowrap">
              <p className="leading-[1.2] whitespace-pre">{reward.amount}</p>
            </div>
          </div>
        </div>
        
        {/* Date */}
        <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-[80px]">
          <div className="flex flex-col font-regular justify-center leading-[0] relative shrink-0 text-[#888888] font text-sm text-right">
            <p className="leading-[1.2] whitespace-pre">{reward.date}</p>
          </div>
        </div>
        
        {/* Transaction Link */}
        <div className="flex gap-1.5 items-center justify-end relative shrink-0 cursor-pointer" onClick={handleTxClick}>
          <div className="flex flex-col font-inter justify-center leading-[0] relative shrink-0 text-[#4f81c9] text-sm text-nowrap">
            <p className="leading-[1.2] underline whitespace-pre">Tx</p>
          </div>
          <div className="h-2.5 relative shrink-0 w-1.5">
            <ExternalLinkIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ArtistRewardsProps {
  depositAmount: number;
  selectedOption: CommitmentOption | null;
}

function ArtistRewards({ depositAmount, selectedOption }: ArtistRewardsProps) {
  const hasValidData = depositAmount > 0 && selectedOption;

  return (
    <div className="flex flex-col items-start justify-start relative shrink-0 w-full">
      <div className="relative shrink-0 w-full">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border flex flex-col gap-0 items-start justify-start relative w-full">
          {DUMMY_ARTIST_REWARDS.map((reward, index) => (
            <ArtistRewardRow 
              key={reward.id} 
              reward={reward} 
              isLast={index === DUMMY_ARTIST_REWARDS.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DepositRewardsContainer() {
  return (
    <div
      className="bg-transparent relative rounded-[32px] w-full max-w-[680px] border border-[#dadada]"
      data-name="deposit rewards container"
    >
      <div className="flex flex-col gap-0 w-full">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex flex-col gap-2.5 items-start justify-center relative shrink-0">
            <div className="relative shrink-0 size-9">
              <img className="size-full" src={imgKydToken} alt="KYD Token" />
            </div>
            <div className="flex flex-col font-inter justify-center leading-[0] font-semibold relative shrink-0 text-[#444444] text-xl md:text-2xl text-nowrap tracking-[0]">
              <p className="leading-[1.2] whitespace-pre">
                <span className="inline">$KYD </span>
                <span className="inline">Rewards</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Artist Rewards List */}
        <div className="px-2 sm:px-6">
          <ArtistRewards depositAmount={0} selectedOption={null} />
        </div>
      </div>
    </div>
  );
}

// OUT STUFF - Previous Deposits Section
interface PreviousDeposit {
  id: string;
  depositAmount: number;
  coinSymbol: string;
  coinIcon: string;
  commitmentTerm: string;
  depositDate: string;
  maturityDate: string;
  daysUntilMaturity: number;
  anticipatedYield: number;
  kydMultiplier: number;
}

// Helper function to calculate days between two dates
const calculateDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const DUMMY_PREVIOUS_DEPOSITS: PreviousDeposit[] = [
  {
    id: "1",
    depositAmount: 50000,
    coinSymbol: "USDC",
    coinIcon: imgUsdCoinUsdcLogo1,
    commitmentTerm: "3 Years",
    depositDate: "Jan 15, 2024",
    maturityDate: "Jan 15, 2027",
    daysUntilMaturity: calculateDaysBetween("Jan 15, 2024", "Jan 15, 2027"),
    anticipatedYield: 15000,
    kydMultiplier: 1.5
  },
  {
    id: "2",
    depositAmount: 25000,
    coinSymbol: "USDT",
    coinIcon: img,
    commitmentTerm: "2 Years",
    depositDate: "Mar 8, 2024",
    maturityDate: "Mar 8, 2026",
    daysUntilMaturity: calculateDaysBetween("Mar 8, 2024", "Mar 8, 2026"),
    anticipatedYield: 5000,
    kydMultiplier: 1
  }
  // {
  //   id: "3",
  //   depositAmount: 100000,
  //   coinSymbol: "USDC",
  //   coinIcon: imgUsdCoinUsdcLogo1,
  //   commitmentTerm: "4 Years",
  //   depositDate: "Nov 22, 2023",
  //   maturityDate: "Nov 22, 2027",
  //   daysUntilMaturity: calculateDaysBetween("Nov 22, 2023", "Nov 22, 2027"),
  //   anticipatedYield: 40000,
  //   kydMultiplier: 3
  // }
];

interface PreviousDepositRowProps {
  deposit: PreviousDeposit;
  isLast?: boolean;
}

function PreviousDepositRow({ deposit, isLast = false }: PreviousDepositRowProps) {
  const handleWithdrawClick = () => {
    console.log(`Withdraw attempt for deposit ${deposit.id} - not yet mature`);
    // In a real app, this would show a modal explaining the deposit is not yet mature
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-0 py-4 relative shrink-0 w-full">
      <div aria-hidden="true" className={`absolute border-[#dddddd] inset-0 pointer-events-none ${isLast ? '' : 'border-b'}`} />
      
      {/* Mobile Layout - Stacked container */}
      <div className="flex md:hidden flex-col gap-4 w-full px-4">
        {/* Top Row: Deposit Info */}
        <div className="flex gap-3 items-start justify-start relative shrink-0 w-full">
          <div className="flex flex-col font-inter justify-center leading-[0] relative shrink-0 text-[#444444] font-regular text-sm text-nowrap flex-1">
            <p className="leading-[1.4] whitespace-pre">
              <span className="text-[12px] font-regular text-[#888888] display-block">Deposited: {deposit.depositDate}</span><br/>
              <span className="text-[18px] font-semibold display-block">{deposit.depositAmount.toLocaleString()} {deposit.coinSymbol}</span><br/>
              <span className="display-block text-[14px] font-regular text-[#666666]">{deposit.commitmentTerm} • {deposit.daysUntilMaturity} days left</span>
            </p>
          </div>
        </div>
        
        {/* Bottom Row: Yield */}
        <div className="flex gap-3 items-center justify-start relative shrink-0 w-full">
          {/* Anticipated Yield */}
          <div className="bg-blue-100/20 border border-blue-700/20 px-3 py-1.5 rounded-full">
            <div className="flex flex-col font-geist-mono justify-center leading-[0] relative shrink-0 text-blue-700 font-regular text-sm text-nowrap">
              <p className="leading-[1.2] whitespace-pre">{deposit.anticipatedYield.toLocaleString()} {deposit.coinSymbol} yield</p>
            </div>
          </div>
          
          {/* Right: Withdraw Button */}
          {/* <div 
            className="bg-gray-300 text-gray-500 px-4 py-2 rounded-full cursor-not-allowed"
            onClick={handleWithdrawClick}
          >
            <div className="flex flex-col font-inter justify-center leading-[0] relative shrink-0 text-sm text-nowrap">
              <p className="leading-[1.2] whitespace-pre">Withdraw</p>
            </div>
          </div> */}
        </div>
      </div>
      
      {/* Desktop Layout - Single line */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Coin Icon */}
        <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-[60px]">
          <div className="size-10 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src={deposit.coinIcon} alt={deposit.coinSymbol} />
          </div>
        </div>
        
        {/* Deposit Amount and Details */}
        <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-[200px]">
          <div className="flex flex-col font-inter justify-center relative shrink-0 text-[#444444] font-semibold text-nowrap">
            <p className="leading-[1.25] whitespace-pre">
              <span className="text-[17px] font-semibold display-block">{deposit.depositAmount.toLocaleString()} {deposit.coinSymbol}</span><br/>
              <span className="display-block text-[14px] font-regular text-[#888888]">{deposit.commitmentTerm} • {deposit.depositDate}</span>
            </p>
          </div>
        </div>
        
        {/* Maturity Info */}
        <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-[120px]">
          <div className="flex flex-col font-inter justify-center relative shrink-0 text-[#444444] font-regular text-nowrap">
            <p className="leading-[1.25] whitespace-pre">
              <span className="text-[15px] font-medium display-block">{deposit.daysUntilMaturity} days</span><br/>
              <span className="display-block text-[13px] font-regular text-[#888888]">until maturity</span>
            </p>
          </div>
        </div>
        
        {/* Anticipated Yield */}
        <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-[200px]">
          <div className="bg-blue-100/20 border border-blue-700/20 px-3 py-1.5 rounded-full">
            <div className="flex flex-col font-geist-mono justify-center leading-[0] relative shrink-0 text-blue-700 font-regular text-sm text-nowrap">
              <p className="leading-[1.2] whitespace-pre">{deposit.anticipatedYield.toLocaleString()} {deposit.coinSymbol} yield</p>
            </div>
          </div>
        </div>
        
        {/* Withdraw Button */}
        {/* <div className="flex gap-2.5 items-center justify-end relative shrink-0 w-[100px]">
          <div 
            className="bg-gray-300 text-gray-500 px-4 py-2 rounded-full cursor-not-allowed"
            onClick={handleWithdrawClick}
          >
            <div className="flex flex-col font-inter justify-center leading-[0] relative shrink-0 text-sm text-nowrap">
              <p className="leading-[1.2] whitespace-pre">Withdraw</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function PreviousDepositsList() {
  return (
    <div className="flex flex-col items-start justify-start relative shrink-0 w-full">
      <div className="relative shrink-0 w-full">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border flex flex-col gap-0 items-start justify-start relative w-full">
          {DUMMY_PREVIOUS_DEPOSITS.map((deposit, index) => (
            <PreviousDepositRow 
              key={deposit.id} 
              deposit={deposit} 
              isLast={index === DUMMY_PREVIOUS_DEPOSITS.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PreviousDepositsContainer() {
  return (
    <div
      className="bg-transparent relative rounded-[32px] w-full max-w-[680px] border border-[#dadada]"
      data-name="previous deposits container"
    >
      <div className="flex flex-col gap-0 w-full">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex flex-col gap-2.5 items-start justify-center relative shrink-0">
         
            <div className="flex flex-col font-inter justify-center leading-[0] font-semibold relative shrink-0 text-[#444444] text-xl md:text-2xl text-nowrap tracking-[0]">
              <p className="leading-[1.2] whitespace-pre">
                <span className="inline">Previous </span>
                <span className="inline">Deposits</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Previous Deposits List */}
        <div className="px-2 sm:px-6">
          <PreviousDepositsList />
        </div>
      </div>
    </div>
  );
}

interface ReviewButtonProps {
  isEnabled: boolean;
  onClick: () => void;
}

function ReviewButton({
  isEnabled,
  onClick,
}: ReviewButtonProps) {
  const buttonClasses = isEnabled
    ? "bg-[#111] rounded-[16px] cursor-pointer border border-[rgba(0,0,0,0.3)] shadow-[0px_4px_12px_-5px_rgba(0,0,0,0.15)] hover:shadow-lg transition-all w-full"
    : "bg-[rgba(0,0,0,0.5)] opacity-20 rounded-[16px] cursor-not-allowed border border-[rgba(0,0,0,0.3)] shadow-[0px_4px_12px_-5px_rgba(0,0,0,0.1)] w-full";

  return (
    <div className="py-4 w-full">
      <div
        className={buttonClasses}
        onClick={isEnabled ? onClick : undefined}
      >
        <div className="flex items-center justify-center py-3 md:py-3 w-full">
          <div className="font-inter font-medium text-[20px] md:text-[24px] text-white">
            Review
          </div>
        </div>
      </div>
    </div>
  );
}

export function DepositSection() {
  const [depositAmount, setDepositAmount] =
    useState<string>("");
  const [selectedOption, setSelectedOption] =
    useState<CommitmentOption | null>(COMMITMENT_OPTIONS[1]); // Default to 3 years
  const [selectedCoin, setSelectedCoin] = useState<CoinOption>(
    COIN_OPTIONS[0],
  ); // Default to USDC

  const numericAmount = parseFloat(depositAmount) || 0;
  const isReviewEnabled =
    numericAmount > 0 && selectedOption !== null;

  const handleReview = () => {
    if (isReviewEnabled) {
      console.log("Review deposit:", {
        amount: numericAmount,
        coin: selectedCoin.symbol,
        commitment: selectedOption,
        expectedKyd: Math.floor((numericAmount / CONFIG.KYD_CONVERSION_RATE) * selectedOption.multiplier),
        totalYield: Math.floor(numericAmount * CONFIG.APR * selectedOption.years),
      });
      // Handle review logic here
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[680px]">
      {/* Main Deposit Section */}
      <div
        className="bg-transparent relative rounded-[32px] w-full border border-[#dadada]"
        data-name="deposit section"
      >
        <div className="flex flex-col gap-6 w-full">
          <DepositHeader selectedCoin={selectedCoin} />

          {/* Input and Options */}
          <div className="px-6 pb-0">
            <div className="flex flex-col gap-6 w-full">
              <DepositInputAndCoinSelect
                amount={depositAmount}
                onAmountChange={setDepositAmount}
                selectedCoin={selectedCoin}
                onCoinChange={setSelectedCoin}
              />

              <div className="flex flex-col gap-3 w-full">
                <h3 className="text-lg md:text-xl font-inter font-semibold text-[#333333] tracking-[0%]">
                  Commitment
                </h3>
                <CommitmentOptionsRow
                  selectedOption={selectedOption}
                  onOptionSelect={setSelectedOption}
                />
                <ExpectedYield
                  depositAmount={numericAmount}
                  selectedOption={selectedOption}
                  selectedCoin={selectedCoin}
                />
                <ReviewButton
                  isEnabled={isReviewEnabled}
                  onClick={handleReview}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Rewards Section */}
      <DepositRewardsContainer />

      {/* OUT STUFF - Previous Deposits Section */}
      <PreviousDepositsContainer />
    </div>
  );
}