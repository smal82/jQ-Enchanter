jQuery(document).ready(function($) {
	
	function flySanta() {
    let windowWidth = $(window).width(); // Larghezza dello schermo
    let bodyWidth = $('body').width(); // Larghezza del body (limite per tablet)
    let maxWidth = Math.min(windowWidth, bodyWidth); // Larghezza massima consentita
    let flyHeight = 200; // Altezza massima di oscillazione
    let flyDuration = 10000; // Durata dell'animazione (10 secondi)

    // Posizione iniziale
    $('.santa-image').css({
      right: 0, // Partenza dalla parte visibile del bordo destro
      bottom: Math.random() * flyHeight + 50 // Altezza casuale (50px - 250px)
    });

    // Animazione orizzontale con oscillazione
    function animateFlight() {
      let santa = $('.santa-image');
      santa.animate(
        { right: maxWidth - santa.width() }, // Muove verso sinistra
        {
          duration: flyDuration,
          easing: 'linear', // Movimento orizzontale uniforme
          step: function (now, fx) {
            if (fx.prop === 'right') {
              // Calcola la nuova altezza oscillando
              let oscillation = Math.sin(now / 100) * flyHeight / 2;
              santa.css('bottom', 100 + oscillation + 'px');
            }
          },
          complete: function () {
            // Ripeti l'animazione
            flySanta();
          }
        }
      );
    }

    animateFlight();
  }
	
	flySanta(); // Avvia l'animazione
		});