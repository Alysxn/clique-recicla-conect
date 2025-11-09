import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-[600px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-[#6b9b5f]/50" />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#3d2817] leading-tight animate-fade-in">
              RECICLAR NUNCA FOI TÃO FÁCIL. CONECTE, RECICLE E FAÇA A DIFERENÇA
            </h1>
            <p className="text-lg md:text-xl mb-8 text-[#3d2817] italic animate-fade-in">
              Juntos, ajudamos o meio ambiente e fortalecemos a reciclagem
            </p>
            <Link to="/locais">
              <Button 
                size="lg" 
                className="bg-[#9dcc7a] text-[#3d2817] hover:bg-[#8dbc6a] text-base font-bold px-8 py-6 animate-fade-in shadow-lg uppercase"
              >
                QUERO RECICLAR
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
