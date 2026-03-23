import { Moon } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-12">
      <div>
        <h1 className="font-display text-3xl italic font-bold gradient-text">
          TaskFlow Pro
        </h1>
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-0.5">
          Master Your <span className="text-success">Momentum</span>
        </p>
      </div>
      <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
        <Moon className="w-5 h-5" />
      </button>
    </header>
  );
};

export default Header;
