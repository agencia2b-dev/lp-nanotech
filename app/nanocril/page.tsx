
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Script from 'next/script';

// Optimized image URLs with WebP format and proper sizing
const HERO_IMAGE =
  'https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/f518943135986fddecc1f591296514de.png?w=1200&h=800&q=85&f=webp';
const PRODUCT_IMAGE =
  'https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/22374e6f26d9627c61211fb17ea93c7f.png?w=400&h=400&q=85&f=webp';
const NANOCRIL_CARD_IMAGE =
  'https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/bb4ed40cd0a903a3a010ba6bf0f4da3d.jfif?w=128&h=200&q=85&f=webp';

export default function Nanocril() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  const scrollToForm = useCallback(() => {
    const formElement = document.getElementById('cta');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // IntersectionObserver for section reveal animations
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

  // Form submission handler
  useEffect(() => {
    const form = document.getElementById('crm-embedded-form-nanocril') as HTMLFormElement;
    const submitBtn = document.getElementById('crm-embedded-submit-btn-nanocril') as HTMLButtonElement;
    const messageDiv = document.getElementById('crm-embedded-message-nanocril') as HTMLDivElement;

    if (!form || !submitBtn || !messageDiv) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      const formData = new FormData(form);

      try {
        const response = await fetch('https://wtvrdalmgbhbomfridwe.supabase.co/functions/v1/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone') || '',
            message: formData.get('subject') ? formData.get('subject') + '\n\n' + (formData.get('message') || '') : (formData.get('message') || ''),
            source: 'nanocril-form',
            produto: 'Nanocril'
          })
        });

        if (response.ok) {
          messageDiv.style.display = 'block';
          messageDiv.style.background = '#d4edda';
          messageDiv.style.color = '#155724';
          messageDiv.style.border = '1px solid #c3e6cb';
          messageDiv.textContent = 'Obrigado! Entraremos em contato em breve.';
          messageDiv.classList.remove('hidden');
          form.reset();
        } else {
          throw new Error('Erro no envio');
        }
      } catch (error) {
        console.error('Form error:', error);
        messageDiv.style.display = 'block';
        messageDiv.style.background = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
        messageDiv.textContent = 'Erro ao enviar formulário. Tente novamente.';
        messageDiv.classList.remove('hidden');
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar Formulário';
    };

    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  // Helper to attach refs to sections
  const addToRefs = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
  }, []);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <Script
        id="nanocril-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Nanocril",
            "description": "Impermeabilizante acrílico com nanotecnologia, borracha líquida para impermeabilização eficaz e duradoura",
            "brand": {
              "@type": "Brand",
              "name": "Nanotech"
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "Nanotech"
            },
            "category": "Impermeabilizante",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/nanocril`,
            "image": PRODUCT_IMAGE,
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "BRL"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "150"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Redução de Umidade",
                "value": "90%"
              },
              {
                "@type": "PropertyValue",
                "name": "Durabilidade",
                "value": "20 anos"
              },
              {
                "@type": "PropertyValue",
                "name": "Garantia",
                "value": "5 anos"
              }
            ]
          })
        }}
      />

      <Script
        id="nanocril-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Nanocril",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/nanocril`
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Hero Section - Optimized */}
        <section
          id="hero"
          ref={addToRefs('hero')}
          className={`relative min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 flex items-center transition-all duration-1000 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8 animate-fade-in-left">
              <div className="inline-block bg-white/20 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                IMPERMEABILIZANTE
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-gray-900">Nanocril:</span> A Borracha Líquida com
                <br />
                <span className="text-gray-800">Nanotecnologia que Revoluciona a Impermeabilização</span>
              </h1>
              <p className="text-lg text-gray-800 leading-relaxed">
                Diga adeus aos métodos ultrapassados! Nanocril é o
                impermeabilizante acrílico com fórmula inovadora, à base de água e
                elastômeros de alta performance, que garante maior adaptabilidade,
                resistência e duração para sua obra.
              </p>

              <div className="flex items-center gap-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <i className="ri-leaf-line text-gray-900 text-2xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-800">Ecológico</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <i className="ri-shield-check-line text-gray-900 text-2xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">5x</div>
                    <div className="text-sm text-gray-800">Mais Durável</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <i className="ri-hammer-line text-gray-900 text-2xl" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">Versátil</div>
                    <div className="text-xs text-gray-800">Aplicação Universal</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToForm}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl whitespace-nowrap relative overflow-hidden"
                >
                  <span className="relative z-10">QUERO MEU ORÇAMENTO GRÁTIS</span>
                  <div className="absolute inset-0 bg-orange-400 rounded-xl animate-ping opacity-20"></div>
                  <div className="absolute inset-0 bg-orange-500 rounded-xl animate-bounce opacity-10"></div>
                </button>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <Image
                src={PRODUCT_IMAGE}
                alt="Nanocril - Borracha Líquida"
                width={400}
                height={400}
                className="w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMEBQYREhMVIjGh8P/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIAETFR8f/aAAwDAQACEQMRAD8A6tZk1c2xkK0vZV0Hu1XvJzuZDBw5J8iN6H/9k="
              />
              <div className="absolute top-10 right-0 w-32 h-32 bg-white/10 rounded-full opacity-20 animate-pulse" />
              <div className="absolute bottom-20 left-0 w-24 h-24 bg-white/10 rounded-full opacity-20 animate-pulse delay-1000" />
            </div>
          </div>
        </section>

        {/* Problem Section - Optimized */}
        <section
          id="problem"
          ref={addToRefs('problem')}
          className={`py-20 bg-gray-50 transition-all duration-1000 delay-300 ${
            isVisible.problem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Cansado de
                <span className="text-orange-600"> Problemas com Impermeabilização</span>?
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                Vazamentos, infiltrações, mofo e a necessidade de manutenções
                constantes são dores de cabeça comuns para quem utiliza
                impermeabilizantes tradicionais. Métodos como a lã de rocha são
                ineficientes, poluentes e exigem mão de obra especializada. Mas
                existe uma solução disruptiva e definitiva.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'Vazamentos e Infiltrações',
                  description: 'Danos estruturais e problemas de saúde',
                  icon: 'ri-drop-line',
                },
                {
                  title: 'Mofo e Umidade',
                  description: 'Ambientes insalubres e deterioração de bens',
                  icon: 'ri-plant-line',
                },
                {
                  title: 'Manutenção Constante',
                  description: 'Gastos e transtornos recorrentes',
                  icon: 'ri-tools-line',
                },
                {
                  title: 'Métodos Ultrapassados',
                  description: 'Ineficiência e impacto ambiental',
                  icon: 'ri-time-line',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 group hover:scale-105 transition-all duration-300 bg-white p-4 rounded-lg shadow-sm hover:shadow-md"
                >
                  <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} text-orange-600 text-3xl`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section - Optimized */}
        <section
          id="solution"
          ref={addToRefs('solution')}
          className={`py-20 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 text-gray-900 transition-all duration-1000 delay-500 relative overflow-hidden ${
            isVisible.solution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-900">Nanocril:</span> A Inovação que
              Transforma a Impermeabilização
            </h2>
            <p className="text-lg mb-12 max-w-4xl mx-auto text-gray-800">
              Descubra como a borracha líquida com nanotecnologia oferece
              resultados superiores e duradouros.
            </p>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-gray-900">90%</div>
                <div className="text-lg font-semibold mb-1 text-gray-900">Redução de Umidade</div>
                <div className="text-sm text-gray-800">Proteção eficaz contra infiltrações</div>
              </div>

              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-gray-900">20</div>
                <div className="text-lg font-semibold mb-1 text-gray-900">Anos de Durabilidade</div>
                <div className="text-sm text-gray-800">Vida útil prolongada e sem preocupações</div>
              </div>

              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-gray-900">Fácil</div>
                <div className="text-lg font-semibold mb-1 text-gray-900">Aplicação Simplificada</div>
                <div className="text-sm text-gray-800">Economia de tempo e mão de obra</div>
              </div>

              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-gray-900">100%</div>
                <div className="text-lg font-semibold mb-1 text-gray-900">Produto Atóxico</div>
                <div className="text-sm text-gray-800">Seguro para pessoas e meio ambiente</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Optimized */}
        <section
          id="benefits"
          ref={addToRefs('benefits')}
          className={`py-20 bg-gray-50 transition-all duration-1000 delay-700 ${
            isVisible.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                <span className="text-yellow-600">Nanocril:</span> A Tecnologia que
                Transforma
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Benefícios que fazem toda a diferença na sua obra
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex h-full">
                  <div className="w-32 flex-shrink-0 overflow-hidden">
                    <Image
                      src={NANOCRIL_CARD_IMAGE}
                      alt="Borracha Líquida com Nanotecnologia"
                      width={128}
                      height={200}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Borracha Líquida com Nanotecnologia
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Fórmula revolucionária que se adapta a qualquer superfície,
                      criando uma barreira impermeável flexível e resistente.
                    </p>
                  </div>
                </div>
              </div>

              {[
                {
                  title: 'Substitui Múltiplos Produtos',
                  description:
                    'Chega de manta asfáltica, argamassa polimérica e resina acrílica. Nanocril é a solução completa que simplifica sua obra e reduz custos.',
                  icon: 'ri-stack-line',
                },
                {
                  title: 'Sustentabilidade e Segurança',
                  description:
                    'Produto à base de água, sem solventes e toxinas. Ecológico, seguro para sua família e para o meio ambiente.',
                  icon: 'ri-leaf-line',
                },
                {
                  title: 'Economia e Durabilidade',
                  description:
                    'Reduza custos com manutenção e reaplicações. Proteção garantida por anos.',
                  icon: 'ri-money-dollar-circle-line',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="flex h-full">
                    <div className="w-32 flex-shrink-0 flex items-center justify-center bg-yellow-50">
                      <i className={`${item.icon} text-yellow-600 text-4xl`} />
                    </div>
                    <div className="flex-1 p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          ref={addToRefs('features')}
          className={`py-20 bg-white transition-all duration-1000 delay-900 ${
            isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-yellow-600 mb-4">Características Técnicas</h2>
              <p className="text-xl text-gray-700">Qualidade e segurança em cada detalhe</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Left column */}
              <div className="space-y-6">
                {['Produto Atóxico', 'Excelente Rendimento', 'Secagem Rápida'].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 transition-all duration-1000 ${
                      isVisible.features ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-check-line text-white text-lg" />
                      </div>
                      <div
                        className={`absolute inset-0 bg-yellow-600 rounded-full transition-all duration-1000 ${
                          isVisible.features ? 'scale-110 opacity-20' : 'scale-100 opacity-0'
                        }`}
                        style={{
                          animation: isVisible.features ? `pulse-${index} 2s ease-in-out infinite` : 'none',
                        }}
                      />
                    </div>

                    <div
                      className={`bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-1000 ${
                        isVisible.features ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                      }`}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {['Atende às Normas ABNT', 'Garantia Nanotech de 5 anos', 'Fácil Aplicação'].map(
                  (item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 transition-all duration-1000 ${
                        isVisible.features ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                      }`}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className="ri-check-line text-white text-lg" />
                        </div>
                        <div
                          className={`absolute inset-0 bg-yellow-600 rounded-full transition-all duration-1000 ${
                            isVisible.features ? 'scale-110 opacity-20' : 'scale-100 opacity-0'
                          }`}
                          style={{
                            animation: isVisible.features ? `pulse-${index + 3} 2s ease-in-out infinite` : 'none',
                          }}
                        />
                      </div>

                      <div
                        className={`bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-1000 ${
                          isVisible.features ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                        }`}
                      >
                        {item}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Section */}
        <section
          id="transformation"
          ref={addToRefs('transformation')}
          className={`py-20 bg-gradient-to-br from-gray-50 to-yellow-50 transition-all duration-1000 delay-1100 ${
            isVisible.transformation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Quem Já Transformou com Nanocril?</h2>
              <p className="text-xl text-gray-700">
                Clientes satisfeitos em todo o Brasil, do residencial ao industrial
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'João Silva',
                  location: 'Residência - SP',
                  testimonial:
                    'Acabaram-se os vazamentos no meu telhado! O Nanocril é incrível, fácil de aplicar e o resultado é duradouro.',
                  rating: 5,
                  type: 'Residencial',
                },
                {
                  name: 'Empresa ABC',
                  location: 'Indústria - MG',
                  testimonial:
                    'Substituímos a manta asfáltica por Nanocril em nossa fábrica e a diferença é enorme. Mais rápido, limpo e eficiente.',
                  rating: 5,
                  type: 'Industrial',
                },
                {
                  name: 'Maria Souza',
                  location: 'Residência - RJ',
                  testimonial:
                    'Finalmente um impermeabilizante que funciona de verdade! Minha laje está protegida e sem mofo.',
                  rating: 5,
                  type: 'Residencial',
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {[...Array(t.rating)].map((_, i) => (
                        <i key={i} className="ri-star-fill text-yellow-400 text-lg" />
                      ))}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        t.type === 'Residencial'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-yellow-200 text-yellow-900'
                      }`}
                    >
                      {t.type}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">{t.testimonial}</p>
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          ref={addToRefs('faq')}
          className={`py-20 bg-white transition-all duration-1000 delay-1300 ${
            isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-question-line text-yellow-600 text-2xl" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Dúvidas Frequentes</h2>
              <p className="text-xl text-gray-700">
                Esclarecemos as principais questões sobre nossa tecnologia
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  question: 'O que é o Nanocril?',
                  answer:
                    'O Nanocril é um impermeabilizante acrílico de alta performance, desenvolvido para proteger superfícies contra infiltrações e umidade. Diferente das soluções tradicionais, ele dispensa o uso de manta asfáltica ou argamassa, oferecendo praticidade, eficiência e durabilidade.',
                },
                {
                  question: 'Onde posso aplicar o produto?',
                  answer:
                    "O Nanocril é indicado para caixas d'água, piscinas, telhados, reservatórios, fundações, subsolos, indústrias, escolas, condomínios e residências. Pode ser aplicado em diversas superfícies que necessitam de impermeabilização confiável.",
                },
                {
                  question: 'O produto é fácil de aplicar?',
                  answer:
                    'Sim. O Nanocril pode ser aplicado com rolo, pincel ou pistola de pintura (airless), em apenas uma demão. O tempo de secagem é rápido, cerca de 4 horas, mesmo em ambientes com alta umidade.',
                },
                {
                  question: 'Quais os principais benefícios do Nanocril?',
                  answer:
                    'O Nanocril oferece alta elasticidade, o que permite acompanhar fissuras e rachaduras sem comprometer a impermeabilização, além de apresentar excelente resistência mecânica validada por testes técnicos. Outra vantagem é que ele dispensa o uso de reforços estruturais, reduzindo custos e tempo de obra, ao mesmo tempo em que garante proteção duradoura mesmo em áreas expostas a condições climáticas severas.',
                },
                {
                  question: 'O produto é seguro e sustentável?',
                  answer:
                    'Sim. O Nanocril é à base de água, não tóxico, sem solventes e com baixo impacto ambiental. Isso garante mais segurança para o aplicador, para quem utiliza o espaço e para o meio ambiente.',
                },
                {
                  question: 'Qual é o rendimento e a durabilidade do Nanocril?',
                  answer:
                    'Cada balde de 14 L rende até 21 m² de aplicação. O produto possui garantia de até 5 anos e vida útil prolongada, mantendo a impermeabilização eficiente por muito mais tempo em comparação com métodos convencionais.',
                },
                {
                  question: 'Qual o payback desse produto?',
                  answer:
                    'O Nanocril gera economia ao eliminar a necessidade de reforços estruturais, reduzir manutenções e oferecer maior durabilidade. Para cada projeto, a Nanotech disponibiliza estudos personalizados de custo‑benefício e payback. Basta entrar em contato para solicitar uma análise específica.',
                },
              ].map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="cta"
          ref={addToRefs('cta')}
          className={`py-20 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white transition-all duration-1000 delay-1500 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Não Espere Mais!
                  <br />
                  Transforme sua Obra Hoje Mesmo
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Faça parte dos milhares de brasileiros que já descobriram o
                  poder da nanotecnologia para impermeabilização eficaz e
                  duradoura.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl" />
                    <span>Orçamento gratuito e sem compromisso</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl" />
                    <span>Instalação rápida e profissional</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl" />
                    <span>Garantia de 5 anos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl" />
                    <span>Resultados imediatos</span>
                  </div>
                </div>

                <button
                  onClick={scrollToForm}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl whitespace-nowrap relative overflow-hidden"
                >
                  <span className="relative z-10">QUERO MEU ORÇAMENTO GRÁTIS</span>
                  <div className="absolute inset-0 bg-orange-400 rounded-xl animate-ping opacity-20"></div>
                  <div className="absolute inset-0 bg-orange-500 rounded-xl animate-bounce opacity-10"></div>
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Solicite seu Orçamento</h3>
                
                {/* Formulário Embutido com Tracking */}
                <div className="max-w-lg mx-auto p-5 bg-white rounded-lg shadow-lg">
                  <div className="text-center mb-5">
                    <h2 className="text-gray-800 text-2xl font-bold mb-2">Solicitar Orçamento</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Preencha o formulário abaixo e entraremos em contato em breve para apresentar a melhor solução para você.
                    </p>
                  </div>

                  <form id="crm-embedded-form-nanocril" className="w-full space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Seu nome" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="Seu e-mail" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Seu telefone" 
                        className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input 
                        type="text" 
                        name="subject" 
                        placeholder="Assunto da mensagem" 
                        className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <textarea 
                        name="message" 
                        placeholder="Escreva sua mensagem" 
                        rows={4} 
                        className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-900 bg-white resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      id="crm-embedded-submit-btn-nanocril"
                      className="w-full p-4 bg-orange-600 hover:bg-orange-700 text-white border-none rounded-md text-base font-bold cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 whitespace-nowrap"
                    >
                      Enviar Formulário
                    </button>

                    <div id="crm-embedded-message-nanocril" className="mt-4 p-3 rounded hidden"></div>
                  </form>
                </div>

                <Script
                  id="nanocril-form-script"
                  dangerouslySetInnerHTML={{
                    __html: `
                    (function() {
                      // Wait for DOM to be fully loaded
                      if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', initializeCRMEmbeddedNanocril);
                      } else {
                        initializeCRMEmbeddedNanocril();
                      }

                      function initializeCRMEmbeddedNanocril() {
                        try {
                          const form = document.getElementById('crm-embedded-form-nanocril');
                          const submitBtn = document.getElementById('crm-embedded-submit-btn-nanocril');
                          const messageDiv = document.getElementById('crm-embedded-message-nanocril');

                          if (!form || !submitBtn || !messageDiv) {
                            console.error('CRM Embedded Form Nanocril: Required elements not found');
                            return;
                          }

                          console.log('CRM Embedded Form Nanocril: Initialized successfully');

                          form.addEventListener('submit', async function(e) {
                            e.preventDefault();

                            submitBtn.disabled = true;
                            submitBtn.textContent = 'Enviando...';

                            const formData = new FormData(form);

                            try {
                              const response = await fetch('https://wtvrdalmgbhbomfridwe.supabase.co/functions/v1/leads', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  name: formData.get('name') || '',
                                  email: formData.get('email') || '',
                                  phone: formData.get('phone') || '',
                                  message: formData.get('subject') ? formData.get('subject') + '\\n\\n' + (formData.get('message') || '') : (formData.get('message') || ''),
                                  source: 'nanocril-form',
                                  produto: 'Nanocril'
                                })
                              });

                              if (response.ok) {
                                messageDiv.style.display = 'block';
                                messageDiv.style.background = '#d4edda';
                                messageDiv.style.color = '#155724';
                                messageDiv.style.border = '1px solid #c3e6cb';
                                messageDiv.textContent = 'Obrigado! Entraremos em contato em breve.';
                                messageDiv.classList.remove('hidden');
                                form.reset();
                                console.log('CRM Embedded Form Nanocril: Data sent successfully');
                              } else {
                                throw new Error('Erro no envio');
                              }
                            } catch (error) {
                              console.error('CRM Embedded Form Nanocril error:', error);
                              messageDiv.style.display = 'block';
                              messageDiv.style.background = '#f8d7da';
                              messageDiv.style.color = '#721c24';
                              messageDiv.style.border = '1px solid f5c6cb';
                              messageDiv.textContent = 'Erro ao enviar formulário. Tente novamente.';
                              messageDiv.classList.remove('hidden');
                            }

                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Enviar Formulário';
                          });
                        } catch (error) {
                          console.error('CRM Embedded Form Nanocril initialization error:', error);
                        }
                      }
                    })();
                  `
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Inline styles for animations */}
        <style jsx>{`
          @keyframes fade-in-left {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fade-in-right {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fade-in-left {
            animation: fade-in-left 1s ease-out;
          }

          .animate-fade-in-right {
            animation: fade-in-right 1s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}

// Optimized FAQ Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <i
          className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line text-gray-500 text-xl transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
