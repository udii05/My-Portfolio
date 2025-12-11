// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  });
});

// Active Link Highlight on Scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((sec) => {
    if (pageYOffset >= sec.offsetTop - 200) {
      current = sec.id;
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Navbar Background Change on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.style.background =
    window.scrollY > 50
      ? "rgba(10,10,10,0.98)"
      : "rgba(10,10,10,0.95)";
});

// Resume Download (LOCAL ASSET)
function downloadResume(event) {
  const button = event.target;
  const originalText = button.innerHTML;

  // show loading
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
  button.disabled = true;

  // local resume in assets/
  const resumePath = "assets/Udita Chakraborty Resume.pdf";

  const link = document.createElement("a");
  link.href = resumePath;
  link.download = "Soumi_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // reset button
  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;
  }, 1500);

  showNotification("Resume download started!", "success");
}

// Notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === "success" ? "fa-check-circle" : "fa-info-circle"}"></i>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 100);

  // hide after 4s
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Fade-in Animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(
    ".project-card, .skill-category, .timeline-item"
  );

  items.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Typing Effect
document.addEventListener("DOMContentLoaded", () => {
  const desc = document.querySelector(".hero-description p");
  const text = desc.textContent;
  desc.textContent = "";

  let i = 0;
  const type = () => {
    if (i < text.length) {
      desc.textContent += text.charAt(i);
      i++;
      setTimeout(type, 30);
    }
  };

  setTimeout(type, 800);
});

// Parallax Effect
window.addEventListener("scroll", () => {
  const parallax = document.querySelector(".hero");
  if (parallax) {
    parallax.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
  }
});

// Hover and Ripple Effects
document.addEventListener("DOMContentLoaded", () => {
  // Project card hover
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Ripple effect
  document.querySelectorAll(".btn-primary, .btn-secondary, .btn-email").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      ripple.classList.add("ripple");
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Ripple and Notification CSS Injection
const style = document.createElement("style");
style.textContent = `
  .btn-primary, .btn-secondary, .btn-email { position: relative; overflow: hidden; }
  .ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.3); transform: scale(0); animation: ripple 0.6s linear; pointer-events:none; }
  @keyframes ripple { to { transform: scale(4); opacity: 0; } }

  .notification {
    position: fixed; top: 20px; right: 20px;
    background: var(--card-bg); border: 1px solid var(--border-color);
    border-left: 4px solid var(--accent-color);
    padding: 15px 20px; border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    opacity: 0; transform: translateX(100%);
    transition: all 0.3s ease; z-index: 10000;
  }
  .notification.show { opacity: 1; transform: translateX(0); }
  .notification-success { border-left-color: #10b981; }
`;
document.head.appendChild(style);
