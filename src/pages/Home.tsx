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
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-eco-green/80 to-eco-green-light/70" />
        <div className="container mx-auto px-4 relative z-10 text-center text-eco-text-on-green">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            RECICLAR NUNCA FOI TÃO FÁCIL
          </h1>
          <p className="text-xl md:text-2xl mb-6 animate-fade-in">
            CONECTE, RECICLE E FAÇA A DIFERENÇA
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-95 animate-fade-in">
            Juntos, ajudamos o meio ambiente e fortalecemos a reciclagem
          </p>
          <Link to="/locais">
            <Button 
              size="lg" 
              className="bg-eco-text-on-green text-primary hover:bg-eco-text-on-green/90 text-lg px-8 py-6 animate-fade-in shadow-lg"
            >
              QUERO RECICLAR
            </Button>
          </Link>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            COMO FUNCIONA?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-eco-card text-eco-text-on-green p-8 text-center shadow-card hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 mx-auto mb-6 bg-eco-green-pale rounded-full flex items-center justify-center p-6">
                <img src={step1} alt="Cadastre-se" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">CADASTRE O MATERIAL QUE DESEJA RECICLAR</h3>
              <p className="opacity-90">
                Informe o tipo de material e suas informações básicas para começar
              </p>
            </Card>

            <Card className="bg-eco-card text-eco-text-on-green p-8 text-center shadow-card hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 mx-auto mb-6 bg-eco-green-pale rounded-full flex items-center justify-center p-6">
                <img src={step2} alt="Encontre" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">ENCONTRE RECICLADORES PRÓXIMOS</h3>
              <p className="opacity-90">
                Nossa plataforma conecta você com agentes de reciclagem na sua região
              </p>
            </Card>

            <Card className="bg-eco-card text-eco-text-on-green p-8 text-center shadow-card hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 mx-auto mb-6 bg-eco-green-pale rounded-full flex items-center justify-center p-6">
                <img src={step3} alt="Combine" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">COMBINE A COLETA COM O RECICLADOR</h3>
              <p className="opacity-90">
                Entre em contato e agende a coleta do seu material de forma simples
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-eco-text-on-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Encontre pontos de coleta próximos a você e comece a reciclar hoje mesmo!
          </p>
          <Link to="/locais">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 shadow-lg"
            >
              VER LOCAIS DE COLETA
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
