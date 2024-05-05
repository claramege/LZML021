window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}



function sort_words() {
// récupération du contenu du fichier texte
const output = document.getElementById("fileDisplayArea").innerText;

// Vérification si la zone de texte est vide
if (output.trim() === "") {
    document.getElementById("logger").innerHTML = '<span class="errorlog">Aucun fichier chargé !</span>';
    return; // Arrête l'exécution de la fonction
}

// récupération du contenu du fichier texte
const output = document.getElementById("fileDisplayArea").innerText;

//balise pour écriture des résultats
let result =  document.getElementById("page-analysis");

//récupération des délimiteurs de mots
let delimiters = document.getElementById("delimID").value;


//Corrections de la liste de délimiteurs pour éviter des erreurs dans l'expression régulière
delim2 = delimiters.replace("-", "\\-") ; //échappement du tiret, comme il entouré d'autres caractères iol sera considéré comme marquant un intervalle comme dans [4-9]
delim2 = delim2.replace("[", "\\[") ; // échappement des crochets ouverts
delim2 = delim2.replace("]", "\\]") ; // échappement des crochets fermants
delim2 = delim2 + "—"; //facultatif: ajout des tirets longs
delim2 = delim2 + "\\s" ;//a jout de tous les symboles d'espacement


//Construction de l'expression régulière pour découper les mots

let word_regex = new RegExp ( "[" + //crochet ouvert pour signifier l'alternative 
                            delim2 +                      
                            "]" , 'g'); // pour enlever plusieurs délimiteurs 



all_words = output.split(word_regex);

cleaned_words = all_words.filter(x => x.trim() != '') // pour ne garder que les tokens non vides 

let dic_length={};

for (let word of cleaned_words){
    if (word.length in dic_length){
        dic_length[word.length]["freq"] += 1;
        if (dic_length[word.length] ["elements"].includes(word.toLowerCase())) {
           
        }
        else{
            dic_length[word.length] ["elements"].push(word.toLowerCase());
        }
      
    }
    else {
         dic_length[word.length]= {}
         dic_length[word.length]["freq"] = 1;
         dic_length[word.length] ["elements"]= [word.toLowerCase()]   ;   

    }
}

let table = document.createElement("table");
table.style.margin = "auto";
let head = table.appendChild(document.createElement("tr"));
head.innerHTML = "<th>Nombre de caractères</th><th>Nombre d'occurrences</th><th>Formes(s) unique(s)</th>";

ordered = Object.keys(dic_length).sort((a, b) => a - b);

for (let elem of ordered){
    let row = table.appendChild(document.createElement("tr"));
    let cell_length = row.appendChild(document.createElement("td"));
    let cell_total = row.appendChild(document.createElement("td"));
    let cell_details = row.appendChild(document.createElement("td"));
    cell_length.innerHTML = elem;
    cell_total.innerHTML = dic_length[elem]["freq"];
    cell_details.innerHTML = dic_length[elem]["elements"].sort().join(', ') +' ('+ dic_length[elem]["elements"].length +')';
    

}

result.innerHTML =`<p>Le  texte contient au total ${cleaned_words.length} mots.<p/>`;
result.append(table);

}
  let labels = [];
    let series = [];

    // Création des données pour le graphique Chartist
    Object.keys(dic_length).forEach(length => {
        labels.push(length);
        series.push(dic_length[length]["freq"]);
    });

    // Configuration du graphique Chartist
    let data = {
        labels: labels,
        series: [series]
    };

    let options = {
        axisX: {
            labelInterpolationFnc: function(value, index) {
                return value;
            }
        }
    };

    // Affichage du graphique Chartist
    new Chartist.Line('.ct-chart', data, options);
// Fonction pour afficher un message personnalisé
function direBonjour() {
    alert('Bonjour! Bienvenue sur notre page.');
}

function toggleHelp() {
    var helpDiv = document.getElementById("help");
    if (helpDiv.style.display === "none") {
        helpDiv.style.display = "block";
    } else {
        helpDiv.style.display = "none";
    }
}


