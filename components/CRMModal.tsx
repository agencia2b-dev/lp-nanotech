'use client';

import { useEffect } from 'react';

export default function CRMModal() {
  useEffect(() => {
    // Função para abrir modal
    (window as any).openCRMModal = () => {
      const modalOverlay = document.getElementById('crm-floating-modal-overlay');
      if (modalOverlay) {
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    };

    // Função para fechar modal
    (window as any).closeCRMModal = () => {
      const modalOverlay = document.getElementById('crm-floating-modal-overlay');
      if (modalOverlay) {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    };

    // Event listeners
    const floatingBtn = document.getElementById('crm-floating-btn');
    const modalOverlay = document.getElementById('crm-floating-modal-overlay');
    const closeModal = document.getElementById('crm-floating-close-modal');
    const form = document.getElementById('crm-floating-form') as HTMLFormElement;

    if (floatingBtn) {
      floatingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        (window as any).openCRMModal();
      });
    }

    if (closeModal) {
      closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        (window as any).closeCRMModal();
      });
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          (window as any).closeCRMModal();
        }
      });
    }

    // Form submission
    if (form) {
      const submitBtn = document.getElementById('crm-floating-submit-btn') as HTMLButtonElement;
      const messageDiv = document.getElementById('crm-floating-message') as HTMLDivElement;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!submitBtn || !messageDiv) return;

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
              source: 'homepage-form',
              produto: 'Geral'
            })
          });

          if (response.ok) {
            messageDiv.style.display = 'block';
            messageDiv.style.background = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
            messageDiv.textContent = 'Obrigado! Entraremos em contato em breve.';
            form.reset();

            setTimeout(() => {
              (window as any).closeCRMModal();
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

    // Configurar botões trigger
    document.querySelectorAll('.crm-trigger').forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        (window as any).openCRMModal();
      });
    });

    console.log('✅ CRM Modal inicializado');
  }, []);

  return null;
}
