jQuery(document).ready(function ($) {
    function loadEffect(effectName) {
        // Carica il file JS
        $.getScript(wjq_plugin.url + "effects/" + effectName + "/" + effectName + ".js")
            .done(function () {
                console.log("Effetto " + effectName + " caricato.");
            })
            .fail(function (jqxhr, settings, exception) {
                console.error("Errore nel caricamento di " + effectName + ": ", exception);
            });

        // Carica il file CSS
        $("head").append('<link rel="stylesheet" type="text/css" data-effect="' + effectName + '" href="' + wjq_plugin.url + 'effects/' + effectName + '/' + effectName + '.css">');

        // Carica l'HTML (se presente) e lo memorizza per poterlo rimuovere dopo
        $.get(wjq_plugin.url + "effects/" + effectName + "/" + effectName + ".php", function (data) {
            let container = $(data);
            container.attr("data-effect", effectName); // Assegna un attributo per poterlo identificare
            $("body").append(container);
        }).fail(function () {
            console.warn("Nessun file HTML per " + effectName);
        });
    }

    function removeEffect(effectName) {
        // Rimuove il CSS
        $('link[data-effect="' + effectName + '"]').remove();

        // Rimuove l'HTML associato cercando tutti gli elementi che hanno l'attributo data-effect
        $('[data-effect="' + effectName + '"]').remove();
    }

    // Listener sugli switch per attivare/disattivare effetti
    $('.wjq-toggle').on('change', function () {
        let effect = $(this).data('effect');
        let isChecked = $(this).prop('checked');

        if (isChecked) {
            loadEffect(effect);
        } else {
            removeEffect(effect);
        }
    });

    // Carica automaticamente gli effetti attivi all'avvio
    if (typeof wjq_active_effects !== "undefined") {
        wjq_active_effects.forEach(function (effect) {
            loadEffect(effect);
        });
    }
});
