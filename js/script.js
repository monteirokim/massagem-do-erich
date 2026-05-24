const questions =
    document.querySelectorAll(".faq-question");

questions.forEach((question) => {

    question.addEventListener("click", () => {

        const answer =
            question.nextElementSibling;

        const icon =
            question.querySelector(".faq-icon");

        const isOpen =
            answer.style.display === "block";

        document
            .querySelectorAll(".faq-answer")
            .forEach((item) => {

                item.style.display = "none";

            });

        document
            .querySelectorAll(".faq-icon")
            .forEach((item) => {

                item.textContent = "+";

            });

        if (!isOpen) {

            answer.style.display = "block";

            icon.textContent = "−";

        }

    });

});