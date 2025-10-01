
'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';

// Optimized image URLs
const HERO_IMAGE = 'https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/b5f9f15479d8d53b5d488318ef9710ee.png?w=1200&h=800&q=85&f=webp';
const PRODUCT_IMAGE = 'https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/89684c9f437d4586acf9c28aaefef34f.png?w=400&h=400&q=85&f=webp';

export default function Nanothermic3() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  const scrollToForm = useCallback(() => {
    const formElement = document.getElementById('cta');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const openWhatsApp = useCallback(() => {
    window.open('https://wa.me/5511956405311', '_blank');
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, []);

  // Form submission handler
  useEffect(() => {
    const form = document.getElementById('crm-embedded-form-nt3') as HTMLFormElement;
    const submitBtn = document.getElementById('crm-embedded-submit-btn-nt3') as HTMLButtonElement;
    const messageDiv = document.getElementById('crm-embedded-message-nt3') as HTMLDivElement;

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
            source: 'nanothermic3-form',
            produto: 'Nanothermic 3'
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
  
  const addToRefs = useCallback((id: string) => (el: HTMLElement | null) => {
    if (!sectionsRef.current) {
      sectionsRef.current = {};
    }
    sectionsRef.current[id] = el;
  }, []);

  return (
    <>
      <Head>
        <title>Nanothermic 3 - Máxima Performance Térmica Industrial | 40% Economia Energética | Nanotech</title>
        <meta name="description" content="Nanothermic 3 - Proteção, eficiência e durabilidade com isolamento térmico de alta tecnologia. 30% redução térmica, 90% proteção UV, 40% economia energética." />
        <meta name="keywords" content="Nanothermic 3, isolamento térmico industrial, performance térmica, economia energética, proteção UV, nanotecnologia industrial" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/nanothermic3`} />
        <meta property="og:title" content="Nanothermic 3 - Máxima Performance Térmica" />
        <meta property="og:description" content="Proteção, eficiência e durabilidade com isolamento térmico de alta tecnologia" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/nanothermic3`} />
        <link rel="preload" as="image" href={HERO_IMAGE} />
        <link rel="preload" as="image" href={PRODUCT_IMAGE} />
      </Head>

      {/* Schema.org JSON-LD */}
      <Script
        id="nanothermic3-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Nanothermic 3",
            "description": "Isolante térmico de alta tecnologia desenvolvido para ambientes industriais com máxima performance",
            "brand": {
              "@type": "Brand",
              "name": "Nanotech"
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "Nanotech"
            },
            "category": "Isolamento Térmico Industrial",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/nanothermic3`,
            "image": PRODUCT_IMAGE,
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "BRL"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "100"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Redução Térmica",
                "value": "30%"
              },
              {
                "@type": "PropertyValue",
                "name": "Proteção UV",
                "value": "90%"
              },
              {
                "@type": "PropertyValue",
                "name": "Economia Energética",
                "value": "40%"
              },
              {
                "@type": "PropertyValue",
                "name": "Durabilidade",
                "value": "20 anos"
              }
            ]
          })
        }}
      />

      <Script
        id="nanothermic3-breadcrumb-schema"
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
                "name": "Nanothermic 3",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/nanothermic3`
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
          className={`relative min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center transition-all duration-1000 ${ 
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8 animate-fade-in-left text-white">
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Proteção, Eficiência e Durabilidade
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Proteção, Eficiência</span>
                <br />
                <span className="text-yellow-300">e Durabilidade</span>
                <br />
                <span className="text-yellow-300">Nanothermic 3</span>
              </h1>
              <div className="space-y-4">
                <p className="text-lg text-blue-100">
                  Isolante térmico de alta tecnologia, desenvolvido para reduzir custos energéticos e aumentar a produtividade.
                </p>
                <p className="text-lg text-blue-100">
                  Referência em alta performance em isolamento.
                </p>
              </div>
              <div className="flex items-center gap-8 py-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-300">90%</div>
                  <div className="text-sm text-blue-200">Proteção UV</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-300">30%</div>
                  <div className="text-sm text-blue-200">Menos Temperatura</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-300">20</div>
                  <div className="text-xs text-blue-200">Anos de Garantia</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={scrollToForm}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-16 py-6 rounded-xl font-bold text-2xl transition-all duration-500 transform hover:scale-110 shadow-xl hover:shadow-2xl whitespace-nowrap relative overflow-hidden"
                >
                  <span className="relative z-10">SOLICITAR ORÇAMENTO</span>
                  <div className="absolute inset-0 bg-yellow-200 rounded-xl animate-ping opacity-20"></div>
                  <div className="absolute inset-0 bg-yellow-200 rounded-xl animate-pulse opacity-30"></div>
                  <div className="absolute inset-0 bg-yellow-300 rounded-xl animate-bounce opacity-10"></div>
                  <div className="absolute inset-0 bg-yellow-100 rounded-xl animate-ping opacity-15" style={{animationDelay: '0.5s'}}></div>
                </button>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="relative z-10">
                <Image 
                  src={PRODUCT_IMAGE}
                  alt="Nanothermic 3 Product"
                  width={400}
                  height={400}
                  className="w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAABAwMFAAAAAAAAAAAAAAACAQMEBREGEiEUMUFRgf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEh/9oADAMBAAIRAxEAPwC7W9Uq5h9M2kTqX2gLhN8Bf7lBv//Z"
                />
              </div>
              <div className="absolute top-10 right-0 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute bottom-20 left-0 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
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
                Cansado de <span className="text-red-600">Altos Custos</span> com <span className="text-red-600">Energia Industrial</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Indústrias enfrentam desafios enormes com controle térmico, consumo energético excessivo e perda de produtividade devido ao calor. O Nanothermic 3 é a solução definitiva.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'Custos Energéticos Altos',
                  description: 'Gastos excessivos com climatização industrial',
                  icon: 'ri-money-dollar-circle-line'
                },
                {
                  title: 'Equipamentos Superaquecendo',
                  description: 'Redução de vida útil e eficiência',
                  icon: 'ri-computer-line'
                },
                {
                  title: 'Perda de Produtividade',
                  description: 'Ambientes inadequados afetam o rendimento',
                  icon: 'ri-team-line'
                },
                {
                  title: 'Manutenção Frequente',
                  description: 'Paradas não programadas e custos extras',
                  icon: 'ri-tools-line'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 group hover:transform hover:scale-105 transition-all duration-300 bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
                  <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} text-red-600 text-3xl`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section 
          id="solution" 
          ref={addToRefs('solution')}
          className={`py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all duration-1000 delay-500 relative overflow-hidden ${ 
            isVisible.solution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">Nanothermic 3:</span> <span className="text-yellow-300">Máxima Performance Industrial</span>
            </h2>
            <p className="text-lg mb-12 max-w-4xl mx-auto opacity-90">
              A tecnologia mais avançada em isolamento térmico, desenvolvida especificamente para ambientes industriais de alta demanda.
            </p>
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-yellow-300">30%</div>
                <div className="text-lg font-semibold mb-1">Redução Térmica</div>
                <div className="text-sm opacity-80">Controle de temperatura superior</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-yellow-300">90%</div>
                <div className="text-lg font-semibold mb-1">Proteção UV</div>
                <div className="text-sm opacity-80">Bloqueio máximo de radiação</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-yellow-300">40%</div>
                <div className="text-lg font-semibold mb-1">Economia Energética</div>
                <div className="text-sm opacity-80">Redução significativa nos custos</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-yellow-300">20</div>
                <div className="text-lg font-semibold mb-1">Anos de Durabilidade</div>
                <div className="text-sm opacity-80">Investimento de longo prazo</div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section 
          id="technology" 
          ref={addToRefs('technology')}
          className={`py-20 bg-gray-50 transition-all duration-1000 delay-700 ${ 
            isVisible.technology ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                <span className="text-blue-600">Tecnologia Avançada</span> para <span className="text-gray-600">Resultados Excepcionais</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Desenvolvido com nanotecnologia de ponta para oferecer máxima eficiência térmica em ambientes industriais.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex h-full">
                  <div className="w-32 flex-shrink-0 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Advanced%20thermal%20insulation%20technology%20with%20industrial%20coating%20application%20showing%20high-performance%20thermal%20management%20system%20for%20manufacturing%20facilities%20and%20energy%20efficiency%20improvements&width=128&height=200&seq=thermal1&orientation=portrait"
                      alt="Isolamento Térmico Superior"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Isolamento Térmico Superior</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Tecnologia de ponta que reduz drasticamente a transferência de calor, mantendo ambientes industriais em temperaturas ideais.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex h-full">
                  <div className="w-32 flex-shrink-0 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Industrial%20energy%20efficiency%20with%20reduced%20power%20consumption%20meters%20and%20green%20energy%20indicators%20showing%20sustainable%20manufacturing%20operations%20and%20cost%20savings&width=128&height=200&seq=efficiency1&orientation=portrait"
                      alt="Eficiência Energética Industrial"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Eficiência Energética Industrial</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Reduza significativamente o consumo energético de sistemas de climatização, gerando economia imediata e sustentável.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex h-full">
                  <div className="w-32 flex-shrink-0 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Industrial%20durability%20with%20protective%20coating%20on%20manufacturing%20equipment%20showing%20long-term%20protection%20against%20harsh%20industrial%20environments%20and%20weather%20conditions&width=128&height=200&seq=durability1&orientation=portrait"
                      alt="Durabilidade Industrial"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Durabilidade Industrial</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Resistente às condições mais severas, com vida útil de até 20 anos, reduzindo custos de manutenção e reaplicação.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex h-full">
                  <div className="w-32 flex-shrink-0 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Easy%20industrial%20application%20with%20professional%20coating%20equipment%20and%20simple%20installation%20process%20for%20thermal%20management%20systems%20in%20manufacturing%20facilities%20with%20professional%20workers%20applying%20thermal%20coating&width=128&height=200&seq=application2&orientation=portrait"
                      alt="Aplicação Simplificada"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aplicação Simplificada</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Processo de aplicação rápido e eficiente, minimizando paradas de produção e reduzindo custos operacionais.
                    </p>
                  </div>
                </div>
              </div>
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
              <h2 className="text-4xl font-bold text-blue-600 mb-4">Características Técnicas</h2>
              <p className="text-xl text-gray-600">Qualidade e performance industrial comprovadas</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  'Resistente a Produtos Químicos',
                  'Proteção Anti-Corrosiva',
                  'Aplicação em Múltiplas Superfícies'
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-4 transition-all duration-1000 delay-${(index + 1) * 200} ${ 
                      isVisible.features ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-check-line text-white text-lg"></i>
                      </div>
                      <div 
                        className={`absolute inset-0 bg-blue-500 rounded-full transition-all duration-1000 delay-${(index + 1) * 300} ${ 
                          isVisible.features ? 'scale-110 opacity-20' : 'scale-100 opacity-0'
                        }`}
                        style={{
                          animation: isVisible.features ? `pulse-${index} 2s ease-in-out infinite` : 'none'
                        }}
                      ></div>
                    </div>
                    <div 
                      className={`bg-blue-500 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-1000 delay-${(index + 1) * 400} transform ${ 
                        isVisible.features ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                      }`}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[
                  'Atende Normas Industriais',
                  'Garantia Estendida de 20 anos',
                  'Homologado Internacionalmente'
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-4 transition-all duration-1000 delay-${(index + 4) * 200} ${ 
                      isVisible.features ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <i className="ri-check-line text-white text-lg"></i>
                      </div>
                      <div 
                        className={`absolute inset-0 bg-blue-500 rounded-full transition-all duration-1000 delay-${(index + 4) * 300} ${ 
                          isVisible.features ? 'scale-110 opacity-20' : 'scale-100 opacity-0'
                        }`}
                        style={{
                          animation: isVisible.features ? `pulse-${index + 3} 2s ease-in-out infinite` : 'none'
                        }}
                      ></div>
                    </div>
                    <div 
                      className={`bg-blue-500 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-1000 delay-${(index + 4) * 400} transform ${ 
                        isVisible.features ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                      }`}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Section */}
        <section 
          id="transformation" 
          ref={addToRefs('transformation')}
          className={`py-20 bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-1000 delay-1100 ${ 
            isVisible.transformation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Quem Já Transformou com Nanothermic 3?
              </h2>
              <p className="text-xl text-gray-600">Indústrias líderes confiam em nossa tecnologia</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Indústria Metalúrgica XYZ', 
                  location: 'São Paulo - SP', 
                  testimonial: 'Redução de 35% nos custos de climatização. O Nanothermic 3 superou nossas expectativas de performance.',
                  rating: 5,
                  type: 'Metalúrgica'
                },
                { 
                  name: 'Petroquímica ABC', 
                  location: 'Rio de Janeiro - RJ', 
                  testimonial: 'Aplicação em nossos tanques de armazenamento resultou em controle térmico excepcional e economia significativa.',
                  rating: 5,
                  type: 'Petroquímica'
                },
                { 
                  name: 'Alimentícia DEF', 
                  location: 'Minas Gerais - MG', 
                  testimonial: 'Mantém a temperatura ideal em nossos galpões de produção. Investimento que se pagou rapidamente.',
                  rating: 5,
                  type: 'Alimentícia'
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="ri-star-fill text-yellow-400 text-lg"></i>
                      ))}
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {testimonial.type}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">{testimonial.testimonial}</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          id="cta" 
          ref={addToRefs('cta')}
          className={`py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all duration-1000 delay-1500 ${ 
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Transforme sua Indústria!
                  <br />
                  Solicite uma Análise Técnica
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Descubra como o Nanothermic 3 pode revolucionar a eficiência energética e produtividade da sua operação industrial.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl"></i>
                    <span>Análise técnica gratuita e detalhada</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl"></i>
                    <span>Estudo de ROI personalizado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl"></i>
                    <span>Garantia de 20 anos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl"></i>
                    <span>Resultados comprovados</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Solicite sua Análise Técnica</h3>
                
                {/* Formulário Embutido com Tracking */}
                <div className="max-w-lg mx-auto p-5 bg-white rounded-lg shadow-lg">
                  <div className="text-center mb-5">
                    <h2 className="text-gray-800 text-2xl font-bold mb-2">Solicitar Orçamento</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Preencha o formulário abaixo e entraremos em contato em breve para apresentar a melhor solução para você.
                    </p>
                  </div>

                  <form id="crm-embedded-form-nt3" className="w-full space-y-4">
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
                      id="crm-embedded-submit-btn-nt3"
                      className="w-full p-4 bg-orange-600 hover:bg-orange-700 text-white border-none rounded-md text-base font-bold cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 whitespace-nowrap"
                    >
                      Enviar Formulário
                    </button>

                    <div id="crm-embedded-message-nt3" className="mt-4 p-3 rounded hidden"></div>
                  </form>
                </div>

                <script dangerouslySetInnerHTML={{
                  __html: `
                    (function() {
                      // Wait for DOM to be fully loaded
                      if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', initializeCRMEmbeddedNT3);
                      } else {
                        initializeCRMEmbeddedNT3();
                      }

                      function initializeCRMEmbeddedNT3() {
                        try {
                          const form = document.getElementById('crm-embedded-form-nt3');
                          const submitBtn = document.getElementById('crm-embedded-submit-btn-nt3');
                          const messageDiv = document.getElementById('crm-embedded-message-nt3');

                          if (!form || !submitBtn || !messageDiv) {
                            console.error('CRM Embedded Form NT3: Required elements not found');
                            return;
                          }

                          console.log('CRM Embedded Form NT3: Initialized successfully');

                          // Collect initial tracking data
                          if (typeof collectCRMTrackingData === 'function') {
                            collectCRMTrackingData();
                          }

                          form.addEventListener('submit', async function(e) {
                            e.preventDefault();

                            submitBtn.disabled = true;
                            submitBtn.textContent = 'Enviando...';

                            const formData = new FormData(form);

                            try {
                              let response;
                              if (typeof sendCRMFormData === 'function') {
                                response = await sendCRMFormData(formData, 'https://wtvrdalmgbhbomfridwe.supabase.co/functions/v1/leads');
                              } else {
                                // Fallback if the function is not available
                                response = await fetch('https://wtvrdalmgbhbomfridwe.supabase.co/functions/v1/leads', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    name: formData.get('name') || '',
                                    email: formData.get('email') || '',
                                    phone: formData.get('phone') || '',
                                    message: formData.get('subject') ? formData.get('subject') + '\\n\\n' + (formData.get('message') || '') : (formData.get('message') || ''),
                                    source: 'nanothermic3-form',
                                    produto: 'Nanothermic 3'
                                  })
                                });
                              }

                              if (response.ok) {
                                messageDiv.style.display = 'block';
                                messageDiv.style.background = '#d4edda';
                                messageDiv.style.color = '#155724';
                                messageDiv.style.border = '1px solid #c3e6cb';
                                messageDiv.textContent = 'Obrigado! Entraremos em contato em breve.';
                                messageDiv.classList.remove('hidden');
                                form.reset();
                                console.log('CRM Embedded Form NT3: Data sent successfully');
                              } else {
                                throw new Error('Erro no envio');
                              }
                            } catch (error) {
                              console.error('CRM Embedded Form NT3 error:', error);
                              messageDiv.style.display = 'block';
                              messageDiv.style.background = '#f8d7da';
                              messageDiv.style.color = '#721c24';
                              messageDiv.style.border = '1px solid #f5c6cb';
                              messageDiv.textContent = 'Erro ao enviar formulário. Tente novamente.';
                              messageDiv.classList.remove('hidden');
                            }

                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Enviar Formulário';
                          });

                          // Hover effect
                          submitBtn.addEventListener('mouseover', function() {
                            if (!this.disabled) {
                              this.style.background = '#ea580c';
                            }
                          });

                          submitBtn.addEventListener('mouseout', function() {
                            if (!this.disabled) {
                              this.style.background = '#ea580c';
                            }
                          });
                        } catch (error) {
                          console.error('CRM Embedded Form NT3 initialization error:', error);
                        }
                      }
                    })();
                  `
                }} />
              </div>
            </div>
          </div>
        </section>

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

          ${[0, 1, 2, 3, 4, 5].map(i => `
            @keyframes pulse-${i} {
              0%, 100% { transform: scale(1.1); opacity: 0.2; }
              50% { transform: scale(1.3); opacity: 0.4; }
            }
          `).join('')}
        `}</style>
      </div>
    </>
  );
}

// ... existing code ...

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line text-gray-500 text-xl transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
