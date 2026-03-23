import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, loginWithGoogle, logout } = useAuth();

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
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
          <Moon className="w-5 h-5" />
        </button>
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {user.displayName?.[0] || "U"}
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                {user.displayName}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={loginWithGoogle} className="gap-2">
            <LogIn className="w-4 h-4" />
            Login with Google
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
