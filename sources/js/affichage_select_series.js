// mobile_selection.addEventListener("change", display_series);

function display_series(e) {
  // condition qui vérifie le clique sur séries
  if (e.target.value === "series") {
    // vide toutes les div
    document.getElementById("body_page").textContent = "";
    document.getElementById("random_display").textContent = "";
    document.getElementById("nombre_bd").textContent = "";
    document.getElementById("search_container").textContent = "";

    document
      .getElementById("mobile_selection")
      .removeEventListener("change", affichage_contenu_category, true);

    var bd_container = document.createElement("div");
    bd_container.setAttribute("id", "bd_container");
    bd_container.setAttribute("class", "col-12 col-md-10");
    document.getElementById("body_page").appendChild(bd_container);

    // création de liste qui stock les résultats
    var ul = document.createElement("ul");
    ul.setAttribute("id", "list_result_series");
    ul.setAttribute("class", "row");

    bd_container.appendChild(ul);

    // boucle sur la map series
    for (let [id_series, value] of series.entries()) {
      // création dynamique de tous les éléments de la map auteur
      var li = document.createElement("li");
      li.setAttribute("id", id_series);
      li.setAttribute(
        "class",
        "card p-2 mb-1 col-12 col-sm-6 col-md-4 col-lg-3"
      );
      li.style.backgroundColor = "#F3D8CD";

      li.style.listStyle = "none";
      li.textContent = value.nom;
      ul.appendChild(li);

      li.addEventListener("click", check_series_id);
    }
  }
}

// compare l'id en cours avec l'idSérie de album
function check_series_id() {
  document.getElementById("search_container").textContent = "";
  document.getElementById("body_page").textContent = "";
  document.getElementById("random_display").textContent = "";
  var results_number = 0;
  var active_series = this.textContent;
  display_active_series(active_series);

  var number = document.createElement("p");

  document.getElementById("search_container").appendChild(number);

  var list_result_series = document.createElement("ul");
  list_result_series.id = "list_result_series";
  list_result_series.className = "row";
  document.getElementById("search_container").appendChild(list_result_series);

  for (let [id_album, value] of albums.entries()) {
    if (this.id === value.idSerie) {
      var objet_id = albums.get(id_album.toString());
      create_series_elements(objet_id, id_album.toString());
      results_number++;
    }
  }
  number.textContent = "Nombre de résultat(s) : " + results_number;
}

// affiche le nom en cours
function display_active_series(active_series) {
  var serie_name = document.createElement("h2");
  serie_name.setAttribute("class", "col-12");
  serie_name.style.margin = "2vh";
  serie_name.textContent = active_series;
  document.getElementById("search_container").appendChild(serie_name);
}

// création de l'élément à apparaitre à chaque correspondance entre l'id en cours et l'id série
function create_series_elements(album_key, id_album) {
  var li = document.createElement("li");
  li.setAttribute("class", "card col-6 col-sm-4 col-md-3 col-xl-2");
  li.style.backgroundColor = "#F3D8CD";
  li.style.listStyle = "none";

  document.getElementById("list_result_series").appendChild(li);

  var secondary_row = document.createElement("div");
  secondary_row.setAttribute("class", "row");
  li.appendChild(secondary_row);

  var header_col = document.createElement("div");
  header_col.setAttribute("class", "col-12");

  secondary_row.appendChild(header_col);

  var col_img = document.createElement("img");
  col_img.setAttribute("class", "card-img-top img-fluid");
  col_img.setAttribute(
    "src",
    "../sources/albums/" +
      series.get(album_key.idSerie).nom.replace(regex, "") +
      "-" +
      album_key.numero +
      "-" +
      album_key.titre.replace(regex, "") +
      ".jpg"
  );
  header_col.appendChild(col_img);

  var col_description = document.createElement("div");
  col_description.setAttribute("class", "col-12");
  secondary_row.appendChild(col_description);

  var title = document.createElement("p");
  title.textContent = album_key.titre;
  col_description.appendChild(title);

  var price = document.createElement("p");
  price.textContent = album_key.prix + "€";
  col_description.appendChild(price);

  var div_button_container = document.createElement("div");
  div_button_container.setAttribute("class", "col-12");
  div_button_container.setAttribute("id", id_album);
  secondary_row.appendChild(div_button_container);

  var button_infos_serie = document.createElement("button");
  button_infos_serie.setAttribute("class", "btn btn-primary");
  button_infos_serie.setAttribute("data-bs-toggle", "modal");
  button_infos_serie.setAttribute("data-bs-target", "#bd_modal");
  button_infos_serie.textContent = "infos";
  button_infos_serie.addEventListener("click", afficher_infos_BD);
  div_button_container.appendChild(button_infos_serie);

  var button_panier_serie = document.createElement("button");
  button_panier_serie.setAttribute("class", "btn btn-primary");
  button_panier_serie.textContent = "ajout panier";
  button_panier_serie.addEventListener("click", creer_ligne_panier);
  button_panier_serie.addEventListener("click", bulle_bouton_panier);
  div_button_container.appendChild(button_panier_serie);
}
