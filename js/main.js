/* Global script for small interactivity: nav active link, contact handler, and quiz game. */

document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    if (document.querySelector('#quiz')) {
        initQuiz();
    }
});

function setActiveNav() {
    const links = document.querySelectorAll('nav a.nav-link');
    const current = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
        const href = a.getAttribute('href');
        if (href === current) a.classList.add('active');
    });
}

/* ------------------------------
   Contact form handler (career.html)
   ------------------------------ */
function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const result = document.getElementById('contactResult');

    if (!name || !email || !message) {
        result.textContent = 'Please complete all fields.';
        return false;
    }

    // Simulate sending — this site is static so we just show a friendly message.
    result.textContent = `Thanks, ${name}! Your message looks great. (This is a demo contact handler.)`;
    document.getElementById('contactForm').reset();
    return false;
}

/* ------------------------------
   Quiz: Simple marketing quiz (game.html)
   ------------------------------ */
const quizQuestions = [
    {
        q: "What does 'CTA' stand for in marketing?",
        options: ["Call to Action", "Content to Advertise", "Click Through Average", "Customer Targeting Area"],
        a: 0
    },
    {
        q: "Which metric measures the percentage of people who click an ad after seeing it?",
        options: ["Conversion Rate", "Click-Through Rate", "Bounce Rate", "Engagement Rate"],
        a: 1
    },
    {
        q: "Which platform is best-known for short-form vertical video content?",
        options: ["LinkedIn", "TikTok", "Pinterest", "Medium"],
        a: 1
    },
    {
        q: "In storytelling, the 'hero' is usually:",
        options: ["A brand's competitor", "The audience or customer", "The product only", "A designer"],
        a: 1
    },
    {
        q: "SEO primarily helps with:",
        options: ["Paid ad placement", "Organic search visibility", "Email deliverability", "Influencer reach"],
        a: 1
    }
];

function initQuiz() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';

    quizQuestions.forEach((qq, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'quiz-question';
        qDiv.id = `q${idx}`;

        const qTitle = document.createElement('p');
        qTitle.innerHTML = `<strong>Q${idx + 1}.</strong> ${qq.q}`;
        qDiv.appendChild(qTitle);

        qq.options.forEach((opt, i) => {
            const optId = `q${idx}_opt${i}`;
            const label = document.createElement('label');
            label.style.display = 'block';
            label.style.margin = '0.35rem 0';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `q${idx}`;
            input.value = i;
            input.id = optId;

            label.appendChild(input);

            const span = document.createElement('span');
            span.textContent = ' ' + opt;
            label.appendChild(span);

            qDiv.appendChild(label);
        });

        quizDiv.appendChild(qDiv);
    });

    document.getElementById('submitQuiz').addEventListener('click', gradeQuiz);
    document.getElementById('resetQuiz').addEventListener('click', initQuiz);

    // clear result
    const r = document.getElementById('quizResult');
    if (r) r.textContent = '';
}

function gradeQuiz() {
    let score = 0;
    const total = quizQuestions.length;
    quizQuestions.forEach((qq, idx) => {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        const qDiv = document.getElementById(`q${idx}`);
        qDiv.style.borderColor = '#eee';
        // clear prior feedback
        let fb = qDiv.querySelector('.feedback');
        if (fb) fb.remove();

        if (selected) {
            const val = parseInt(selected.value, 10);
            const feedback = document.createElement('p');
            feedback.className = 'feedback muted';
            if (val === qq.a) {
                score++;
                feedback.textContent = 'Correct ✔';
            } else {
                feedback.textContent = `Incorrect ✖ — Correct: ${qq.options[qq.a]}`;
            }
            qDiv.appendChild(feedback);
        } else {
            const feedback = document.createElement('p');
            feedback.className = 'feedback muted';
            feedback.textContent = 'No answer selected.';
            qDiv.appendChild(feedback);
        }
    });

    const result = document.getElementById('quizResult');
    result.textContent = `You scored ${score} out of ${total}. ${score === total ? 'Amazing!' : 'Nice effort — keep practicing.'}`;
}
