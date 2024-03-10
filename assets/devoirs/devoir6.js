document.addEventListener("DOMContentLoaded", function() {
// Fonction pour calculer les statistiques d'un poème
function analyserPoeme(poeme, titre) {
    // Supprimer les caractères spéciaux et diviser en mots
    const mots = poeme.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").toLowerCase().split(/\s+/);

    // Compter la fréquence des mots (excluant le titre)
    const motsFrequents = {};
    for (let mot of mots) {
        if (mot !== titre.split(' ')[0].toLowerCase() && mot !== titre.split(' ')[1].toLowerCase()) {
            motsFrequents[mot] = (motsFrequents[mot] || 0) + 1;
        }
    }

    // Trier les mots par fréquence décroissante et prendre les 10 premiers
    const motsFrequentsArray = Object.entries(motsFrequents).sort((a, b) => b[1] - a[1]).slice(0, 10);

    // Calculer la richesse lexicale
    const richesseLexicale = (Object.keys(motsFrequents).length / mots.length) * 100;

    // Compter le nombre de phrases
    const phrases = poeme.split(/[.!?]/).filter(Boolean);

    // Calculer la longueur moyenne des mots par phrase
    const longueurMoyenneMotParPhrase = mots.length / phrases.length;

    // Identifier et compter les strophes
    const strophes = poeme.split(/\n\n/).filter(Boolean);
    const typologieStrophes = {};
    strophes.forEach(strophe => {
        const vers = stanza.split(/\n/).filter(Boolean);
        const nombreVers = vers.length;
        typologieStrophes[nombreVers] = (typologieStrophes[nombreVers] || 0) + 1;
    });

    // Identifier et compter les vers par nombre de syllabes
    const vers = poeme.split(/\n/).filter(Boolean);
    const typologieVers = {};
    vers.forEach(vers => {
        const syllabes = vers.match(/[aeiouyéèàâîôû]+/gi).length;
        typologieVers[syllabes] = (typologieVers[syllabes] || 0) + 1;
    });

    // Afficher les résultats
    console.log("Analyse du poème : " + titre);
    console.log("Les dix mots les plus fréquents du poème (titre exclus):");
    console.log(motsFrequentsArray);
    console.log("La richesse lexicale du poème sous forme de pourcentage (titre exclus):");
    console.log(richesseLexicale.toFixed(2) + "%");
    console.log("Le nombre de phrases du poème (titre exclus):");
    console.log(phrases.length);
    console.log("La longueur moyenne des mots par phrase (titre exclus):");
    console.log(longueurMoyenneMotParPhrase.toFixed(2));

    console.log("Typologie des strophes:");
    console.log("Ce poème contient " + strophes.length + " strophes:");
    for (let nombreVers in typologieStrophes) {
        console.log(typologieStrophes[nombreVers] + " strophes de " + nombreVers + " vers");
    }

    console.log("Typologie des vers:");
    console.log("Ce poème contient " + vers.length + " vers:");
    for (let nombreSyllabes in typologieVers) {
        console.log(typologieVers[nombreSyllabes] + " vers de " + nombreSyllabes + " syllabes");
    }
}

// Déclaration des poèmes
const poeme1 = `
ROSA FÂCHÉE

Une querelle. Pourquoi ?
Mon Dieu, parce qu’on s’adore.
À peine s’est-on dit Toi
Que Vous se hâte d’éclore.
Le cœur tire sur son nœud ;
L’azur fuit ; l’âme est diverse.
L’amour est un ciel, qui pleut
Sur les amoureux à verse.
De même, quand, sans effroi,
Dans la forêt que juin dore,
On va rôder, sur la foi
Des promesses de l’aurore.
On peut être pris le soir,
Car le beau temps souvent triche,
Par un gros nuage noir
Qui n’était pas sur l’affiche.
`;

const poeme2 = `
Liberté

Prenez du soleil
Dans le creux des mains, Un peu de soleil
Et partez au loin ! 
Partez dans le vent, Suivez votre rêve; Partez à l'instant, la jeunesse est brève ! 
Il est des chemins Inconnus des hommes, Il est des chemins Si aériens ! 
Ne regrettez pas Ce que vous quittez. Regardez, là-bas, L'horizon briller. 
Loin, toujours plus loin, Partez en chantant ! Le monde appartient A ceux qui n'ont rien. 
`;

const poeme3 = `
Le Corbeau et le Renard

Maître Corbeau, sur un arbre perché,
Tenait en son bec un fromage.
Maître Renard, par l’odeur alléché,
Lui tint à peu près ce langage :
« Hé ! bonjour, Monsieur du Corbeau.
Que vous êtes joli ! que vous me semblez beau !
Sans mentir, si votre ramage
Se rapporte à votre plumage,
Vous êtes le Phénix des hôtes de ces bois. »
A ces mots le Corbeau ne se sent pas de joie ;
Et pour montrer sa belle voix,
Il ouvre un large bec, laisse tomber sa proie.
Le Renard s’en saisit, et dit : « Mon bon Monsieur,
Apprenez que tout flatteur
Vit aux dépens de celui qui l’écoute :
Cette leçon vaut bien un fromage, sans doute. »
Le Corbeau, honteux et confus,
Jura, mais un peu tard, qu’on ne l’y prendrait plus.
`;

// Écouteur d'événements pour le bouton "Analyser le poème"
document.getElementById("analyserButton").addEventListener("click", function() {
    analyserPoeme(poeme1, "ROSA FÂCHÉE");
    analyserPoeme(poeme2, "Liberté");
    analyserPoeme(poeme3, "Le Corbeau et le Renard");
});
