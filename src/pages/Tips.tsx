import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lightbulb, Recycle, Leaf, Droplet } from "lucide-react";

const Tips = () => {
  const tips = [
    {
      title: "Separação Correta de Materiais",
      icon: <Recycle className="h-8 w-8" />,
      content: "Separe o lixo reciclável (papel, plástico, vidro, metal) do lixo orgânico. Lave e seque os materiais recicláveis antes de descartar."
    },
    {
      title: "Reduza o Consumo de Plástico",
      icon: <Leaf className="h-8 w-8" />,
      content: "Use sacolas reutilizáveis, garrafas de água e evite produtos com embalagens plásticas excessivas. Pequenas mudanças fazem grande diferença."
    },
    {
      title: "Compostagem em Casa",
      icon: <Droplet className="h-8 w-8" />,
      content: "Transforme resíduos orgânicos em adubo rico em nutrientes. A compostagem reduz o lixo e beneficia plantas e jardins."
    },
    {
      title: "Reutilize e Doe",
      icon: <Lightbulb className="h-8 w-8" />,
      content: "Antes de descartar, pense em reutilizar ou doar itens em bom estado. Roupas, móveis e eletrônicos podem ter uma segunda vida."
    }
  ];

  const materials = [
    {
      name: "Papel e Papelão",
      items: ["Jornais e revistas", "Caixas de papelão", "Papel de escritório", "Cadernos"],
      color: "bg-blue-500"
    },
    {
      name: "Plástico",
      items: ["Garrafas PET", "Embalagens plásticas", "Sacolas plásticas", "Potes e tampas"],
      color: "bg-red-500"
    },
    {
      name: "Vidro",
      items: ["Garrafas de vidro", "Potes de vidro", "Frascos de perfume", "Copos"],
      color: "bg-green-600"
    },
    {
      name: "Metal",
      items: ["Latas de alumínio", "Latas de aço", "Tampas metálicas", "Arames"],
      color: "bg-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero text-eco-text-on-green py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">DICAS & CONTEÚDO</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-95">
              Aprenda mais sobre reciclagem e descubra como fazer a diferença no dia a dia
            </p>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              Dicas Práticas de Reciclagem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tips.map((tip, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      {tip.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{tip.title}</h3>
                      <p className="text-muted-foreground">{tip.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Materials Guide */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              Guia de Materiais Recicláveis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {materials.map((material, index) => (
                <Card key={index} className="overflow-hidden shadow-card hover:shadow-xl transition-shadow">
                  <div className={`${material.color} text-white p-4 text-center font-bold text-lg`}>
                    {material.name}
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {material.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              Por que Reciclar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center shadow-card">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-primary mb-3">Preserva o Meio Ambiente</h3>
                <p className="text-muted-foreground">
                  Reduz a poluição e preserva recursos naturais para as próximas gerações
                </p>
              </Card>

              <Card className="p-6 text-center shadow-card">
                <div className="text-5xl mb-4">💡</div>
                <h3 className="text-xl font-bold text-primary mb-3">Economiza Energia</h3>
                <p className="text-muted-foreground">
                  Produzir materiais reciclados consome menos energia que a produção original
                </p>
              </Card>

              <Card className="p-6 text-center shadow-card">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-primary mb-3">Gera Empregos</h3>
                <p className="text-muted-foreground">
                  A indústria da reciclagem cria oportunidades de trabalho e renda
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tips;
