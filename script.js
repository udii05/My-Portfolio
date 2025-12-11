// Mobile navigation toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Active nav link highlighting
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
  }
});

// Resume download function - Updated to use Google Drive
function downloadResume() {
  // Replace this URL with your Google Drive direct download link
  // To get Google Drive direct download link:
  // 1. Upload your resume to Google Drive
  // 2. Right-click on the file and select "Get link"
  // 3. Make sure it's set to "Anyone with the link can view"
  // 4. Copy the file ID from the sharing link
  // 5. Replace YOUR_FILE_ID_HERE with your actual file ID

  const googleDriveFileId = "1SbWQsHhVmeBsLsR3iVCg98Rp5_0AjV3m"; // Replace with your actual Google Drive file ID
  const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;

  // Create loading indicator
  const button = event.target;
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
  button.disabled = true;

  // Create a temporary link and trigger download
  const link = document.createElement("a");
  link.href = directDownloadUrl;
  link.download = "Sandeep_Mewada_Resume.pdf";
  link.target = "_blank";

  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Reset button after 2 seconds
  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;
  }, 2000);

  // Show success message
  setTimeout(() => {
    showNotification(
      "Resume download started! Check your downloads folder.",
      "success"
    );
  }, 500);
}

// Notification function
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => notification.classList.add("show"), 100);

  // Hide notification after 4 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 4000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".project-card, .skill-category, .timeline-item"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Typing effect for hero section (optional enhancement)
document.addEventListener("DOMContentLoaded", () => {
  const heroDescription = document.querySelector(".hero-description p");
  const originalText = heroDescription.textContent;
  heroDescription.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      heroDescription.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }
  };

  // Start typing effect after a delay
  setTimeout(typeWriter, 1000);
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero");
  const speed = scrolled * 0.5;

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Add some interactive hover effects
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effect to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .btn-email"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for ripple effect and notifications
const style = document.createElement("style");
style.textContent = `
    .btn-primary, .btn-secondary, .btn-email {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--accent-color);
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--accent-color);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-left: 4px solid var(--accent-color);
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 350px;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: #10b981;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--text-primary);
    }
    
    .notification-content i {
        color: var(--accent-color);
        font-size: 1.2rem;
    }
    
    .notification-success .notification-content i {
        color: #10b981;
    }
    
    .btn-primary:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .btn-primary i {
        margin-right: 8px;
    }
`;
document.head.appendChild(style);
