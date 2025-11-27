import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Search, Clock, Phone, Heart, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CollectionPoints = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [collectionPoints, setCollectionPoints] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const saveCurrentLocation = async () => {
    if (!user) {
      toast.error("Faça login para salvar locais");
      navigate("/login");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("collection_points")
        .insert({
          name: "Manaus",
          address: "Centro, Manaus",
          city: "Manaus",
          state: "AM",
          phone: "(92) 3000-0000",
          hours: "Seg-Sex: 8h-18h",
          materials: ["Papel", "Plástico", "Metal", "Vidro"],
          agent_id: user.id,
        });

      if (error) throw error;

      toast.success("Local salvo com sucesso!");
      await fetchCollectionPoints();
    } catch (error: any) {
      toast.error("Erro ao salvar local");
      console.error(error);
    } finally {
      setSaving(false);
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

        {/* Map Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="p-6 shadow-card max-w-4xl mx-auto mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Mapa de Manaus</h3>
                  <Button 
                    onClick={saveCurrentLocation}
                    disabled={saving}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Salvando..." : "Salvar local atual"}
                  </Button>
                </div>
                <div className="w-full aspect-video rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127493.9865625278!2d-60.049505120047954!3d-3.0444874803704414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c1bc8b37647b7%3A0x2b485c9ff765a9cc!2sManaus%2C%20AM!5e0!3m2!1spt-BR!2sbr!4v1764284948719!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de Manaus"
                  />
                </div>
              </div>
            </Card>

            {/* Search Section */}
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
