window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');
    let pageAnalysis = document.getElementById('page-analysis'); 

    // Fonction pour diviser le texte en mots en utilisant les délimiteurs du fichier HTML
    function tokenizeText(text) {
        let delimiters = document.getElementById('delimID').value;
        let regex = new RegExp("[" + delimiters + "]+");
        return text.split(regex);
    }

    // Fonction pour afficher les cooccurrents dans le texte pour un mot donné
    function displayCooccurrences(word, interval) {
        let tokens = tokenizeText(fileDisplayArea.textContent.trim());
        let wordIndex = tokens.indexOf(word);
        if (wordIndex === -1) {
            alert('Le mot ne se trouve pas dans le texte.');
            return;
        }

        let cooccurrences = {};
        let leftFreq = 0, rightFreq = 0;
        for (let i = Math.max(0, wordIndex - interval); i < Math.min(tokens.length, wordIndex + interval + 1); i++) {
            if (i !== wordIndex) {
                let coWord = tokens[i];
                cooccurrences[coWord] = (cooccurrences[coWord] || 0) + 1;
                if (i < wordIndex) leftFreq++;
                else rightFreq++;
            }
        }

        let totalCoFrequency = Object.values(cooccurrences).reduce((acc, curr) => acc + curr, 0);
        let table = document.createElement('table');
        let tableHeader = table.createTHead();
        let headerRow = tableHeader.insertRow();
        let headers = ['Cooccurrent(s)', 'Co-fréquence', 'Fréquence gauche', '% fréquence gauche', 'Fréquence droite', '% fréquence droite'];
        headers.forEach(headerText => {
            let headerCell = headerRow.insertCell();
            headerCell.textContent = headerText;
        });

        let tableBody = table.createTBody();
        for (let coWord in cooccurrences) {
            let row = tableBody.insertRow();
            let coFreq = cooccurrences[coWord];
            let leftPercent = (leftFreq === 0) ? 0 : (leftFreq / totalCoFrequency) * 100;
            let rightPercent = (rightFreq === 0) ? 0 : (rightFreq / totalCoFrequency) * 100;

            [coWord, coFreq, leftFreq, leftPercent.toFixed(2) + '%', rightFreq, rightPercent.toFixed(2) + '%'].forEach(val => {
                let cell = row.insertCell();
                cell.textContent = val;
            });
        }

        pageAnalysis.innerHTML = '';
        pageAnalysis.appendChild(table);
    }

    // Associez la fonction à l'événement click du bouton "Cooccurrents/fréquence"
    let cooccurrenceButton = document.getElementById('cooccurrenceButton');
    cooccurrenceButton.addEventListener('click', function() {
        let word = document.getElementById('poleID').value.trim();
        let interval = parseInt(document.getElementById('lgID').value.trim());
        if (!word || isNaN(interval) || interval <= 0) {
            alert('Veuillez entrer un terme et une longueur valide.');
            return;
        }
        displayCooccurrences(word, interval);
    });

    // On "écoute" si le fichier donné a été modifié.
    fileInput.addEventListener('change', function(e) {
        let file = fileInput.files[0];
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            reader.readAsText(file);

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else {
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}
