
    // Fonction pour analyser un poème
    function analyserPoeme() {
        // Récupérer le contenu du poème et le titre (première ligne)
        const poemeTextarea = document.getElementById("poeme");
        const poemeContent = poemeTextarea.value.trim(); // Trim pour supprimer les espaces vides au début et à la fin
        const lignesPoeme = poemeContent.split("\n");
        const titre = lignesPoeme.shift(); // Récupérer le titre et retirer la première ligne du poème

        // Séparer les strophes
        const strophes = poemeContent.split("\n\n").filter(Boolean); // Filter pour retirer les lignes vides

        // Analyser le poème
        const mots = poemeContent.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").toLowerCase().split(/\s+/);
        const motsFrequents = {};
        for (let mot of mots) {
            if (mot !== titre.split(' ')[0].toLowerCase() && mot !== titre.split(' ')[1].toLowerCase()) {
                motsFrequents[mot] = (motsFrequents[mot] || 0) + 1;
            }
        }
        const motsFrequentsArray = Object.entries(motsFrequents).sort((a, b) => b[1] - a[1]).slice(0, 10);
        const richesseLexicale = (Object.keys(motsFrequents).length / mots.length) * 100;
        const phrases = poemeContent.split(/[.!?]/).filter(Boolean);
        const longueurMoyenneMotParPhrase = mots.length / phrases.length;

        // Calculer le nombre de strophes et leur classification
        const typologieStrophes = {};
        strophes.forEach(strophe => {
            const vers = strophe.split(/\n/).filter(Boolean); // Correction: stanza -> strophe
            const nombreVers = vers.length;
            typologieStrophes[nombreVers] = (typologieStrophes[nombreVers] || 0) + 1;
        });

        // Calculer la typologie des vers (nombre de syllabes)
        const typologieVers = {};
        const vers = poemeContent.split(/\n/).filter(Boolean);
        vers.forEach(vers => {
            const syllabes = vers.match(/[aeiouyéèàâîôû]+/gi).length;
            typologieVers[syllabes] = (typologieVers[syllabes] || 0) + 1;
        });

        // Afficher les résultats
        const divResultats = document.getElementById("result");
        divResultats.innerHTML = `
            <p>Les dix mots les plus fréquents du poème (titre exclus):</p>
            <pre>${motsFrequentsArray}</pre>
            <p>La richesse lexicale du poème sous forme de pourcentage (titre exclus):</p>
            <p>${richesseLexicale.toFixed(2)}%</p>
            <p>Le nombre de phrases du poème (titre exclus):</p>
            <p>${phrases.length}</p>
            <p>La longueur moyenne des mots par phrase (titre exclus):</p>
            <p>${longueurMoyenneMotParPhrase.toFixed(2)}</p>
            <p>Typologie des strophes:</p>
            <p>Ce poème contient ${strophes.length} strophes:</p>
            <ul>
                ${Object.entries(typologieStrophes).map(([nombreVers, nombreStrophes]) => `<li>${nombreStrophes} strophes de ${nombreVers} vers</li>`).join('')}
            </ul>
            <p>Typologie des vers (nombre de syllabes):</p>
            <ul>
                ${Object.entries(typologieVers).map(([nombreSyllabes, nombreVers]) => `<li>${nombreVers} vers de ${nombreSyllabes} syllabes</li>`).join('')}
            </ul>
        `;
    }

    /*// Ajouter un écouteur d'événements pour le bouton "Analyser les poèmes"
    document.getElementById("analyserPoeme").addEventListener("click", analyserPoeme);*/

