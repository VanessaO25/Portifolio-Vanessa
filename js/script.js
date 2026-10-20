// Animação de aparecimento ao rolar a página
document.addEventListener('DOMContentLoaded', () => {
    const elementos = document.querySelectorAll('.aparecer');
  
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, {
      threshold: 0.15
    });
  
    elementos.forEach((el) => observador.observe(el));
  
    // Efeito de digitação no nome (apenas na página inicial)
    const nome = document.querySelector('.perfil-nome');
    if (nome && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      const textoOriginal = nome.textContent;
      nome.textContent = '';
      let i = 0;
      const digitar = () => {
        if (i < textoOriginal.length) {
          nome.textContent += textoOriginal.charAt(i);
          i++;
          setTimeout(digitar, 100);
        }
      };
      setTimeout(digitar, 500);
    }
  
    // Efeito de parallax suave nos blobs
    document.addEventListener('mousemove', (e) => {
      const blobs = document.querySelectorAll('.blob');
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
  
      blobs.forEach((blob, index) => {
        const fator = (index + 1) * 0.5;
        blob.style.transform = `translate(${x * fator}px, ${y * fator}px)`;
      });
    });
  
    // Ripple effect nos botões
    const botoes = document.querySelectorAll('.btn');
    botoes.forEach((botao) => {
      botao.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
  
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;
  
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  });
  
  // Animação do ripple
  const estiloRipple = document.createElement('style');
  estiloRipple.textContent = `
    @keyframes ripple {
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(estiloRipple);