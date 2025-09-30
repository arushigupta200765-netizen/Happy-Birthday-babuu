/* -------------------- Show page -------------------- */
function showPage(n){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page' + n);
  if(!page) return;
  page.classList.add('active');

  // Animate cards on page 3 or 4
  if(n === 3 || n === 4){
    animateCards(page);
  }
}

/* -------------------- Animate cards -------------------- */
function animateCards(pageEl){
  const cards = pageEl.querySelectorAll('.card');
  cards.forEach((c, i) => {
    c.classList.remove('fade-in');
    c.style.animationDelay = '';
    void c.offsetWidth; // force reflow
    c.style.animationDelay = (i * 0.18) + 's';
    c.classList.add('fade-in');
  });
}

/* -------------------- Generate hearts -------------------- */
function generateHearts(count = 32){
  const container = document.querySelector('.hearts');
  container.innerHTML = '';
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'heart';
    el.textContent = '❤';

    // random position
    el.style.left = (Math.random()*100) + 'vw';
    el.style.top = (Math.random()*100) + 'vh';
    el.style.fontSize = (10 + Math.random()*26) + 'px';

    // random duration and delay
    const dur = (8 + Math.random()*10).toFixed(2);
    const delay = (-Math.random()*10).toFixed(2);
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = delay + 's';

    // inline animation using Web Animations API
    el.animate([
      { transform: 'translateY(0) scale(0.7)', opacity: 0 },
      { transform: 'translateY(-20vh) scale(1)', opacity: 0.9, offset: 0.15 },
      { transform: 'translateY(-140vh) scale(1.2)', opacity: 0 }
    ], {
      duration: dur*1000,
      delay: (parseFloat(delay) < 0 ? 0 : parseFloat(delay))*1000,
      iterations: Infinity,
      easing: 'linear'
    });

    container.appendChild(el);
  }
}

/* -------------------- Music toggle -------------------- */
function toggleMusic(){
  const music = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');
  if(!music) return;

  if(music.paused){
    music.play().catch(()=>{}); // may fail if autoplay blocked
    btn.textContent = '🔊';
  } else {
    music.pause();
    btn.textContent = '🔈';
  }
}

/* -------------------- Init -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  generateHearts(36);
  showPage(1);

  const music = document.getElementById('bg-music');
  if(music){
    music.volume = 0.55;
    music.play().catch(()=>{ 
      document.getElementById('music-toggle').textContent = '🔈'; 
    });
  }
});
