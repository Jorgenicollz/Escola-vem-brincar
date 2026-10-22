const WHATSAPP = "5511987764594";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Close the mobile menu after choosing a section.
const mobileMenu = document.querySelector(".mobile-menu");
mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.open = false;
  });
});

// A day of twelve hours: drag the sun from 7h to 19h and the matching moment shows.
const day = document.querySelector("[data-day]");
if (day) {
  const range = day.querySelector(".day-range");
  const stops = [...day.querySelectorAll(".day-stop")];
  const times = stops.map((stop) => Number(stop.dataset.time));
  const min = Number(range.min);
  const max = Number(range.max);

  const nearest = (value) =>
    times.reduce((best, time, index) => (Math.abs(time - value) < Math.abs(times[best] - value) ? index : best), 0);

  const show = (value) => {
    const index = nearest(value);
    stops.forEach((stop, i) => stop.classList.toggle("is-active", i === index));
    const stop = stops[index];
    range.style.setProperty("--pct", `${((value - min) / (max - min)) * 100}%`);
    range.setAttribute(
      "aria-valuetext",
      `${stop.querySelector(".day-time").textContent}, ${stop.querySelector("h3").textContent}`
    );
  };

  range.addEventListener("input", () => show(Number(range.value)));

  // Let go of the sun and it settles on the nearest moment.
  range.addEventListener("change", () => {
    range.value = times[nearest(Number(range.value))];
    show(Number(range.value));
  });

  show(Number(range.value));
}

// Ages accordion: one stage open at a time.
const ages = document.querySelector("[data-ages]");
if (ages) {
  const panels = [...ages.querySelectorAll(".age")];

  const open = (panel) => {
    panels.forEach((item) => {
      const isOpen = item === panel;
      item.classList.toggle("is-open", isOpen);
      item.querySelector(".age-tab").setAttribute("aria-expanded", String(isOpen));
      item.querySelector(".age-body").hidden = !isOpen;
    });
  };

  panels.forEach((panel) => {
    panel.querySelector(".age-tab").addEventListener("click", () => open(panel));
  });

  open(panels.find((panel) => panel.classList.contains("is-open")) || panels[0]);
}

// Experiences: the hovered, focused or tapped line shows its picture.
const expList = document.querySelector("[data-exp]");
const preview = document.querySelector(".exp-preview img");
if (expList && preview) {
  const items = [...expList.querySelectorAll(".exp-item")];
  let swapTimer;
  items.forEach((item) => {
    item.setAttribute("aria-pressed", String(item.closest("li").classList.contains("is-active")));
  });

  const activate = (item) => {
    const row = item.closest("li");
    if (row.classList.contains("is-active")) return;
    items.forEach((other) => {
      const isActive = other === item;
      other.closest("li").classList.toggle("is-active", isActive);
      other.setAttribute("aria-pressed", String(isActive));
    });

    clearTimeout(swapTimer);
    preview.classList.add("is-swapping");
    swapTimer = setTimeout(() => {
      preview.src = item.dataset.photo;
      preview.alt = item.dataset.alt;
      preview.classList.remove("is-swapping");
    }, 180);
  };

  items.forEach((item) => {
    item.addEventListener("click", () => activate(item));
    item.addEventListener("focus", () => activate(item));
    item.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: hover)").matches) activate(item);
    });
  });
}

// Visit request: the answers become a ready WhatsApp message.
const book = document.querySelector("[data-book]");
if (book) {
  const previewLine = book.querySelector("[data-preview]");

  const compose = () => {
    const data = new FormData(book);
    const responsavel = (data.get("responsavel") || "").trim();
    const crianca = (data.get("crianca") || "").trim();
    const idade = data.get("idade");
    const periodo = data.get("periodo");

    let message = "Olá! ";
    message += responsavel ? `Sou ${responsavel} e gostaria` : "Gostaria";
    message += " de agendar uma visita à Vem Brincar";
    if (crianca || idade) {
      message += crianca ? ` para ${crianca}` : " para meu filho";
      if (idade) message += `, de ${idade}`;
    }
    message += ".";
    if (periodo) message += ` Procuro o período: ${periodo}.`;
    return message;
  };

  const update = () => {
    previewLine.textContent = `Mensagem: “${compose()}”`;
  };

  book.addEventListener("input", update);
  book.addEventListener("change", update);

  book.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!book.reportValidity()) return;
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(compose())}`;
    window.open(url, "_blank", "noopener");
  });
}

// The hero photo straightens as the page starts to scroll.
const tilt = document.querySelector("[data-tilt]");
if (tilt && !reducedMotion.matches) {
  let ticking = false;
  const update = () => {
    const progress = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
    tilt.style.setProperty("--tilt", `${(2 - progress * 4).toFixed(2)}deg`);
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
}

// Section parts rise in as they enter, staggered within each section.
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const groups = new Map();
  reveals.forEach((el) => {
    const section = el.closest("section, footer") || document.body;
    const index = groups.get(section) || 0;
    el.style.setProperty("--delay", `${Math.min(index, 4) * 80}ms`);
    groups.set(section, index + 1);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

// Floating WhatsApp button appears once the hero has scrolled away.
const floatButton = document.querySelector(".float-wa");
const hero = document.querySelector(".hero");
if (floatButton && hero && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    floatButton.classList.toggle("is-visible", !entry.isIntersecting);
  }).observe(hero);
} else if (floatButton) {
  floatButton.classList.add("is-visible");
}
