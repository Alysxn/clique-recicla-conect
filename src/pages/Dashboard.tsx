import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MapPin, Heart, Plus, Trash2, Edit, Clock, Phone, User } from "lucide-react";

const Dashboard = () => {
  const { user, userType, loading } = useAuth();
  const navigate = useNavigate();
  const [collectionPoints, setCollectionPoints] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    materials: "",
    hours: "",
    phone: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && userType) {
      if (userType === "agent") {
        fetchMyCollectionPoints();
      }
      fetchFavorites();
    }
  }, [user, userType]);

  const fetchMyCollectionPoints = async () => {
    const { data, error } = await supabase
      .from("collection_points")
      .select("*")
      .eq("agent_id", user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar pontos de coleta");
    } else {
      setCollectionPoints(data || []);
    }
  };

  const fetchFavorites = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select(`
        *,
        collection_points(*)
      `)
      .eq("user_id", user?.id);

    if (error) {
      toast.error("Erro ao carregar favoritos");
    } else {
      setFavorites(data || []);
    }
  };

  const handleAddCollectionPoint = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from("collection_points").insert({
      agent_id: user?.id,
      name: formData.name,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zip_code,
      materials: formData.materials.split(",").map(m => m.trim()),
      hours: formData.hours,
      phone: formData.phone,
    });

    if (error) {
      toast.error("Erro ao cadastrar ponto de coleta");
    } else {
      toast.success("Ponto de coleta cadastrado com sucesso!");
      setShowAddForm(false);
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        materials: "",
        hours: "",
        phone: "",
      });
      fetchMyCollectionPoints();
    }
  };

  const handleDeleteCollectionPoint = async (id: string) => {
    const { error } = await supabase
      .from("collection_points")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erro ao excluir ponto de coleta");
    } else {
      toast.success("Ponto de coleta excluído com sucesso!");
      fetchMyCollectionPoints();
    }
  };

  const handleRemoveFavorite = async (favoriteId: string) => {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", favoriteId);

    if (error) {
      toast.error("Erro ao remover favorito");
    } else {
      toast.success("Favorito removido!");
      fetchFavorites();
    }
  };

  const handleCardClick = (point: any) => {
    setSelectedPoint(point);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            {userType === "agent" ? "Painel do Agente" : "Meu Painel"}
          </h1>

          {/* Agent Section */}
          {userType === "agent" && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Meus Pontos de Coleta
                </h2>
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Adicionar Ponto
                </Button>
              </div>

              {showAddForm && (
                <Card className="p-6 mb-6 shadow-card">
                  <h3 className="text-xl font-bold mb-4">Novo Ponto de Coleta</h3>
                  <form onSubmit={handleAddCollectionPoint} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome do Local</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip_code">CEP</Label>
                        <Input
                          id="zip_code"
                          value={formData.zip_code}
                          onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="materials">Materiais Aceitos (separados por vírgula)</Label>
                      <Input
                        id="materials"
                        placeholder="Papel, Plástico, Vidro, Metal"
                        value={formData.materials}
                        onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="hours">Horário de Funcionamento</Label>
                      <Input
                        id="hours"
                        placeholder="Seg-Sex: 8h-18h"
                        value={formData.hours}
                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        Salvar
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collectionPoints.map((point) => (
                  <Card 
                    key={point.id} 
                    className="p-6 shadow-card cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => handleCardClick(point)}
                  >
                    <h3 className="text-xl font-bold mb-3">{point.name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                        <div className="text-sm">
                          <p>{point.address}</p>
                          <p>{point.city} - {point.state}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">Materiais:</p>
                      <div className="flex flex-wrap gap-2">
                        {point.materials.map((material: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCollectionPoint(point.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Favorites Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              <Heart className="inline h-6 w-6 mr-2" />
              Meus Favoritos
            </h2>

            {favorites.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  Você ainda não tem favoritos. Explore os pontos de coleta e adicione seus favoritos!
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((fav: any) => (
                  <Card 
                    key={fav.id} 
                    className="p-6 shadow-card cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => handleCardClick(fav.collection_points)}
                  >
                    <h3 className="text-xl font-bold mb-3">{fav.collection_points.name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                        <div className="text-sm">
                          <p>{fav.collection_points.address}</p>
                          <p>{fav.collection_points.city} - {fav.collection_points.state}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">Materiais:</p>
                      <div className="flex flex-wrap gap-2">
                        {fav.collection_points.materials.map((material: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(fav.id);
                      }}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Remover
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">{selectedPoint?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedPoint && (
            <div className="space-y-6">
              {/* Image Placeholder */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Imagem 1</span>
                </div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Imagem 2</span>
                </div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Imagem 3</span>
                </div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Imagem 4</span>
                </div>
              </div>

              {/* Details */}
              <Card className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Endereço</p>
                    <p className="text-base">{selectedPoint.address}</p>
                    <p className="text-base">{selectedPoint.city} - {selectedPoint.state}</p>
                    {selectedPoint.zip_code && <p className="text-sm text-muted-foreground">CEP: {selectedPoint.zip_code}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Horário de Funcionamento</p>
                    <p className="text-base">{selectedPoint.hours}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Contato</p>
                    <p className="text-base">{selectedPoint.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Responsável</p>
                    <p className="text-base">{selectedPoint.owner_name}</p>
                  </div>
                </div>
              </Card>

              {/* Materials */}
              <div>
                <p className="text-lg font-semibold mb-3">Materiais Aceitos:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPoint.materials.map((material: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary text-base px-3 py-1">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
