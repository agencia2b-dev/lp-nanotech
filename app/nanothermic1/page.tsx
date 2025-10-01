
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';

// Optimized image URLs
const HERO_IMAGE = 'https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/9fa9cfc1adc498bffc84d12b6da03755.png?w=1200&h=800&q=85&f=webp';
const PRODUCT_IMAGE = 'https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/12586f964f455b6e8ad3dc6105429c02.png?w=400&h=400&q=85&f=webp';

export default function Nanothermic1() {
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
    const form = document.getElementById('crm-embedded-form-nt1') as HTMLFormElement;
    const submitBtn = document.getElementById('crm-embedded-submit-btn-nt1') as HTMLButtonElement;
    const messageDiv = document.getElementById('crm-embedded-message-nt1') as HTMLDivElement;

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
            source: 'nanothermic1-form',
            produto: 'Nanothermic 1'
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
    sectionsRef.current[id] = el;
  }, []);

  return (
    <>
      <Head>
        <title>Nanothermic 1 - Isolamento Térmico Avançado | Economia de 50% na Energia | Nanotech</title>
        <meta name="description" content="Nanothermic 1 - Redução térmica avançada com economia de até 50% na energia. 35% menos temperatura, 90% reflexão solar, 20 anos de durabilidade." />
        <meta name="keywords" content="Nanothermic 1, isolamento térmico, economia energia, redução temperatura, reflexão solar, revestimento térmico, nanotecnologia" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/nanothermic1`} />
        <meta property="og:title" content="Nanothermic 1 - Isolamento Térmico Avançado" />
        <meta property="og:description" content="Redução térmica avançada com economia de até 50% na energia" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/nanothermic1`} />
        <link rel="preload" as="image" href={HERO_IMAGE} />
        <link rel="preload" as="image" href={PRODUCT_IMAGE} />
      </Head>

      {/* Schema.org JSON-LD */}
      <Script
        id="nanothermic1-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Nanothermic 1",
            "description": "Revestimento reflexivo de alta performance para isolamento térmico avançado com economia de energia",
            "brand": {
              "@type": "Brand",
              "name": "Nanotech"
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "Nanotech"
            },
            "category": "Isolamento Térmico",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/nanothermic1`,
            "image": PRODUCT_IMAGE,
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "BRL"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "200"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Redução de Temperatura",
                "value": "35%"
              },
              {
                "@type": "PropertyValue",
                "name": "Reflexão Solar",
                "value": "90%"
              },
              {
                "@type": "PropertyValue",
                "name": "Economia de Energia",
                "value": "50%"
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
        id="nanothermic1-breadcrumb-schema"
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
                "name": "Nanothermic 1",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/nanothermic1`
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
          className={`relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8 animate-fade-in-left">
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Clima Perfeito com Nanotecnologia
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-green-600">Conforto, Economia</span>
                <br />
                <span className="text-orange-500">e Sustentabilidade</span>
              </h1>
              <div className="space-y-2">
                <p className="text-sm sm:text-base md:text-lg text-gray-700">
                  Reduza até <span className="text-green-600 font-bold text-base sm:text-lg md:text-xl">35% da temperatura</span> ambiente e economize até <span className="text-orange-500 font-bold text-base sm:text-lg md:text-xl">50% na sua conta de energia</span>. A tecnologia que protege seu bolso e o planeta.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToForm}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 md:px-12 py-4 md:py-5 rounded-xl font-bold text-base sm:text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10">QUERO MEU ORÇAMENTO GRÁTIS</span>
                  <div className="absolute inset-0 bg-green-400 rounded-xl animate-ping opacity-20"></div>
                  <div className="absolute inset-0 bg-green-400 rounded-xl animate-pulse opacity-30"></div>
                  <div className="absolute inset-0 bg-green-500 rounded-xl animate-bounce opacity-10"></div>
                </button>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="relative z-10">
                <Image
                  src={PRODUCT_IMAGE}
                  alt="Nanothermic 1 Product"
                  width={400}
                  height={400}
                  className="w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAABAwMFAQAAAAAAAAAAAAABAgMEBRESABIhMUFRYf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAZEQACAwEAAAAAAAAAAAAAAAAAARExUfD/2gAMAwEAAhEDEQA/AKdt9id41nytPhdxpNy2kUgAB+BZ2r//Z"
                />
              </div>
              <div className="absolute top-10 right-0 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute bottom-20 left-0 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </section>

        {/* Problem Section - Optimized */}
        <section
          id="problem"
          ref={addToRefs('problem')}
          className={`py-20 bg-white transition-all duration-1000 delay-300 ${isVisible.problem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Cansado de <span className="text-red-600">Calor Excessivo</span> e <span className="text-red-600">Contas Altas</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Você sabe o quanto o calor pode impactar seu conforto, a produtividade de sua equipe e, principalmente, seu orçamento. Ar condicionado no máximo, ambientes abafados, máquinas superaquecendo...
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'Calor Excessivo',
                  description: 'Ambientes abafados e desconfortáveis',
                  icon: 'ri-sun-line'
                },
                {
                  title: 'Contas de Energia Altas',
                  description: 'Gastos elevados com climatização',
                  icon: 'ri-money-dollar-circle-line'
                },
                {
                  title: 'Baixa Produtividade',
                  description: 'Equipe desmotivada pelo desconforto',
                  icon: 'ri-team-line'
                },
                {
                  title: 'Máquinas Superaquecendo',
                  description: 'Equipamentos com performance reduzida',
                  icon: 'ri-computer-line'
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
          className={`py-20 bg-gradient-to-r from-green-500 to-green-600 text-white transition-all duration-1000 delay-500 relative overflow-hidden ${isVisible.solution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{
            backgroundImage: 'url(https://readdy.ai/api/search-image?query=Modern%20building%20withadvanced%20thermal%20coating%2C%20solar%20reflection%20on%20glass%20surfaces%2C%20energy%20efficientarchitecture%20withclean%20sky%20background%2Cprofessional%20architectural%20photography%20showcasingsustainable%20constructionandtemperature%20control%20solutions&width=1200&height=600&seq=2&orientation=landscape)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/80 to-green-600/80"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              Temos a solução <span className="text-yellow-300">inteligente e duradoura</span>
            </h2>
            <p className="text-lg mb-12 max-w-4xl mx-auto opacity-90">
              O Nanothermic 1 é a tecnologia que vai transformar seu ambiente, reduzindo drasticamente a temperatura e os custos com energia.
            </p>
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-yellow-300">56%</div>
                <div className="text-lg font-semibold mb-1">Redução de Temperatura</div>
                <div className="text-sm opacity-80">Comprovada em testes</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-yellow-300">90%</div>
                <div className="text-lg font-semibold mb-1">Reflexão Solar</div>
                <div className="text-sm opacity-80">Máxima eficiência</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-yellow-300">50%</div>
                <div className="text-lg font-semibold mb-1">Economia de energia</div>
                <div className="text-sm opacity-80">Eficiência energética</div>
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
          className={`py-20 bg-gray-50 transition-all duration-1000 delay-700 ${isVisible.technology ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                <span className="text-green-600">Nanothermic 1:</span> <span className="text-gray-600">A Tecnologia que Transforma</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Descubra como nosso revestimento reflexivo de alta performance oferece resultados reais e mensuráveis.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex h-full">
                  <div className="w-32 flex-shrink-0 overflow-hidden">
                    <img
                      src="https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/15a613ae70235a9ecbc3997dd5609159.png"
                      alt="Conforto Térmico"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Conforto Térmico Incomparável</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Reduza a temperatura ambiente em até 35% e a do substrato em até 50%. Imagine um ambiente até 25,8°C em um dia de 58,9°C!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex h-full">
                  <div className="w-32 flex-shrink-0 overflow-hidden">
                    <img
                      src="https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/37906cb5e44512ce938750eeb4740b61.png"
                      alt="Economia de Energia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Economia de Energia Comprovada</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Diminua drasticamente o consumo do seu sistema de climatização. Menos gasto com ar condicionado significa mais dinheiro no seu bolso.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex h-full">
                  <div className="w-32 flex-shrink-0 overflow-hidden">
                    <img
                      src="https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/2f5231baca0c6f7f23ca8d478203321e.png"
                      alt="Sustentabilidade"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sustentabilidade na Prática</h3>
                    <p className="text-gray-600 leading-relaxed">
                      A cada 100m² aplicados de Nanothermic 1, você evita a emissão de 10 toneladas de CO₂ na atmosfera. Uma escolha eco-friendly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex h-full">
                  <div className="w-32 flex-shrink-0 overflow-hidden">
                    <img
                      src="https://static.readdy.ai/image/ac7d262f8d8a24729be824a84e392878/05e99101f70753c754f498c753f43f6a.png"
                      alt="Durabilidade e Garantia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Durabilidade e Garantia Estendida</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Com vida útil de até 20 anos e 5 anos de garantia, seu investimento está protegido. Não inflamável, atóxico e resistente à corrosão.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section
          id="features"
          ref={addToRefs('features')}
          className={`py-20 bg-gray-50 transition-all duration-1000 delay-900 relative overflow-hidden ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{
            backgroundImage: 'url(https://readdy.ai/api/search-image?query=Scientific%20laboratory%20with%20nanotechnology%20research%20equipment%2C%20microscopic%20particles%20and%20advanced%20thermal%20coating%20materials%2C%20clean%20white%20laboratory%20environment%20withmodern%20technology%20and%20research%20equipment%20for%20building%20materials%20development&width=1200&height=600&seq=3&orientation=landscape)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gray-50/90"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-600 mb-4">Características Técnicas</h2>
              <p className="text-xl text-gray-600">Qualidade e segurança em cada detalhe</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  'Fórmula à base de água',
                  'Não inflamável e atóxico',
                  'Aplicação simples e rápida'
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 transition-all duration-1000 delay-${(index + 1) * 200} ${isVisible.features ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                      }`}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-check-line text-white text-lg"></i>
                      </div>
                      <div
                        className={`absolute inset-0 bg-green-500 rounded-full transition-all duration-1000 delay-${(index + 1) * 300} ${isVisible.features ? 'scale-110 opacity-20' : 'scale-100 opacity-0'
                          }`}
                        style={{
                          animation: isVisible.features ? `pulse-${index} 2s ease-in-out infinite` : 'none'
                        }}
                      ></div>
                    </div>
                    <div
                      className={`bg-green-500 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-1000 delay-${(index + 1) * 400} transform ${isVisible.features ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                        }`}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[
                  'Proteção contra corrosão',
                  'Reduz dilatação térmica',
                  'Homologado em 167 países'
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 transition-all duration-1000 delay-${(index + 4) * 200} ${isVisible.features ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                      }`}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-check-line text-white text-lg"></i>
                      </div>
                      <div
                        className={`absolute inset-0 bg-green-500 rounded-full transition-all duration-1000 delay-${(index + 4) * 300} ${isVisible.features ? 'scale-110 opacity-20' : 'scale-100 opacity-0'
                          }`}
                        style={{
                          animation: isVisible.features ? `pulse-${index + 3} 2s ease-in-out infinite` : 'none'
                        }}
                      ></div>
                    </div>
                    <div
                      className={`bg-green-500 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-1000 delay-${(index + 4) * 400} transform ${isVisible.features ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
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
          className={`py-20 bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-1000 delay-1100 ${isVisible.transformation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Quem Já Transformou com Nanothermic 1?
              </h2>
              <p className="text-xl text-gray-600">Centenas de clientes satisfeitos em todo o Brasil</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Maria Silva',
                  location: 'São Paulo - SP',
                  testimonial: 'Incrível a diferença de temperatura! Minha conta de luz diminuiu 45% no primeiro mês.',
                  rating: 5,
                  savings: '45%'
                },
                {
                  name: 'João Santos',
                  location: 'Rio de Janeiro - RJ',
                  testimonial: 'O conforto térmico melhorou muito. Não preciso mais usar o ar condicionado o dia todo.',
                  rating: 5,
                  savings: '52%'
                },
                {
                  name: 'Ana Costa',
                  location: 'Belo Horizonte - MG',
                  testimonial: 'Investimento que vale a pena! Além da economia, o ambiente ficou muito mais agradável.',
                  rating: 5,
                  savings: '38%'
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-lg"></i>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">{testimonial.testimonial}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{testimonial.savings}</div>
                      <div className="text-xs text-gray-500">Economia</div>
                    </div>
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
          className={`py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white transition-all duration-1000 delay-1500 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Não Espere Mais!
                  Transforme sua Casa Hoje Mesmo
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Faça parte dos milhares de brasileiros que já descobriram o poder da nanotecnologia para economizar energia e ter mais conforto.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl"></i>
                    <span>Orçamento gratuito e sem compromisso</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl"></i>
                    <span>Instalação rápida e profissional</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl"></i>
                    <span>Garantia de 20 anos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-2xl"></i>
                    <span>Resultados imediatos</span>
                  </div>
                </div>
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

                  <form id="crm-embedded-form-nt1" className="w-full space-y-4">
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
                      id="crm-embedded-submit-btn-nt1"
                      className="w-full p-4 bg-orange-600 hover:bg-orange-700 text-white border-none rounded-md text-base font-bold cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 whitespace-nowrap"
                    >
                      Enviar Formulário
                    </button>

                    <div id="crm-embedded-message-nt1" className="mt-4 p-3 rounded hidden"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

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

        ${[0, 1, 2, 3, 4, 5]
          .map(
            i => `
              @keyframes pulse-${i} {
                0%, 100% { transform: scale(1.1); opacity: 0.2; }
                50% { transform: scale(1.3); opacity: 0.4; }
              }
            `
          )
          .join('')}
      `}</style>
    </>
  );
}

// FAQItem component (unchanged)
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
