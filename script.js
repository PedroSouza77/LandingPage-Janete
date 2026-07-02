document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        
        document.querySelectorAll('.faq-answer').forEach(item => {
            if (item !== answer) item.style.maxHeight = null;
        });

        answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + "px";
        button.querySelector('span').textContent = answer.style.maxHeight ? "-" : "+";
    });
});