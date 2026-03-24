import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-12">
      <div>
        <h1 className="font-display text-3xl italic font-bold gradient-text">
          To-Do
        </h1>
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-0.5">
          Master Your <span className="text-success">Momentum</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
          <Moon className="w-5 h-5" />
        </button>
        {user && (
          <>
            <span className="text-sm font-medium hidden sm:inline text-muted-foreground">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
