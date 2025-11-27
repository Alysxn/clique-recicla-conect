import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AgentOnboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    cep: "",
    bairro: "",
    rua: "",
    materials: [] as string[],
    startHour: "06:00",
    endHour: "18:00",
    whatsapp: "",
    email: "",
    phone: "",
  });

  const materialOptions = [
    "Papel e Papelão",
    "Plástico",
    "Vidro",
    "Óleo Vegetal",
    "Eletrônicos",
    "Tecido"
  ];

  const handleMaterialToggle = (material: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 4) {
      toast.error("Você pode adicionar no máximo 4 fotos");
      return;
    }
    setImages(prev => [...prev, ...files].slice(0, 4));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Você precisa estar logado");
      navigate("/login");
      return;
    }

    if (formData.materials.length === 0) {
      toast.error("Selecione pelo menos um material");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("collection_points")
        .insert({
          name: formData.name,
          address: `${formData.rua}, ${formData.bairro}`,
          city: formData.city,
          state: formData.state,
          zip_code: formData.cep,
          phone: formData.phone || formData.whatsapp,
          hours: `${formData.startHour} - ${formData.endHour}`,
          materials: formData.materials,
          agent_id: user.id,
        });

      if (error) throw error;

      toast.success("Ponto de coleta cadastrado com sucesso!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Erro ao cadastrar ponto de coleta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-8 shadow-card">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-eco-green mb-2">OLÁ, USUÁRIO</h1>
              <p className="text-muted-foreground">
                Já que você é um agente de reciclagem, precisamos de algumas informações adicionais:
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome do local */}
              <div>
                <Label htmlFor="name" className="text-eco-green-dark font-semibold">
                  NOME DO SEU LOCAL DE COLETA
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              {/* Endereço */}
              <div>
                <Label className="text-eco-green-dark font-semibold">
                  ENDEREÇO DO LOCAL DE COLETA:
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label htmlFor="cep" className="text-sm">CEP</Label>
                    <Input
                      id="cep"
                      required
                      value={formData.cep}
                      onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm">ESTADO</Label>
                    <Input
                      id="state"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-sm">CIDADE</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="bairro" className="text-sm">BAIRRO</Label>
                    <Input
                      id="bairro"
                      required
                      value={formData.bairro}
                      onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rua" className="text-sm">RUA</Label>
                    <Input
                      id="rua"
                      required
                      value={formData.rua}
                      onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Materiais */}
              <div>
                <Label className="text-eco-green-dark font-semibold">
                  MATERIAIS QUE VOCÊ COLETA
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {materialOptions.map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={material}
                        checked={formData.materials.includes(material)}
                        onCheckedChange={() => handleMaterialToggle(material)}
                        className="data-[state=checked]:bg-eco-green data-[state=checked]:border-eco-green"
                      />
                      <Label
                        htmlFor={material}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {material}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Horário */}
              <div>
                <Label className="text-eco-green-dark font-semibold">
                  SEU HORÁRIO DE FUNCIONAMENTO
                </Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Input
                      type="time"
                      value={formData.startHour}
                      onChange={(e) => setFormData({ ...formData, startHour: e.target.value })}
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      value={formData.endHour}
                      onChange={(e) => setFormData({ ...formData, endHour: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Upload de fotos */}
              <div>
                <Label className="text-eco-green-dark font-semibold">
                  ADICIONE FOTOS DO SEU LOCAL DE COLETA
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="relative">
                      {images[index] ? (
                        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(images[index])}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full mt-2 bg-eco-green-dark text-white hover:bg-eco-green"
                >
                  UPLOAD
                </Button>
              </div>

              {/* Contatos */}
              <div>
                <Label className="text-eco-green-dark font-semibold">
                  ADICIONE SUAS FORMAS DE CONTATO
                </Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label htmlFor="whatsapp" className="text-sm">WHATSAPP</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">E-MAIL</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">TELEFONE</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-eco-green-dark text-white hover:bg-eco-green text-lg py-6"
              >
                {loading ? "CADASTRANDO..." : "FINALIZAR CADASTRO"}
              </Button>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgentOnboarding;
