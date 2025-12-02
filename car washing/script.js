//////// loader ///////////

document.body.classList.add("loading");

const typingText = document.querySelector(".typing-text");
const text = "Washing Your Car...";

function typeText() {
  typingText.textContent = text;
}

window.addEventListener("load", () => {
  typeText();
  const loader = document.getElementById("car-wash-loader");
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.remove("loading");
    loader.remove();
  }, 2500); // duration before fade-out
});

////// navigation//////

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const btn = document.querySelector(".btn-outline");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  btn.classList.toggle("active");
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

//// about srvices //////

const viewBtn = document.getElementById("viewMoreBtn");
const hiddenCards = document.querySelectorAll(".hidden");
let expanded = false;

viewBtn.addEventListener("click", () => {
  hiddenCards.forEach((card) => card.classList.toggle("show"));
  expanded = !expanded;
  viewBtn.textContent = expanded ? "VIEW LESS SERVICE" : "VIEW MORE SERVICE";
});

const boxes = document.querySelectorAll(".service-box");

boxes.forEach((box) => {
  const video = box.querySelector("video");

  box.addEventListener("mouseenter", () => {
    video.currentTime = 0;
    video.play();
  });

  box.addEventListener("mouseleave", () => {
    video.pause();
  });
});

//////////////// animation ////////////////

gsap.registerPlugin(ScrollTrigger);

// wait till DOM ready
document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- HERO TEXT SPLIT & ANIMATION ---------------- */
  const heroTitleEl = document.querySelector(".hero h1");

  if (heroTitleEl) {
    const heroText = heroTitleEl.textContent.trim();

    // Split text into spans per letter for animation
    heroTitleEl.innerHTML = heroText
      .split("")
      .map((ch) =>
        ch === " " ? '<span class="space">&nbsp;</span>' : `<span>${ch}</span>`
      )
      .join("");

    // 🔥 Create a smooth GSAP timeline for hero intro
    const heroTL = gsap.timeline({ delay: 0.4 });

    // Background fade & zoom
    heroTL.from(".hero", {
      opacity: 0,
      scale: 1.03,
      duration: 1.2,
      ease: "power2.out",
    });

    // Letter-by-letter reveal with flip + blur + stagger
    heroTL.from(
      ".hero h1 span",
      {
        y: 80,
        opacity: 0,
        rotateX: 90,
        transformOrigin: "bottom center",
        filter: "blur(5px)",
        duration: 1.1,
        stagger: { each: 0.03, from: "random" },
        ease: "back.out(1.8)",
      },
      "-=0.6"
    );

    // Neon glow pulse across the text
    heroTL.to(
      ".hero h1 span",
      {
        duration: 1.4,
        stagger: 0.02,
        ease: "sine.inOut",
      },
      "-=0.8"
    );

    // Fade-in the tagline paragraph
    heroTL.from(
      ".hero p",
      {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // Button pop-in animation (fixed visibility issue)
    heroTL.fromTo(
      ".btn-primary",
      { opacity: 0, scale: 0.5, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(2)",
      },
      "-=0.4"
    );

    // Continuous glowing pulse for the button
    gsap.to(".btn-primary", {
      boxShadow: "0 0 20px #00ccff, 0 0 40px #00eaff",
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Phone call info slide-in
    heroTL.from(
      ".call",
      {
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // ✨ Parallax scroll effect for hero background
    gsap.to(".hero", {
      backgroundPosition: "center 25%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  /* ---------------- ABOUT SECTION ANIMATIONS ---------------- */
  // ensure about-section exists
  const aboutSection = document.querySelector(".about-section");
  if (aboutSection) {
    let aboutTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
        end: "bottom top",
        scrub: 2,
        toggleActions: "play reverse play reverse",
      },
    });

    // foam layer
    const foam = document.createElement("div");
    foam.classList.add("foam-layer");
    aboutSection.appendChild(foam);

    aboutTL
      .fromTo(
        foam,
        { scaleX: 0, transformOrigin: "left center", opacity: 1 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" }
      )
      .to(foam, { opacity: 0, duration: 0.5 }, "+=0.4");

    aboutTL.from(
      ".about-left img",
      { x: -200, opacity: 0, scale: 0.9, duration: 1.2, ease: "power3.out" },
      "-=0.6"
    );

    aboutTL.to(".about-left img", {
      duration: 2,
      repeat: -1,
      yoyo: true,
      x: 10,
      ease: "sine.inOut",
    });

    gsap.to(".about-left img", {
      scrollTrigger: {
        trigger: ".about-left img",
        start: "top 80%",
        end: "bottom top",
        scrub: 2,
      },
      filter: "brightness(1.3)",
      repeat: -1,
      yoyo: true,
      duration: 2,
    });

    gsap.from(".about-content > *", {
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 85%",
        end: "top 60%",
        scrub: 2,
      },
      opacity: 0,
      x: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });

    gsap.fromTo(
      ".about-right-img img",
      { scale: 0.8, y: 100, opacity: 0, rotate: 3 },
      {
        scrollTrigger: {
          trigger: ".about-right-img",
          start: "top 85%",
          end: "bottom 60%",
          scrub: 2,
        },
        scale: 1,
        y: 0,
        opacity: 1,
        rotate: 0,
        ease: "power3.out",
      }
    );

    // bubbles
    const bubbleContainer = document.createElement("div");
    bubbleContainer.classList.add("bubble-container");
    aboutSection.appendChild(bubbleContainer);

    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement("span");
      bubble.classList.add("bubble");
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      bubble.style.width = bubble.style.height = `${8 + Math.random() * 15}px`;
      bubbleContainer.appendChild(bubble);
    }
  }
});
