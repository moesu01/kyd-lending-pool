import {
  imgLogo,
  imgDashboardIcon,
  imgWalletIcon,
} from "../imports/svg-t6i4s";

function Logo() {
  return (
    <div
    id="logo"
      className="relative shrink-0 size-[60px]"
      data-name="logo"
    >
      <div className="absolute inset-[-3.33%_-5%_-6.67%_-5%]">
        <img
          className="block max-w-none size-full"
          src={imgLogo}
        />
      </div>
    </div>
  );
}

function DashboardIcon() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="dashboard icon"
    >
      <div className="absolute bottom-[-2.44%] left-0 right-0 top-0">
        <img
          className="block max-w-none size-full"
          src={imgDashboardIcon}
        />
      </div>
    </div>
  );
}

function Dashboard({ onNavigateToDashboard }: { onNavigateToDashboard: () => void }) {
  return (
    <div
      className="content-stretch flex gap-2 items-center justify-start relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      data-name="dashboard"
      onClick={onNavigateToDashboard}
    >
      <DashboardIcon />
      <div className="flex flex-col font-['ABC_Diatype_Unlicensed_Trial:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-neutral-100 text-nowrap tracking-[-0.48px]">
        <p className="leading-[1.2] whitespace-pre">
          Dashboard
        </p>
      </div>
    </div>
  );
}

function WalletIcon() {
  return (
    <div
      className="h-[18px] relative shrink-0 w-[19px]"
      data-name="Wallet icon"
    >
      <img
        className="block max-w-none size-full"
        src={imgWalletIcon}
      />
    </div>
  );
}

function SignIn() {
  return (
    <div
      className="box-border content-stretch flex gap-2 items-center justify-start px-0 py-2.5 relative rounded-[2px] shrink-0"
      data-name="sign in"
    >
      <WalletIcon />
      <div className="[text-shadow:#000000_0px_-1px_2px] flex flex-col font-['ABC_Diatype_Unlicensed_Trial:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.48px]">
        <p className="leading-[1.2] whitespace-pre">
          Connect Wallet
        </p>
      </div>
    </div>
  );
}


function Buttons({ onNavigateToDashboard }: { onNavigateToDashboard: () => void }) {
  return (
    <div
      className="content-stretch flex gap-8 items-center justify-center relative shrink-0"
      data-name="buttons"
    >
      <Dashboard onNavigateToDashboard={onNavigateToDashboard} />
      <SignIn />
    </div>
  );
}

export function NavBar({ onNavigateToDashboard }: { onNavigateToDashboard: () => void }) {
  return (
    <div
      className="
        absolute
        box-border
        content-stretch
        flex
        items-center
        justify-between
        left-1/2
        px-6
        py-4
        rounded-[14px]
        shadow-[0px_0px_20px_0px_rgba(0,0,0,0.07)]
        top-3
        translate-x-[-50%]
        w-[min(90vw)]
        backdrop-blur-sm
        bg-black/10
        border
        border-white/10
        z-60
      "
      data-name="Nav bar"
    >
      <Logo />
      <Buttons onNavigateToDashboard={onNavigateToDashboard} />
    </div>
  );
}