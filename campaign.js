const CONFIG = {
  whatsapp: '5561982118809',
  email: 'caiobarreto1000@hotmail.com',
  instagram: 'https://instagram.com/granreycerostudio',
  portfolio: 'index.html',
  message: 'Olá! Vi a página do Gran Rey Cero Studio e gostaria de solicitar um orçamento para um site.'
};

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.message)}`;
const emailUrl = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Orçamento de site')}&body=${encodeURIComponent(CONFIG.message)}`;

const links = [
  ['#whatsapp-link', whatsappUrl, CONFIG.whatsapp.includes('DDD'), 'WhatsApp demonstrativo — substitua o número em script.js.'],
  ['#dialog-whatsapp', whatsappUrl, CONFIG.whatsapp.includes('DDD'), 'WhatsApp demonstrativo — substitua o número em script.js.'],
  ['#email-link', emailUrl, CONFIG.email.includes('seudominio'), 'E-mail demonstrativo — substitua o endereço em script.js.'],
  ['#dialog-email', emailUrl, CONFIG.email.includes('seudominio'), 'E-mail demonstrativo — substitua o endereço em script.js.'],
  ['#instagram-link', CONFIG.instagram, false, ''],
['#portfolio-link', CONFIG.portfolio, CONFIG.portfolio === '#', 'Portfólio demonstrativo — informe o endereço em campaign.js.']
];

links.forEach(([selector, href, isDemo, message]) => {
  const el = document.querySelector(selector);
  if (!el) return;
  el.setAttribute('href', href);
  if (isDemo) {
    el.removeAttribute('target');
    el.addEventListener('click', (event) => {
      event.preventDefault();
      showToast(message);
    });
  }
});

const dialog = document.querySelector('#contact-dialog');
document.querySelector('#open-contact').addEventListener('click', () => {
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelectorAll('.masthead, .kicker, h1, .support, .buttons, .footer').forEach((el, i) => {
  el.classList.add('enter');
  el.style.setProperty('--delay', `${i * 90}ms`);
});