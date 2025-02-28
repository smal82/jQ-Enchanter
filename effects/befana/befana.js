jQuery(document).ready(function($) {
	
	function flyBefana() {
    let windowWidth = $(window).width(); // Larghezza dello schermo
    let bodyWidth = $('body').width(); // Larghezza del body (limite per tablet)
    let maxWidth = Math.min(windowWidth, bodyWidth); // Larghezza massima consentita
    let flyHeight = 100; // Altezza massima di oscillazione dall'alto
    let flyDuration = 8000; // Durata dell'animazione (8 secondi)

    // Posizione iniziale
    $('.befana-image').css({
      right: 0, // Partenza dalla parte visibile del bordo destro
      top: Math.random() * flyHeight // Altezza casuale entro 100px dall'alto
    });

    // Animazione orizzontale con oscillazione
    function animateFlight() {
      let befana = $('.befana-image');
      befana.animate(
        { right: maxWidth - befana.width() }, // Muove verso sinistra
        {
          duration: flyDuration,
          easing: 'linear', // Movimento orizzontale uniforme
          step: function (now, fx) {
            if (fx.prop === 'right') {
              // Calcola la nuova altezza oscillando
              let oscillation = Math.sin(now / 100) * flyHeight / 2;
              befana.css('top', 50 + oscillation + 'px'); // Parte da 50px per evitare che tocchi il bordo superiore
            }
          },
          complete: function () {
            // Ripeti l'animazione
            flyBefana();
          }
        }
      );
    }

    animateFlight();
  }
  
  flyBefana();
	
		});