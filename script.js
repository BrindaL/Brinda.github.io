// Create and initialize canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Canvas setup
function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
}

// Cursor position and color circles
let circles = [];
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.targetRadius = radius;
        this.color = color;
        this.alpha = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.radius += (this.targetRadius - this.radius) * 0.1;
        this.alpha *= 0.98;
        return this.alpha > 0.01;
    }
}

// Color palette
const colors = [
    { r: 226, g: 95, b: 70 },  // Red
    { r: 242, g: 228, b: 218 }, // Light beige
    { r: 212, g: 198, b: 189 }  // Dark beige
];

// Mouse move handler
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add new circle on mouse move
    if (Math.random() > 0.8) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        circles.push(new Circle(
            mouseX,
            mouseY,
            Math.random() * 50 + 20,
            color
        ));
    }
});

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(248, 249, 250, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw circles
    circles = circles.filter(circle => {
        circle.draw();
        return circle.update();
    });
    
    requestAnimationFrame(animate);
}

// Initialize
function init() {
    setupCanvas();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', setupCanvas);
}

// Start animation when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Custom cursor
const cursor = document.querySelector('.cursor-follower');
let cursorX = 0;
let cursorY = 0;

function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    }
    
    requestAnimationFrame(updateCursor);
}

updateCursor();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Navbar scroll effect
const navbar = document.querySelector(".navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll <= 0) {
    navbar.classList.remove("scroll-up")
    return
  }

  if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
    navbar.classList.remove("scroll-up")
    navbar.classList.add("scroll-down")
  } else if (currentScroll < lastScroll && navbar.classList.contains("scroll-down")) {
    navbar.classList.remove("scroll-down")
    navbar.classList.add("scroll-up")
  }
  lastScroll = currentScroll
})

// Add animation to timeline items
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

document.querySelectorAll(".timeline-item").forEach((item) => {
  observer.observe(item)
})

