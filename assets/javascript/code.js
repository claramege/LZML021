window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');
    let pageAnalysis = document.getElementById('page-analysis');
    let delimID = document.getElementById('delimID');

    // Fonction pour diviser le texte en mots en utilisant les délimiteurs du fichier HTML
    function segmentText(text, delimiters) {
        let regex = new RegExp("[" + delimiters + "]+");
        return text.split(regex);
    }

    // Fonction pour afficher le résultat de la segmentation dans la zone 'page-analysis'
    function displaySegmentationResult(text) {
        // Séparation du texte en mots en utilisant les délimiteurs
        let words = segmentText(text, delimID.value);

        // Affichage du nombre total de mots
        let totalWords = words.length;
        let totalWordsText = document.createElement('p');
        totalWordsText.textContent = 'Nombre total de mots : ' + totalWords;
        pageAnalysis.appendChild(totalWordsText);

        // Création du tableau classant les mots par longueur croissante
        let sortedWords = words.slice().sort(function(a, b) {
            return a.length - b.length;
        });

        let table = document.createElement('table');
        let tableHeader = table.createTHead();
        let headerRow = tableHeader.insertRow();
        let headerCell = headerRow.insertCell();
        headerCell.textContent = 'Mots par longueur croissante';
        let tableBody = table.createTBody();
        sortedWords.forEach(function(word) {
            let row = tableBody.insertRow();
            let cell = row.insertCell();
            cell.textContent = word;
        });

        pageAnalysis.appendChild(table);
    }

    // On "écoute" si le fichier donné a été modifié.
    fileInput.addEventListener('change', function(e) {
        let file = fileInput.files[0];
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
                pageAnalysis.innerHTML = ''; // Effacer le contenu précédent de page-analysis
                displaySegmentationResult(reader.result); // Afficher le résultat de la segmentation
            }

            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else {
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}
