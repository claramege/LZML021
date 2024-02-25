// Déclaration du poème avec son titre
let poem = `Une querelle. Pourquoi ?
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
Qui n’était pas sur l’affiche.`;

// Les cinq mots les plus fréquents dans le poème
let wordFrequency = {};
let words = poem.match(/\b\w+\b/g);
words.forEach(function(word) {
    word = word.toLowerCase();
    if (wordFrequency[word]) {
        wordFrequency[word]++;
    } else {
        wordFrequency[word] = 1;
    }
});
let sortedWords = Object.keys(wordFrequency).sort(function(a, b) {
    return wordFrequency[b] - wordFrequency[a];
});
let topFiveWords = sortedWords.slice(0, 5);
console.log("Les cinq mots les plus fréquents :", topFiveWords);

// Calcul de la richesse lexicale
let uniqueWords = new Set(words);
let lexicalRichness = uniqueWords.size / words.length;
console.log("Richesse lexicale du poème :", lexicalRichness);

// Nombre de phrases dans le poème
let sentences = poem.match(/\.\s|\.\n|\.$|\?\s|\?\n|\?$|\!\s|\!\n|\!$/g);
let numberOfSentences = sentences ? sentences.length : 0;
console.log("Nombre de phrases :", numberOfSentences);

// Nombre de strophes + typologie des strophes
let stanzas = poem.split(/\n\s*\n/);
let numberOfStanzas = stanzas.length;
let stanzaTypes = {};
stanzas.forEach(function(stanza, index) {
    let lines = stanza.trim().split(/\n/);
    let numberOfLines = lines.length;
    if (stanzaTypes[numberOfLines]) {
        stanzaTypes[numberOfLines]++;
    } else {
        stanzaTypes[numberOfLines] = 1;
    }
});
console.log("Nombre de strophes :", numberOfStanzas);
console.log("Typologie des strophes :", stanzaTypes);

