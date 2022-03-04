mobile_selection.addEventListener("change", display_series);

function display_series() {
  // condition qui vérifie le clique sur séries
  if (mobile_selection.value === "series") {
    // vide le contenu de bd_container
    bd_container.textContent = "";

    // création de liste qui stock les résultats
    var ul = document.createElement("ul");
    ul.setAttribute("id", "list_result_series");
    ul.setAttribute("class", "row");
    // ul.style.height = "600px";
    // ul.style.overflow-y = "scroll";
    bd_container.appendChild(ul);

    // boucle sur la map series
    for (let [id_series, value] of series.entries()) {
      // création dynamique de tous les éléments de la map auteur
      var li = document.createElement("li");
      li.setAttribute("id", id_series);
      li.setAttribute("class", "card p-2 col-12 col-sm-6 col-md-4 col-lg-3");
      li.style.backgroundColor = "#F3D8CD";
      li.style.padding = "1vh";
      
      li.style.listStyle = "none";
      li.textContent = value.nom;
      ul.appendChild(li);

      li.addEventListener("click", check_series_id);
    }
  }
}

// compare l'id en cours avec l'idSérie de album
function check_series_id() {
  var results_number = 0;
  var active_series = this.textContent;
  display_active_series(active_series);

  var number = document.createElement("p");

  for (let [id_album, value] of albums.entries()) {
    if (this.id === value.idSerie) {
      var objet_id = albums.get(id_album.toString());
      create_series_elements(objet_id);
      results_number++;
    }
  }
  number.textContent = "Nombre de résultat(s) : " + results_number;
  var list = document.getElementById("list_result_series");
  list.insertBefore(number, list.children[1]);
}

// affiche le nom en cours
function display_active_series(active_series) {
  document.getElementById("list_result_series").textContent = "";
  var serie_name = document.createElement("h2");
  serie_name.setAttribute("class", "col-12");
  serie_name.style.margin = "2vh";
  serie_name.textContent = active_series;
  document.getElementById("list_result_series").appendChild(serie_name);
}

// création de l'élément à apparaitre à chaque correspondance entre l'id en cours et l'id série
function create_series_elements(album_key) {
  console.log(album_key);
  var li = document.createElement("li");
  li.setAttribute("class", "card col-6 col-sm-4 col-md-3 col-xl-2");
  li.style.backgroundColor = "#F3D8CD";
  li.style.listStyle = "none";

  document.getElementById("list_result_series").appendChild(li);

  var secondary_row = document.createElement("div");
  secondary_row.setAttribute("class", "row");
  secondary_row.setAttribute("id", album_key.id);
  li.appendChild(secondary_row);

  var header_col = document.createElement("div");
  header_col.setAttribute("class", "col-12");

  secondary_row.appendChild(header_col);

  var col_img = document.createElement("img");
  col_img.setAttribute("class", "card-img-top")
  col_img.setAttribute(
    "src",
    "../sources/albumsMini/" +
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
}
