import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
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
          </nav>

          <Link to="/login">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              LOGIN
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
