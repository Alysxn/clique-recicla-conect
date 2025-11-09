import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";
import { Target, Eye, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-eco-text-on-green py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Clique & Recicle" className="h-24 w-24" />
            </div>
            <h1 className="text-5xl font-bold mb-4">CLIQUE & RECICLE</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-95">
              Plataforma dedicada a conectar pessoas que desejam reciclar com agentes de reciclagem,
              tornando o processo mais simples e acessível para todos.
            </p>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <Card className="p-8 shadow-card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">NOSSA MISSÃO</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Facilitar o acesso à reciclagem, conectando pessoas conscientes com agentes de 
                  reciclagem qualificados. Queremos tornar a reciclagem um hábito simples e 
                  acessível para todos, contribuindo para um planeta mais sustentável e limpo.
                </p>
              </Card>

              <Card className="p-8 shadow-card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">NOSSA VISÃO</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ser a principal plataforma de reciclagem do Brasil, reconhecida por facilitar 
                  a conexão entre recicladores e agentes, promovendo uma economia circular e 
                  contribuindo significativamente para a preservação ambiental.
                </p>
              </Card>
            </div>

            {/* Values */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">NOSSOS VALORES</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center shadow-card hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-primary mb-3">Sustentabilidade</h3>
                <p className="text-muted-foreground">
                  Compromisso com práticas que preservam o meio ambiente para as futuras gerações
                </p>
              </Card>

              <Card className="p-6 text-center shadow-card hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-primary mb-3">Transparência</h3>
                <p className="text-muted-foreground">
                  Comunicação clara e honesta com todos os usuários da plataforma
                </p>
              </Card>

              <Card className="p-6 text-center shadow-card hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-primary mb-3">Colaboração</h3>
                <p className="text-muted-foreground">
                  Acreditamos no poder da união entre pessoas e agentes de reciclagem
                </p>
              </Card>

              <Card className="p-6 text-center shadow-card hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-primary mb-3">Acessibilidade</h3>
                <p className="text-muted-foreground">
                  Tornar a reciclagem simples e acessível para todos, sem barreiras
                </p>
              </Card>

              <Card className="p-6 text-center shadow-card hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-primary mb-3">Inovação</h3>
                <p className="text-muted-foreground">
                  Buscar constantemente novas formas de melhorar o processo de reciclagem
                </p>
              </Card>

              <Card className="p-6 text-center shadow-card hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-primary mb-3">Responsabilidade</h3>
                <p className="text-muted-foreground">
                  Compromisso com o impacto positivo em nossa comunidade e no planeta
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12 text-foreground">NOSSO IMPACTO</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-5xl font-bold text-primary mb-2">1000+</div>
                <p className="text-lg text-muted-foreground">Usuários Cadastrados</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">500+</div>
                <p className="text-lg text-muted-foreground">Pontos de Coleta</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">50 ton</div>
                <p className="text-lg text-muted-foreground">Material Reciclado</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
