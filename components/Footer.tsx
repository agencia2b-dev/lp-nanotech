
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const pages = [
    { href: '/', label: 'Início' },
    { href: '/nanothermic1', label: 'Nanothermic 1' },
    { href: '/nanocril', label: 'Nanocril' },
    { href: '/nanothermic3', label: 'Nanothermic 3' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://nanotechdobrasil.com.br/wp-content/uploads/2025/07/logotipo.png" 
                alt="Nanotech do Brasil" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Soluções inovadoras em nanotecnologia para isolamento térmico e impermeabilização. 
              Transformando ambientes com eficiência e sustentabilidade.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <i className="ri-phone-line text-green-400"></i>
                <span className="text-sm text-gray-300">(11) 95640-5311</span>
              </div>
            </div>
          </div>

          {/* Páginas do Site */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nossos Produtos</h3>
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.openCRMModal) {
                    window.openCRMModal();
                  }
                }}
                className="block w-full text-left bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <i className="ri-mail-line mr-2"></i>
                Solicitar Orçamento
              </button>
              <a
                href="https://wa.me/5511956405311"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <i className="ri-whatsapp-line mr-2"></i>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Linha de Separação */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Nanotech. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Feito com</span>
              <a
                href="https://readdy.ai/?origin=logo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors duration-200 text-sm font-medium"
              >
                Readdy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
