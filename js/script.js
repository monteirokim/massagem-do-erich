document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SISTEMA DE PERGUNTAS FREQUENTES (FAQ)
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');

            // Fecha outros FAQs abertos
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.nextElementSibling.style.style.display = 'none';
                    otherQuestion.querySelector('.faq-icon').textContent = '+';
                }
            });

            // Abre ou fecha o FAQ clicado
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.textContent = '+';
            } else {
                answer.style.display = 'block';
                icon.textContent = '−';
            }
        });
    });

    // ==========================================
    // 2. MONITOR DINÂMICO DE SEÇÕES (NAV ACTIVE)
    // ==========================================
    const sections = document.querySelectorAll('section[id], main > section');
    const navLinks = document.querySelectorAll('nav a');

    // Margens de detecção padrão
    const isMobile = window.innerWidth <= 768;
    const rootMarginTop = isMobile ? '-25%' : '-20%';
    const rootMarginBottom = isMobile ? '-55%' : '-60%';

    const options = {
        root: null,
        rootMargin: `${rootMarginTop} 0px ${rootMarginBottom} 0px`,
        threshold: 0
    };

    // Função auxiliar para iluminar o botão correto instantaneamente
    const activateMenuLink = (targetId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        // Se o usuário colou no fim da página, força o botão Contato sem delay
        const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;

        if (scrolledToBottom) {
            activateMenuLink('contato');
            return;
        }

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                activateMenuLink(id);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Ouvinte extra de rolagem para garantir sincronia perfeita no fim da página
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
            activateMenuLink('contato');
        }
    });
});