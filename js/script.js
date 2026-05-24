document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SISTEMA DE PERGUNTAS FREQUENTES (FAQ)
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', (e) => {
            // Previne comportamento padrão do botão dentro de formulários se houver
            e.preventDefault();

            const item = question.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('.faq-icon');

            // Fecha outros FAQs que por ventura estejam abertos
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherButton = otherItem.querySelector('.faq-question');
                const otherIcon = otherItem.querySelector('.faq-icon');

                if (otherItem !== item && otherAnswer.classList.contains('open')) {
                    otherAnswer.classList.remove('open');
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });

            // Liga ou desliga a classe de visualização aberta
            if (answer.classList.contains('open')) {
                answer.classList.remove('open');
                icon.textContent = '+';
            } else {
                answer.classList.add('open');
                icon.textContent = '−';
            }
        });
    });

    // ==========================================
    // 2. MONITOR DINÂMICO DE SEÇÕES (NAV ACTIVE)
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    const isMobile = window.innerWidth <= 768;
    const options = {
        root: null,
        rootMargin: isMobile ? '-25% 0px -55% 0px' : '-20% 0px -60% 0px',
        threshold: 0
    };

    const activateMenuLink = (targetId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 120;

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

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 120) {
            activateMenuLink('contato');
        }
    });
});