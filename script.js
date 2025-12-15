document.addEventListener("DOMContentLoaded", () => {
  // Global Scroll Animation Logic
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const scrollElements = document.querySelectorAll(".scroll-animate");
  scrollElements.forEach((el) => observer.observe(el));
});
