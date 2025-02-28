jQuery(document).ready(function($) {
	
	function karaoke() {
		let testo = [
				"You better watch out",
				"You better not cry",
				"Better not pout",
				"I'm telling you why",
				"Santa Claus is coming to town",
				"He's making a list,",
				"And checking it twice;",
				"Gonna find out Who's naughty and nice.",
				"Santa Claus is coming to town",
				"He sees you when you're sleeping",
				"He knows when you're awake",
				"He knows if you've been bad or good",
				"So be good for goodness sake!",
				"O! You better watch out!",
				"You better not cry.",
				"Better not pout, I'm telling you why.",
				"Santa Claus is coming to town.",
				"Santa Claus is coming to town."
			];

            let index = 0; // Indice della riga corrente
            let tempoPerLettera = 100; // Tempo di lettura per ciascuna lettera in millisecondi

            // Funzione per visualizzare la riga successiva
            function mostraRiga() {
                if (index < testo.length) {
                    // Trasforma la riga in una serie di <span> per ogni lettera
                    let rigaCorrente = testo[index].split("").map(lettera => `<span>${lettera}</span>`).join("");
                    $("#line").html(rigaCorrente); // Mostra la riga corrente
                    
                    // Colora le lettere una per una
                    let lettere = $("#line span"); // Ottieni tutte le lettere della riga corrente
                    let i = 0;

                    function coloraLettera() {
                        if (i < lettere.length) {
                            $(lettere[i]).addClass("colored"); // Cambia il colore della lettera
                            i++;
                            setTimeout(coloraLettera, tempoPerLettera); // Prossima lettera dopo il tempo impostato
                        } else {
                            index++;
                            setTimeout(mostraRiga, tempoPerLettera * 12); // Pausa tra le righe
                        }
                    }

                    coloraLettera(); // Avvia la colorazione della riga
                } else {
        // Quando index è uguale a testo.length, ricomincia daccapo
        index = 0;
        setTimeout(mostraRiga, tempoPerLettera * 12); // Riparte dopo una breve pausa
				}
				
            }
                // Avvia l'effetto karaoke solo se non ci sono variabili nella URL
                mostraRiga();	
	}
	
	karaoke();
	
		});