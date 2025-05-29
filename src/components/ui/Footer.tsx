import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-900 to-secondary-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Seção de logo e descrição */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2">
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-mixed">N+</span>
              </div>
              <span className="font-bold text-xl">Nordeste+</span>
            </div>
            <p className="text-neutral-100 mb-4">
              Transformando o futuro do Nordeste através da educação e do emprego.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary-200 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-200 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-200 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-100 hover:text-white hover:underline transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/uni-plus" className="text-neutral-100 hover:text-white hover:underline transition-colors">
                  Uni+
                </Link>
              </li>
              <li>
                <Link to="/emprega-plus" className="text-neutral-100 hover:text-white hover:underline transition-colors">
                  Emprega+
                </Link>
              </li>
              <li>
                <Link to="/perfil" className="text-neutral-100 hover:text-white hover:underline transition-colors">
                  Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Institucional */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-neutral-100 hover:text-white hover:underline transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-neutral-100 hover:text-white hover:underline transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link to="/acessibilidade" className="text-neutral-100 hover:text-white hover:underline transition-colors">
                  Acessibilidade
                </Link>
              </li>
              <li>
                <Link to="/parceiros" className="text-neutral-100 hover:text-white hover:underline transition-colors">
                  Parceiros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Fale Conosco</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-0.5" />
                <span className="text-neutral-100">contato@nordestemais.com.br</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-0.5" />
                <span className="text-neutral-100">(98) 9812-2424</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 text-center text-neutral-200 text-sm">
          <p>© {new Date().getFullYear()} Nordeste+ | Todos os direitos reservados</p>
          <p className="mt-2">
            Um projeto social para redução do desemprego e aumento da qualificação profissional no Nordeste brasileiro
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;