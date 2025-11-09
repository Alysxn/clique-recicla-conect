import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Search, Clock, Phone } from "lucide-react";

const CollectionPoints = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app, this would come from backend
  const collectionPoints = [
    {
      id: 1,
      name: "EcoPoint Centro",
      address: "Rua das Flores, 123 - Centro",
      city: "São Paulo",
      state: "SP",
      materials: ["Papel", "Plástico", "Vidro", "Metal"],
      hours: "Seg-Sex: 8h-18h",
      phone: "(11) 1234-5678"
    },
    {
      id: 2,
      name: "Recicladora Verde",
      address: "Av. Brasil, 456 - Jardim das Acácias",
      city: "São Paulo",
      state: "SP",
      materials: ["Plástico", "Metal", "Eletrônicos"],
      hours: "Seg-Sáb: 9h-17h",
      phone: "(11) 8765-4321"
    },
    {
      id: 3,
      name: "Centro de Reciclagem Municipal",
      address: "Rua do Meio Ambiente, 789 - Vila Sustentável",
      city: "São Paulo",
      state: "SP",
      materials: ["Papel", "Papelão", "Vidro"],
      hours: "Seg-Sex: 7h-16h",
      phone: "(11) 2222-3333"
    }
  ];

  const filteredPoints = collectionPoints.filter(point =>
    point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.materials.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero text-eco-text-on-green py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">LOCAIS DE COLETA</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-95">
              Encontre pontos de coleta próximos a você e comece a reciclar hoje mesmo
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="p-6 shadow-card max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Buscar por localização, material ou nome do ponto..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Buscar
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="h-96 bg-muted/50 flex items-center justify-center shadow-card">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Mapa interativo dos pontos de coleta</p>
                <p className="text-sm">(Funcionalidade será implementada em breve)</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Collection Points List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Pontos de Coleta Disponíveis ({filteredPoints.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoints.map((point) => (
                <Card key={point.id} className="p-6 shadow-card hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-foreground mb-4">{point.name}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p>{point.address}</p>
                        <p>{point.city} - {point.state}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{point.hours}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{point.phone}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-foreground mb-2">Materiais aceitos:</p>
                    <div className="flex flex-wrap gap-2">
                      {point.materials.map((material, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredPoints.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  Nenhum ponto de coleta encontrado para sua busca.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionPoints;
