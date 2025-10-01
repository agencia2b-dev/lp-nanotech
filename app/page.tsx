
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function Home() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
  }, []);

  // Product data for better organization
  const products = [
    {
      id: 'nanothermic1',
      title: 'Nanothermic 1',
      subtitle: 'Redução Térmica Avançada',
      color: 'green',
      icon: 'ri-sun-line',
      features: [
        'Reduz até 35% da temperatura',
        '90% de reflexão solar',
        'Economia de até 50% na energia',
        '20 anos de durabilidade'
      ],
      href: '/nanothermic1'
    },
    {
      id: 'nanocril',
      title: 'Nanocril',
      subtitle: 'Proteção Impermeabilizante',
      color: 'yellow',
      icon: 'ri-shield-check-line',
      features: [
        'Impermeabilização total',
        'Proteção UV avançada',
        'Resistente a intempéries',
        'Aplicação versátil'
      ],
      href: '/nanocril'
    },
    {
      id: 'nanothermic3',
      title: 'Nanothermic 3',
      subtitle: 'Máxima Performance Térmica',
      color: 'blue',
      icon: 'ri-fire-line',
      features: [
        'Performance superior',
        'Controle térmico avançado',
        'Eficiência energética máxima',
        'Tecnologia de ponta'
      ],
      href: '/nanothermic3'
    }
  ];

  const handleCRMClick = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).openCRMModal) {
      (window as any).openCRMModal();
    }
  }, []);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Nanotech - Produtos de Nanotecnologia",
            "description": "Soluções inovadoras em nanotecnologia para isolamento térmico e impermeabilização",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": products.map((product, index) => ({
                "@type": "Product",
                "position": index + 1,
                "name": product.title,
                "description": product.subtitle,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}${product.href}`
              }))
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}`
              }]
            }
          })
        }}
      />

      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section
          id="hero"
          ref={addToRefs('hero')}
          className={`py-20 bg-gradient-to-br from-blue-50 to-green-50 transition-all duration-1000 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Nanotech - Soluções em <span className="text-green-600">Nanotecnologia</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Tecnologia avançada para isolamento térmico e impermeabilização. Descubra como a nanotecnologia pode transformar sua obra com eficiência e durabilidade.
            </p>
            <button 
              onClick={handleCRMClick}
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl whitespace-nowrap crm-trigger"
            >
              SOLICITAR ORÇAMENTO GRÁTIS
            </button>
          </div>
        </section>

        {/* Products Section */}
        <section
          id="products"
          ref={addToRefs('products')}
          className={`py-20 bg-white transition-all duration-1000 delay-600 ${
            isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Conheça Nossa <span className="text-green-600">Linha de Produtos</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluções completas em nanotecnologia para diferentes necessidades de climatização
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className="bg-gradient-to-br rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                    backgroundColor: product.color === 'green' ? '#f0fdf4' : 
                                     product.color === 'yellow' ? '#fefce8' : '#eff6ff'
                  }}
                >
                  <div className="text-center mb-6">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ 
                        backgroundColor: product.color === 'green' ? '#10b981' : 
                                         product.color === 'yellow' ? '#f59e0b' : '#3b82f6'
                      }}
                    >
                      <i className={`${product.icon} text-white text-3xl`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h3>
                    <p 
                      className="font-semibold"
                      style={{ 
                        color: product.color === 'green' ? '#059669' : 
                               product.color === 'yellow' ? '#d97706' : '#2563eb'
                      }}
                    >
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <i 
                          className="ri-check-line text-lg"
                          style={{ 
                            color: product.color === 'green' ? '#10b981' : 
                                   product.color === 'yellow' ? '#f59e0b' : '#3b82f6'
                          }} 
                        />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={product.href} className="block">
                    <button 
                      className="w-full text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                      style={{ 
                        backgroundColor: product.color === 'green' ? '#10b981' : 
                                         product.color === 'yellow' ? '#f59e0b' : '#3b82f6'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 
                          product.color === 'green' ? '#059669' : 
                          product.color === 'yellow' ? '#d97706' : '#2563eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 
                          product.color === 'green' ? '#10b981' : 
                          product.color === 'yellow' ? '#f59e0b' : '#3b82f6';
                      }}
                    >
                      Saiba Mais
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          id="benefits"
          ref={addToRefs('benefits')}
          className={`py-20 bg-gray-50 transition-all duration-1000 delay-900 ${
            isVisible.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Por que Escolher a <span className="text-green-600">Nanotech</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Benefícios únicos que fazem toda a diferença para seu projeto
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'ri-leaf-line',
                  title: 'Sustentável e Ecológico',
                  description: 'Produtos à base de água, não tóxicos e com baixo impacto ambiental.'
                },
                {
                  icon: 'ri-shield-check-line',
                  title: 'Garantia Estendida',
                  description: 'Até 20 anos de garantia com resultados comprovados e duradouros.'
                },
                {
                  icon: 'ri-money-dollar-circle-line',
                  title: 'Economia Garantida',
                  description: 'Redução significativa nos custos com energia e manutenção.'
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${benefit.icon} text-green-600 text-2xl`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="cta"
          ref={addToRefs('cta')}
          className={`py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white transition-all duration-1000 delay-1200 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para Transformar seu Projeto?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Descubra como nossa tecnologia pode revolucionar sua obra. Solicite um orçamento gratuito e sem compromisso.
            </p>
            <button 
              onClick={handleCRMClick}
              className="bg-white text-green-600 px-12 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl whitespace-nowrap crm-trigger"
            >
              SOLICITAR ORÇAMENTO GRATUITO
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
