jQuery(document).ready(function($) {
    const snowman = $("#snowman");
    const tree = $("#tree");
    const snowContainer = $("#snow-container");
    const snowPile = $("#snow-pile");

    // Aggiungi il pupazzo di neve e l'albero
    snowman.html("⛄");
    tree.html("🎄");

    // Variabili per la neve
    let snowPileHeight = 0;
    const maxSnowflakes = 30; // Numero massimo di fiocchi attivi contemporaneamente
    let activeSnowflakes = 0;	

    // Funzione per generare i fiocchi di neve
    function createSnowflake() {
        if (activeSnowflakes >= maxSnowflakes) return; // Non creare più fiocchi se il limite è raggiunto

        const snowflake = $("<div class='snowflake'></div>");
         snowflake.css({
            "background-image": `url(https://em-content.zobj.net/source/animated-noto-color-emoji/356/snowflake_2744-fe0f.gif)`,
            "background-size": "contain", // Assicura che l'immagine si adatti alla dimensione
            "background-repeat": "no-repeat",
            "width": Math.random() * (50 - 20) + 20 + "px", // Dimensione casuale tra 20px e 50px
            "height": Math.random() * (50 - 20) + 20 + "px", // Dimensione casuale tra 20px e 50px
            "left": Math.random() * 100 + "vw",
            "animationDuration": Math.random() * 3 + 5 + "s"
        });

        // Incrementa il numero di fiocchi attivi e aggiungi il fiocco alla scena
        activeSnowflakes++;
        snowContainer.append(snowflake);

        // Rimuovi il fiocco di neve dopo la caduta e aumenta l'accumulo
        snowflake.on("animationend", function() {
            $(this).remove();
            activeSnowflakes--; // Decrementa il numero di fiocchi attivi
            addSnowLayer();  // Aggiungi un nuovo strato di neve casuale
        });
    }

    // Funzione per creare cumuli di neve
    function accumulateSnow() {
        const snowLayer = $('<div class="snow-layer"></div>');
        snowLayer.css({
            position: "absolute",
            bottom: Math.random() * 20 + "px",
            left: Math.random() * window.innerWidth + "px",
            width: Math.random() * 40 + "px",
            height: Math.random() * 10 + 5 + "px",
            backgroundColor: "white",
            opacity: 0.8
        });
        snowPile.append(snowLayer);
    }

    // Inizializza l'intervallo con un valore di base (ogni secondo)
    let accumulateInterval = 500;

    // Funzione per modificare la frequenza di accumulo
    function increaseAccumulationSpeed() {
        if (accumulateInterval > 200) { // Imposta un limite per evitare che diventi troppo veloce
            accumulateInterval -= 100; // Diminuisci l'intervallo per aumentare la velocità di accumulo
            clearInterval(accumulateTimer);
            accumulateTimer = setInterval(accumulateSnow, accumulateInterval);
        }
    }

    // Avvia l'accumulo di neve con l'intervallo iniziale
    let accumulateTimer = setInterval(accumulateSnow, accumulateInterval);

    // Aumenta la velocità di accumulo ogni 5 secondi
    setInterval(increaseAccumulationSpeed, 500);

    // Crea i fiocchi di neve a intervalli regolari
    setInterval(createSnowflake, 200); // Ogni 200ms fino al limite dei fiocchi
});
