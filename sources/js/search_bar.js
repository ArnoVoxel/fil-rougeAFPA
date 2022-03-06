// Récupération des IDs
var search_value = document.getElementById("search_value");
var body_page = document.getElementById("body_page");
var random_display = document.getElementById("random_display");


// Ecoute de la valeur de recherche
search_value.addEventListener("keyup", search_name);

// Fonction de recherche
function search_name() {
    if (this.value.length == 0) {
        document.getElementById("search_container").textContent = "";
        random_display.textContent = "";
        body_page.textContent = "";
        var no_result = document.createElement("p");
        no_result.textContent = "Pas de résultats";
        document.getElementById("search_container").appendChild(no_result);


    } else if (this.value.replace(" ", "").length > 2) {
        var search_number = 0;
        var search_number_author = 0;
        var search_number_serie = 0;

        random_display.textContent = "";
        body_page.textContent = "";
        document.getElementById('nombre_bd').textContent = '';

        // suppression du message pas de reésultat
        document.getElementById("search_container").textContent = ""
        // création de la div 
        
        var search_results_name = document.createElement("div");
        search_results_name.id = "search_results_name";
        document.getElementById("search_container").appendChild(search_results_name)

        // Affichage des résultats par titre

        var p_result = document.createElement("p");
        document.getElementById("search_results_name").appendChild(p_result);

        var ul = document.createElement("ul");
        ul.setAttribute("class", "row");
        ul.setAttribute("id", "search_list");
        document.getElementById("search_results_name").appendChild(ul)

        for (let [id, value] of albums.entries()) {
            if (
                value.titre.toLowerCase().includes(this.value.toLowerCase())
            ) {
                
                var objet_id = albums.get(id.toString());
                display_search_results_name(objet_id, id.toString());
                search_number++
            }
        }
        
      p_result.textContent = "Titre : " + search_number + " résultat(s) pour le terme '" + this.value + "'" ;
      
      // Affichage des auteurs

      var search_results_authors = document.createElement("div");
      search_results_authors.id = "search_results_authors";
      document.getElementById("search_container").appendChild(search_results_authors)

      var p_author = document.createElement("p");
      document.getElementById("search_results_authors").appendChild(p_author);

      var ul_author = document.createElement("ul");
      ul_author.setAttribute("class", "row");
      ul_author.setAttribute("id","search_list_author");
      document.getElementById("search_results_authors").appendChild(ul_author);

      for (let [id_author, value_author] of auteurs.entries()) {
        if(value_author.nom.toLowerCase().includes(this.value.toLowerCase())) {
            
            var li_author = document.createElement("li");
            li_author.setAttribute("id", id_author);
            li_author.setAttribute("class", "card p-2 mb-1 col-12 col-sm-6 col-md-4 col-lg-3");
            li_author.style.backgroundColor = "#F3D8CD";
            li_author.style.listStyle = "none";
            li_author.textContent = value_author.nom;
            li_author.addEventListener("click", check_authors_id);
            ul_author.appendChild(li_author);
            search_number_author++
        }
      }

      p_author.textContent = "Auteur : " + search_number_author + " résultat(s) pour le terme '" + this.value + "'" ;

      // Affichage des séries

      var search_results_series = document.createElement("div");
      search_results_series.id = "search_results_series";
      document.getElementById("search_container").appendChild(search_results_series)

      var p_serie = document.createElement("p");
      document.getElementById("search_results_series").appendChild(p_serie);

      var ul_serie = document.createElement("ul");
      ul_serie.setAttribute("class", "row");
      ul_serie.setAttribute("id","search_list_author");
      document.getElementById("search_results_series").appendChild(ul_serie);

      for (let [id_serie, value_serie] of series.entries()) {
        if(value_serie.nom.toLowerCase().includes(this.value.toLowerCase())) {
            
            var li_serie = document.createElement("li");
            li_serie.setAttribute("id", id_serie);
            li_serie.setAttribute("class", "card p-2 mb-1 col-12 col-sm-6 col-md-4 col-lg-3");
            li_serie.style.backgroundColor = "#F3D8CD";
            li_serie.style.listStyle = "none";
            li_serie.textContent = value_serie.nom;
            li_serie.addEventListener("click", check_series_id)
            ul_serie.appendChild(li_serie)
            search_number_serie++
        }
      }

      p_serie.textContent = "Série : " + search_number_serie + " résultat(s) pour le terme '" + this.value + "'" ;
    }
}