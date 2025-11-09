import { Link } from "react-router-dom";
import { Recycle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-eco-green text-eco-text-on-green mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="h-6 w-6" />
              <span className="text-lg font-bold">CLIQUE&RECICLE</span>
            </div>
            <p className="text-sm opacity-90">
              Conectando pessoas e agentes de reciclagem para um futuro mais sustentável.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline opacity-90 hover:opacity-100">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:underline opacity-90 hover:opacity-100">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/locais" className="hover:underline opacity-90 hover:opacity-100">
                  Locais de Coleta
                </Link>
              </li>
              <li>
                <Link to="/dicas" className="hover:underline opacity-90 hover:opacity-100">
                  Dicas & Conteúdo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <p className="text-sm opacity-90">
              Email: contato@cliquerecicle.com.br
              <br />
              Ajudando o meio ambiente, um clique por vez.
            </p>
          </div>
        </div>

        <div className="border-t border-eco-text-on-green/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Clique & Recicle. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
