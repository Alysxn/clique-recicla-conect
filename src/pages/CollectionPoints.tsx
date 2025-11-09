import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Search, Clock, Phone, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CollectionPoints = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [collectionPoints, setCollectionPoints] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchCollectionPoints();
    if (user) {
      fetchUserFavorites();
    }
  }, [user]);

  const fetchCollectionPoints = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("collection_points")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar pontos de coleta");
    } else {
      setCollectionPoints(data || []);
    }
    setLoading(false);
  };

  const fetchUserFavorites = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("favorites")
      .select("collection_point_id")
      .eq("user_id", user.id);

    if (!error && data) {
      setFavorites(new Set(data.map(fav => fav.collection_point_id)));
    }
  };

  const toggleFavorite = async (pointId: string) => {
    if (!user) {
      toast.error("Faça login para adicionar favoritos");
      return;
    }

    const isFavorited = favorites.has(pointId);

    if (isFavorited) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("collection_point_id", pointId);

      if (error) {
        toast.error("Erro ao remover favorito");
      } else {
        const newFavorites = new Set(favorites);
        newFavorites.delete(pointId);
        setFavorites(newFavorites);
        toast.success("Removido dos favoritos");
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({
          user_id: user.id,
          collection_point_id: pointId,
        });

      if (error) {
        toast.error("Erro ao adicionar favorito");
      } else {
        const newFavorites = new Set(favorites);
        newFavorites.add(pointId);
        setFavorites(newFavorites);
        toast.success("Adicionado aos favoritos!");
      }
    }
  };

  const filteredPoints = collectionPoints.filter(point =>
    point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.materials.some((m: string) => m.toLowerCase().includes(searchTerm.toLowerCase()))
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

        {/* Collection Points List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Pontos de Coleta Disponíveis ({filteredPoints.length})
            </h2>
            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">Carregando...</p>
              </div>
            ) : filteredPoints.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-xl text-muted-foreground">
                  {searchTerm
                    ? "Nenhum ponto de coleta encontrado para sua busca."
                    : "Ainda não há pontos de coleta cadastrados."}
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPoints.map((point) => (
                  <Card key={point.id} className="p-6 shadow-card hover:shadow-xl transition-shadow relative">
                    {user && (
                      <button
                        onClick={() => toggleFavorite(point.id)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            favorites.has(point.id)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    )}

                    <h3 className="text-xl font-bold text-foreground mb-4 pr-8">{point.name}</h3>
                    
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
                        {point.materials.map((material: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
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
