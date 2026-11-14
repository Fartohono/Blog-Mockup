// script.js


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {

      const offset = target.offsetTop - 64;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});


const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        navLinks.forEach(l => l.classList.remove('active'));

        const activeLink = document.querySelector(
          `.nav__link[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  {
    rootMargin: '-30% 0px -60% 0px', 
    threshold: 0
  }
);

sections.forEach(section => observer.observe(section));

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = e.target.querySelector('.btn--submit');
  btn.textContent = '✅ Відправлено!';
  btn.disabled = true;
  btn.style.background = '#3fb950';
  btn.style.color = '#0d1117';


  setTimeout(() => {
    btn.textContent = 'Надіслати повідомлення →';
    btn.disabled = false;
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
});

const skillLevels = {
  "HTML5": 90,
  "CSS3": 85,
  "SCSS": 85,
  "JavaScript": 70,
  "Bootstrap 5": 80,
  "Tailwind CSS": 80,
  "Git": 75,
  "GitHub Pages": 85,
  "Figma": 65
};
const skillButtons = document.querySelectorAll(".tech-tag");

const skillName = document.querySelector("#skillName");
const skillPercent = document.querySelector("#skillPercent");
const skillProgress = document.querySelector("#skillProgress");

function updateSkill(name) {
  const percent = skillLevels[name];

  if (percent === undefined) return;


  skillName.textContent = name;


  skillPercent.textContent = `${percent}%`;

  skillProgress.style.width = `${percent}%`;

  // Підсвічуємо активну кнопку
  skillButtons.forEach(button => {
    button.classList.toggle(
      "tech-tag--active",
      button.textContent.trim() === name
    );
  });
}


skillButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.textContent.trim();
    updateSkill(name);
  });
});


updateSkill("HTML5");
