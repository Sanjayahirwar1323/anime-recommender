document.addEventListener('DOMContentLoaded', function() {
  // Add background elements
  const backgroundElements = `
      <div class="bg-gradient"></div>
      <div class="bg-anime"></div>
      <div class="bg-grid"></div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="glow-orb orb-3"></div>
  `;
  document.body.insertAdjacentHTML('afterbegin', backgroundElements);
  
  // Add decoration elements
  document.querySelectorAll('.glass-container').forEach(container => {
      container.insertAdjacentHTML('afterbegin', '<div class="decoration-line"></div>');
  });
  
  // Update heading with span for gradient effect
  const mainHeading = document.querySelector('h1');
  if (mainHeading) {
      const text = mainHeading.textContent;
      mainHeading.innerHTML = text.replace('ANIME RECOMMENDER SYSTEM', '<span>ANIME RECOMMENDER SYSTEM</span>');
  }

  // Initialize particles.js for background animation
  particlesJS('particles-js', {
      "particles": {
          "number": {
              "value": 60,
              "density": {
                  "enable": true,
                  "value_area": 900
              }
          },
          "color": {
              "value": ["#FF6B81", "#6C5CE7", "#00E6F6"]
          },
          "shape": {
              "type": ["circle", "triangle", "polygon"],
              "stroke": {
                  "width": 0,
                  "color": "#000000"
              },
              "polygon": {
                  "nb_sides": 6
              }
          },
          "opacity": {
              "value": 0.3,
              "random": true,
              "anim": {
                  "enable": true,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
              }
          },
          "size": {
              "value": 3,
              "random": true,
              "anim": {
                  "enable": true,
                  "speed": 2,
                  "size_min": 0.1,
                  "sync": false
              }
          },
          "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#6C5CE7",
              "opacity": 0.2,
              "width": 1
          },
          "move": {
              "enable": true,
              "speed": 1.2,
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                  "enable": true,
                  "rotateX": 600,
                  "rotateY": 1200
              }
          }
      },
      "interactivity": {
          "detect_on": "canvas",
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "grab"
              },
              "onclick": {
                  "enable": true,
                  "mode": "push"
              },
              "resize": true
          },
          "modes": {
              "grab": {
                  "distance": 140,
                  "line_linked": {
                      "opacity": 0.5
                  }
              },
              "push": {
                  "particles_nb": 3
              }
          }
      },
      "retina_detect": true
  });

  // Project Card advanced tilt effect with parallax
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const xPercent = x / rect.width - 0.5;
          const yPercent = y / rect.height - 0.5;
          
          const rotX = yPercent * -10;
          const rotY = xPercent * 10;
          
          // Apply transform
          this.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
          
          // Move the ::before pseudo element (glow effect)
          const moveFactor = 20;
          const beforeX = 50 + xPercent * moveFactor;
          const beforeY = 50 + yPercent * moveFactor;
          this.style.setProperty('--before-pos-x', `${beforeX}%`);
          this.style.setProperty('--before-pos-y', `${beforeY}%`);
          
          // Adjust shadows based on mouse position
          const shadowX = xPercent * 20;
          const shadowY = yPercent * 20;
          this.style.boxShadow = `${-shadowX}px ${-shadowY}px 30px rgba(108, 92, 231, 0.3)`;
      });

      card.addEventListener('mouseleave', function() {
          this.style.transform = 'none';
          this.style.boxShadow = 'none';
          this.style.setProperty('--before-pos-x', '50%');
          this.style.setProperty('--before-pos-y', '50%');
      });
  });
});