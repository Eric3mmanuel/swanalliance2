const navItems = [
  ["Home","index.html"],["About","about.html"],["Services","services.html"],["Global connections","global-network.html"],["Contact","contact.html"]
];
const currentPage = location.pathname.split("/").pop() || "index.html";
const header = document.getElementById("site-header");
if (header) {
  header.innerHTML = `
    <div class="topbar"><div class="container topbar-inner"><span>Beyond Seas, Beyond Skies.</span><div><a href="mailto:info@swanallianceltd.com">info@swanallianceltd.com</a><span class="top-sep">|</span><a href="tel:+254707238692">+254 707 238 692</a></div></div></div>
    <header class="site-header"><div class="container nav-wrap">
      <a class="brand" href="index.html" aria-label="Swan Alliance home"><img src="assets/swan-alliance-logo-cropped.jpg" alt="Swan Alliance Limited logo"></a>
      <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
      <nav class="main-nav" aria-label="Main navigation">${navItems.map(([label,url])=>`<a href="${url}" class="${currentPage===url?"active":""}">${label}</a>`).join("")}<a class="nav-cta" href="contact.html#quote">Request a quote <span>↗</span></a></nav>
    </div></header>`;
}
const footer = document.getElementById("site-footer");
if (footer) {
  footer.innerHTML = `<footer class="site-footer"><div class="container footer-main">
    <div class="footer-brand"><img src="assets/swan-alliance-logo-cropped.jpg" alt="Swan Alliance Limited"><p>Connecting businesses to opportunities across borders.</p><span>Beyond Seas, Beyond Skies.</span></div>
    <div><h4>Explore</h4><a href="about.html">About us</a><a href="services.html">Our services</a><a href="global-network.html">Global connections</a><a href="contact.html">Contact</a></div>
    <div><h4>Our services</h4><a href="services.html#sourcing">Sourcing</a><a href="services.html#shipping">Shipping & freight</a><a href="services.html#clearing">Clearing & forwarding</a><a href="services.html#transport">Transport & storage</a></div>
    <div><h4>Get in touch</h4><a href="mailto:info@swanallianceltd.com">info@swanallianceltd.com</a><a href="tel:+254707238692">+254 707 238 692</a><a href="tel:+254795368439">+254 795 368 439</a><a href="contact.html">All office contacts →</a></div>
  </div><div class="container footer-bottom"><span>© <span id="year"></span> Swan Alliance Limited. All rights reserved.</span><span>Beyond Seas, Beyond Skies.</span></div></footer>`;
  document.getElementById("year").textContent = new Date().getFullYear();
}
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (toggle && nav) toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav?.classList.contains("open")){nav.classList.remove("open");toggle?.setAttribute("aria-expanded","false");}});
const form = document.getElementById("quote-form");
if(form) form.addEventListener("submit",e=>{
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Website enquiry: ${data.get("service")}`);
  const body = encodeURIComponent(`Name: ${data.get("name")}\nCompany: ${data.get("company")||"Not provided"}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")||"Not provided"}\nService: ${data.get("service")}\n\nEnquiry:\n${data.get("message")}`);
  document.getElementById("form-feedback").textContent="Opening your email application…";
  window.location.href=`mailto:info@swanallianceltd.com?subject=${subject}&body=${body}`;
});

// Motion enhancements: progressive reveal, scroll progress, subtle hover and back-to-top.
document.documentElement.classList.add("js-motion");

const progress = document.createElement("div");
progress.className = "scroll-progress";
progress.setAttribute("aria-hidden", "true");
progress.innerHTML = "<span></span>";
document.body.prepend(progress);

const topButton = document.createElement("button");
topButton.className = "back-to-top";
topButton.type = "button";
topButton.setAttribute("aria-label", "Back to top");
topButton.innerHTML = "↑";
document.body.appendChild(topButton);
topButton.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

const headerEl = document.querySelector(".site-header");
const progressBar = progress.querySelector("span");
let scrollTicking = false;
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  headerEl?.classList.toggle("is-scrolled", window.scrollY > 12);
  topButton.classList.toggle("visible", window.scrollY > 520);
  scrollTicking = false;
}
window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollUI);
    scrollTicking = true;
  }
}, {passive: true});
updateScrollUI();

// Reveal sections as they enter the viewport. Stagger sibling cards slightly.
const revealSelectors = [
  ".section-heading", ".intro-grid > *", ".service-card", ".statement-inner > *",
  ".process-grid > div", ".about-lead > *", ".story-image", ".story-panel > *",
  ".value-grid article", ".service-detail", ".office-card", ".network-inner > *",
  ".contact-info > *", ".form-panel", ".simple-callout > *", ".closing-line > *"
];
const revealNodes = [...new Set(revealSelectors.flatMap(selector => [...document.querySelectorAll(selector)]))];
revealNodes.forEach((node, index) => {
  node.classList.add("reveal");
  if (node.matches(".story-image,.intro-grid>div:first-child,.contact-info")) node.classList.add("reveal-left");
  if (node.matches(".story-panel,.form-panel,.intro-grid>div:last-child")) node.classList.add("reveal-right");
  if (node.matches(".service-card,.office-card")) node.classList.add("reveal-scale");
  if (node.matches(".service-card,.office-card,.process-grid>div,.value-grid article")) {
    node.style.transitionDelay = `${(index % 4) * 75}ms`;
  }
});
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12, rootMargin: "0px 0px -35px 0px"});
  revealNodes.forEach(node => revealObserver.observe(node));
} else {
  revealNodes.forEach(node => node.classList.add("is-visible"));
}

// Gentle pointer tilt on larger screens only; avoids motion on touch devices.
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (canHover && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(850px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

// Close mobile navigation after a destination is selected.
document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => {
  nav?.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
}));

// Floating office contact widget — quick access to all three office numbers.
const contactDock = document.createElement("div");
contactDock.className = "contact-dock";
contactDock.innerHTML = `
  <section class="contact-popover" id="quick-contact-panel" aria-label="Contact Swan Alliance" hidden>
    <div class="contact-popover-head"><div><span class="contact-kicker">LET'S TALK</span><h3>Contact our team</h3></div><button class="contact-close" type="button" aria-label="Close contact options">×</button></div>
    <p class="contact-popover-copy">Reach the office closest to you.</p>
    <a class="contact-number" href="tel:+254707238692"><span class="contact-country">KENYA <small>Office</small></span><strong>+254 707 238 692</strong><span class="contact-call">↗</span></a>
    <a class="contact-number" href="tel:+254795368439"><span class="contact-country">KENYA <small>Office</small></span><strong>+254 795 368 439</strong><span class="contact-call">↗</span></a>
    <a class="contact-number" href="tel:+8614757865134"><span class="contact-country">CHINA <small>Office</small></span><strong>+86 147 5786 5134</strong><span class="contact-call">↗</span></a>
    <a class="contact-number" href="tel:+971526236339"><span class="contact-country">DUBAI <small>Office</small></span><strong>+971 526 236 339</strong><span class="contact-call">↗</span></a>
    <a class="contact-email-link" href="mailto:info@swanallianceltd.com">Email us <span>↗</span></a>
  </section>
  <button class="contact-fab" type="button" aria-expanded="false" aria-controls="quick-contact-panel"><span class="contact-fab-icon" aria-hidden="true">✦</span><span>Contact us</span><span class="contact-fab-arrow" aria-hidden="true">↗</span></button>`;
document.body.appendChild(contactDock);
const contactFab = contactDock.querySelector(".contact-fab");
const contactPanel = contactDock.querySelector(".contact-popover");
const contactClose = contactDock.querySelector(".contact-close");
function setContactOpen(open) {
  contactPanel.hidden = !open;
  contactFab.setAttribute("aria-expanded", String(open));
  contactFab.classList.toggle("is-open", open);
  if (open) contactClose.focus({preventScroll:true});
}
contactFab.addEventListener("click", () => setContactOpen(contactPanel.hidden));
contactClose.addEventListener("click", () => { setContactOpen(false); contactFab.focus({preventScroll:true}); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !contactPanel.hidden) { setContactOpen(false); contactFab.focus({preventScroll:true}); } });
document.addEventListener("click", event => { if (!contactDock.contains(event.target) && !contactPanel.hidden) setContactOpen(false); });

// Gentle pointer-following light on the hero, only on precision-pointer devices.
const heroSurface = document.querySelector(".hero");
if (heroSurface && canHover && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroSurface.addEventListener("pointermove", event => {
    const bounds = heroSurface.getBoundingClientRect();
    heroSurface.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    heroSurface.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }, {passive:true});
}
