import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";
import step1 from "@/assets/step1.png";
import step2 from "@/assets/step2.png";
import step3 from "@/assets/step3.png";

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

      {/* Como Funciona Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-foreground">
            COMO FUNCIONA?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-eco-card text-eco-text-on-green p-8 text-center shadow-card hover:shadow-xl transition-all rounded-3xl">
              <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                <img src={step1} alt="Cadastre o material" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase">
                CADASTRE O MATERIAL QUE DESEJA RECICLAR
              </h3>
            </Card>

            <Card className="bg-eco-card text-eco-text-on-green p-8 text-center shadow-card hover:shadow-xl transition-all rounded-3xl">
              <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                <img src={step2} alt="Encontre recicladores" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase">
                ENCONTRE RECICLADORES PRÓXIMOS
              </h3>
            </Card>

            <Card className="bg-eco-card text-eco-text-on-green p-8 text-center shadow-card hover:shadow-xl transition-all rounded-3xl">
              <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                <img src={step3} alt="Combine a coleta" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase">
                COMBINE A COLETA COM O RECICLADOR
              </h3>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
