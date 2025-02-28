jQuery(document).ready(function($) {
	
	const imagesPath = jqenchData.imagesPath;
	
	const christmasImages = [
	imagesPath + "annie-spratt-Bq2j-Pyt0vh8-unsplash.jpg",
imagesPath + "brooke-lark-soCYO4mMVWk-unsplash.jpg",
imagesPath + "d-a-v-i-d-s-o-n-l-u-n-a-2gSfZ9Baph8-unsplash.jpg",
imagesPath + "inbal-malca-NhlKx6Uvm3E-unsplash.jpg",
imagesPath + "mariana-b-iKHXbvNHXPQ-unsplash.jpg",
imagesPath + "paige-cody-nN8c1cCGsZI-unsplash.jpg"
	];
	
	
  // Funzione per selezionare casualmente un'immagine di sfondo
    function setRandomChristmasBackground() {
        const randomIndex = Math.floor(Math.random() * christmasImages.length);
        const imageUrl = christmasImages[randomIndex];
        
        $('body').css({
            'background-image': `url(${imageUrl})`,
            'background-size': 'cover',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-attachment': 'fixed'
        });
    }

    // Imposta l'immagine di sfondo casuale al caricamento della pagina
    setRandomChristmasBackground();
	
	});