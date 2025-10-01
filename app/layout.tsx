
import type { Metadata } from "next";
import { Inter, Roboto_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CRMModal from "../components/CRMModal";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nanotech - Produtos de Nanotecnologia para Isolamento Térmico e Impermeabilização",
  description: "Soluções inovadoras em nanotecnologia para isolamento térmico e impermeabilização. Nanothermic 1, Nanocril e Nanothermic 3 com até 50% de economia de energia e 20 anos de garantia.",
  keywords: "nanotecnologia, isolamento térmico, impermeabilização, Nanothermic, Nanocril, economia energia, revestimento térmico, borracha líquida",
  authors: [{ name: "Nanotech" }],
  creator: "Nanotech",
  publisher: "Nanotech",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Nanotech",
    title: "Nanotech - Produtos de Nanotecnologia",
    description: "Soluções inovadoras em nanotecnologia para isolamento térmico e impermeabilização",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nanotech - Produtos de Nanotecnologia",
    description: "Soluções inovadoras em nanotecnologia para isolamento térmico e impermeabilização",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W6FRRVH');`
        }} />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://static.readdy.ai" />
        <link rel="preconnect" href="https://nanotechdobrasil.com.br" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="https://nanotechdobrasil.com.br/wp-content/uploads/2025/07/logotipo.png" as="image" />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Schema.org JSON-LD */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Nanotech",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/logo.png`,
              "description": "Empresa especializada em soluções de nanotecnologia para isolamento térmico e impermeabilização",
              "foundingDate": "2020",
              "industry": "Nanotecnologia",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-11-95640-5311",
                "contactType": "customer service",
                "availableLanguage": "Portuguese"
              },
              "sameAs": []
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${robotoMono.variable} ${pacifico.variable}`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-W6FRRVH"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* CRM Modal Handler */}
        <CRMModal />

        {/* Botão Flutuante CRM */}
        <div 
          id="crm-floating-btn" 
          style={{
            position: 'fixed', 
            bottom: '20px', 
            right: '20px', 
            zIndex: 9999, 
            cursor: 'pointer', 
            background: '#25d366', 
            color: 'white', 
            borderRadius: '50px', 
            padding: '15px 20px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
            transition: 'all 0.3s ease', 
            fontWeight: 'bold', 
            fontSize: '14px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Solicitar Orçamento
        </div>

        {/* Modal do Formulário */}
        <div 
          id="crm-floating-modal-overlay" 
          style={{
            display: 'none', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'rgba(0,0,0,0.5)', 
            zIndex: 10000, 
            justifyContent: 'center', 
            alignItems: 'center'
          }}
        >
          <div 
            id="crm-floating-modal-content" 
            style={{
              background: 'white', 
              borderRadius: '12px', 
              padding: 0, 
              maxWidth: '500px', 
              width: '90%', 
              maxHeight: '90vh', 
              overflowY: 'auto', 
              position: 'relative', 
              animation: 'slideIn 0.3s ease'
            }}
          >
            {/* Header do Modal */}
            <div style={{
              background: '#25d366', 
              color: 'white', 
              padding: '20px', 
              borderRadius: '12px 12px 0 0', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{margin: 0, fontSize: '18px', fontWeight: 'bold'}}>Solicitar Orçamento</h3>
                <div style={{marginTop: '5px', fontSize: '14px', opacity: 0.9}}>
                  <p>Preencha o formulário abaixo e entraremos em contato em breve para apresentar a melhor solução para você.</p>
                </div>
              </div>
              <button 
                id="crm-floating-close-modal" 
                style={{
                  background: 'none', 
                  border: 'none', 
                  color: 'white', 
                  fontSize: '24px', 
                  cursor: 'pointer', 
                  padding: 0, 
                  lineHeight: 1
                }}
              >
                &times;
              </button>
            </div>

            {/* Formulário */}
            <div style={{padding: '30px'}}>
              <form id="crm-floating-form" style={{width: '100%'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px'}}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Seu nome" 
                    required 
                    style={{
                      padding: '12px', 
                      border: '1px solid #ddd', 
                      borderRadius: '6px', 
                      fontSize: '14px', 
                      color: '#333', 
                      backgroundColor: '#fff'
                    }} 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Seu e-mail" 
                    required 
                    style={{
                      padding: '12px', 
                      border: '1px solid #ddd', 
                      borderRadius: '6px', 
                      fontSize: '14px', 
                      color: '#333', 
                      backgroundColor: '#fff'
                    }} 
                  />
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px'}}>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Seu telefone" 
                    style={{
                      padding: '12px', 
                      border: '1px solid #ddd', 
                      borderRadius: '6px', 
                      fontSize: '14px', 
                      color: '#333', 
                      backgroundColor: '#fff'
                    }} 
                  />
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="Assunto da mensagem" 
                    style={{
                      padding: '12px', 
                      border: '1px solid #ddd', 
                      borderRadius: '6px', 
                      fontSize: '14px', 
                      color: '#333', 
                      backgroundColor: '#fff'
                    }} 
                  />
                </div>
                <div style={{marginBottom: '20px'}}>
                  <textarea 
                    name="message" 
                    placeholder="Escreva sua mensagem" 
                    rows={4} 
                    style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd', 
                      borderRadius: '6px', 
                      fontSize: '14px', 
                      resize: 'vertical', 
                      color: '#333', 
                      backgroundColor: '#fff'
                    }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  id="crm-floating-submit-btn"
                  style={{
                    width: '100%', 
                    padding: '15px', 
                    background: '#ff5722', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    cursor: 'pointer', 
                    transition: 'background 0.3s'
                  }}
                >
                  Enviar Formulário
                </button>

                <div 
                  id="crm-floating-message" 
                  style={{
                    marginTop: '15px', 
                    padding: '10px', 
                    borderRadius: '4px', 
                    display: 'none'
                  }}
                ></div>
              </form>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: scale(0.9) translateY(20px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }

            #crm-floating-btn:hover {
              transform: scale(1.05);
              box-shadow: 0 6px 20px rgba(0,0,0,0.4);
            }

            @media (max-width: 768px) {
              #crm-floating-modal-content {
                width: 95% !important;
                margin: 10px;
              }

              #crm-floating-modal-content > div:last-child {
                padding: 20px !important;
              }

              #crm-floating-modal-content form > div {
                grid-template-columns: 1fr !important;
              }
            }
          `
        }} />

        <Script
          id="crm-tracking-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            // Aguardar carregamento completo
            if (typeof window !== 'undefined') {
              window.addEventListener('load', function() {
                setTimeout(function() {
                  initializeCRMSystem();
                }, 1000);
              });
            }

            function initializeCRMSystem() {
              // Verificar se já foi inicializado
              if (typeof window !== 'undefined' && window.crmSystemInitialized) {
                return;
              }
              
              try {
                console.log('🚀 Inicializando sistema CRM...');
                
                // Marcar como inicializado
                if (typeof window !== 'undefined') {
                  window.crmSystemInitialized = true;
                }

                // Função para coletar dados de tracking
                if (typeof window !== 'undefined') {
                  window.collectCRMTrackingData = function() {
                    try {
                      const urlParams = new URLSearchParams(window.location.search);
                      const isProductPage = window.location.pathname.includes('/nano');

                      return {
                        pageUrl: window.location.href,
                        referrerUrl: document.referrer || '',
                        userAgent: navigator.userAgent || '',
                        screenResolution: (screen.width && screen.height) ? screen.width + 'x' + screen.height : 'unknown',
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
                        isProductPage: isProductPage,
                        utmSource: urlParams.get('utm_source') || '',
                        utmMedium: urlParams.get('utm_medium') || '',
                        utmCampaign: urlParams.get('utm_campaign') || ''
                      };
                    } catch (error) {
                      console.error('Erro ao coletar dados:', error);
                      return {};
                    }
                  };
                }

                // Função para enviar dados do formulário
                if (typeof window !== 'undefined') {
                  window.sendCRMFormData = function(formData, endpoint) {
                    const trackingData = window.collectCRMTrackingData();

                    const data = {
                      name: formData.get('name') || '',
                      email: formData.get('email') || '',
                      phone: formData.get('phone') || '',
                      company: '',
                      message: formData.get('subject') ? formData.get('subject') + '\\n\\n' + (formData.get('message') || '') : (formData.get('message') || ''),
                      city: '',
                      status: 'lead',
                      source: trackingData.isProductPage ? 'product-form' : 'contact-form',
                      value: 0,
                      produto: trackingData.isProductPage ? 'Produto' : 'Geral',
                      tracking: trackingData
                    };

                    return fetch(endpoint, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data)
                    });
                  };
                }

                // Função para abrir modal
                if (typeof window !== 'undefined') {
                  window.openCRMModal = function() {
                    const modalOverlay = document.getElementById('crm-floating-modal-overlay');
                    if (modalOverlay) {
                      modalOverlay.style.display = 'flex';
                      document.body.style.overflow = 'hidden';
                    }
                  };
                }

                // Função para fechar modal
                if (typeof window !== 'undefined') {
                  window.closeCRMModal = function() {
                    const modalOverlay = document.getElementById('crm-floating-modal-overlay');
                    if (modalOverlay) {
                      modalOverlay.style.display = 'none';
                      document.body.style.overflow = '';
                    }
                  };
                }

                // Configurar eventos do modal
                setupCRMModal();

                console.log('✅ Sistema CRM inicializado com sucesso');

              } catch (error) {
                console.error('❌ Erro ao inicializar sistema CRM:', error);
                if (typeof window !== 'undefined') {
                  window.crmSystemInitialized = false;
                }
              }
            }

            function setupCRMModal() {
              const floatingBtn = document.getElementById('crm-floating-btn');
              const modalOverlay = document.getElementById('crm-floating-modal-overlay');
              const closeModal = document.getElementById('crm-floating-close-modal');
              const form = document.getElementById('crm-floating-form');

              if (!floatingBtn || !modalOverlay || !closeModal || !form) {
                console.error('Elementos do modal não encontrados');
                return;
              }

              // Botão flutuante
              floatingBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (typeof window !== 'undefined' && window.openCRMModal) {
                  window.openCRMModal();
                }
              });

              // Fechar modal
              closeModal.addEventListener('click', function(e) {
                e.preventDefault();
                if (typeof window !== 'undefined' && window.closeCRMModal) {
                  window.closeCRMModal();
                }
              });

              // Fechar clicando no overlay
              modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                  if (typeof window !== 'undefined' && window.closeCRMModal) {
                    window.closeCRMModal();
                  }
                }
              });

              // Configurar botões trigger
              document.querySelectorAll('.crm-trigger').forEach(function(button) {
                button.addEventListener('click', function(e) {
                  e.preventDefault();
                  if (typeof window !== 'undefined' && window.openCRMModal) {
                    window.openCRMModal();
                  }
                });
              });

              // Formulário
              form.addEventListener('submit', async function(e) {
                e.preventDefault();

                const submitBtn = document.getElementById('crm-floating-submit-btn');
                const messageDiv = document.getElementById('crm-floating-message');

                if (submitBtn.disabled) return;

                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';

                try {
                  const formData = new FormData(form);
                  let response;
                  
                  if (typeof window !== 'undefined' && window.sendCRMFormData) {
                    response = await window.sendCRMFormData(formData, 'https://wtvrdalmgbhbomfridwe.supabase.co/functions/v1/leads');
                  } else {
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
                        source: 'homepage-form',
                        produto: 'Geral'
                      })
                    });
                  }

                  if (response.ok) {
                    messageDiv.style.display = 'block';
                    messageDiv.style.background = '#d4edda';
                    messageDiv.style.color = '#155724';
                    messageDiv.style.border = '1px solid #c3e6cb';
                    messageDiv.textContent = 'Obrigado! Entraremos em contato em breve.';
                    form.reset();

                    setTimeout(function() {
                      if (typeof window !== 'undefined' && window.closeCRMModal) {
                        window.closeCRMModal();
                      }
                      messageDiv.style.display = 'none';
                    }, 3000);
                  } else {
                    throw new Error('Erro no envio');
                  }
                } catch (error) {
                  console.error('Erro no formulário:', error);
                  messageDiv.style.display = 'block';
                  messageDiv.style.background = '#f8d7da';
                  messageDiv.style.color = '#721c24';
                  messageDiv.style.border = '1px solid #f5c6cb';
                  messageDiv.textContent = 'Erro ao enviar formulário. Tente novamente.';
                }

                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Formulário';
              });
            }
          `
          }}
        />

      </body>
    </html>
  )
}
