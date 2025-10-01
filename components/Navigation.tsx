
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pages = [
    { href: '/', label: 'Início', description: 'Página inicial' },
    { href: '/nanothermic1', label: 'Nanothermic 1', description: 'Redução Térmica Avançada' },
    { href: '/nanocril', label: 'Nanocril', description: 'Proteção Impermeabilizante' },
    { href: '/nanothermic3', label: 'Nanothermic 3', description: 'Máxima Performance Térmica' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="https://nanotechdobrasil.com.br/wp-content/uploads/2025/07/logotipo.png" 
              alt="Nanotech do Brasil" 
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === page.href
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {page.label}
              </Link>
            ))}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  if ((window as any).openCRMModal) {
                    (window as any).openCRMModal();
                  } else {
                    const modalOverlay = document.getElementById('crm-floating-modal-overlay');
                    if (modalOverlay) {
                      modalOverlay.style.display = 'flex';
                      document.body.style.overflow = 'hidden';
                    }
                  }
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
            >
              Solicitar Orçamento
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50"
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    pathname === page.href
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{page.label}</div>
                  <div className="text-xs text-gray-500">{page.description}</div>
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (typeof window !== 'undefined') {
                    if ((window as any).openCRMModal) {
                      (window as any).openCRMModal();
                    } else {
                      const modalOverlay = document.getElementById('crm-floating-modal-overlay');
                      if (modalOverlay) {
                        modalOverlay.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                      }
                    }
                  }
                }}
                className="w-full text-left bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Solicitar Orçamento
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
