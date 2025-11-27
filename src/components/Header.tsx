import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Clique & Recicle" className="h-8 w-8" />
            <span className="text-xl font-bold text-foreground">CLIQUE&RECICLE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              HOME
            </Link>
            <Link to="/sobre" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              SOBRE NÓS
            </Link>
            <Link to="/dicas" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              DICAS & CONTEÚDO
            </Link>
            <Link to="/locais" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              LOCAIS DE COLETA
            </Link>
            {user && (
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                PAINEL
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <Button 
                onClick={signOut}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                SAIR
              </Button>
            ) : (
              <Link to="/login">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  LOGIN
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
