// Minimal app: tiny quiz + contact handler
const quizQuestions = [
  { q: "What is 2+2?", options: ["3","4","5"], a:1 },
  { q: "Color of sky?", options: ["Blue","Green","Red"], a:0 }
];

function initQuiz(){
  const container = document.getElementById('quizQuestions');
  container.innerHTML='';
  quizQuestions.forEach((qq,idx)=>{
    const div = document.createElement('div');
    div.className='quiz-question';
    div.innerHTML=`<p><strong>Q${idx+1}.</strong> ${qq.q}</p>`;
    qq.options.forEach((opt,i)=>{
      const id = `m_q${idx}_o${i}`;
      div.innerHTML+=`<label style="display:block"><input type="radio" name="mq${idx}" value="${i}" id="${id}"> ${opt}</label>`;
    });
    container.appendChild(div);
  });
}

function gradeQuiz(){
  let score=0;
  quizQuestions.forEach((qq,idx)=>{
    const sel = document.querySelector(`input[name="mq${idx}"]:checked`);
    if(sel && +sel.value===qq.a) score++;
  });
  document.getElementById('quizResult').textContent = `Score: ${score} / ${quizQuestions.length}`;
}

function handleContact(e){
  e.preventDefault();
  const name=document.getElementById('name').value.trim();
  const email=document.getElementById('email').value.trim();
  const msg=document.getElementById('message').value.trim();
  if(!name||!email||!msg){ document.getElementById('contactResult').textContent='Please fill all fields.'; return; }
  document.getElementById('contactResult').textContent = `Thanks, ${name}! (Demo)`;
  document.getElementById('contactForm').reset();
}

window.addEventListener('DOMContentLoaded',()=>{
  initQuiz();
  document.getElementById('submitQuiz').addEventListener('click',gradeQuiz);
  document.getElementById('resetQuiz').addEventListener('click',initQuiz);
  document.getElementById('contactForm').addEventListener('submit',handleContact);
});
