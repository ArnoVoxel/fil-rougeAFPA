// récupération des ids
var mobile_selection = document.getElementById("mobile_selection");
var bd_container = document.getElementById("bd_container");

//abonne le select pour mobile à l'événement change
mobile_selection.addEventListener("change", display_authors);

// création la liste des auteurs
function display_authors() {
  // condition qui vérifie le clique sur auteurs
  if (mobile_selection.value === "authors") {
    // vide le contenu de bd_container
    bd_container.textContent = "";

    // création de liste qui stock les résultats
    var ul = document.createElement("ul");
    ul.setAttribute("id", "list_result_authors");
    ul.setAttribute("class", "row");
    // ul.style.height = "600px";
    // ul.style.overflow-y = "scroll";
    bd_container.appendChild(ul);

    // boucle sur la map auteur
    for (let [id_authors, value] of auteurs.entries()) {
      // création dynamique de tous les éléments de la map auteur
      var li = document.createElement("li");
      li.setAttribute("id", id_authors);
      li.setAttribute("class", "card_author");
      li.style.border = "1px solid black";
      li.style.padding = "1vh";
      li.style.borderRadius = "15px";
      li.style.margin = "1vh";
      li.style.listStyle = "none";

      li.textContent = value.nom;
      ul.appendChild(li);
      li.addEventListener("click", check_authors_id);
    }
  }
}

// compare l'id en cours avec l'idAuteur de album
function check_authors_id() {
  var results_number = 0;
  var active_author = this.textContent;
  display_active_author(active_author);

  var number = document.createElement("p");

  for (let [id, value] of albums.entries()) {
    if (this.id === value.idAuteur) {
      var objet_id = albums.get(id.toString());
      create_authors_elements(objet_id);
      results_number++;
    }
  }
  number.textContent = "Nombre de résultat(s) : " + results_number;
  var list = document.getElementById("list_result_authors");
  list.insertBefore(number, list.children[1]);
}

// affiche le nom en cours
function display_active_author(active_author) {
  document.getElementById("list_result_authors").textContent = "";
  var author_name = document.createElement("h2");
  author_name.setAttribute("class", "col-12");
  author_name.style.margin = "2vh";
  author_name.textContent = active_author;
  document.getElementById("list_result_authors").appendChild(author_name);
}

// création de l'élément à apparaitre à chaque correspondance entre l'id en cours et l'id auteur
function create_authors_elements(album_key) {
  var li = document.createElement("li");
  li.setAttribute("class", "card col-6 col-sm-4 col-md-3 col-xl-2");
  li.style.listStyle = "none";
  document.getElementById("list_result_authors").appendChild(li);

  var secondary_row = document.createElement("div");
  secondary_row.setAttribute("class", "row");
  li.appendChild(secondary_row);

  var header_col = document.createElement("div");
  header_col.setAttribute("class", "col-sm-12");
  secondary_row.appendChild(header_col);

  var col_img = document.createElement("img");
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
  col_description.setAttribute("class", "col-sm-12");
  secondary_row.appendChild(col_description);

  var title = document.createElement("p");
  title.textContent = album_key.titre;
  col_description.appendChild(title);

  var price = document.createElement("p");
  price.textContent = album_key.prix + "€";
  col_description.appendChild(price);
}
