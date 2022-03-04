// Récupération des IDs
var search_value = document.getElementById("search_value");
var body_page = document.getElementById("body_page");
var random_display = document.getElementById("random_display");
var search_results_name = document.getElementById("search_results_name");

// Ecoute de la valeur de recherche
search_value.addEventListener("keyup", search_name);

// Fonction de recherche
function search_name() {
    if (search_value.value.length == 0) {
        search_results_name.textContent = "Pas de résultats";


    } else if (search_value.value.replace(" ", "").length > 2) {
        var search_number = 0;
        
        search_results_name.textContent = "";

        var p_result = document.createElement("p");
        document.getElementById("search_results_name").appendChild(p_result);

        var ul = document.createElement("ul");
        ul.setAttribute("class", "row");
        ul.setAttribute("id", "search_list");
        document.getElementById("search_results_name").appendChild(ul)

        for (let [id, value] of albums.entries()) {
            if (
                value.titre.toLowerCase().includes(search_value.value.toLowerCase())
            ) {
                random_display.textContent = "";
                body_page.textContent = "";
                var objet_id = albums.get(id.toString());
                display_search_results_name(objet_id, id.toString());
                search_number++
            }
        }

        p_result.textContent = search_number + " résultat(s) de recherche pour le terme '" + search_value.value + "'";
        
    }
}