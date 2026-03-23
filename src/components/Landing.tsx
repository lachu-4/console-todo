import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="glass-card p-12 md:p-16 max-w-2xl w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Welcome to TaskFlow Pro
        </h2>
        <p className="text-muted-foreground mb-8">
          Please login to manage your tasks securely.
        </p>
        <Button
          onClick={loginWithGoogle}
          size="lg"
          className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 font-semibold"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Landing;
