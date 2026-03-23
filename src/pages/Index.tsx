import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {user ? <Dashboard /> : <Landing />}
    </div>
  );
};

export default Index;
