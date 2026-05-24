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
                    otherQuestion.nextElementSibling.style.display = 'none';
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

    // Ajusta a margem de detecção dependendo do tamanho da tela (Mobile vs Desktop)
    const isMobile = window.innerWidth <= 768;
    const rootMarginTop = isMobile ? '-35%' : '-20%';
    const rootMarginBottom = isMobile ? '-45%' : '-60%';

    const options = {
        root: null,
        rootMargin: `${rootMarginTop} 0px ${rootMarginBottom} 0px`,
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});