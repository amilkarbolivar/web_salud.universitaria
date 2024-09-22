document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        let scrollPos = window.scrollY;

        let bannerText = document.getElementById("bannertext");
        bannerText.style.marginTop = (scrollPos / 4) + "px";
        bannerText.style.opacity = 1 - (scrollPos / 250);
    });
});

const head = document.getElementById("header");
let opacity = 1;

// Establecer la opacidad inicial
head.style.opacity = opacity;

window.addEventListener('scroll', function() {
  // Cuánto has hecho scroll en píxeles
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
  // Calcular la nueva opacidad, disminuye mientras se hace scroll
  opacity = 1 - (scrollTop / 300); // 300 es un valor ajustable, define cuánta distancia quieres para ocultar el header
  
  // Limitar el rango de la opacidad entre 0 y 1
  opacity = Math.max(0, Math.min(1, opacity));
  
  // Aplicar la nueva opacidad al header
  head.style.opacity = opacity;
});